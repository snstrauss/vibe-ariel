import { Arrow, Subgraph } from "../dist/index.js";
import { State, Try } from "./components.js";

// Use JSX syntax
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