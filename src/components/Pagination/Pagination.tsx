import ReactPaginate from "react-paginate";

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export default function Pagination({
  page,
  totalPages,
  onChange,
}: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={totalPages}
      onPageChange={({ selected }) => onChange(selected + 1)}
      forcePage={page - 1}
    />
  );
}