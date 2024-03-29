import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetPostQuery, useUpdatePostMutation } from "./postsApiSlice";

import { Formik, Form, FieldArray } from "formik";
import postSchema from "../../utils/postSchema";

import CreateButton from "../../components/common/buttons/CreateButton";
import DefaultButton from "../../components/common/buttons/colors/DefaultButton";
import ErrorText from "../../components/common/text/ErrorText";

import PageLayout from "../../components/PageLayout";
import Modal from "../../components/modal/Modal";
import FormObserver from "../../components/utils/FormObserver";
import {
  TitleInput,
  DescriptionInput,
  PreviewInput,
  TagsInput,
  SubtitleInput,
  TextInput,
  ImageInput,
  LinkInput,
} from "../../components/inputs";
import ToContent from "./ToContent";
import Tags from "../../components/post/Tags";
import { useEffect } from "react";

const PostEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: post, isLoading } = useGetPostQuery(id);
  const [updatePost] = useUpdatePostMutation();

  const [newInputType, setNewInputType] = useState("subtitle");
  const [tagInput, setTagInput] = useState("");
  const [formValues, setFormValues] = useState(null);
  const [errMsg, setErrMsg] = useState("");
  const [modal, setModal] = useState(false);

  const [initialValues, setInitialValues] = useState(null);

  useEffect(() => {
    if (!isLoading && post && !initialValues) {
      setInitialValues({
        title: post.title || "",
        preview: post.preview || "",
        description: post.description || "",
        tags: post.tags || [],
        content: post.content || [],
      });
    }
  }, [initialValues, isLoading, post]);

  const handleChangeForm = (values) => {
    setFormValues(values);
  };

  const handleSubmit = async () => {
    try {
      await updatePost({ data: formValues, id });
      navigate(`/posts/${id}`);
    } catch (err) {
      setErrMsg(err);
    }
  };

  const handleNewInputType = (e) => {
    setNewInputType(e.target.value);
  };

  const handleTagChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleAddTag = (push) => {
    push(tagInput);
    setTagInput("");
  };

  const checkItemMoveUp = (index) => index > 0;
  const checkItemMoveDown = (index, length) => index < length - 1;

  const moveItemUp = (swap, index) => swap(index, index - 1);
  const moveItemDown = (swap, index) => swap(index, index + 1);

  const deleteItem = (remove, index) => remove(index);

  const handleAddInput = (push) => {
    if (newInputType === "subtitle" || newInputType === "text") {
      push({ type: newInputType, text: "" });
    } else if (newInputType === "image" || newInputType === "link") {
      push({ type: newInputType, text: "", sub: "" });
    }
  };

  const handleOpenModal = () => setModal(true);
  const handleCloseModal = () => setModal(false);

  return (
    <>
      {modal && (
        <Modal
          type="update"
          onClose={handleCloseModal}
          onConfirm={handleSubmit}
        />
      )}
      {!isLoading && initialValues && (
        <PageLayout gap={4}>
          <h1 className="font-semibold text-3xl">Edit Post</h1>
          <div className="mt-8 flex flex-col gap-8">
            <Formik
              initialValues={initialValues}
              validationSchema={postSchema}
              onSubmit={handleOpenModal}
            >
              {({ values, errors, touched }) => (
                <Form className="flex flex-col gap-8">
                  <FormObserver onChange={handleChangeForm} />
                  <TitleInput
                    isError={touched.title && errors.title}
                    error={errors.title}
                  />

                  <PreviewInput
                    isError={touched.preview && errors.preview}
                    error={errors.preview}
                  />
                  <DescriptionInput
                    isError={touched.description && errors.description}
                    error={errors.description}
                  />

                  <TagsInput
                    tagInput={tagInput}
                    onTagChange={handleTagChange}
                    onAddTag={handleAddTag}
                    tags={values.tags}
                    isError={errors.tags}
                    error={errors.tags}
                  />

                  <FieldArray name="content" className="flex flex-col gap-4">
                    {({ remove, push, swap }) => (
                      <>
                        {values.content.length > 0 && (
                          <div className="flex flex-col gap-8">
                            {values.content.map((content, index) => {
                              if (content.type === "subtitle") {
                                return (
                                  <SubtitleInput
                                    key={index}
                                    index={index}
                                    canMoveUp={checkItemMoveUp(index)}
                                    onMoveUp={() => moveItemUp(swap, index)}
                                    canMoveDown={checkItemMoveDown(
                                      index,
                                      values.content.length
                                    )}
                                    onMoveDown={() => moveItemDown(swap, index)}
                                    onDelete={() => deleteItem(remove, index)}
                                    isError={
                                      errors.content &&
                                      touched.content &&
                                      errors.content[index]?.text &&
                                      touched.content[index]?.text
                                    }
                                    error={errors.content?.[index]?.text}
                                  />
                                );
                              } else if (content.type === "text") {
                                return (
                                  <TextInput
                                    key={index}
                                    index={index}
                                    canMoveUp={checkItemMoveUp(index)}
                                    onMoveUp={() => moveItemUp(swap, index)}
                                    canMoveDown={checkItemMoveDown(
                                      index,
                                      values.content.length
                                    )}
                                    onMoveDown={() => moveItemDown(swap, index)}
                                    onDelete={() => deleteItem(remove, index)}
                                    isError={
                                      errors.content &&
                                      touched.content &&
                                      errors.content[index]?.text &&
                                      touched.content[index]?.text
                                    }
                                    error={errors.content?.[index]?.text}
                                  />
                                );
                              } else if (content.type === "image") {
                                return (
                                  <ImageInput
                                    key={index}
                                    index={index}
                                    canMoveUp={checkItemMoveUp(index)}
                                    onMoveUp={() => moveItemUp(swap, index)}
                                    canMoveDown={checkItemMoveDown(
                                      index,
                                      values.content.length
                                    )}
                                    onMoveDown={() => moveItemDown(swap, index)}
                                    onDelete={() => deleteItem(remove, index)}
                                    isError={
                                      errors.content &&
                                      touched.content &&
                                      errors.content[index]?.text &&
                                      touched.content[index]?.text
                                    }
                                    error={errors.content?.[index]?.text}
                                  />
                                );
                              } else if (content.type === "link") {
                                return (
                                  <LinkInput
                                    key={index}
                                    index={index}
                                    canMoveUp={checkItemMoveUp(index)}
                                    onMoveUp={() => moveItemUp(swap, index)}
                                    canMoveDown={checkItemMoveDown(
                                      index,
                                      values.content.length
                                    )}
                                    onMoveDown={() => moveItemDown(swap, index)}
                                    onDelete={() => deleteItem(remove, index)}
                                    isError={
                                      errors.content &&
                                      touched.content &&
                                      errors.content[index]?.text &&
                                      touched.content[index]?.text
                                    }
                                    error={errors.content?.[index]?.text}
                                  />
                                );
                              }

                              return "";
                            })}
                          </div>
                        )}

                        <div className="px-2 py-4 flex justify-between items-center gap-4 sm:gap-0 flex-wrap bg-neutral-300 rounded-sm">
                          <div className="flex items-center flex-wrap gap-5">
                            <p className="text-base">Choose element</p>
                            <select
                              value={newInputType}
                              onChange={handleNewInputType}
                              className="px-2 rounded-sm"
                            >
                              <option value="subtitle">Subtitle</option>
                              <option value="text">Text</option>
                              <option value="image">Image</option>
                              <option value="link">Link</option>
                            </select>
                            <DefaultButton onClick={() => handleAddInput(push)}>
                              Add
                            </DefaultButton>
                          </div>
                          <CreateButton type="submit" disabled={isLoading}>
                            Update Post
                          </CreateButton>
                        </div>
                        {errMsg && <ErrorText>{errMsg}</ErrorText>}
                      </>
                    )}
                  </FieldArray>
                </Form>
              )}
            </Formik>
            {formValues &&
              (formValues?.title ||
                formValues?.tags.length > 0 ||
                formValues?.preview ||
                formValues?.description) && (
                <div className="flex flex-col gap-10">
                  {formValues?.title && (
                    <h2 className="font-semibold text-3xl">
                      {formValues.title}
                    </h2>
                  )}
                  {formValues.tags.length > 0 && (
                    <Tags tags={formValues.tags} />
                  )}

                  {(formValues.preview || formValues.description) && (
                    <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-5">
                      {formValues.preview && (
                        <img
                          src={formValues.preview}
                          alt="preview"
                          className="w-full h-80 sm:w-[500px] sm:h-[300px] object-cover"
                        />
                      )}

                      {formValues.description && (
                        <p className="text-base font-medium">
                          {formValues.description}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}

            {formValues?.content.length > 0 && (
              <ToContent content={formValues.content} />
            )}
          </div>
        </PageLayout>
      )}
    </>
  );
};

export default PostEdit;
