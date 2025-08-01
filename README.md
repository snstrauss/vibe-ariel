# Ariel

A powerful tool that allows you to define Mermaid graphs using JSX syntax and compose them like React components. Built with TypeScript and Preact for maximum flexibility and component reusability.

![Ariel - Mermaid Tech Adventure](mermaid_tech_adventure.png)

## Features

- 🎨 **JSX Syntax**: Define graphs using familiar JSX syntax
- 🔧 **Component Composition**: Create reusable graph components
- 📦 **TypeScript Support**: Full type safety and IntelliSense
- 🎯 **Multiple Graph Types**: Support for flowcharts, sequence diagrams, class diagrams, and more
- 🏗️ **Subgraphs**: Organize complex graphs with nested subgraphs
- 🎨 **Custom Styling**: Apply custom styles and classes to nodes and edges

## Installation

```bash
npm install ariel
```

## Quick Start

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

## Components

### Graph Types

- `Graph` - Main container for any graph type
- `Flowchart` - Alias for flowchart type
- `SequenceDiagram` - For sequence diagrams
- `ClassDiagram` - For class diagrams
- `StateDiagram` - For state diagrams

### Node Types

- `Node` - Generic node component
- `Rectangle` - Default rectangular node
- `Circle` - Circular node
- `Diamond` - Diamond-shaped decision node
- `Hexagon` - Hexagonal node
- `Parallelogram` - Parallelogram node
- `Trapezoid` - Trapezoid node
- `DoubleCircle` - Double circle node

### Edge Types

- `Edge` - Generic edge component
- `Arrow` - Arrow with arrowhead
- `Line` - Simple line without arrowhead
- `DottedArrow` - Dotted arrow
- `DashedArrow` - Dashed arrow
- `ThickArrow` - Thick arrow

### Containers

- `Subgraph` - Group nodes and edges together

## Component Composition

One of the key features is the ability to create reusable components:

```tsx
// Create a reusable user node component
const UserNode = ({ id, name }: { id: string; name: string }) => (
  <Rectangle id={id} label={name} class="user" />
);

// Create a reusable connection component
const UserConnection = ({ from, to }: { from: string; to: string }) => (
  <Arrow from={from} to={to} label="follows" />
);

// Use the components
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

## Subgraphs

Organize complex graphs with subgraphs:

```tsx
const systemGraph = (
  <Graph type="flowchart" direction="TB" title="System Architecture">
    <Subgraph id="frontend" label="Frontend">
      <Rectangle id="ui" label="User Interface" />
      <Rectangle id="api" label="API Client" />
      <Arrow from="ui" to="api" />
    </Subgraph>
    
    <Subgraph id="backend" label="Backend">
      <Rectangle id="server" label="Server" />
      <Rectangle id="database" label="Database" />
      <Arrow from="server" to="database" />
    </Subgraph>
    
    <Arrow from="api" to="server" />
  </Graph>
);
```

## API Reference

### Ariel.render(jsxElement: any): string

Converts a JSX element to Mermaid syntax.

### createSimpleGraph(nodes, edges, options): string

Utility function for creating simple graphs without JSX:

```tsx
const mermaidCode = createSimpleGraph(
  [
    { id: 'start', label: 'Start' },
    { id: 'end', label: 'End' }
  ],
  [
    { from: 'start', to: 'end', label: 'Process' }
  ],
  { type: 'flowchart', direction: 'TB', title: 'Simple Graph' }
);
```

## Graph Types Supported

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

## Direction Options

- **TB** - Top to bottom
- **TD** - Top down (same as TB)
- **BT** - Bottom to top
- **RL** - Right to left
- **LR** - Left to right

## Examples

See the `src/examples/` directory for more examples:

- Basic flowchart
- Component composition
- System architecture with subgraphs
- Different node types

## Development

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Run in development mode
npm run dev

# Run tests
npm test

# Run examples
npm run example
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

MIT 