import { useState } from 'react';
import type { SyntheticEvent } from 'react';

import Heading from './components/Heading';

import type { NewDiaryEntry, Weather, Visibility } from './types';
import { useDiaries } from './hooks/useDiaries';

import './index.css'

function getTodayDate() {
  return new Date().toISOString().slice(0, 10);
}

function App() {
  const { diaries, errorMessage, createDiary } = useDiaries();

  const [date, setDate] = useState('');
  const [weather, setWeather] = useState('');
  const [visibility, setVisibility] = useState('');
  const [comment, setComment] = useState('');

  const addDiary = (event: SyntheticEvent) => {
    event.preventDefault();

    const newEntry: NewDiaryEntry = {
      date,
      weather: weather as Weather,
      visibility: visibility as Visibility,
      comment,
    };

    createDiary(newEntry).then(() => {
      setDate('');
      setWeather('');
      setVisibility('');
      setComment('');
    });
  };

  return (
    <div>
      <Heading level={1} text="Flight diaries" />

      <Heading level={2} text="Add new entry" />

      {errorMessage && (
        <div className="error-message">{errorMessage}</div>
      )}

      <form onSubmit={addDiary}>
        <div className="form-field">
          <label>
            date:
            <input
              type="date"
              name="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              min="1900-01-01"
              max={getTodayDate()}
              // required // disabled to demonstrate backend validation error handling
            />

            <span className="validity"></span>
          </label>
        </div>

        <div className="form-field">
          <fieldset>
            <legend>weather:</legend>

            <div>
              <input
                type="radio"
                id="sunny"
                name="weather"
                value="sunny"
                required
                checked={weather === 'sunny'}
                onChange={(event) => setWeather(event.target.value)}
              />

              <label htmlFor="sunny">sunny</label>
            </div>

            <div>
              <input
                type="radio"
                id="rainy"
                name="weather"
                value="rainy"
                required
                checked={weather === 'rainy'}
                onChange={(event) => setWeather(event.target.value)}
              />

              <label htmlFor="rainy">rainy</label>
            </div>

            <div>
              <input
                type="radio"
                id="cloudy"
                name="weather"
                value="cloudy"
                required
                checked={weather === 'cloudy'}
                onChange={(event) => setWeather(event.target.value)}
              />

              <label htmlFor="cloudy">cloudy</label>
            </div>

            <div>
              <input
                type="radio"
                id="stormy"
                name="weather"
                value="stormy"
                required
                checked={weather === 'stormy'}
                onChange={(event) => setWeather(event.target.value)}
              />

              <label htmlFor="stormy">stormy</label>
            </div>

            <div>
              <input
                type="radio"
                id="windy"
                name="weather"
                value="windy"
                required
                checked={weather === 'windy'}
                onChange={(event) => setWeather(event.target.value)}
              />

              <label htmlFor="windy">windy</label>
            </div>
          </fieldset>

          <span className="validity"></span>
        </div>

        <div className="form-field">
          <fieldset>
            <legend>visibility:</legend>

            <div>
              <input
                type="radio"
                id="great"
                name="visibility"
                value="great"
                required
                checked={visibility === 'great'}
                onChange={(event) => setVisibility(event.target.value)}
              />

              <label htmlFor="great">great</label>
            </div>

            <div>
              <input
                type="radio"
                id="good"
                name="visibility"
                value="good"
                required
                checked={visibility === 'good'}
                onChange={(event) => setVisibility(event.target.value)}
              />

              <label htmlFor="good">good</label>
            </div>

            <div>
              <input
                type="radio"
                id="ok"
                name="visibility"
                value="ok"
                required
                checked={visibility === 'ok'}
                onChange={(event) => setVisibility(event.target.value)}
              />

              <label htmlFor="ok">ok</label>
            </div>

            <div>
              <input
                type="radio"
                id="poor"
                name="visibility"
                value="poor"
                required
                checked={visibility === 'poor'}
                onChange={(event) => setVisibility(event.target.value)}
              />

              <label htmlFor="poor">poor</label>
            </div>
          </fieldset>

          <span className="validity"></span>
        </div>

        <div className="form-field">
          <label htmlFor="comment">comment:</label>

          <textarea
            id="comment"
            name="comment"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            rows={2}
            maxLength={100}
          />

          <span className="validity"></span>
        </div>

        <button type="submit">add</button>
      </form>

      <Heading level={2} text="Diary entries" />

      <ul>
        {diaries.map((diary) => (
          <li key={diary.id}>
            <div className="diary-entry-header">
              <strong className="diary-date">{diary.date}</strong>
              <span className="diary-weather">{diary.weather}</span>
              <span className="diary-visibility">{diary.visibility}</span>
            </div>

            {diary.comment && <p className="diary-entry-comment">{diary.comment}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;