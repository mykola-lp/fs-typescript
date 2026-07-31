import { useState } from 'react';

import type { NewDiaryEntry, Weather, Visibility } from '../types';
import { weatherOptions, visibilityOptions } from '../types';

import RadioGroup from './RadioGroup';

interface DiaryFormProps {
  onCreate: (newEntry: NewDiaryEntry) => Promise<void>;
}

const DiaryForm = ({ onCreate }: DiaryFormProps) => {
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState('');
  const [visibility, setVisibility] = useState('');
  const [comment, setComment] = useState('');

  const addDiary = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const newEntry: NewDiaryEntry = {
      date,
      weather: weather as Weather,
      visibility: visibility as Visibility,
      comment,
    };

    onCreate(newEntry).then(() => {
      setDate('');
      setWeather('');
      setVisibility('');
      setComment('');
    });
  };

  return (
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

      <RadioGroup legend="weather" name="weather" options={weatherOptions} value={weather} onChange={setWeather} />
      <RadioGroup legend="visibility" name="visibility" options={visibilityOptions} value={visibility} onChange={setVisibility} />

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
  );
};

function getTodayDate() {
  return new Date().toISOString().slice(0, 10);
}

export default DiaryForm;