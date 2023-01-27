import * as Yup from "yup";

export default Yup.object().shape({
  text: Yup.string()
    .min(10, "Comment must have at least 10 characters")
    .max(200, "Max size is 200 characters")
    .required("You can not upload empty comment"),
});
