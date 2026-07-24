import diaryData from '../../data/entries.ts';

import type { DiaryEntry } from '../types.ts';

const diaries: DiaryEntry[] = diaryData as DiaryEntry[];

const getEntries = (): DiaryEntry[]  => { 
  return diaries;
};

const addDiary = () => {
  return null;
};

export default {
  getEntries,
  addDiary
};
