# CodeKeybr 🚀

> Build muscle memory by typing code solutions to classic interview problems

**Author:** [shashuat](https://github.com/shashuat)

---

## 📖 What is CodeKeybr?

CodeKeybr is a typing practice application designed for developers preparing for technical interviews. Instead of typing random text, you practice typing real code solutions to algorithmic problems from LeetCode, Codeforces, DeepML, and more.

### Why CodeKeybr?

- **Build muscle memory** for common coding patterns
- **Learn optimal solutions** while improving typing speed
- **Track your progress** with WPM, accuracy, and completion stats
- **Multi-platform support** - practice problems from different coding platforms
- **AI-powered scraper** to automatically import new problems

---

## ✨ Features

### 🎯 Practice Mode
- Type through problem descriptions and optimal solutions
- Real-time WPM tracking with live graphs
- Accuracy monitoring and mistake counting
- Smart tab completion for indentation
- Syntax highlighting for better readability

### � Authentication & User Profiles
- **Google Sign-In** - Secure authentication with your Google account
- **Persistent User Data** - Your stats are saved across sessions
- **Profile Tracking** - Track your progress over time

### 🏆 Real Leaderboard
- **Global Rankings** - Compete with other users
- **Live Stats** - See your rank and average WPM
- **Performance Tracking** - Average accuracy and problems solved
- **Real-time Updates** - Leaderboard updates as you complete problems

### 📚 Multiple Platforms
- **LeetCode** - Classic interview problems
- **Codeforces** - Competitive programming challenges
- **DeepML** - Machine learning problems
- Easy to add more platforms

### 📊 Performance Tracking
- Real-time words-per-minute (WPM) calculation
- Accuracy percentage tracking
- WPM history with visual charts
- Completion statistics modal
- **Cloud-based storage** - Stats saved to Firebase

### 📈 Vercel Analytics
- Track user engagement and page views
- Monitor application performance
- Understand user behavior

### 🤖 AI-Powered Problem Scraper
- Automatically fetch problems from LeetCode GraphQL API
- AI-enhanced problem formatting using OpenAI GPT-4
- Convert HTML to clean Markdown
- Generate optimal solutions with explanations
- Auto-calculate time/space complexity

### 🎨 Modern UI
- Clean, dark-themed interface
- Responsive design
- Smooth animations and transitions
- Visual feedback for correct/incorrect keystrokes

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Python 3.11+ (for the scraper)
- Firebase account (for authentication and database)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shashuat/codekeybr.git
   cd codekeybr
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase** (Required for authentication and leaderboard)
   
   Follow the detailed guide: [docs/FIREBASE_SETUP.md](docs/FIREBASE_SETUP.md)
   
   Quick steps:
   - Create a Firebase project
   - Enable Google Authentication
   - Create Firestore database
   - Copy `.env.example` to `.env` and add your Firebase config

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173`

---

## 🎮 How to Use

### Getting Started

1. **Sign In** (optional but recommended)
   - Click **"Sign In"** in the navbar
   - Authenticate with your Google account
   - Your profile and stats will be saved automatically

### Practice Problems

1. Click on **"Problems"** in the navigation bar
2. Select a platform (LeetCode, Codeforces, DeepML)
3. Choose a problem from the list
4. Start typing! The problem description appears on the left, your typing area on the right
5. Type the solution explanation first, then the complexity analysis, then the code
6. Complete the problem to see your stats

### View Your Stats

After completing a problem, you'll see:
- Total time taken
- Words per minute (WPM)
- Accuracy percentage
- Number of mistakes
- WPM progression graph

**If signed in**, your stats will be automatically saved and contribute to:
- Your overall average WPM
- Your accuracy rating
- Your leaderboard ranking
- Your total problems solved count

### Compete on the Leaderboard

1. Click **"Leaderboard"** in the navbar
2. See top users ranked by average WPM
3. Find your position and stats
4. Complete more problems to climb the ranks!

---

## 🤖 Adding New Problems (AI Scraper)

### Setup

1. **Install Python dependencies**
   ```bash
   pip install openai requests python-dotenv
   ```

2. **Create a `.env` file** in the project root
   ```env
   OPENAI_API_KEY=sk-your-api-key-here
   ```

3. **Configure problems to scrape**
   
   Edit [scraper/problem_slugs.py](scraper/problem_slugs.py) and add problem slugs:
   ```python
   SLUGS_TO_CRAWL = [
       "two-sum",
       "reverse-linked-list",
       "valid-parentheses",
       # Add more...
   ]
   ```

### Run the Scraper

```bash
python -m scraper.agent
```

The scraper will:
1. ✅ Fetch problem data from LeetCode
2. ✅ Use AI to format and enhance the content
3. ✅ Generate TypeScript problem files
4. ✅ Auto-update the problems index

### Force Regenerate

To regenerate existing problems:
```bash
FORCE_REGENERATE=true python -m scraper.agent
```

---

## 📁 Project Structure

```
codekeybr/
├── src/
│   ├── App.tsx                # Main application component
│   ├── index.tsx              # Entry point with Analytics
│   ├── AuthContext.tsx        # Authentication context provider
│   ├── firebase.ts            # Firebase configuration
│   ├── types.ts               # TypeScript type definitions
│   ├── constants.ts           # Global constants
│   ├── components/            # React components
│   │   ├── ProblemViewer.tsx # Problem description display
│   │   ├── TypingArea.tsx    # Main typing interface
│   │   └── StatsModal.tsx    # Completion statistics
│   ├── hooks/
│   │   └── useTypingEngine.ts# Typing logic and state management
│   ├── services/
│   │   └── userService.ts    # Firestore user data operations
│   └── data/                  # Problem data
│       ├── index.ts          # Platform categories export
│       ├── problems.ts       # LeetCode problems index
│       ├── codeforces.ts     # Codeforces problems
│       ├── deepml.ts         # DeepML problems
│       └── problems/         # Individual LeetCode problem files
│           ├── two_sum.ts
│           ├── reverse_string.ts
│           └── ...
├── scraper/                   # Python AI scraper
│   ├── agent.py              # Main scraper script
│   ├── problem_slugs.py      # Problem list to scrape
│   └── generate_index.py     # Auto-generate problem index
└── docs/                      # Documentation
    ├── ARCHITECTURE.md       # Architecture overview
    ├── QUICK_START.md        # Quick start guide
    ├── SCRAPER_README.md     # Scraper documentation
    ├── FIREBASE_SETUP.md     # Firebase & Auth setup guide
    └── MULTI_PLATFORM.md     # Multi-platform guide
```

---

## 🛠️ Technology Stack

### Frontend
- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Lucide React** - Icon library
- **Recharts** - Chart visualization
- **Vercel Analytics** - User analytics

### Backend & Services
- **Firebase Authentication** - Google Sign-In
- **Firestore Database** - User profiles and stats storage
- **Firebase SDK** - Real-time data sync

### Scraper
- **Python 3.11+** - Scripting language
- **OpenAI API** - AI-powered content processing
- **Requests** - HTTP client for LeetCode GraphQL
- **python-dotenv** - Environment variable management

---

## 🎯 Features in Detail

### Smart Typing Engine

The typing engine ([src/hooks/useTypingEngine.ts](src/hooks/useTypingEngine.ts)) features:
- Character-by-character validation
- Mistake tracking without blocking
- Smart tab completion for indentation (2 or 4 spaces)
- Real-time WPM calculation
- Enter key support for newlines
- Completion detection

### AI-Enhanced Problem Format

Each problem includes:
- **Title & Difficulty** - Problem metadata
- **Tags** - Categorization (Array, Hash Table, DP, etc.)
- **Description** - Clean Markdown format
- **Solution Explanation** - 2-3 paragraph explanation of optimal approach
- **Solution Code** - Production-ready Python implementation
- **Complexity Analysis** - Time and space complexity with Big O notation

### Multi-Platform Architecture

The app supports multiple coding platforms through a modular structure:
- Each platform has its own directory and index file
- Problems are categorized by platform
- Easy to add new platforms (see [docs/MULTI_PLATFORM.md](docs/MULTI_PLATFORM.md))
- Platform tabs for quick switching

---

## 📚 Documentation

- **[Architecture Guide](docs/ARCHITECTURE.md)** - System design and evolution
- **[Quick Start Guide](docs/QUICK_START.md)** - Get up and running quickly
- **[Firebase Setup Guide](docs/FIREBASE_SETUP.md)** - Complete authentication & database setup
- **[Scraper Documentation](docs/SCRAPER_README.md)** - Detailed scraper usage
- **[Multi-Platform Guide](docs/MULTI_PLATFORM.md)** - Adding new platforms and problems

---

## 🤝 Contributing

Contributions are welcome! Here are some ways you can contribute:

1. **Add more problems** - Use the scraper to add problems from LeetCode
2. **Support new platforms** - Add Codeforces, HackerRank, etc.
3. **Improve the UI** - Better styling, animations, themes
4. **Add features** - Advanced filters, study plans, friend system
5. **Fix bugs** - Report or fix issues

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run the AI scraper
python -m scraper.agent

# Force regenerate all problems
FORCE_REGENERATE=true python -m scraper.agent
```

---

## 🐛 Troubleshooting

### Authentication Issues

**Problem:** "Firebase: Error (auth/unauthorized-domain)"

**Solution:** Add your domain to Firebase authorized domains:
- Firebase Console → Authentication → Settings → Authorized domains
- Add `localhost` for local development
- Add your production domain for deployment

### Database Permission Errors

**Problem:** "Missing or insufficient permissions"

**Solution:** 
- Check your Firestore security rules (see [docs/FIREBASE_SETUP.md](docs/FIREBASE_SETUP.md))
- Make sure you're signed in when testing
- Verify your Firebase project is properly configured

### Scraper Issues

**Problem:** `OpenAIError: The api_key client option must be set`

**Solution:** Make sure you have a `.env` file with your API key:
```env
OPENAI_API_KEY=sk-your-api-key-here
```

Also ensure `python-dotenv` is installed:
```bash
pip install python-dotenv
```

**Problem:** `ModuleNotFoundError: No module named 'openai'`

**Solution:** Install required dependencies:
```bash
pip install openai requests python-dotenv
```

### Frontend Issues

**Problem:** Module not found errors

**Solution:** Delete `node_modules` and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

**Problem:** Environment variables not loading

**Solution:**
- Restart your dev server after changing `.env`
- Ensure variables start with `VITE_`
- Check that `.env` exists in the project root

---

## 🎨 Customization

### Adding a New Platform

See the detailed guide in [docs/MULTI_PLATFORM.md](docs/MULTI_PLATFORM.md)

### Styling

The app uses Tailwind CSS classes. Main colors are defined in [index.html](index.html):
- `--color-primary`: Accent color (cyan)
- `--color-success`: Success states (green)
- `--color-danger`: Error states (red)
- `--color-background`: Main background
- `--color-surface`: Card/panel background

---

## 📄 License

This project is open source and available under the MIT License.

---

## 🙏 Acknowledgments

- **LeetCode** - For providing the GraphQL API
- **OpenAI** - For GPT-4 AI assistance
- **Vite** - For blazing fast development
- **React** - For the component framework

---

## 📬 Contact

**Author:** [shashuat](https://github.com/shashuat)

- GitHub: [@shashuat](https://github.com/shashuat)
- Project: [github.com/shashuat/codekeybr](https://github.com/shashuat/codekeybr)

---

## ⭐ Show Your Support

If you find CodeKeybr helpful, please give it a star on GitHub! ⭐

---

**Happy Typing! 🎉**

