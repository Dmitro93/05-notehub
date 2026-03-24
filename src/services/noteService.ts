import axios from "axios";
import type { Note } from "../types/note";

const BASE_URL = "https://notehub-public.goit.study/api/notes";

const token = import.meta.env.VITE_NOTEHUB_TOKEN;

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  page: number,
  search: string
): Promise<FetchNotesResponse> => {
  const res = await axios.get<FetchNotesResponse>(BASE_URL, {
    ...config,
    params: { page, perPage: 12, search },
  });
  return res.data;
};

export const createNote = async (
  note: Omit<Note, "id" | "createdAt" | "updatedAt">
): Promise<Note> => {
  const res = await axios.post<Note>(BASE_URL, note, config);
  return res.data;
};

export const deleteNote = async (id: number): Promise<Note> => {
  const res = await axios.delete<Note>(`${BASE_URL}/${id}`, config);
  return res.data;
};