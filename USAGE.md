# Ariel - Usage Guide

## Quick Start

### Installation
```bash
npm install ariel
```

### Basic Usage

```tsx
import Ariel, { Graph, Rectangle, Diamond, Circle, Arrow } from 'ariel';

// Create a simple flowchart
const flowchart = (
  <Graph type="flowchart" direction="TB" title="Simple Flowchart">
    <Rectangle id="start" label="Start" />
    <Diamond id="decision" label="Decision?" />
    <Rectangle id="process" label="Process" />
    <Circle id="end" label="End" />
    
    <Arrow from="start" to="decision" />
    <Arrow from="decision" to="process" label="Yes" />
    <Arrow from="decision" to="end" label="No" />
    <Arrow from="process" to="end" />
  </Graph>
);

// Convert to Mermaid syntax
const ariel = new Ariel();
const mermaidCode = ariel.render(flowchart);
console.log(mermaidCode);
```

### Simple API (No JSX Required)

```tsx
import { createSimpleGraph } from 'ariel';

const mermaidCode = createSimpleGraph(
  [
    { id: 'start', label: 'Start' },
    { id: 'process', label: 'Process Data' },
    { id: 'end', label: 'End' }
  ],
  [
    { from: 'start', to: 'process', label: 'Begin' },
    { from: 'process', to: 'end', label: 'Complete' }
  ],
  {
    type: 'flowchart',
    direction: 'TB',
    title: 'Simple Process'
  }
);
```

## Component Reference

### Graph Container
```tsx
<Graph 
  type="flowchart"           // 'flowchart' | 'graph' | 'sequenceDiagram' | etc.
  direction="TB"             // 'TB' | 'TD' | 'BT' | 'RL' | 'LR'
  title="My Graph"           // Optional title
>
  {/* nodes and edges */}
</Graph>
```

### Node Components
```tsx
// Basic node
<Node id="node1" label="My Node" />

// Predefined shapes
<Rectangle id="rect1" label="Rectangle" />
<Circle id="circle1" label="Circle" />
<Diamond id="diamond1" label="Decision" />
<Hexagon id="hex1" label="Hexagon" />
<Parallelogram id="para1" label="Parallelogram" />
<Trapezoid id="trap1" label="Trapezoid" />
<DoubleCircle id="double1" label="Double Circle" />

// With custom styling
<Rectangle 
  id="styled" 
  label="Styled Node" 
  class="highlight" 
  style={{ color: 'red' }}
/>
```

### Edge Components
```tsx
// Basic edge
<Edge from="node1" to="node2" label="Connection" />

// Predefined edge types
<Arrow from="a" to="b" label="Arrow" />
<Line from="a" to="b" label="Line" />
<DottedArrow from="a" to="b" label="Dotted" />
<DashedArrow from="a" to="b" label="Dashed" />
<ThickArrow from="a" to="b" label="Thick" />
```

### Subgraph Container
```tsx
<Subgraph id="group1" label="My Group">
  <Rectangle id="inner1" label="Inner Node" />
  <Rectangle id="inner2" label="Another Node" />
  <Arrow from="inner1" to="inner2" />
</Subgraph>
```

## Component Composition

### Creating Reusable Components
```tsx
// User node component
const UserNode = ({ id, name }: { id: string; name: string }) => (
  <Rectangle id={id} label={name} class="user" />
);

// Connection component
const UserConnection = ({ from, to }: { from: string; to: string }) => (
  <Arrow from={from} to={to} label="follows" />
);

// Using the components
const userGraph = (
  <Graph type="flowchart" direction="LR" title="User Relationships">
    <UserNode id="alice" name="Alice" />
    <UserNode id="bob" name="Bob" />
    <UserNode id="charlie" name="Charlie" />
    
    <UserConnection from="alice" to="bob" />
    <UserConnection from="bob" to="charlie" />
    <UserConnection from="charlie" to="alice" />
  </Graph>
);
```

