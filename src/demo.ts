import { createSimpleGraph } from './index.js';

// Demo function to show the basic functionality
export function runDemo() {
  console.log('🎨 JSX to Mermaid Demo\n');
  
  // Example 1: Simple flowchart
  console.log('📊 Example 1: Simple Flowchart');
  console.log('```mermaid');
  console.log(createSimpleGraph(
    [
      { id: 'start', label: 'Start' },
      { id: 'process', label: 'Process Data' },
      { id: 'decision', label: 'Valid?' },
      { id: 'success', label: 'Success' },
      { id: 'error', label: 'Error' }
    ],
    [
      { from: 'start', to: 'process', label: 'Begin' },
      { from: 'process', to: 'decision', label: 'Check' },
      { from: 'decision', to: 'success', label: 'Yes' },
      { from: 'decision', to: 'error', label: 'No' }
    ],
    {
      type: 'flowchart',
      direction: 'TB',
      title: 'Data Processing Flow'
    }
  ));
  console.log('```\n');
  
  // Example 2: Left-to-right graph
  console.log('🔄 Example 2: Left-to-Right Graph');
  console.log('```mermaid');
  console.log(createSimpleGraph(
    [
      { id: 'input', label: 'Input' },
      { id: 'transform', label: 'Transform' },
      { id: 'output', label: 'Output' }
    ],
    [
      { from: 'input', to: 'transform', label: 'Data' },
      { from: 'transform', to: 'output', label: 'Result' }
    ],
    {
      type: 'flowchart',
      direction: 'LR',
      title: 'Data Pipeline'
    }
  ));
  console.log('```\n');
  
  // Example 3: Simple graph
  console.log('🔗 Example 3: Simple Graph');
  console.log('```mermaid');
  console.log(createSimpleGraph(
    [
      { id: 'a', label: 'Node A' },
      { id: 'b', label: 'Node B' },
      { id: 'c', label: 'Node C' }
    ],
    [
      { from: 'a', to: 'b', label: 'Connection 1' },
      { from: 'b', to: 'c', label: 'Connection 2' },
      { from: 'a', to: 'c', label: 'Direct' }
    ],
    {
      type: 'graph',
      direction: 'TB',
      title: 'Simple Network'
    }
  ));
  console.log('```\n');
}

// Export for use in other modules
export default runDemo; 