import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import ToContent from "./ToContent";
import { useCreatePostMutation } from "./postsApiSlice";
import { useNavigate } from "react-router-dom";
import { Formik, Form, FieldArray } from "formik";
import postSchema from "../../utils/postSchema";

import FormObserver from "../../components/utils/FormObserver";
import Tags from "../../components/post/Tags";
import Modal from "../../components/modal/Modal";

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

import CreateButton from "../../components/common/buttons/CreateButton";
import DefaultButton from "../../components/common/buttons/colors/DefaultButton";
import ErrorText from "../../components/common/text/ErrorText";
import PageLayout from "../../components/PageLayout";

const initialValues = {
  title: "",
  preview: "",
  description: "",
  tags: [],
  content: [],
};

const PostCreate = () => {
  const [newInputType, setNewInputType] = useState("subtitle");
  const [tagInput, setTagInput] = useState("");
  const [formValues, setFormValues] = useState(initialValues);
  const [errMsg, setErrMsg] = useState("");
  const [modal, setModal] = useState(false);

  const [createPost, { isLoading }] = useCreatePostMutation();
  const navigate = useNavigate();

  const handleChangeForm = (values) => {
    setFormValues(() => values);
  };

  const handleSubmit = async () => {
    try {
      await createPost(formValues);
      navigate("/");
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
          type="create"
          onClose={handleCloseModal}
          onConfirm={handleSubmit}
        />
      )}
      <PageLayout sidebar={<Sidebar />} gap={4}>
        <h1 className="font-semibold text-3xl">Create Post</h1>
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

                      <div className="px-2 py-4 flex justify-between items-center bg-neutral-300 rounded-sm">
                        <div className="flex items-center gap-5">
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
                        <CreateButton type="submit" disabled={isLoading} />
                      </div>
                      {errMsg && <ErrorText>{errMsg}</ErrorText>}
                    </>
                  )}
                </FieldArray>
              </Form>
            )}
          </Formik>
          {(formValues.title ||
            formValues.tags.length > 0 ||
            formValues.preview ||
            formValues.description) && (
            <div className="flex flex-col gap-10">
              {formValues.title && (
                <h2 className="font-semibold text-3xl">{formValues.title}</h2>
              )}
              {formValues.tags.length > 0 && <Tags tags={formValues.tags} />}

              {(formValues.preview || formValues.description) && (
                <div className="flex justify-between items-center gap-5">
                  {formValues.preview && (
                    <img
                      src={formValues.preview}
                      alt="preview"
                      className="w-[500px] h-[300px] object-cover flex-shrink-0"
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

          {formValues.content.length > 0 && (
            <ToContent content={formValues.content} />
          )}
        </div>
      </PageLayout>
    </>
  );
};

export default PostCreate;
