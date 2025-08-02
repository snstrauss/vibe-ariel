import Ariel, { DashedArrow, Graph } from "../dist/index.js";
import LoginGraph from "./login-graph.js";
import MainCartGraph from "./main-cart.js";

const loginId = "login";
const cartId = "cart";

const FullGraph = (
  <Graph title="full flow example">
    <LoginGraph id={loginId} />
    <DashedArrow from={loginId} to={cartId} />
    <MainCartGraph id={cartId} />
  </Graph>
);

const ariel = new Ariel();

// Save to markdown file
ariel.renderToFile(FullGraph, "./examples/flow-output.md");
