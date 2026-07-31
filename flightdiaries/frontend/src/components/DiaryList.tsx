import type { DiaryEntry } from '../types';

interface DiaryListProps {
  diaries: DiaryEntry[];
}

const DiaryList = ({ diaries }: DiaryListProps) => {
  return (
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
  );
};

export default DiaryList;