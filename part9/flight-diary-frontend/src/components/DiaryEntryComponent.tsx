import React from "react";
import { DiaryEntry } from "../types";

interface DiaryEntryProps {
  entry: DiaryEntry;
}

const DiaryEntryComponent = ({ entry }: DiaryEntryProps) => {
  return (
    <p>
      <b>{entry.date}</b>
      <br />
      <br />
      visibility: {entry.visibility} <br />
      weather: {entry.weather}
    </p>
  );
};

export default DiaryEntryComponent;
