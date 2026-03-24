import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "../../services/noteService";
import type { NoteTag } from "../../types/note";

const schema = Yup.object({
  title: Yup.string().min(3).max(50).required(),
  content: Yup.string().max(500),
  tag: Yup.string().required(),
});

interface NoteFormProps {
  onClose: () => void;
}

type NoteFormValues = {
  title: string;
  content: string;
  tag: NoteTag;
};

export default function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onClose();
    },
  });

  return (
    <Formik<NoteFormValues>
  initialValues={{ title: "", content: "", tag: "Todo" }}
  validationSchema={schema}
  onSubmit={(values) => mutation.mutate(values)}
>
      <Form>
        <Field name="title" placeholder="Title" />
        <ErrorMessage name="title" component="span" />
       <Field as="textarea" name="content" placeholder="Content" />
       <ErrorMessage name="title" component="span" />
        <Field as="select" name="tag">
          <ErrorMessage name="tag" component="span" />
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </Field>

        <button type="button" onClick={onClose}>
          Cancel
        </button>
        <button type="submit">Create note</button>
      </Form>
    </Formik>
  );
}