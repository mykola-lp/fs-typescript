import { useEffect, useState } from 'react';

import type { NonSensitiveDiaryEntry } from './types';

import diaryService from './services/diaries';

function App() {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);

  useEffect(() => {
    diaryService
      .getAll()
      .then(data => {
        setDiaries(data);
      });
  }, []);

  return (
    <div>
      <h1>Flight diaries</h1>
    </div>
  );
}

export default App;