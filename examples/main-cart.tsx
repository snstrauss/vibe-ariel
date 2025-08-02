import { Arrow, Rectangle, Subgraph, Trapezoid } from "../dist/index.js";
import { Event, Outcome } from "./components.js";

export default function MainCartGraph({ id }: { id: string }) {
  return (
    <Subgraph id={id}>
      <Event id="top1" label="top 1" />
      <Arrow from="top1" to="added" />
      <Outcome id="added" label="item added" />
    </Subgraph>
  );
}