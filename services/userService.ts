import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs,
  query,
  orderBy,
  limit,
  updateDoc,
  increment,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase';
import { UserProfile, ProblemCompletion } from '../types';

// Collections
const USERS_COLLECTION = 'users';
const COMPLETIONS_COLLECTION = 'completions';

/**
 * Create or update user profile
 */
export const createOrUpdateUserProfile = async (
  uid: string, 
  email: string, 
  displayName: string, 
  photoURL: string | null
): Promise<void> => {
  const userRef = doc(db, USERS_COLLECTION, uid);
  const userDoc = await getDoc(userRef);

  if (!userDoc.exists()) {
    // Create new user profile
    const newProfile: UserProfile = {
      uid,
      email,
      displayName,
      photoURL,
      totalProblems: 0,
      avgWpm: 0,
      avgAccuracy: 0,
      lastUpdated: Date.now()
    };
    await setDoc(userRef, newProfile);
  } else {
    // Update existing profile (in case display name or photo changed)
    await updateDoc(userRef, {
      displayName,
      photoURL,
      lastUpdated: Date.now()
    });
  }
};

/**
 * Save problem completion and update user stats
 */
export const saveProblemCompletion = async (
  userId: string,
  problemId: string,
  wpm: number,
  accuracy: number,
  mistakes: number,
  timeSpent: number
): Promise<void> => {
  // Save completion record
  const completionRef = doc(collection(db, COMPLETIONS_COLLECTION));
  const completion: ProblemCompletion = {
    userId,
    problemId,
    wpm,
    accuracy,
    mistakes,
    timeSpent,
    completedAt: Date.now()
  };
  await setDoc(completionRef, completion);

  // Update user profile stats
  const userRef = doc(db, USERS_COLLECTION, userId);
  const userDoc = await getDoc(userRef);
  
  if (userDoc.exists()) {
    const userData = userDoc.data() as UserProfile;
    const currentTotal = userData.totalProblems;
    const currentAvgWpm = userData.avgWpm;
    const currentAvgAccuracy = userData.avgAccuracy;

    // Calculate new averages
    const newTotal = currentTotal + 1;
    const newAvgWpm = ((currentAvgWpm * currentTotal) + wpm) / newTotal;
    const newAvgAccuracy = ((currentAvgAccuracy * currentTotal) + accuracy) / newTotal;

    await updateDoc(userRef, {
      totalProblems: newTotal,
      avgWpm: Math.round(newAvgWpm),
      avgAccuracy: Math.round(newAvgAccuracy),
      lastUpdated: Date.now()
    });
  }
};

/**
 * Get user profile by ID
 */
export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  const userRef = doc(db, USERS_COLLECTION, uid);
  const userDoc = await getDoc(userRef);
  
  if (userDoc.exists()) {
    return userDoc.data() as UserProfile;
  }
  return null;
};

/**
 * Get top users for leaderboard
 */
export const getLeaderboard = async (limitCount: number = 10): Promise<UserProfile[]> => {
  const usersRef = collection(db, USERS_COLLECTION);
  const q = query(
    usersRef, 
    orderBy('avgWpm', 'desc'),
    limit(limitCount)
  );
  
  const querySnapshot = await getDocs(q);
  const leaderboard: UserProfile[] = [];
  
  querySnapshot.forEach((doc) => {
    leaderboard.push(doc.data() as UserProfile);
  });
  
  return leaderboard;
};

/**
 * Get user's rank on leaderboard
 */
export const getUserRank = async (userId: string): Promise<number> => {
  const userProfile = await getUserProfile(userId);
  if (!userProfile) return -1;

  const usersRef = collection(db, USERS_COLLECTION);
  const q = query(usersRef, orderBy('avgWpm', 'desc'));
  const querySnapshot = await getDocs(q);
  
  let rank = 0;
  for (const doc of querySnapshot.docs) {
    rank++;
    if (doc.id === userId) {
      return rank;
    }
  }
  
  return -1;
};
