import css from "./NoteList.module.css";
import type { Note } from "../../types/note";

interface NoteListProps {
  notes: Note[];
}



export default function NoteList({ notes }: NoteListProps) {
  return (
    <div className={css.list}>
      {notes.map((note) => (
        <div key={note.id} className={css.item}>
          <h3 className={css.title}>{note.title}</h3>
          <p className={css.content}>{note.content}</p>
          <span className={css.tag}>{note.tag}</span>
        </div>
      ))}
    </div>
  );
}