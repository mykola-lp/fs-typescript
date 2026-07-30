import ReactDOM from 'react-dom/client'
import type { ReactElement } from 'react'

const Welcome = ({ name }: { name: string }): ReactElement => {
  return <h1>Hello, {name}</h1>;
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Welcome name="Sarah" />
)