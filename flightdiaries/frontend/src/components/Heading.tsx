import type { ElementType } from 'react';

interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  text: string;
}

const Heading = ({ level, text }: HeadingProps) => {
  const Tag: ElementType = `h${level}`;

  return <Tag>{text}</Tag>;
};

export default Heading;