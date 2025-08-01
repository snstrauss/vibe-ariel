#!/usr/bin/env node

// Simple runner for myExample.tsx
// You can run this with: node run-my-example.js

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🚀 Running your myExample.tsx sample...\n');

try {
  // Try to run with tsx if available
  execSync('npx tsx src/examples/myExample.tsx', { 
    stdio: 'inherit',
    cwd: __dirname 
  });
} catch (error) {
  console.log('tsx not available, trying to build and run...\n');
  
  try {
    // Build the project first
    execSync('npm run build', { 
      stdio: 'inherit',
      cwd: __dirname 
    });
    
    // Run the compiled version
    execSync('node dist/examples/myExample.js', { 
      stdio: 'inherit',
      cwd: __dirname 
    });
  } catch (buildError) {
    console.error('❌ Error running the example:', buildError.message);
    console.log('\n💡 Try running these commands manually:');
    console.log('1. npm install');
    console.log('2. npm run build');
    console.log('3. node dist/examples/myExample.js');
  }
} 