import React, { useState } from "react";
import { addDiaryEntry } from "../services/diaries";
import { DiaryEntry, Visibility, Weather } from "../types";
import Notification from "./Notification";
import axios from "axios";

interface DiaryEntryFormProps {
  addNewDiary: (diary: DiaryEntry) => void;
}

const DiaryEntryForm = ({ addNewDiary }: DiaryEntryFormProps) => {
  const [date, setDate] = useState<string>("");
  const [visibility, setVisibility] = useState<Visibility | null>(null);
  const [weather, setWeather] = useState<Weather | null>(null);
  const [comment, setComment] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmitForm = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (visibility === null)
      return setErrorMessage("Error: visibility must be chosen");
    if (weather === null)
      return setErrorMessage("Error: weather must be chosen");

    const newDiaryEntry = {
      date,
      visibility,
      weather,
      comment,
    };

    try {
      const diaryResult = await addDiaryEntry(newDiaryEntry);
      addNewDiary(diaryResult);
      setDate("");
      setVisibility(null);
      setWeather(null);
      setComment("");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <>
      <Notification message={errorMessage} />
      <form onSubmit={onSubmitForm} onFocus={() => setErrorMessage(null)}>
        date
        <input
          type="date"
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <br />
        visibility:{" "}
        {Object.entries(Visibility).map((e) => (
          <span key={e[1]}>
            {e[0]}{" "}
            <input
              type="radio"
              name="visibility"
              onChange={() => setVisibility(e[1])}
            />
          </span>
        ))}
        <br />
        weather:{" "}
        {Object.entries(Weather).map((e) => (
          <span key={e[1]}>
            {e[0]}{" "}
            <input
              type="radio"
              name="weather"
              onChange={() => setWeather(e[1])}
            />
          </span>
        ))}
        <br />
        comment
        <input
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <br />
        <button type="submit">add</button>
      </form>
    </>
  );
};

export default DiaryEntryForm;
