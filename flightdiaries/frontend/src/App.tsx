import { useDiaries } from './hooks/useDiaries';

import DiaryForm from './components/DiaryForm';
import DiaryList from './components/DiaryList';
import Heading from './components/Heading';

import './index.css';

function App() {
  const { diaries, errorMessage, createDiary } = useDiaries();

  return (
    <div>
      <Heading level={1} text="Flight diaries" />
      <Heading level={2} text="Add new entry" />

      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <DiaryForm onCreate={createDiary} />

      <Heading level={2} text="Diary entries" />
      <DiaryList diaries={diaries} />
    </div>
  );
}

export default App;