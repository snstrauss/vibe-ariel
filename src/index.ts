// Main exports
export { MermaidProcessor, createMermaidElement } from "./processor.js";
export { MermaidRendererImpl } from "./renderer.js";

// Import for internal use
import { MermaidProcessor } from "./processor.js";
import fs from "fs";
import path from "path";

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
  ThickArrow,
} from "./components.js";

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
  GraphProps,
} from "./types.js";

// Ariel class for rendering JSX to Mermaid
export class Ariel {
  private processor: MermaidProcessor;

  constructor() {
    this.processor = new MermaidProcessor();
  }

  render(jsxElement: any): string {
    return this.processor.processJSX(jsxElement);
  }

  renderToFile(jsxElement: any, filePath: string): void {
    // First, extract the title from the processed graph
    let title = "Graph";

    // Try to extract title from the original element first
    if (jsxElement.props && jsxElement.props.title) {
      title = jsxElement.props.title;
    } else if (
      jsxElement.props &&
      jsxElement.props.graph &&
      jsxElement.props.graph.title
    ) {
      title = jsxElement.props.graph.title;
    }

    // If we couldn't get the title from the original element,
    // we need to process it to get the resolved graph
    if (title === "Graph") {
      // Create a temporary processor to extract the graph structure
      const tempProcessor = new MermaidProcessor();
      try {
        // Use a private method to get the graph without rendering
        const graph = (tempProcessor as any).extractGraph(jsxElement);
        if (graph && graph.title) {
          title = graph.title;
        }
      } catch (error) {
        console.warn("Could not extract title from graph:", error);
      }
    }

    const mermaidCode = this.render(jsxElement);

    // Create the markdown content
    const markdownContent = `# ${title}
\`\`\`mermaid
${mermaidCode}
\`\`\`
`;

    // Ensure the directory exists
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Write the file
    fs.writeFileSync(filePath, markdownContent, "utf8");
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
    type: "mermaid:graph",
    props: {
      graph: {
        type: options.type || "flowchart",
        direction: options.direction || "TB",
        title: options.title,
        nodes: [],
        edges: [],
        subgraphs: [],
      },
      children: [
        ...nodes.map((node) => ({
          type: "mermaid:node",
          props: { node },
        })),
        ...edges.map((edge) => ({
          type: "mermaid:edge",
          props: { edge },
        })),
      ],
    },
  };

  return processor.processJSX(graphElement);
}
