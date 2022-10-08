import React, { useEffect } from "react";
import { useFormikContext } from "formik";

const FormObserver = (props) => {
  const { values } = useFormikContext();

  useEffect(() => {
    props.onChange(values);
  }, [props, values]);

  return null;
};

export default FormObserver;
