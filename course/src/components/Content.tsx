import type { CoursePart } from '../types';

interface ContentProps {
  courseParts: CoursePart[];
}

const Content = ({ courseParts }: ContentProps) => {
  return (
    <>
      {courseParts.map((part) => {
        switch (part.kind) {
          case "basic":
            return (
              <p key={part.name}>
                {part.name} {part.exerciseCount}
                <br />
                {part.description}
              </p>
            );

          case "group":
            return (
              <p key={part.name}>
                {part.name} {part.exerciseCount}
                <br />
                project exercises {part.groupProjectCount}
              </p>
            );

          case "background":
            return (
              <p key={part.name}>
                {part.name} {part.exerciseCount}
                <br />
                {part.description}
                <br />
                submit to {part.backgroundMaterial}
              </p>
            );

          default:
            return null;
        }
      })}
    </>
  );
};

export default Content;