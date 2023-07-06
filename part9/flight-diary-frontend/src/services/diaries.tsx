import axios from "axios";
import { DiaryEntry, NewDiaryEntry } from "../types";

const baseUrl = "http://localhost:3000/api/diaries";

export const getAllDiaries = async () => {
  const { data } = await axios.get<DiaryEntry[]>(baseUrl);
  return data;
};

export const addDiaryEntry = async (postData: NewDiaryEntry) => {
  const { data } = await axios.post<DiaryEntry>(baseUrl, postData);
  return data;
};
