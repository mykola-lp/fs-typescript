import { useState } from 'react';

const App = () => {
  const [newNote, setNewNote] = useState('');
  const [notes, setNotes] = useState<string[]>([]);

  return <h1>Hello</h1>;
}

export default App;