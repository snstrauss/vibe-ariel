import {
  Circle,
  DashedArrow,
  Diamond,
  Hexagon,
  ThickArrow,
  Trapezoid,
} from "../dist/index.js";

type BaseProps = { id: string; label: string };

// Create reusable components by composing base elements
export function State({ id, label }: BaseProps) {
  return <Hexagon id={id} label={label} />;
}

export function Try({
  id,
  label,
  successId,
  failureId,
}: BaseProps & {
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
