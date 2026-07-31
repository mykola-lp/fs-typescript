import { useEffect, useState } from 'react';

import axios from 'axios';

import type { DiaryEntry, NewDiaryEntry, Weather, Visibility } from './types';

import diaryService from './services/diaries';

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  const [date, setDate] = useState('');
  const [weather, setWeather] = useState('');
  const [visibility, setVisibility] = useState('');
  const [comment, setComment] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    diaryService
      .getAll()
      .then(data => {
        setDiaries(data);
      });
  }, []);

  const addDiary = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const newEntry: NewDiaryEntry = {
      date,
      weather: weather as Weather,
      visibility: visibility as Visibility,
      comment,
    };

    diaryService
      .create(newEntry)
      .then(returnedEntry => {
        setDiaries(diaries.concat(returnedEntry));
        setDate('');
        setWeather('');
        setVisibility('');
        setComment('');
      })
      .catch(error => {
        if (axios.isAxiosError(error)) {
          const zodErrors = error.response?.data?.error;

          if (Array.isArray(zodErrors) && zodErrors.length > 0) {
            const messages = zodErrors.map((issue: { message: string }) => issue.message).join(', ');
            setErrorMessage(`Error: ${messages}`);
          } else {
            setErrorMessage('Something went wrong');
          }
        } else {
          setErrorMessage('An unexpected error occurred');
        }

        setTimeout(() => setErrorMessage(''), 5000);
      });
  };

  return (
    <div>
      <h1>Flight diaries</h1>

      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}

      <form onSubmit={addDiary}>
        <div>
          date
          <input value={date} onChange={(event) => setDate(event.target.value)} />
        </div>

        <div>
          weather
          <input value={weather} onChange={(event) => setWeather(event.target.value)} />
        </div>

        <div>
          visibility
          <input value={visibility} onChange={(event) => setVisibility(event.target.value)} />
        </div>

        <div>
          comment
          <input value={comment} onChange={(event) => setComment(event.target.value)} />
        </div>

        <button type="submit">add</button>
      </form>

      <ul>
        {diaries.map((diary) => (
          <li key={diary.id}>
            {diary.date} {diary.weather} {diary.visibility}
            {diary.comment && <> — {diary.comment}</>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;