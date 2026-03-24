import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import { fetchNotes } from "../../services/noteService";
import SearchBox from "../SearchBox/SearchBox";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import css from "./App.module.css";

export default function App() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 400);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", page, search],
    queryFn: () => fetchNotes(page, search),
    placeholderData: (prev) => prev,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={debouncedSearch} />

        {totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={totalPages}
            onChange={setPage}
          />
        )}

        <button
          className={css.button}
          onClick={() => setIsOpen(true)}
        >
          Create note +
        </button>
      </header>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error...</p>}

      {notes.length > 0 && <NoteList notes={notes} />}

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <NoteForm onClose={() => setIsOpen(false)} />
        </Modal>
      )}
    </div>
  );
}