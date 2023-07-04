import React, { useState } from "react";
import { addDiaryEntry } from "../services/diaries";
import { DiaryEntry, Visibility, Weather } from "../types";

interface DiaryEntryFormProps {
  addNewDiary: (diary: DiaryEntry) => void;
}

const DiaryEntryForm = ({ addNewDiary }: DiaryEntryFormProps) => {
  const [date, setDate] = useState<string>("");
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Ok);
  const [weather, setWeather] = useState<Weather>(Weather.Cloudy);
  const [comment, setComment] = useState<string>("");

  const onSubmitForm = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newDiaryEntry = { date, visibility, weather, comment };

    const diaryResult = await addDiaryEntry(newDiaryEntry);
    addNewDiary(diaryResult);

    setDate("");
    setVisibility(Visibility.Ok);
    setWeather(Weather.Cloudy);
    setComment("");
  };

  return (
    <form onSubmit={onSubmitForm}>
      date
      <input value={date} onChange={({ target }) => setDate(target.value)} />
      <br />
      visibility
      <select
        value={visibility}
        onChange={({ target }) => setVisibility(target.value as Visibility)}
      >
        {Object.entries(Visibility).map((e) => (
          <option key={e[1]} value={e[1]}>
            {e[0]}
          </option>
        ))}
      </select>
      <br />
      weather
      <select
        value={weather}
        onChange={({ target }) => setWeather(target.value as Weather)}
      >
        {Object.entries(Weather).map((e) => (
          <option key={e[1]} value={e[1]}>
            {e[0]}
          </option>
        ))}
      </select>{" "}
      <br />
      comment
      <input
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      />
      <br />
      <button type="submit">add</button>
    </form>
  );
};

export default DiaryEntryForm;