### Complex System Architecture
```tsx
const SystemArchitecture = () => (
  <Graph type="flowchart" direction="TB" title="System Architecture">
    <Subgraph id="frontend" label="Frontend Layer">
      <Rectangle id="ui" label="User Interface" />
      <Rectangle id="api_client" label="API Client" />
      <Arrow from="ui" to="api_client" />
    </Subgraph>
    
    <Subgraph id="backend" label="Backend Layer">
      <Rectangle id="server" label="Application Server" />
      <Rectangle id="database" label="Database" />
      <Rectangle id="cache" label="Cache" />
      <Arrow from="server" to="database" />
      <Arrow from="server" to="cache" />
    </Subgraph>
    
    <Arrow from="api_client" to="server" />
  </Graph>
);
```

## Output Examples

### Generated Mermaid Code
The tool generates clean Mermaid syntax:

```mermaid
flowchart TB
title Data Processing Flow
start["Start"]
process["Process Data"]
decision["Valid?"]
success["Success"]
error["Error"]
start --> process|Begin|
process --> decision|Check|
decision --> success|Yes|
decision --> error|No|
```

### Supported Graph Types
- **flowchart** - Flowcharts and process diagrams
- **graph** - Simple graphs
- **sequenceDiagram** - Sequence diagrams
- **classDiagram** - Class diagrams
- **stateDiagram** - State diagrams
- **entityRelationshipDiagram** - ER diagrams
- **userJourney** - User journey maps
- **gantt** - Gantt charts
- **pieChart** - Pie charts
- **gitgraph** - Git graphs
- **journey** - Journey diagrams

## Advanced Features

### Custom Styling
```tsx
<Rectangle 
  id="custom" 
  label="Custom Node" 
  class="highlight" 
  style={{ 
    color: 'red',
    backgroundColor: 'yellow',
    borderStyle: 'dashed'
  }}
/>
```

### Different Directions
```tsx
// Top to Bottom (default)
<Graph direction="TB">

// Left to Right
<Graph direction="LR">

// Right to Left
<Graph direction="RL">

// Bottom to Top
<Graph direction="BT">
```

### Nested Subgraphs
```tsx
<Graph type="flowchart" direction="TB">
  <Subgraph id="outer" label="Outer Group">
    <Rectangle id="outer_node" label="Outer Node" />
    
    <Subgraph id="inner" label="Inner Group">
      <Rectangle id="inner_node" label="Inner Node" />
    </Subgraph>
    
    <Arrow from="outer_node" to="inner_node" />
  </Subgraph>
</Graph>
```

## Integration Examples

### With React
```tsx
import React from 'react';
import Ariel, { Graph, Rectangle, Arrow } from 'ariel';

const MermaidComponent = () => {
  const graph = (
    <Graph type="flowchart" direction="TB">
      <Rectangle id="start" label="Start" />
      <Rectangle id="end" label="End" />
      <Arrow from="start" to="end" />
    </Graph>
  );
  
  const ariel = new Ariel();
  const mermaidCode = ariel.render(graph);
  
  return (
    <div>
      <h2>Generated Mermaid Graph</h2>
      <pre>{mermaidCode}</pre>
    </div>
  );
};
```

### With Next.js
```tsx
// pages/graphs.js
import Ariel, { Graph, Rectangle, Arrow } from 'ariel';

export default function GraphsPage() {
  const graph = (
    <Graph type="flowchart" direction="LR">
      <Rectangle id="input" label="Input" />
      <Rectangle id="process" label="Process" />
      <Rectangle id="output" label="Output" />
      <Arrow from="input" to="process" />
      <Arrow from="process" to="output" />
    </Graph>
  );
  
  const ariel = new Ariel();
  const mermaidCode = ariel.render(graph);
  
  return (
    <div>
      <h1>Mermaid Graph</h1>
      <pre>{mermaidCode}</pre>
    </div>
  );
}
```

## Best Practices

1. **Use meaningful IDs**: Choose descriptive IDs for your nodes
2. **Component composition**: Create reusable components for common patterns
3. **Subgraphs for organization**: Use subgraphs to group related elements
4. **Consistent naming**: Use consistent naming conventions for your components
5. **Type safety**: Use TypeScript for better development experience

## Troubleshooting

### Common Issues

1. **Missing dependencies**: Make sure you have Preact installed for JSX support
2. **Import errors**: Check that you're importing from the correct path
3. **JSX not working**: Ensure your TypeScript configuration includes JSX support
4. **Build errors**: Run `npm run build` to check for compilation issues

### Getting Help

- Check the examples in `src/examples/`
- Run the demo with `npm run demo`
- Review the TypeScript types for better IntelliSense 