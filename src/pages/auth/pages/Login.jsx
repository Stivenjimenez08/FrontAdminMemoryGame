import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchLogin } from "../../../index";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import * as Yup from "yup";
import { Formik } from "formik";
import { Layout } from "../Layout";
import EmailIcon from "@mui/icons-material/Email";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, Grid, IconButton, InputAdornment, Link, TextField, } from "@mui/material";
import "../../../style.css";

export const Login = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => { event.preventDefault() };

  return (
    <Layout title="Inicie Sesion" id="layout">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          email: Yup.string()
            .required("Este campo es obligatorio")
            .email("Direccion de correo no valida"),
          password: Yup.string()
            .required("Este campo es obligatorio")
            .min(8, "Complete 8 caracteres en el campo contraseña"),
        })}
        onSubmit={ async (values) => {

          const response = await dispatch(fetchLogin(values))
          if(response.payload.login){
            return navigate("/userPage")
          }     
      }}
      >
        {({ values, errors, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Correo Electronico"
              variant="standard"
              onChange={handleChange}
              value={values.email}
              error={errors.email}
              helperText={errors.email}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" sx={{ mr: 1 }}>
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              id="password"
              name="password"
              label="Contraseña"
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

            <Grid container spacing={2} sx={{ mb: 3, mt: 2 }}>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" fullWidth id="button">
                  Ingresar
                </Button>
              </Grid>
            </Grid>

            <Grid container direction="row" justifyContent="end">
              <Link
                component={RouterLink}
                underline="none"
                to="/Register"
                id="link"
              >
                Crea una cuenta
              </Link>
            </Grid>
          </form>
        )}
      </Formik>
    </Layout>
  );
};
