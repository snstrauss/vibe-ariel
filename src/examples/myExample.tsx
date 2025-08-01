import Ariel, {
  Arrow,
  DashedArrow,
  Diamond,
  Graph,
  Hexagon,
  Rectangle,
  Subgraph,
  ThickArrow,
  Trapezoid,
} from "../index.js";

// Create reusable components by composing base elements
function State({ id, label }: { id: string; label: string }) {
  return <Hexagon id={id} label={label} />;
}

function Try({
  id,
  label,
  successId,
  failureId,
}: {
  id: string;
  label: string;
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

// Use JSX syntax
function LoginGraph({ id }: { id: string }) {
  return (
    <Subgraph id={id} type="flowchart" direction="TB" title="Login Flow">
      <State id="welcome" label="welcome screen" />
      <Arrow from="welcome" to="login-process" />
      <Try
        id="login-process"
        label="login process"
        successId="success"
        failureId="error"
      />
      <State id="error" label="login error" />
      <State id="success" label="login success" />
    </Subgraph>
  );
}

function MainCartGraph({ id }: { id: string }) {
  return (
    <Subgraph id={id}>
      <Rectangle id="top1" label="top 1" />
      <Arrow from="top1" to="added" />
      <Trapezoid id="added" label="item added" />
    </Subgraph>
  );
}

const loginId = 'login';
const cartId = 'cart';

const FullGraph = (
  <Graph title="full flow">
    <LoginGraph id={loginId} />
    <DashedArrow from={loginId} to={cartId} />
    <MainCartGraph id={cartId} />
  </Graph>
)

const ariel = new Ariel();
const sampleGraph = ariel.render(FullGraph);
console.log(sampleGraph);
