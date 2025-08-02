# Vibe Ariel

A powerful tool that allows you to define Mermaid graphs using JSX syntax and compose them like React components. Built with TypeScript and Preact for maximum flexibility and component reusability.

![Ariel - Mermaid Tech Adventure](mermaid_tech_adventure.png)

## 🎵 Built with Vibe Coding

This entire project was created using **vibe coding** - a collaborative development approach where we work together in real-time, iterating quickly, and building features as we go. Every component, every fix, and every feature in Ariel was developed through this dynamic, interactive process.

Vibe coding allows us to:
- **Iterate rapidly** - Try ideas, see results, adjust immediately
- **Learn together** - Discover patterns and solutions as we build
- **Build incrementally** - Start simple, add complexity as needed
- **Stay focused** - Work on what matters most in the moment

Ariel is a perfect example of what's possible when we code with the vibe! 🚀

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

// Or save directly to a markdown file
ariel.renderToFile(flowchart, './my-diagram.md');

## Advanced Example: Modular Component Architecture

Here's a more complex example showing how to create modular, reusable components:

```tsx
// components.tsx - Reusable base components
import { Circle, DashedArrow, Diamond, Hexagon, ThickArrow, Trapezoid } from 'ariel';

type BaseProps = { id: string; label: string };

export function State({ id, label }: BaseProps) {
  return <Hexagon id={id} label={label} />;
}

export function Try({ id, label, successId, failureId }: BaseProps & {
  successId: string;
  failureId: string;
}) {
  return (
    <>
      <Diamond id={id} label={label} />
      <ThickArrow label="success" from={id} to={successId} />
      <DashedArrow label="fail" from={id} to={failureId} />
    </>
  );
}

export function Event({ id, label }: BaseProps) {
  return <Circle id={id} label={label} />;
}

export function Outcome({ id, label }: BaseProps) {
  return <Trapezoid id={id} label={label} />;
}
```

```tsx
// login-graph.tsx - Login flow subgraph
import { Arrow, Subgraph } from 'ariel';
import { State, Try } from './components';

export default function LoginGraph({ id }: { id: string }) {
  return (
    <Subgraph id={id} type="flowchart" direction="TB" title="Login Flow">
      <State id="welcome" label="welcome screen" />
      <Arrow from="welcome" to="login-process" />
      <Try
        id="login-process"
        label="login with id"
        successId="success"
        failureId="error"
      />
      <State id="error" label="login error" />
      <State id="success" label="login success" />
    </Subgraph>
  );
}
```

```tsx
// main-cart.tsx - Shopping cart subgraph
import { Arrow, Subgraph } from 'ariel';
import { Event, Outcome } from './components';

export default function MainCartGraph({ id }: { id: string }) {
  return (
    <Subgraph id={id}>
      <Event id="top1" label="top 1" />
      <Arrow from="top1" to="added" />
      <Outcome id="added" label="item added" />
    </Subgraph>
  );
}
```

```tsx
// main.tsx - Compose everything together
import Ariel, { DashedArrow, Graph } from 'ariel';
import LoginGraph from './login-graph';
import MainCartGraph from './main-cart';

const loginId = 'login';
const cartId = 'cart';

const FullGraph = (
  <Graph title="full flow">
    <LoginGraph id={loginId} />
    <DashedArrow from={loginId} to={cartId} />
    <MainCartGraph id={cartId} />
  </Graph>
);

const ariel = new Ariel();
ariel.renderToFile(FullGraph, './flow-output.md');
```

This generates a complete Mermaid diagram with:
- **Modular components** that can be reused across different graphs
- **Subgraphs** for organizing complex flows
- **Custom node types** (hexagons for states, circles for events, etc.)
- **Proper edge styling** with labels and different arrow types

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

### Ariel.renderToFile(jsxElement: any, filePath: string): void

Renders a JSX element to Mermaid syntax and saves it to a markdown file with a mermaid code block.

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