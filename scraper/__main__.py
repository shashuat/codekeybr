"""
Main entry point for scraping agents
Run either LeetCode or DeepML scraper
"""

import sys

def main():
    if len(sys.argv) < 2:
        print("Usage: python -m scraper [leetcode|deepml]")
        print("\nExamples:")
        print("  python -m scraper leetcode    # Run LeetCode scraper")
        print("  python -m scraper deepml      # Run DeepML scraper")
        print("\nEnvironment variables:")
        print("  OPENAI_API_KEY      - Required for AI processing")
        print("  FORCE_REGENERATE    - Set to 'true' to regenerate existing files")
        print("  START_ID            - Starting problem ID (DeepML only, default: 1)")
        print("  END_ID              - Ending problem ID (DeepML only, default: 301)")
        sys.exit(1)
    
    platform = sys.argv[1].lower()
    
    if platform == "leetcode":
        from .agent import main as leetcode_main
        leetcode_main()
    elif platform == "deepml":
        from .deepml_agent_browser import main as deepml_main
        deepml_main()
    else:
        print(f"Unknown platform: {platform}")
        print("Available platforms: leetcode, deepml")
        sys.exit(1)

if __name__ == "__main__":
    main()
