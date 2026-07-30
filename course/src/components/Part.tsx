import type { CoursePart } from '../types';

interface PartProps {
  coursePart: CoursePart;
}

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ coursePart }: PartProps) => {
  switch (coursePart.kind) {
    case "basic":
      return (
        <p>
          <b>{coursePart.name} {coursePart.exerciseCount}</b>
          <br />
          <i>{coursePart.description}</i>
        </p>
      );

    case "group":
      return (
        <p>
          <b>{coursePart.name} {coursePart.exerciseCount}</b>
          <br />
          project exercises {coursePart.groupProjectCount}
        </p>
      );

    case "background":
      return (
        <p>
          <b>{coursePart.name} {coursePart.exerciseCount}</b>
          <br />
          <i>{coursePart.description}</i>
          <br />
          submit to {coursePart.backgroundMaterial}
        </p>
      );

    case "special":
      return (
        <p>
          <b>{coursePart.name} {coursePart.exerciseCount}</b>
          <br />
          <i>{coursePart.description}</i>
          <br />
          required skills: {coursePart.requirements.join(', ')}
        </p>
      );

    default:
      return assertNever(coursePart);
  }
};

export default Part;