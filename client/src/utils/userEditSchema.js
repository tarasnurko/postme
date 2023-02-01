import * as Yup from "yup";

export default Yup.object().shape({
  username: Yup.string()
    .min(1, "Comment must have at least 10 characters")
    .max(20, "Max size is 20 characters")
    .required("Username can not be empty"),

  photo: Yup.string().url("Provide photo url"),
});
