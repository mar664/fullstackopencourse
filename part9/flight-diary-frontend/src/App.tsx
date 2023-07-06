import React from "react";
import { useEffect, useState } from "react";
import { getAllDiaries } from "./services/diaries";
import DiaryEntryComponent from "./components/DiaryEntryComponent";
import { DiaryEntry } from "./types";
import DiaryEntryForm from "./components/DiaryEntryForm";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    const fetchDiaryList = async () => {
      const diaries = await getAllDiaries();
      setDiaries(diaries);
    };
    void fetchDiaryList();
  }, []);

  const addNewDiary = (diary: DiaryEntry) => {
    setDiaries(diaries.concat(diary));
  };

  return (
    <>
      <h3>Add new entry</h3>
      <DiaryEntryForm addNewDiary={addNewDiary} />
      <h3>Diary Entries</h3>
      {diaries.map((diary) => (
        <DiaryEntryComponent entry={diary} key={diary.id} />
      ))}
    </>
  );
};

export default App;
