# Quick Start Guide

**Author:** [shashuat](https://github.com/shashuat)

Get up and running with CodeKeybr in 5 minutes!

---

## 🚀 Installation

### Prerequisites
- Node.js 18+ and npm
- Python 3.11+ (optional, for scraper)

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/shashuat/codekeybr.git
   cd codekeybr
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the dev server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   
   Navigate to `http://localhost:5173`

That's it! You should see the CodeKeybr interface.

---

## ✅ Features Implemented

All core features are ready to use:

1. ✅ **Enhanced Type System** - `tags`, `timeComplexity`, `spaceComplexity` in Problem interface
2. ✅ **Modular File Structure** - Individual problem files in `data/problems/`
3. ✅ **Multi-Platform Support** - LeetCode, Codeforces, DeepML
4. ✅ **AI Scraper** - Python script with OpenAI GPT-4 integration
5. ✅ **Dynamic Problem Index** - Auto-generated `data/problems.ts`
6. ✅ **Complexity Display** - Shows Big O notation in typing area
7. ✅ **Real-time Stats** - WPM tracking, accuracy, completion modal
8. ✅ **Smart Typing Engine** - Tab completion, mistake tracking

---

## 📁 Project Structure

```
codekeybr/
├── App.tsx                    # Main app with view routing
├── index.tsx                  # Entry point
├── types.ts                   # TypeScript type definitions
├── components/                # React components
│   ├── ProblemViewer.tsx     # Problem description
│   ├── TypingArea.tsx        # Typing interface
│   └── StatsModal.tsx        # Completion stats
├── hooks/
│   └── useTypingEngine.ts    # Typing logic
├── data/                      # Problem data
│   ├── index.ts              # Platform exports
│   ├── problems.ts           # LeetCode problems
│   ├── codeforces.ts         # Codeforces problems  
│   ├── deepml.ts             # DeepML problems
│   └── problems/             # Individual problem files
│       ├── two_sum.ts
│       ├── add_two_numbers.ts
│       └── ...
├── scraper/                   # Python scraper
│   ├── agent.py              # Main scraper
│   ├── problem_slugs.py      # Problems to scrape
│   └── generate_index.py     # Index generator
└── docs/                      # Documentation
    ├── ARCHITECTURE.md
    ├── SCRAPER_README.md
    ├── MULTI_PLATFORM.md
    └── QUICK_START.md (this file)
```

---

## 🎮 Using the App

### 1. Browse Problems

Click **"Problems"** in the navigation bar to see all available problems organized by platform.

### 2. Select a Platform

Choose from:
- **LeetCode** - Interview preparation problems
- **Codeforces** - Competitive programming
- **DeepML** - Machine learning problems

### 3. Start Practicing

1. Click on any problem to start
2. Read the problem description (left panel)
3. Start typing in the right panel
4. Type the explanation, then complexity, then code
5. Complete to see your stats!

### Tips:
- Press **Tab** for indentation (auto-detects 2 or 4 spaces)
- Press **Enter** for newlines
- Mistakes don't block you - keep typing!
- Watch your real-time WPM in the top bar

---

## 🤖 Adding Problems with AI Scraper

### Setup (One-time)

1. **Install Python dependencies**
   ```bash
   pip install openai requests python-dotenv
   ```

2. **Create `.env` file**
   ```bash
   touch .env
   ```

3. **Add your OpenAI API key**
   ```env
   OPENAI_API_KEY=sk-your-actual-api-key-here
   ```

### Add Problems

1. **Edit problem list**
   
   Open `scraper/problem_slugs.py` and add slugs:
   ```python
   SLUGS_TO_CRAWL = [
       "two-sum",
       "reverse-linked-list",
       "valid-parentheses",
       # Add more...
   ]
   ```

2. **Run the scraper**
   ```bash
   python -m scraper.agent
   ```

3. **Check output**
   
   New problem files appear in `data/problems/` and index is auto-updated!

4. **Test in app**
   ```bash
   npm run dev
   ```

---

## 📊 Current Status

**Problems Available:**
- LeetCode: 7+ problems
- Codeforces: 0 problems (ready to add)
- DeepML: 0 problems (ready to add)

**What's Ready:**
- ✅ Full typing engine with validation
- ✅ WPM tracking and charts
- ✅ Multi-platform architecture
- ✅ AI-powered problem scraper
- ✅ Auto-generated problem indices
- ✅ Complexity analysis display

---

## 🐛 Troubleshooting

### Frontend Issues

**Problem:** Build errors or module not found

**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Scraper Issues

**Problem:** `OpenAIError: The api_key client option must be set`

**Solution:**
1. Create `.env` file in project root
2. Add: `OPENAI_API_KEY=sk-your-key`
3. Install: `pip install python-dotenv`

**Problem:** `ModuleNotFoundError: No module named 'openai'`

**Solution:**
```bash
pip install openai requests python-dotenv
```

### More Help

See detailed troubleshooting in:
- [Main README](../README.md)
- [Scraper README](SCRAPER_README.md)

---

## 🎯 Next Steps

### Immediate Actions:
1. ✅ Test the app - practice typing a few problems
2. ✅ Set up scraper - add your API key
3. ✅ Add 10+ problems - use the scraper to bulk add

### Future Enhancements:
1. **Tag Filtering** - Filter problems by topic (Array, DP, etc.)
2. **Progress Tracking** - Mark problems as completed
3. **Difficulty Filtering** - Easy/Medium/Hard filter
4. **Custom Problem Sets** - Blind 75, NeetCode 150
5. **User Accounts** - Save progress across devices
6. **Leaderboards** - Compare with other users
7. **Themes** - Light/dark mode, custom color schemes

---

## 💡 Pro Tips

1. **Batch Scraping**: Add 20-50 slugs at once for bulk import
2. **Quality Check**: Review AI-generated solutions before committing
3. **Git Workflow**: Commit problem files separately
4. **Cost Management**: Use GPT-4o-mini for cheaper scraping (~10x cheaper)
5. **Problem Selection**: Focus on Blind 75 or NeetCode 150 lists

---

## 📚 Further Reading

- **[Architecture Guide](ARCHITECTURE.md)** - Deep dive into system design
- **[Scraper Documentation](SCRAPER_README.md)** - Complete scraper guide
- **[Multi-Platform Guide](MULTI_PLATFORM.md)** - Add new platforms
- **[Main README](../README.md)** - Full project overview

---

## 🎉 You're Ready!

CodeKeybr is now ready for you to:
- 🎯 Practice typing code solutions
- 📈 Track your WPM improvement
- 🧠 Learn optimal algorithms
- 💪 Build muscle memory
- 🚀 Ace your interviews!

**Happy typing! 🎉**

---

**Questions or issues?** Check the [GitHub repo](https://github.com/shashuat/codekeybr) or open an issue.

