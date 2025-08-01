export interface MermaidNode {
  id: string;
  label?: string;
  type?: 'default' | 'round' | 'stadium' | 'subroutine' | 'cylindrical' | 'circle' | 'rhombus' | 'hexagon' | 'parallelogram' | 'parallelogram_alt' | 'trapezoid' | 'trapezoid_alt' | 'double_circle';
  class?: string;
  style?: Record<string, string>;
}

export interface MermaidEdge {
  from: string;
  to: string;
  label?: string;
  type?: 'arrow' | 'open' | 'dotted' | 'dashed' | 'thick';
  style?: Record<string, string>;
}

export interface MermaidSubgraph {
  id: string;
  label?: string;
  nodes: MermaidNode[];
  edges: MermaidEdge[];
  subgraphs?: MermaidSubgraph[];
}

export interface MermaidGraph {
  type: 'graph' | 'flowchart' | 'sequenceDiagram' | 'classDiagram' | 'stateDiagram' | 'entityRelationshipDiagram' | 'userJourney' | 'gantt' | 'pieChart' | 'gitgraph' | 'journey';
  direction?: 'TB' | 'TD' | 'BT' | 'RL' | 'LR';
  nodes: MermaidNode[];
  edges: MermaidEdge[];
  subgraphs?: MermaidSubgraph[];
  title?: string;
}

export interface JSXComponentProps {
  children?: any;
  [key: string]: any;
}

// Component prop interfaces
export interface GraphComponentProps extends JSXComponentProps {
  id?: string;
  label?: string;
  type?: string;
  class?: string;
  style?: Record<string, string>;
}

export interface EdgeProps extends JSXComponentProps {
  from: string;
  to: string;
  label?: string;
  type?: 'arrow' | 'open' | 'dotted' | 'dashed' | 'thick';
  style?: Record<string, string>;
}

export interface SubgraphProps extends JSXComponentProps {
  id: string;
  label?: string;
}

export interface GraphProps extends JSXComponentProps {
  type?: 'graph' | 'flowchart' | 'sequenceDiagram' | 'classDiagram' | 'stateDiagram' | 'entityRelationshipDiagram' | 'userJourney' | 'gantt' | 'pieChart' | 'gitgraph' | 'journey';
  direction?: 'TB' | 'TD' | 'BT' | 'RL' | 'LR';
  title?: string;
}

export interface MermaidRenderer {
  render(graph: MermaidGraph): string;
  renderNode(node: MermaidNode): string;
  renderEdge(edge: MermaidEdge): string;
  renderSubgraph(subgraph: MermaidSubgraph): string;
} 