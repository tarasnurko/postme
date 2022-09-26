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
      type: "subtitle",
      content: "Deez Nuts",
      id: Math.random().toString(),
    },
    {
      type: "text",
      content:
        "lorem lorem lorem loremloremloremlorem lorem lorem loremlorem loremloremv lorem lorem lorem v lorem lorem lorem",
      id: Math.random().toString(),
    },
  ]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [preview, setPreview] = useState("");
  const [newInputType, setNewInputType] = useState("text");

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
    console.log(id, val);
    setInputs((prevValue) => {
      return prevValue.map((item) => {
        if (item.id === id) return { ...item, ...val };
        return item;
      });
    });
  };

  return (
    <>
      <section className="container mx-auto px-20">
        <div className="w-[800px] flex flex-col mt-10 gap-4">
          <h1 className="font-semibold text-3xl">Create Post</h1>
          <div className="mt-8 flex flex-col gap-8">
            <InputTitle
              initialValue={title}
              onChange={(value) => setTitle(value)}
            />
            <InputDescription
              initialValue={title}
              onChange={(value) => setDescription(value)}
            />
            <InputPreview
              initialValue={title}
              onChange={(value) => setPreview(value)}
            />

            {inputs?.map((input) => {
              if (input?.type === "subtitle") {
                return (
                  <InputSubtitle
                    key={input?.id}
                    id={input?.id}
                    initialValue={input?.content}
                    onChange={handleChange}
                  />
                );
              }
              // } else if (input?.type === "text") {
              //   return (
              //     <InputText key={input?.id} initialValue={input?.content} />
              //   );
              // }

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
