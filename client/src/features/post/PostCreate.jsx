import React, { useState } from "react";
import InputDescription from "../../components/inputs/InputDescription";
import InputTitle from "../../components/inputs/InputTitle";
import Sidebar from "../../components/Sidebar";
import InputPreview from "../../components/inputs/InputPreview";
import InputSubtitle from "../../components/inputs/InputSubtitle";
import InputText from "../../components/inputs/InputText";
import InputImage from "../../components/inputs/InputImage";
import InputLink from "../../components/inputs/InputLink";
import ToContent from "./ToContent";
import { useCreatePostMutation } from "./postsApiSlice";
import InputTags from "../../components/inputs/InputTags";
import { useNavigate } from "react-router-dom";

const PostCreate = () => {
  const [inputs, setInputs] = useState([
    {
      type: "title",
      content: "",
      id: Math.random().toString(),
    },
    {
      type: "description",
      content: "",
      id: Math.random().toString(),
    },
    {
      type: "tags",
      content: "",
      id: Math.random().toString(),
    },
    {
      type: "preview",
      content: "",
      id: Math.random().toString(),
    },
  ]);
  const [newInputType, setNewInputType] = useState("subtitle");
  const [errMsg, setErrMsg] = useState("");

  const [createPost, { isLoading }] = useCreatePostMutation();
  const navigate = useNavigate();

  const handleInputType = (e) => {
    setNewInputType(e.target.value);
  };

  const addInput = () => {
    setInputs((prevValue) => [
      ...prevValue,
      { type: newInputType, content: "", id: Math.random().toString() },
    ]);
  };

  const handleChange = (id, val) => {
    setInputs((prevValue) => {
      return prevValue.map((item) => {
        if (item.id === id) return { ...item, ...val };
        return item;
      });
    });
  };

  const handleMove = (id, direction) => {
    setInputs((prevValue) => {
      let newArray = [...prevValue];

      const index = prevValue.findIndex((item) => item.id === id);
      const element = prevValue[index];

      if (index < prevValue.length - 1 && direction === 1) {
        newArray.splice(index, 1);
        newArray.splice(index + 1, 0, element);
      } else if (index > 4 && direction === -1) {
        newArray.splice(index, 1);
        newArray.splice(index - 1, 0, element);
      }

      return newArray;
    });
  };

  const handleDelete = (id) => {
    setInputs((prevValue) => prevValue.filter((item) => item.id !== id));
  };

  const canUpload = () => {
    let isFilled = true;

    inputs.forEach((item) => {
      if (!item.content || item.err) {
        isFilled = false;
      }
    });

    return isFilled;
  };

  const transformContent = () => {
    const content = [];

    inputs.forEach((item, index) => {
      if (index > 3) {
        content.push(item);
      }
    });

    return content;
  };

  const handleButton = async () => {
    let data = {
      title: "",
      description: "",
      preview: "",
      tags: [],
      content: [],
    };

    inputs.forEach((item, index) => {
      if (
        item.type === "title" ||
        item.type === "description" ||
        item.type === "preview"
      ) {
        data[item.type] = item.content;
      } else if (item.type === "tags") {
        let tags = item.content.split(",").map((tag) => tag.trim());
        data.tags = tags;
      } else if (item?.sub) {
        data.content.push({
          type: item.type,
          content: item.content,
          sub: item.sub,
        });
      } else {
        data.content.push({ type: item.type, content: item.content });
      }
    });

    try {
      await createPost(data);
      navigate("/");
    } catch (err) {
      setErrMsg(err);
    }
  };

  return (
    <>
      <section className="container mx-auto px-20">
        <div className="w-[800px] flex flex-col my-10 gap-4">
          <h1 className="font-semibold text-3xl">Create Post</h1>
          <div className="mt-8 flex flex-col gap-8">
            {inputs?.map((input) => {
              if (input?.type === "title") {
                return (
                  <InputTitle
                    key={input?.id}
                    value={input}
                    handleChange={handleChange}
                  />
                );
              } else if (input?.type === "description") {
                return (
                  <InputDescription
                    key={input?.id}
                    value={input}
                    handleChange={handleChange}
                  />
                );
              } else if (input?.type === "preview") {
                return (
                  <InputPreview
                    key={input?.id}
                    value={input}
                    handleChange={handleChange}
                  />
                );
              } else if (input?.type === "tags") {
                return (
                  <InputTags
                    key={input?.id}
                    value={input}
                    handleChange={handleChange}
                  />
                );
              } else if (input?.type === "subtitle") {
                return (
                  <InputSubtitle
                    key={input?.id}
                    value={input}
                    handleChange={handleChange}
                    handleMove={handleMove}
                    handleDelete={handleDelete}
                  />
                );
              } else if (input?.type === "text") {
                return (
                  <InputText
                    key={input?.id}
                    value={input}
                    handleChange={handleChange}
                    handleMove={handleMove}
                    handleDelete={handleDelete}
                  />
                );
              } else if (input?.type === "image") {
                return (
                  <InputImage
                    key={input?.id}
                    value={input}
                    handleChange={handleChange}
                    handleMove={handleMove}
                    handleDelete={handleDelete}
                  />
                );
              } else if (input?.type === "link") {
                return (
                  <InputLink
                    key={input?.id}
                    value={input}
                    handleChange={handleChange}
                    handleMove={handleMove}
                    handleDelete={handleDelete}
                  />
                );
              }
              return "";
            })}

            <div>
              <div className="px-2 py-4 flex justify-between items-center bg-neutral-300 rounded-sm">
                <div className="flex items-center gap-5">
                  <p className="text-base">Choose element</p>
                  <select
                    value={newInputType}
                    onChange={handleInputType}
                    className="px-2 rounded-sm"
                  >
                    <option value="subtitle">Subtitle</option>
                    <option value="text">Text</option>
                    <option value="image">Image</option>
                    <option value="link">Link</option>
                  </select>
                  <button
                    onClick={addInput}
                    className="px-3 text-base font-medium bg-lime-600 rounded-sm"
                  >
                    Add
                  </button>
                </div>
                <button
                  onClick={handleButton}
                  disabled={!canUpload()}
                  className="mr-6 px-3 text-base font-medium bg-orange-500 rounded-sm"
                >
                  Create Post
                </button>
              </div>
              {!canUpload() && (
                <p className="mt-2 text-base text-red-400">
                  Fill all required fields to upload post
                </p>
              )}
              {errMsg && (
                <p className="mt-2 text-base text-red-400">
                  Error while posting: {errMsg}
                </p>
              )}
              {isLoading && (
                <p className="mt-2 text-base text-green-500">Loading...</p>
              )}
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-10">
            <h2 className="font-semibold text-3xl">{inputs[0]?.content}</h2>
            {inputs[2]?.content && (
              <div className="flex gap-5">
                {inputs[2]?.content?.split(",").map((tag, index) => (
                  <div
                    key={index}
                    className="px-4 py-1 bg-gray-300 rounded-xl font-medium text-sm"
                  >
                    {tag.trim()}
                  </div>
                ))}
              </div>
            )}
            <div className="flex items-center gap-5">
              <img
                src={inputs[3]?.content}
                alt="preview"
                className="w-[500px] h-[300px] object-cover"
              />

              <p className="text-base font-medium">{inputs[1]?.content}</p>
            </div>
            <ToContent content={transformContent()} />
          </div>
        </div>
      </section>
      <Sidebar />
    </>
  );
};

export default PostCreate;
