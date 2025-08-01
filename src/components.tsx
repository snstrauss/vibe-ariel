import { createElement } from 'preact';
import { MermaidNode, MermaidEdge, MermaidSubgraph, MermaidGraph, JSXComponentProps, GraphComponentProps, EdgeProps, SubgraphProps, GraphProps } from './types.js';

// Node component - JSX version
export function Node(props: GraphComponentProps) {
  const { id, label, type, class: className, style, children, ...rest } = props;
  
  if (!id) {
    throw new Error('Node component requires an id prop');
  }
  
  const node: MermaidNode = {
    id,
    label: label || children,
    type: type as any,
    class: className,
    style,
    ...rest
  };
  
  // For JSX, we need to return the element directly
  return {
    type: 'mermaid:node',
    props: { node }
  };
}

// Edge component - JSX version

export function Edge(props: EdgeProps) {
  const { from, to, label, type, style, children, ...rest } = props;
  
  if (!from || !to) {
    throw new Error('Edge component requires both from and to props');
  }
  
  const edge: MermaidEdge = {
    from,
    to,
    label: label || children,
    type,
    style,
    ...rest
  };
  
  // For JSX, we need to return the element directly
  return {
    type: 'mermaid:edge',
    props: { edge }
  };
}

// Subgraph component

export function Subgraph(props: SubgraphProps) {
  const { id, label, children, ...rest } = props;
  
  if (!id) {
    throw new Error('Subgraph component requires an id prop');
  }
  
  const subgraph: MermaidSubgraph = {
    id,
    label,
    nodes: [],
    edges: [],
    subgraphs: [],
    ...rest
  };
  
  // For JSX, we need to return the element directly
  return {
    type: 'mermaid:subgraph',
    props: { subgraph, children }
  };
}

// Main Graph component - JSX version
export function Graph(props: GraphProps) {
  const { type = 'flowchart', direction = 'TB', title, children, ...rest } = props;
  
  const graph: MermaidGraph = {
    type,
    direction,
    title,
    nodes: [],
    edges: [],
    subgraphs: [],
    ...rest
  };
  
  // Create a custom element that Preact can handle
  const element = {
    type: 'mermaid:graph',
    props: { graph, children },
    key: undefined,
    ref: undefined,
    __k: null,
    __: null,
    __b: 0,
    __e: null,
    __c: null,
    constructor: undefined,
    __v: 0,
    __i: -1,
    __u: 0
  };
  
  return element;
}

// Utility components for common node types
export function Circle(props: GraphComponentProps) {
  return Node({ ...props, type: 'circle' });
}

export function Rectangle(props: GraphComponentProps) {
  return Node({ ...props, type: 'default' });
}

export function Diamond(props: GraphComponentProps) {
  return Node({ ...props, type: 'rhombus' });
}

export function Hexagon(props: GraphComponentProps) {
  return Node({ ...props, type: 'hexagon' });
}

export function Parallelogram(props: GraphComponentProps) {
  return Node({ ...props, type: 'parallelogram' });
}

export function Trapezoid(props: GraphComponentProps) {
  return Node({ ...props, type: 'trapezoid' });
}

export function DoubleCircle(props: GraphComponentProps) {
  return Node({ ...props, type: 'double_circle' });
}

// Utility components for common edge types
export function Arrow(props: EdgeProps) {
  return Edge({ ...props, type: 'arrow' });
}

export function Line(props: EdgeProps) {
  return Edge({ ...props, type: 'open' });
}

export function DottedArrow(props: EdgeProps) {
  return Edge({ ...props, type: 'dotted' });
}

export function DashedArrow(props: EdgeProps) {
  return Edge({ ...props, type: 'dashed' });
}

export function ThickArrow(props: EdgeProps) {
  return Edge({ ...props, type: 'thick' });
} 