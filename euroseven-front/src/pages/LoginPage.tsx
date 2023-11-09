import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Snackbar,
  Alert,
} from "@mui/material";
import "./LoginPage.css";
import f1 from "../assets/f1.jpeg";
import logo1 from "../assets/logo1.png";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "redux";
import {
  authenticateUser,
  authenticationSuccess,
  authenticationFailure,
} from "../services/AuthService";
import React from "react";
import { RootState } from "../store";

export const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenErrorSnackbar(false);
  };

  const role = useSelector((state: any) => state.authentication.role);
  const dispatch: ThunkDispatch<{}, {}, AnyAction> = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.authentication.authenticated
  );
  const navigate = useNavigate();

  const changeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const changePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (username && password) {
      await dispatch(authenticateUser(username, password))
        .then((response: any) => {
          dispatch(
            authenticationSuccess(
              response.userId,
              response.accessToken,
              response.refreshToken,
              response.role
            )
          );
          if (response.role) {
            if (response.role === "ROLE_ADMIN") {
              navigate("/admin/home");
            } else if (response.role === "ROLE_INCASARI") {
              navigate("/incasari/home");
            } else if (response.role === "ROLE_USER") {
              navigate("/client/home");
            } else {
              navigate("/");
            }
          }
        })
        .catch((error: Error) => {
          setOpenErrorSnackbar(true);
          dispatch(authenticationFailure(error.message));
        });
    }
  };

  return (
    <Box className="login-page">
      <Box className="login-left">
        <Snackbar
          open={openErrorSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          sx={{ position: "absolute", bottom: 0, left: 0, padding: "20px" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="error"
            sx={{ width: "100%" }}
          >
            Parolă sau email greșită!
          </Alert>
        </Snackbar>
        <Box sx={{ position: "absolute", top: 0, left: 0, padding: "25px" }}>
          <img
            src={logo1}
            alt="login-logo"
            height={"50px"}
            onClick={() => {
              navigate("/");
            }}
            style={{ cursor: "pointer" }}
          />
        </Box>
        <Box className="login-header">
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Conectează-te în MyEuroSeven
          </Typography>
          <Typography variant="subtitle1" sx={{ fontSize: "17px" }}>
            Contul tău de client EuroSeven
          </Typography>
        </Box>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ width: "80%", textAlign: "center" }}
        >
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "15%",
              }}
            >
              <TextField
                margin="normal"
                id="username"
                label="Email"
                name="username"
                autoComplete="username"
                autoFocus
                variant="standard"
                value={username}
                onChange={changeUsername}
              />
              <TextField
                margin="normal"
                name="password"
                label="Parola"
                type="password"
                id="password"
                autoComplete="current-password"
                variant="standard"
                value={password}
                onChange={changePassword}
              />
            </Box>
            <Box
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Link
                href="/"
                variant="body2"
                style={{
                  textDecoration: "none",
                  color: "#0054a6",
                  fontWeight: "bold",
                  marginTop: "2%",
                }}
              >
                {"Ai uitat parola?"}
              </Link>
            </Box>
            <Button
              type="submit"
              variant="contained"
              style={{
                background: "#0054a6",
                textTransform: "none",
                fontSize: "15px",
              }}
              onClick={() => handleSubmit}
              sx={{ mt: "10%", mb: 2, ml: "15%" }}
            >
              Autentificare
            </Button>
          </Box>
        </Box>
      </Box>

      <Box className="login-right" sx={{ objectFit: "cover" }}>
        <img className="login-picture" src={f1} alt="login-page" />
      </Box>
    </Box>
  );
};
