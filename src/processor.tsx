import { createElement, Fragment } from "preact";
import {
  MermaidGraph,
  MermaidNode,
  MermaidEdge,
  MermaidSubgraph,
} from "./types.js";
import { MermaidRendererImpl } from "./renderer.js";

export class MermaidProcessor {
  private renderer: MermaidRendererImpl;

  constructor() {
    this.renderer = new MermaidRendererImpl();
  }

  processJSX(jsxElement: any): string {
    const graph = this.extractGraph(jsxElement);
    return this.renderer.render(graph);
  }

  private extractGraph(element: any): MermaidGraph {
    // Handle both custom mermaid elements and Preact elements
    if (element.type === "mermaid:graph") {
      return this.processGraphElement(element);
    }

    // Handle Preact elements that were created by JSX
    if (
      element.type &&
      typeof element.type === "function" &&
      element.type.name === "Graph"
    ) {
      // This is a Preact element created by JSX, extract the props
      const {
        type = "flowchart",
        direction = "TB",
        title,
        children,
        ...rest
      } = element.props;

      const graph: MermaidGraph = {
        type,
        direction,
        title,
        nodes: [],
        edges: [],
        subgraphs: [],
        ...rest,
      };

      if (children) {
        const { nodes, edges, subgraphs } = this.processChildren(children);
        graph.nodes = nodes;
        graph.edges = edges;
        graph.subgraphs = subgraphs;
      }

      return graph;
    }

    // Handle custom component functions (like FlowGraph)
    if (element.type && typeof element.type === "function") {
      try {
        // Call the custom component function to get the actual JSX
        const result = element.type(element.props);
        if (result) {
          // Recursively process the result
          return this.extractGraph(result);
        }
      } catch (error) {
        console.warn(
          `Failed to process root component ${element.type.name}:`,
          error
        );
      }
    }

    throw new Error("Root element must be a Graph component");
  }

  private processGraphElement(element: any): MermaidGraph {
    const { graph, children } = element.props;
    const processedGraph: MermaidGraph = { ...graph };

    if (children) {
      const { nodes, edges, subgraphs } = this.processChildren(children);
      processedGraph.nodes = nodes;
      processedGraph.edges = edges;
      processedGraph.subgraphs = subgraphs;
    }

    return processedGraph;
  }

  private processChildren(children: any): {
    nodes: MermaidNode[];
    edges: MermaidEdge[];
    subgraphs: MermaidSubgraph[];
  } {
    const nodes: MermaidNode[] = [];
    const edges: MermaidEdge[] = [];
    const subgraphs: MermaidSubgraph[] = [];

    const processElement = (element: any) => {
      if (
        !element ||
        typeof element === "string" ||
        typeof element === "number"
      ) {
        return;
      }

      if (Array.isArray(element)) {
        element.forEach(processElement);
        return;
      }

      // Handle JSX fragments or arrays returned by components
      if (
        element &&
        typeof element === "object" &&
        !element.type &&
        Array.isArray(element)
      ) {
        element.forEach(processElement);
        return;
      }

      switch (element.type) {
        case "mermaid:node":
          nodes.push(element.props.node);
          break;
        case "mermaid:edge":
          edges.push(element.props.edge);
          break;
        case "mermaid:subgraph":
          subgraphs.push(this.processSubgraphElement(element));
          break;
        default:
          // Handle Preact elements created by JSX
          if (element.type && typeof element.type === "function") {
            const componentName = element.type.name;
            const props = element.props;

            switch (componentName) {
              case "Node":
              case "Circle":
              case "Rectangle":
              case "Diamond":
              case "Hexagon":
              case "Parallelogram":
              case "Trapezoid":
              case "DoubleCircle":
                nodes.push({
                  id: props.id,
                  label: props.label,
                  type: this.getNodeType(componentName),
                  class: props.class,
                  style: props.style,
                  ...props,
                });
                break;
              case "Edge":
              case "Arrow":
              case "Line":
              case "DottedArrow":
              case "DashedArrow":
              case "ThickArrow":
                edges.push({
                  from: props.from,
                  to: props.to,
                  label: props.label,
                  type: this.getEdgeType(componentName),
                  style: props.style,
                  ...props,
                });
                break;
              case "Subgraph":
                subgraphs.push(
                  this.processSubgraphElement({
                    type: "mermaid:subgraph",
                    props: {
                      subgraph: {
                        id: props.id,
                        label: props.label,
                        nodes: [],
                        edges: [],
                        subgraphs: [],
                      },
                      children: props.children,
                    },
                  })
                );
                break;
              default:
                // Handle custom components by calling them and processing their result
                if (componentName && componentName !== "Graph") {
                  try {
                    // Call the custom component function
                    const result = element.type(props);
                    if (result) {
                      processElement(result);
                    }
                  } catch (error) {
                    console.warn(
                      `Failed to process custom component ${componentName}:`,
                      error
                    );
                  }
                } else if (props && props.children) {
                  processElement(props.children);
                }
            }
          } else if (element.props && element.props.children) {
            processElement(element.props.children);
          }
      }
    };

    processElement(children);

    return { nodes, edges, subgraphs };
  }

  private processSubgraphElement(element: any): MermaidSubgraph {
    const { subgraph, children } = element.props;
    const processedSubgraph: MermaidSubgraph = { ...subgraph };

    if (children) {
      const { nodes, edges, subgraphs } = this.processChildren(children);
      processedSubgraph.nodes = nodes;
      processedSubgraph.edges = edges;
      processedSubgraph.subgraphs = subgraphs;
    }

    return processedSubgraph;
  }

  private getNodeType(componentName: string): string {
    switch (componentName) {
      case "Circle":
        return "circle";
      case "Rectangle":
        return "default";
      case "Diamond":
        return "rhombus";
      case "Hexagon":
        return "hexagon";
      case "Parallelogram":
        return "parallelogram";
      case "Trapezoid":
        return "trapezoid";
      case "DoubleCircle":
        return "double_circle";
      default:
        return "default";
    }
  }

  private getEdgeType(componentName: string): string {
    switch (componentName) {
      case "Arrow":
        return "arrow";
      case "Line":
        return "open";
      case "DottedArrow":
        return "dotted";
      case "DashedArrow":
        return "dashed";
      case "ThickArrow":
        return "thick";
      default:
        return "arrow";
    }
  }
}

// Custom JSX factory for Mermaid elements
export function createMermaidElement(
  type: string,
  props: any,
  ...children: any[]
) {
  if (type.startsWith("mermaid:")) {
    return createElement(type, {
      ...props,
      children: children.length === 1 ? children[0] : children,
    });
  }

  return createElement(type, props, ...children);
}
