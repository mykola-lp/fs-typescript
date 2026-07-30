import { useState } from 'react';

import type { Note } from './types'

const App = () => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      content: 'testing'
    }
  ]);

  const [newNote, setNewNote] = useState('');

  const noteCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    
    const noteToAdd = {
      content: newNote,
      id: String(notes.length + 1)
    };

    setNotes(notes.concat(noteToAdd));
    setNewNote('');
  };

  return (
    <div>
      <form onSubmit={noteCreation}>
        <input
          value={newNote}
          onChange={(event) => setNewNote(event.target.value)}
        />

        <button type='submit'>add</button>
      </form>
    </div>
  )
}

export default App;