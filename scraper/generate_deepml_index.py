"""
Generates the deepml.ts index file
Auto-discovers all DeepML problem TypeScript files
"""

import os
import re

PROBLEMS_DIR = "./src/data/deepml"
INDEX_FILE = "./src/data/deepml.ts"

def generate_deepml_index():
    """Generate the deepml.ts index file with imports and exports"""
    
    # Get all .ts files except TEMPLATE.ts
    files = sorted([
        f for f in os.listdir(PROBLEMS_DIR)
        if f.endswith('.ts') and f != 'TEMPLATE.ts'
    ])
    
    if not files:
        print("⚠️  No DeepML problem files found")
        return
    
    # Generate imports
    imports = []
    exports = []
    
    for file in files:
        name = file.replace('.ts', '')
        # Convert filename to constant name (e.g., matrix_multiplication -> MATRIX_MULTIPLICATION)
        const_name = name.upper()
        imports.append(f"import {{ {const_name} }} from './deepml/{name}';")
        exports.append(f"  {const_name},")
    
    # Build the index file content
    content = """import { Problem } from '../types';

// Auto-generated imports (do not edit manually)
"""
    
    content += '\n'.join(imports)
    content += """

// Export all DeepML problems as an array
export const DEEPML_PROBLEMS: Problem[] = [
"""
    content += '\n'.join(exports)
    content += """
];
"""
    
    # Write the file
    with open(INDEX_FILE, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ Generated deepml.ts with {len(files)} problems")

if __name__ == "__main__":
    generate_deepml_index()
