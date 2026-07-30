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
      <form>
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