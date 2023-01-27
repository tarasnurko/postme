import React from "react";
import { Field, Form, Formik } from "formik";

import CreateButton from "../../components/common/buttons/CreateButton";
import commentSchema from "../../utils/commentSchema";
import ErrorText from "../../components/common/text/ErrorText";
import { useParams } from "react-router-dom";
import { useAddCommentMutation } from "./commentApiSlice";

const initialValues = {
  text: "",
};

const CreateComment = () => {
  const { id } = useParams();

  const [addComment, { isLoading }] = useAddCommentMutation();

  const handleSubmit = async (values, { resetForm }) => {
    await addComment({ postId: id, data: { text: values.text } });
    resetForm();
  };

  return (
    <div className="mt-5 relative w-full min-h-[70px] flex flex-col gap-2">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={commentSchema}
      >
        {({ errors, touched }) => (
          <Form className="flex flex-col gap-1">
            <label
              htmlFor="text"
              className="absolute top-[-20px] left-0 text-xs text-gray-500"
            >
              Comment
            </label>
            <Field
              className="w-full h-[70px] px-2 py-2 border-2 border-gray-600 rounded-md text-base text-stone-800 outline-none resize-none"
              name="text"
              placeholder="Your Comment"
              as="textarea"
              rows={1}
              maxLength={200}
            />
            {errors.text && touched.text && (
              <ErrorText>{errors.text}</ErrorText>
            )}
            <CreateButton type="submit" disabled={isLoading}>
              Add Comment
            </CreateButton>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateComment;
