import { Problem, PlatformCategory } from '../types';
import { PROBLEMS as LEETCODE_PROBLEMS } from './problems';
import { CODEFORCES_PROBLEMS } from './codeforces';
import { DEEPML_PROBLEMS } from './deepml';

// Platform categories
export const PLATFORM_CATEGORIES: PlatformCategory[] = [
  {
    name: 'leetcode',
    displayName: 'LeetCode',
    platform: 'leetcode',
    problems: LEETCODE_PROBLEMS,
    description: 'Practice coding interview problems from LeetCode'
  },
  {
    name: 'codeforces',
    displayName: 'Codeforces',
    platform: 'codeforces',
    problems: CODEFORCES_PROBLEMS,
    description: 'Competitive programming challenges from Codeforces'
  },
  {
    name: 'deepml',
    displayName: 'DeepML',
    platform: 'deepml',
    problems: DEEPML_PROBLEMS,
    description: 'Machine learning and deep learning problems'
  }
];

// Export all problems combined
export const ALL_PROBLEMS: Problem[] = [
  ...LEETCODE_PROBLEMS,
  ...CODEFORCES_PROBLEMS,
  ...DEEPML_PROBLEMS,
];

// Helper functions
export function getProblemsByPlatform(platform: string): Problem[] {
  const category = PLATFORM_CATEGORIES.find(cat => cat.platform === platform);
  return category ? category.problems : [];
}

export function getPlatformCategory(platform: string): PlatformCategory | undefined {
  return PLATFORM_CATEGORIES.find(cat => cat.platform === platform);
}
