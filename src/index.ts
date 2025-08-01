// Main exports
export { MermaidProcessor, createMermaidElement } from './processor.js';
export { MermaidRendererImpl } from './renderer.js';

// Import for internal use
import { MermaidProcessor } from './processor.js';

// Component exports
export {
  Graph,
  Node,
  Edge,
  Subgraph,
  Circle,
  Rectangle,
  Diamond,
  Hexagon,
  Parallelogram,
  Trapezoid,
  DoubleCircle,
  Arrow,
  Line,
  DottedArrow,
  DashedArrow,
  ThickArrow
} from './components.js';

// Type exports
export type {
  MermaidGraph,
  MermaidNode,
  MermaidEdge,
  MermaidSubgraph,
  MermaidRenderer,
  JSXComponentProps,
  GraphComponentProps,
  EdgeProps,
  SubgraphProps,
  GraphProps
} from './types.js';

// Ariel class for rendering JSX to Mermaid
export class Ariel {
  private processor: MermaidProcessor;
  
  constructor() {
    this.processor = new MermaidProcessor();
  }
  
  render(jsxElement: any): string {
    return this.processor.processJSX(jsxElement);
  }
}

// Default export
export default Ariel;

// Utility function to create a simple graph
export function createSimpleGraph(
  nodes: Array<{ id: string; label?: string; type?: string }>,
  edges: Array<{ from: string; to: string; label?: string; type?: string }>,
  options: { type?: string; direction?: string; title?: string } = {}
): string {
  const processor = new MermaidProcessor();
  
  const graphElement = {
    type: 'mermaid:graph',
    props: {
      graph: {
        type: options.type || 'flowchart',
        direction: options.direction || 'TB',
        title: options.title,
        nodes: [],
        edges: [],
        subgraphs: []
      },
      children: [
        ...nodes.map(node => ({
          type: 'mermaid:node',
          props: { node }
        })),
        ...edges.map(edge => ({
          type: 'mermaid:edge',
          props: { edge }
        }))
      ]
    }
  };
  
  return processor.processJSX(graphElement);
} 