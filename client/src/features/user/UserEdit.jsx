import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DefaultButton from "../../components/common/buttons/colors/DefaultButton";
import ErrorText from "../../components/common/text/ErrorText";
import Modal from "../../components/modal/Modal";
import Spinner from "../../components/Spinner";
import FormObserver from "../../components/utils/FormObserver";

import userEditSchema from "../../utils/userEditSchema";
import { useGetUserQuery, useUpdateMeMutation } from "./userApiSlice";

const UserEdit = () => {
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState(null);
  const { data: user, isLoading } = useGetUserQuery(id);
  const [formValues, setFormValues] = useState(null);
  const [errMsg, setErrMsg] = useState("");
  const [updateMe] = useUpdateMeMutation();

  useEffect(() => {
    if (!isLoading && user && !initialValues) {
      setInitialValues({
        username: user.username || "",
        photo: user.photo || "",
      });
    }
  }, [initialValues, isLoading, user]);

  const handleChangeForm = (values) => {
    setFormValues(values);
  };

  const handleSubmit = async () => {
    try {
      await updateMe({ data: formValues, id });
      navigate("../");
    } catch (err) {
      setErrMsg(err);
    }
  };

  const handleOpenModal = () => setModal(true);
  const handleCloseModal = () => setModal(false);

  return (
    <>
      {modal && (
        <Modal
          type="update-user"
          onClose={handleCloseModal}
          onConfirm={handleSubmit}
        />
      )}
      {isLoading && <Spinner />}
      {!isLoading && initialValues && (
        <Formik
          initialValues={initialValues}
          validationSchema={userEditSchema}
          onSubmit={handleOpenModal}
        >
          {({ values, errors, touched }) => (
            <Form className="mt-10 flex flex-col gap-6">
              <FormObserver onChange={handleChangeForm} />
              <div className="relative flex flex-col gap-1">
                <label
                  htmlFor="username"
                  className="absolute ml-2 top-[-20px] left-0 text-xs text-gray-500"
                >
                  Username
                </label>
                <Field
                  className="w-full px-2 py-2 border-2 border-gray-600 rounded-md text-lg outline-none"
                  id="username"
                  name="username"
                  placeholder="Username"
                  maxLength={20}
                />
                {touched.username && errors.username && (
                  <ErrorText>{errors.username}</ErrorText>
                )}
              </div>
              <div className="relative flex flex-col gap-1">
                <label
                  htmlFor="photo"
                  className="absolute ml-2 top-[-20px] left-0 text-xs text-gray-500"
                >
                  Photo
                </label>
                <Field
                  className="w-full px-2 py-2 border-2 border-gray-600 rounded-md text-lg outline-none"
                  id="photo"
                  name="photo"
                  placeholder="Photo"
                  maxLength={200}
                />
                {touched.photo && errors.photo && (
                  <ErrorText>{errors.photo}</ErrorText>
                )}
              </div>
              <DefaultButton type="submit">Update Me</DefaultButton>
              {errMsg && <ErrorText>{errMsg}</ErrorText>}
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default UserEdit;
