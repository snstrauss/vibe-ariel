#!/usr/bin/env node

import { runDemo } from './demo.js';

// Simple CLI interface
function main() {
  console.log('🎨 JSX to Mermaid Tool');
  console.log('=======================\n');
  
  try {
    runDemo();
    console.log('✅ Demo completed successfully!');
    console.log('\nTo use this tool in your project:');
    console.log('1. Install: npm install jsx-to-mermaid');
    console.log('2. Import: import { jsxToMermaid, Graph, Node, Edge } from "jsx-to-mermaid"');
    console.log('3. Create graphs using JSX syntax');
    console.log('4. Convert to Mermaid: const mermaid = jsxToMermaid(yourJSX)');
  } catch (error) {
    console.error('❌ Error running demo:', error);
    process.exit(1);
  }
}

// Run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
} 