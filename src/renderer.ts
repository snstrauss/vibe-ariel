import { MermaidGraph, MermaidNode, MermaidEdge, MermaidSubgraph, MermaidRenderer } from './types.js';

export class MermaidRendererImpl implements MermaidRenderer {
  render(graph: MermaidGraph): string {
    const lines: string[] = [];
    
    // Add graph type and direction
    lines.push(`${graph.type} ${graph.direction || 'TB'}`);
    
    // Add title if present
    if (graph.title) {
      lines.push(`%% title ${graph.title}`);
    }
    
    // Render nodes
    graph.nodes.forEach(node => {
      lines.push(this.renderNode(node));
    });
    
    // Render edges
    graph.edges.forEach(edge => {
      lines.push(this.renderEdge(edge));
    });
    
    // Render subgraphs
    if (graph.subgraphs) {
      graph.subgraphs.forEach(subgraph => {
        lines.push(this.renderSubgraph(subgraph));
      });
    }
    
    return lines.join('\n');
  }
  
  renderNode(node: MermaidNode): string {
    let nodeStr = node.id;
    
    if (node.type && node.type !== 'default') {
      // For non-default types, use the type-specific syntax
      switch (node.type) {
        case 'circle':
          nodeStr += `(("${node.label || node.id}"))`;
          break;
        case 'rhombus':
          nodeStr += `{"${node.label || node.id}"}`;
          break;
        case 'hexagon':
          nodeStr += `["${node.label || node.id}"]`;
          break;
        case 'parallelogram':
          nodeStr += `[/"${node.label || node.id}"/]`;
          break;
        case 'trapezoid':
          nodeStr += `[/"${node.label || node.id}"\\]`;
          break;
        case 'double_circle':
          nodeStr += `((("${node.label || node.id}")))`;
          break;
        default:
          nodeStr += `["${node.label || node.id}"]`;
      }
    } else {
      // For default type, just use square brackets
      nodeStr += `["${node.label || node.id}"]`;
    }
    
    if (node.class) {
      nodeStr += `:::${node.class}`;
    }
    
    return nodeStr;
  }
  
  renderEdge(edge: MermaidEdge): string {
    let edgeStr = `${edge.from}`;
    
    // Add edge type
    let arrowType: string;
    switch (edge.type) {
      case 'arrow':
        arrowType = '-->';
        break;
      case 'open':
        arrowType = '---';
        break;
      case 'dotted':
        arrowType = '-.->';
        break;
      case 'dashed':
        arrowType = '-.->';
        break;
      case 'thick':
        arrowType = '==>';
        break;
      default:
        arrowType = '-->';
    }
    
    if (edge.label) {
      // For edge labels, use the format: A == label ==> B
      if (arrowType === '==>') {
        edgeStr += ` == ${edge.label} ==> ${edge.to}`;
      } else if (arrowType === '-.->') {
        edgeStr += ` -. ${edge.label} .-> ${edge.to}`;
      } else {
        edgeStr += ` ${arrowType} ${edge.to}`;
      }
    } else {
      edgeStr += ` ${arrowType} ${edge.to}`;
    }
    
    return edgeStr;
  }
  
  renderSubgraph(subgraph: MermaidSubgraph): string {
    const lines: string[] = [];
    lines.push(`subgraph ${subgraph.id}`);
    
    if (subgraph.label) {
      lines.push(`  title ${subgraph.label}`);
    }
    
    // Render nodes in subgraph
    subgraph.nodes.forEach(node => {
      lines.push(`  ${this.renderNode(node)}`);
    });
    
    // Render edges in subgraph
    subgraph.edges.forEach(edge => {
      lines.push(`  ${this.renderEdge(edge)}`);
    });
    
    // Render nested subgraphs
    if (subgraph.subgraphs) {
      subgraph.subgraphs.forEach(nestedSubgraph => {
        const nestedLines = this.renderSubgraph(nestedSubgraph).split('\n');
        nestedLines.forEach(line => {
          lines.push(`  ${line}`);
        });
      });
    }
    
    lines.push('end');
    return lines.join('\n');
  }
} 