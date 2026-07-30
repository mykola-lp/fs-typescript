interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBasic extends CoursePartBase {
  description: string;
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends CoursePartBase {
  description: string;
  backgroundMaterial: string;
  kind: "background";
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground;

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