import { useState } from 'react';

import type { Note } from './types'

const App = () => {
  const [newNote, setNewNote] = useState('');
  const [notes, setNotes] = useState<Note[]>([]);

  return <h1>Hello</h1>;
}

export default App;