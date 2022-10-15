import * as Yup from "yup";

export default Yup.object().shape({
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
