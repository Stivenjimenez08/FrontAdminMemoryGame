
import axios from "axios";
import * as Yup from "yup";
import { Layout } from "../Layout";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "../../../style.css";
import Swal from "sweetalert2";
import { Formik } from "formik";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";

export const RecoveryPassword = () => {

  const navigate = useNavigate();
  const {id} = useParams()

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [showPassword, setShowPassword] = useState(false);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleComplete = () => {
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <Layout title="Change Your Password">
      <div>
        <Formik
          enableReinitialize
          initialValues={{
            id,
            password: "",
          }}
          validationSchema={Yup.object({
            password: Yup.string()
              .required("Este campo es obligatorio")
              .min(8, "Complete 8 caracteres en el campo contraseña"),
          })}
          onSubmit={async (values) => {
            const response = await axios.put(
              `${import.meta.env.VITE_URL_SERVER}api/user/updatePassword`,
              values
            );

            Swal.fire({
              tittle: "Info",
              text: response.data.msg,
              icon: "success",
            });
          }}
        >
          {({ values, errors, handleChange, handleSubmit }) => (
            <div>
              <form onSubmit={handleSubmit} >
                <div className="contentTexfield">
                  <TextField
                    id="password"
                    name="password"
                    label="Password"
                    variant="standard"
                    onChange={handleChange}
                    value={values.password}
                    error={errors.password}
                    helperText={errors.password}
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>

                <div className="updateBtn">
                  <Button
                    type="submit"
                    id="btnProfileEdit"
                    onClick={handleComplete}
                  >
                    Update Password
                  </Button>
                </div>
              </form>
            </div>
          )}
        </Formik>
      </div>
    </Layout>
  );
};
