import axios from "axios";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button, TextField } from "@mui/material";
import { Formik } from "formik";
import Swal from "sweetalert2";
import "../../../../style.css";

export const EditProfile = () => {
  const user = useSelector((state) => state.auth.user);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_URL_SERVER}user/userById/${user?.id}`
      );
      setData(response.data.users);
    };
    fetchData();
  }, [user]);

  const handleComplete = () => {
    setTimeout(() => {
      navigate("/UserPage");
    }, 1500);
  };
  const handleBack = () => {
    setTimeout(() => {
      navigate("/UserPage");
    }, 100);
  };

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          id: user?.id,
          email: data?.email || "",
          userName: data?.userName || "",
        }}
        validationSchema={Yup.object({
          userName: Yup.string()
            .required("Este campo es obligatorio")
            .min(4, "El Username debe contener al menos 4 caracteres"),
          email: Yup.string()
            .required("Este campo es obligatorio")
            .email("Direccion de correo no valida"),
        })}
        onSubmit={async (values) => {
          const response = await axios.put(
            `${import.meta.env.VITE_URL_SERVER}user/updateUser`,
            values
          );
          Swal.fire({
            title: "Info",
            text: response.data.msg,
            icon: "success",
          });
        }}
      >
        {({ values, errors, handleChange, handleSubmit }) => (
          <div className="formProfile">
            <div className="backBtn">
              <Button
                onClick={handleBack}
                startIcon={<ArrowBackIcon />}
                id="btnProfile"
              >
                Regresar
              </Button>
              <h2>Actualizar informacion</h2>
            </div>

            <form onSubmit={handleSubmit} id="form">
              <div className="contentTexfield">
                <TextField
                  id="email"
                  name="email"
                  label="Correo Electronico"
                  variant="standard"
                  value={values.email}
                  onChange={handleChange}
                  error={errors.email}
                  helperText={errors.email}
                />
                <TextField
                  id="userName"
                  name="userName"
                  label="Nombre de usuario"
                  variant="standard"
                  value={values.userName}
                  onChange={handleChange}
                  error={errors.userName}
                  helperText={errors.userName}
                />
              </div>

              <div className="updateBtn">
                <Button
                  type="submit"
                  id="btnProfileEdit"
                  onClick={handleComplete}
                >
                  Actualizar informacion
                </Button>
              </div>
            </form>
          </div>
        )}
      </Formik>
    </>
  );
};
