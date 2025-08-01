import Ariel, { Graph, Node, Edge, Subgraph, Circle, Rectangle, Diamond, Arrow } from '../index.js';

// Example 1: Simple flowchart
export function createSimpleFlowchart() {
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
  
  const ariel = new Ariel();
  return ariel.render(flowchart);
}

// Example 2: Component composition
export function createUserComponent() {
  const UserNode = ({ id, name }: { id: string; name: string }) => (
    <Rectangle id={id} label={name} class="user" />
  );
  
  const UserConnection = ({ from, to }: { from: string; to: string }) => (
    <Arrow from={from} to={to} label="follows" />
  );
  
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
  
  const ariel = new Ariel();
  return ariel.render(userGraph);
}

// Example 3: Subgraphs
export function createSystemArchitecture() {
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
  
  const ariel = new Ariel();
  return ariel.render(systemGraph);
}

// Example 4: Different node types
export function createNodeTypesDemo() {
  const nodeTypesGraph = (
    <Graph type="flowchart" direction="TB" title="Node Types Demo">
      <Rectangle id="rect" label="Rectangle" />
      <Circle id="circle" label="Circle" />
      <Diamond id="diamond" label="Diamond" />
      <Rectangle id="hexagon" label="Hexagon" type="hexagon" />
      <Rectangle id="parallelogram" label="Parallelogram" type="parallelogram" />
      
      <Arrow from="rect" to="circle" />
      <Arrow from="circle" to="diamond" />
      <Arrow from="diamond" to="hexagon" />
      <Arrow from="hexagon" to="parallelogram" />
    </Graph>
  );
  
  const ariel = new Ariel();
  return ariel.render(nodeTypesGraph);
} 