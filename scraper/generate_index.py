"""
Auto-generate problems.ts index file

Scans src/data/problems/ directory and generates TypeScript imports/exports
"""

import os
import re

PROBLEMS_DIR = "./src/data/problems"
OUTPUT_FILE = "./src/data/problems.ts"

def generate_problems_index():
    """Generate problems.ts by scanning the problems directory"""
    
    # Get all .ts files except TEMPLATE.ts
    files = []
    for filename in os.listdir(PROBLEMS_DIR):
        if filename.endswith('.ts') and filename != 'TEMPLATE.ts':
            files.append(filename)
    
    files.sort()  # Consistent ordering
    
    if not files:
        print("⚠️  No problem files found")
        return
    
    # Generate content
    imports = []
    exports = []
    
    for filename in files:
        # Convert filename to constant name
        # e.g., two_sum.ts -> TWO_SUM
        const_name = filename.replace('.ts', '').upper()
        module_path = filename.replace('.ts', '')
        
        imports.append(f"import {{ {const_name} }} from './problems/{module_path}';")
        exports.append(f"  {const_name},")
    
    content = f"""import {{ Problem }} from '../types';

// Auto-generated imports (do not edit manually)
{chr(10).join(imports)}

// Export all problems as an array
export const PROBLEMS: Problem[] = [
{chr(10).join(exports)}
];
"""
    
    # Write to file
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ Generated {OUTPUT_FILE} with {len(files)} problems")

if __name__ == "__main__":
    generate_problems_index()
