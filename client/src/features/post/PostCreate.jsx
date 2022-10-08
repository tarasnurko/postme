import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import ToContent from "./ToContent";
import { useCreatePostMutation } from "./postsApiSlice";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, FieldArray } from "formik";
import * as Yup from "yup";
import {
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import FormObserver from "../../components/utils/FormObserver";

const initialValues = {
  title: "",
  preview: "",
  description: "",
  tags: [],
  content: [],
};

const PostSchema = Yup.object().shape({
  title: Yup.string()
    .min(8, "Title must have at least 8 characters!")
    .max(80, "Title can't have more then 80 characters!")
    .required("Title is required field"),
  preview: Yup.string().required("Post must have a preview (url)"),
  description: Yup.string()
    .min(20, "Description must have at least 20 characters!")
    .max(300, "Description can't have more then 300 characters")
    .required("Description is required field"),
  tags: Yup.array().max(5, "You can't add more then 5 tags!"),

  content: Yup.array().of(
    Yup.object().shape({
      type: Yup.string().required("Type is required!"),
      text: Yup.string()
        .when("type", {
          is: "subtitle",
          then: Yup.string()
            .min(8, "Subtitle must have at least 8 characters!")
            .max(80, "Subtitle can't have more then 80 characters!")
            .required("Subtitle is required field"),
        })
        .when("type", {
          is: "text",
          then: Yup.string()
            .min(10, "Text must have at least 10 characters!")
            .max(2000, "Text can't have more then 2000 characters")
            .required("Text is required field"),
        })
        .when("type", {
          is: "image",
          then: Yup.string().required("Image must have a url!"),
        })
        .when("type", {
          is: "link",
          then: Yup.string().required("Link is required!"),
        }),
    })
  ),
});

const PostCreate = () => {
  const [newInputType, setNewInputType] = useState("subtitle");
  const [tagInput, setTagInput] = useState("");
  const [formValues, setFormValues] = useState(initialValues);
  const [errMsg, setErrMsg] = useState("");

  const [createPost, { isLoading }] = useCreatePostMutation();
  const navigate = useNavigate();

  const handleChangeForm = (values) => {
    setFormValues(() => values);
  };

  const handleSubmit = async (values) => {
    try {
      await createPost(values);
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

  return (
    <>
      <section className="container mx-auto px-20">
        <div className="w-[800px] flex flex-col my-10 gap-4">
          <h1 className="font-semibold text-3xl">Create Post</h1>
          <div className="mt-8 flex flex-col gap-8">
            <Formik
              initialValues={initialValues}
              validationSchema={PostSchema}
              onSubmit={handleSubmit}
            >
              {({ values, errors, touched }) => (
                <Form className="flex flex-col gap-8">
                  <FormObserver onChange={handleChangeForm} />
                  <div className="relative min-h-[85px] flex flex-col gap-2">
                    <label
                      htmlFor="title"
                      className="absolute ml-2 top-[-20px] left-0 text-xs text-gray-500"
                    >
                      Title
                    </label>
                    <Field
                      className="w-full px-2 py-2 border-2 border-gray-600 rounded-md text-lg outline-none"
                      id="title"
                      name="title"
                      placeholder="Title"
                      maxLength={80}
                    />
                    {touched.title && errors.title && (
                      <p className="ml-2 mt-2 text-sm text-red-400">
                        {errors.title}
                      </p>
                    )}
                  </div>
                  <div className="relative min-h-[85px] flex flex-col gap-2">
                    <label
                      htmlFor="preview"
                      className="absolute ml-2 top-[-20px] left-0 text-xs text-gray-500"
                    >
                      Preview
                    </label>
                    <Field
                      className="w-full px-2 py-2 border-2 border-gray-600 rounded-md text-lg outline-none"
                      id="preview"
                      name="preview"
                      placeholder="Preview url"
                      maxLength={500}
                    />
                    {touched.preview && errors.preview && (
                      <p className="ml-2 mt-2 text-sm text-red-400">
                        {errors.preview}
                      </p>
                    )}
                  </div>
                  <div className="relative min-h-[170px] flex flex-col gap-2">
                    <label
                      htmlFor="description"
                      className="absolute ml-2 top-[-20px] left-0 text-xs text-gray-500"
                    >
                      Description
                    </label>
                    <Field
                      className="w-full px-2 py-2 border-2 border-gray-600 rounded-md text-lg outline-none resize-vertical"
                      id="description"
                      name="description"
                      placeholder="Description"
                      as="textarea"
                      rows={4}
                      maxLength={300}
                    />
                    {touched.description && errors.description && (
                      <p className="ml-2 mt-2 text-sm text-red-400">
                        {errors.description}
                      </p>
                    )}
                  </div>
                  <FieldArray name="tags" className="flex flex-col gap-4">
                    {({ remove, push }) => (
                      <div className="relative min-h-[120px] flex flex-col gap-2">
                        <label
                          htmlFor="description"
                          className="absolute ml-2 top-[-20px] left-0 text-xs text-gray-500"
                        >
                          Tag
                        </label>
                        <input
                          className="w-full px-2 py-2 border-2 border-gray-600 rounded-md text-lg outline-none resize-vertical"
                          name="tag"
                          placeholder="Tag"
                          maxLength={15}
                          type="text"
                          value={tagInput}
                          onChange={handleTagChange}
                        />
                        <button
                          type="button"
                          className="absolute top-2 right-4 px-4 py-1 bg-sky-500 rounded-lg"
                          onClick={() => handleAddTag(push)}
                        >
                          Add
                        </button>
                        <div className="flex gap-4 flex-wrap">
                          {values.tags.length > 0 &&
                            values.tags.map((tag, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-2 px-4 py-1 bg-gray-300 rounded-xl font-medium text-sm"
                                onClick={() => remove(index)}
                              >
                                <p>{tag}</p>
                                <XMarkIcon className="w-5 h-5" />
                              </div>
                            ))}
                        </div>
                        {touched.tags && errors.tags && (
                          <p className="ml-2 mt-2 text-sm text-red-400">
                            {errors.tags}
                          </p>
                        )}
                      </div>
                    )}
                  </FieldArray>
                  <FieldArray name="content" className="flex flex-col gap-4">
                    {({ remove, push, swap }) => (
                      <>
                        <div className="flex flex-col gap-8">
                          {values.content.length > 0 &&
                            values.content.map((content, index) => {
                              if (content.type === "subtitle") {
                                return (
                                  <div
                                    key={index}
                                    className="relative min-h-[85px] flex flex-col gap-2"
                                  >
                                    <label
                                      htmlFor={`content[${index}].text`}
                                      className="absolute ml-2 top-[-20px] left-0 text-xs text-gray-500"
                                    >
                                      Subtitle
                                    </label>
                                    <div className="absolute top-[-24px] right-2 h-5 flex items-center gap-4">
                                      <div className="flex gap-2">
                                        {checkItemMoveUp(index) && (
                                          <ChevronDoubleUpIcon
                                            className="w-5 h-5 cursor-pointer"
                                            onClick={() =>
                                              moveItemUp(swap, index)
                                            }
                                          />
                                        )}
                                        {checkItemMoveDown(
                                          index,
                                          values.content.length
                                        ) && (
                                          <ChevronDoubleDownIcon
                                            className="w-5 h-5 cursor-pointer"
                                            onClick={() =>
                                              moveItemDown(swap, index)
                                            }
                                          />
                                        )}
                                        <XMarkIcon
                                          className="w-5 h-5 cursor-pointer"
                                          onClick={() =>
                                            deleteItem(remove, index)
                                          }
                                        />
                                      </div>
                                    </div>
                                    <Field
                                      className="w-full px-2 py-2 border-2 border-gray-600 rounded-md text-lg outline-none"
                                      name={`content[${index}].text`}
                                      placeholder="Subtitle"
                                      maxLength={70}
                                    />

                                    {errors.content &&
                                      touched.content &&
                                      errors.content[index]?.text &&
                                      touched.content[index]?.text && (
                                        <p className="ml-2 mt-2 text-sm text-red-400">
                                          {errors.content[index].text}
                                        </p>
                                      )}
                                  </div>
                                );
                              } else if (content.type === "text") {
                                return (
                                  <div
                                    key={index}
                                    className="relative min-h-[170px] flex flex-col gap-2"
                                  >
                                    <label
                                      htmlFor={`content[${index}].text`}
                                      className="absolute ml-2 top-[-20px] left-0 text-xs text-gray-500"
                                    >
                                      Text
                                    </label>
                                    <div className="absolute top-[-24px] right-2 h-5 flex items-center gap-4">
                                      <div className="flex gap-2">
                                        {checkItemMoveUp(index) && (
                                          <ChevronDoubleUpIcon
                                            className="w-5 h-5 cursor-pointer"
                                            onClick={() =>
                                              moveItemUp(swap, index)
                                            }
                                          />
                                        )}
                                        {checkItemMoveDown(
                                          index,
                                          values.content.length
                                        ) && (
                                          <ChevronDoubleDownIcon
                                            className="w-5 h-5 cursor-pointer"
                                            onClick={() =>
                                              moveItemDown(swap, index)
                                            }
                                          />
                                        )}
                                        <XMarkIcon
                                          className="w-5 h-5 cursor-pointer"
                                          onClick={() =>
                                            deleteItem(remove, index)
                                          }
                                        />
                                      </div>
                                    </div>
                                    <Field
                                      className="w-full px-2 py-2 border-2 border-gray-600 rounded-md text-lg outline-none resize-vertical"
                                      name={`content[${index}].text`}
                                      placeholder="Text"
                                      as="textarea"
                                      rows={4}
                                      maxLength={2000}
                                    />
                                    {errors.content &&
                                      touched.content &&
                                      errors.content[index]?.text &&
                                      touched.content[index]?.text && (
                                        <p className="ml-2 mt-2 text-sm text-red-400">
                                          {errors.content[index].text}
                                        </p>
                                      )}
                                  </div>
                                );
                              } else if (content.type === "image") {
                                return (
                                  <div
                                    key={index}
                                    className="relative min-h-[140px] flex flex-col gap-2"
                                  >
                                    <label
                                      htmlFor={`content[${index}].text`}
                                      className="absolute ml-2 top-[-20px] left-0 text-xs text-gray-500"
                                    >
                                      Image
                                    </label>
                                    <div className="absolute top-[-24px] right-2 h-5 flex items-center gap-4">
                                      <div className="flex gap-2">
                                        {checkItemMoveUp(index) && (
                                          <ChevronDoubleUpIcon
                                            className="w-5 h-5 cursor-pointer"
                                            onClick={() =>
                                              moveItemUp(swap, index)
                                            }
                                          />
                                        )}
                                        {checkItemMoveDown(
                                          index,
                                          values.content.length
                                        ) && (
                                          <ChevronDoubleDownIcon
                                            className="w-5 h-5 cursor-pointer"
                                            onClick={() =>
                                              moveItemDown(swap, index)
                                            }
                                          />
                                        )}
                                        <XMarkIcon
                                          className="w-5 h-5 cursor-pointer"
                                          onClick={() =>
                                            deleteItem(remove, index)
                                          }
                                        />
                                      </div>
                                    </div>
                                    <Field
                                      className="w-full px-2 py-2 border-2 border-gray-600 rounded-md text-lg outline-none"
                                      name={`content[${index}].text`}
                                      placeholder="Image url"
                                      maxLength={500}
                                    />
                                    <Field
                                      className="w-[400px] px-2 py-2 border-2 border-gray-600 rounded-md text-lg outline-none"
                                      name={`content[${index}].sub`}
                                      placeholder="Image text"
                                      maxLength={50}
                                    />
                                    {errors.content &&
                                      touched.content &&
                                      errors.content[index]?.text &&
                                      touched.content[index]?.text && (
                                        <p className="ml-2 mt-2 text-sm text-red-400">
                                          {errors.content[index].text}
                                        </p>
                                      )}
                                  </div>
                                );
                              } else if (content.type === "link") {
                                return (
                                  <div
                                    key={index}
                                    className="relative min-h-[140px] flex flex-col gap-2"
                                  >
                                    <label
                                      htmlFor={`content[${index}].text`}
                                      className="absolute ml-2 top-[-20px] left-0 text-xs text-gray-500"
                                    >
                                      Link
                                    </label>
                                    <div className="absolute top-[-24px] right-2 h-5 flex items-center gap-4">
                                      <div className="flex gap-2">
                                        {checkItemMoveUp(index) && (
                                          <ChevronDoubleUpIcon
                                            className="w-5 h-5 cursor-pointer"
                                            onClick={() =>
                                              moveItemUp(swap, index)
                                            }
                                          />
                                        )}
                                        {checkItemMoveDown(
                                          index,
                                          values.content.length
                                        ) && (
                                          <ChevronDoubleDownIcon
                                            className="w-5 h-5 cursor-pointer"
                                            onClick={() =>
                                              moveItemDown(swap, index)
                                            }
                                          />
                                        )}
                                        <XMarkIcon
                                          className="w-5 h-5 cursor-pointer"
                                          onClick={() =>
                                            deleteItem(remove, index)
                                          }
                                        />
                                      </div>
                                    </div>
                                    <Field
                                      className="w-full px-2 py-2 border-2 border-gray-600 rounded-md text-lg outline-none"
                                      name={`content[${index}].text`}
                                      placeholder="Link"
                                      maxLength={500}
                                    />
                                    <Field
                                      className="w-[400px] px-2 py-2 border-2 border-gray-600 rounded-md text-lg outline-none"
                                      name={`content[${index}].sub`}
                                      placeholder="Link text"
                                      maxLength={50}
                                    />
                                    {errors.content &&
                                      touched.content &&
                                      errors.content[index]?.text &&
                                      touched.content[index]?.text && (
                                        <p className="ml-2 mt-2 text-sm text-red-400">
                                          {errors.content[index].text}
                                        </p>
                                      )}
                                  </div>
                                );
                              }

                              return "";
                            })}
                        </div>

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
                            <button
                              type="button"
                              onClick={() => handleAddInput(push)}
                              className="px-3 text-base font-medium bg-lime-600 rounded-sm"
                            >
                              Add
                            </button>
                          </div>
                          <button
                            type="submit"
                            className="mr-6 px-3 text-base font-medium bg-orange-500 rounded-sm"
                            disabled={isLoading}
                          >
                            Create Post
                          </button>
                        </div>
                        {errMsg && (
                          <p className="ml-2 mt-2 text-lg text-red-400">
                            {errMsg}
                          </p>
                        )}
                      </>
                    )}
                  </FieldArray>
                </Form>
              )}
            </Formik>
            <div className="flex flex-col gap-10">
              {formValues.title && (
                <h2 className="font-semibold text-3xl">{formValues.title}</h2>
              )}
              {formValues.tags.length > 0 && (
                <div className="flex items-center gap-4">
                  {formValues.tags.map((tag, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-4 py-1 bg-gray-300 rounded-xl font-medium text-sm"
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              )}

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
            <ToContent content={formValues.content} />
          </div>
        </div>
      </section>
      <Sidebar />
    </>
  );
};

export default PostCreate;
