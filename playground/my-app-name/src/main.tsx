import ReactDOM from 'react-dom/client'
import type { ReactElement } from 'react'

interface WelcomeProps {
  name: string;
}

const Welcome = (props: WelcomeProps): ReactElement => {
  return <h1>Hello, {props.name}</h1>;
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Welcome name="Sarah" />
)