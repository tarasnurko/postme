import React, { useState } from "react";
import InputDescription from "../../components/inputs/InputDescription";
import InputTitle from "../../components/inputs/InputTitle";
import Sidebar from "../../components/Sidebar";
import InputPreview from "../../components/inputs/InputPreview";
import InputSubtitle from "../../components/inputs/InputSubtitle";
import InputText from "../../components/inputs/InputText";
import InputImage from "../../components/inputs/InputImage";
import InputLink from "../../components/inputs/InputLink";

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
      type: "preview",
      content: "",
      id: Math.random().toString(),
    },
  ]);

  console.log(inputs);

  const [newInputType, setNewInputType] = useState("subtitle");

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
    let newValue = val;
    delete newValue.id;

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

      console.log(index, element);

      if (index < prevValue.length - 1 && direction === 1) {
        newArray.splice(index, 1);
        newArray.splice(index + 1, 0, element);
      } else if (index > 3 && direction === -1) {
        newArray.splice(index, 1);
        newArray.splice(index - 1, 0, element);
      }

      return newArray;
    });
  };

  const handleDelete = (id) => {
    setInputs((prevValue) => prevValue.filter((item) => item.id !== id));
  };

  return (
    <>
      <section className="container mx-auto px-20">
        <div className="w-[800px] flex flex-col mt-10 gap-4">
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

            <div className="px-2 py-4 flex items-center gap-5 bg-neutral-300 rounded-sm">
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
          </div>

          <div></div>
        </div>
      </section>
      <Sidebar />
    </>
  );
};

export default PostCreate;

{
  /* <InputSubtitle />
<InputText />
<InputImage />
<InputLink /> */
}
