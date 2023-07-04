import React from "react";
import { useEffect, useState } from "react";
import { getAllDiaries } from "./services/diaries";
import DiaryEntryComponent from "./components/DiaryEntry";
import { DiaryEntry } from "./types";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    const fetchDiaryList = async () => {
      const diaries = await getAllDiaries();
      setDiaries(diaries);
    };
    void fetchDiaryList();
  }, []);

  return (
    <>
      <h3>Diary Entries</h3>
      {diaries.map((diary) => (
        <DiaryEntryComponent entry={diary} key={diary.id} />
      ))}
    </>
  );
};

export default App;
