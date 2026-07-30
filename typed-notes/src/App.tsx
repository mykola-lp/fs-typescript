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

  return (
    <div>
      <ul>
        {notes.map(note =>
          <li key={note.id}>{note.content}</li>
        )}
      </ul>
    </div>
  )
}

export default App;