import { useEffect, useState } from 'react';

import type { DiaryEntry, NewDiaryEntry } from '../types';
import diaryService from '../services/diaries';

import { getErrorMessage } from '../utils';

export function useDiaries() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    diaryService
      .getAll()
      .then(data => {
        setDiaries(data);
      });
  }, []);

  const createDiary = (newEntry: NewDiaryEntry) => {
    return diaryService
      .create(newEntry)
      .then(returnedEntry => {
        setDiaries(prevDiaries => prevDiaries.concat(returnedEntry));
      })
      .catch(error => {
        setErrorMessage(getErrorMessage(error));
        setTimeout(() => setErrorMessage(''), 5000);
      });
  };

  return { diaries, errorMessage, createDiary };
}