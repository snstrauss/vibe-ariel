import { createSimpleGraph } from './index.js';

// Test the simple graph creation functionality
function testSimpleGraph() {
  console.log('Testing Simple Graph Creation...\n');
  
  const nodes = [
    { id: 'start', label: 'Start' },
    { id: 'process', label: 'Process Data' },
    { id: 'decision', label: 'Valid?' },
    { id: 'success', label: 'Success' },
    { id: 'error', label: 'Error' }
  ];
  
  const edges = [
    { from: 'start', to: 'process', label: 'Begin' },
    { from: 'process', to: 'decision', label: 'Check' },
    { from: 'decision', to: 'success', label: 'Yes' },
    { from: 'decision', to: 'error', label: 'No' }
  ];
  
  const options = {
    type: 'flowchart',
    direction: 'TB',
    title: 'Data Processing Flow'
  };
  
  const mermaidCode = createSimpleGraph(nodes, edges, options);
  
  console.log('Generated Mermaid Code:');
  console.log('```mermaid');
  console.log(mermaidCode);
  console.log('```\n');
  
  return mermaidCode;
}

// Test different graph types
function testGraphTypes() {
  console.log('Testing Different Graph Types...\n');
  
  const simpleNodes = [
    { id: 'a', label: 'Node A' },
    { id: 'b', label: 'Node B' }
  ];
  
  const simpleEdges = [
    { from: 'a', to: 'b', label: 'Connection' }
  ];
  
  const graphTypes = ['flowchart', 'graph'] as const;
  
  graphTypes.forEach(type => {
    console.log(`${type.toUpperCase()} Graph:`);
    console.log('```mermaid');
    console.log(createSimpleGraph(simpleNodes, simpleEdges, { type }));
    console.log('```\n');
  });
}

// Run tests
if (import.meta.url === `file://${process.argv[1]}`) {
  testSimpleGraph();
  testGraphTypes();
} 