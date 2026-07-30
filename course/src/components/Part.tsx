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
          {coursePart.name} {coursePart.exerciseCount}
          <br />
          {coursePart.description}
        </p>
      );

    case "group":
      return (
        <p>
          {coursePart.name} {coursePart.exerciseCount}
          <br />
          project exercises {coursePart.groupProjectCount}
        </p>
      );

    case "background":
      return (
        <p>
          {coursePart.name} {coursePart.exerciseCount}
          <br />
          {coursePart.description}
          <br />
          submit to {coursePart.backgroundMaterial}
        </p>
      );

    case "special":
      return (
        <p>
          {coursePart.name} {coursePart.exerciseCount}
          <br />
          {coursePart.description}
          <br />
          required skills: {coursePart.requirements.join(', ')}
        </p>
      );

    default:
      return assertNever(coursePart);
  }
};

export default Part;