import { Box, Typography, TextField, Button, Link } from "@mui/material";
import "./LoginPage.css";
import f1 from "../assets/f1.jpeg";
import logo1 from "../assets/logo1.png";

export const LoginPage = () => {
  return (
    <Box className="login-page">
      <Box className="login-left">
        <Box sx={{ position: "absolute", top: 0, left: 0, padding: "25px" }}>
          <img src={logo1} height={"50px"} />
        </Box>
        <Box className="login-header">
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Conectează-te în MyEuroSeven
          </Typography>
          <Typography variant="subtitle1" sx={{ fontSize: "17px" }}>
            Contul tău de client EuroSeven
          </Typography>
        </Box>
        <Box component="form" sx={{ width: "80%", textAlign: "center" }}>
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
              />
              <TextField
                margin="normal"
                name="password"
                label="Parola"
                type="password"
                id="password"
                autoComplete="current-password"
                variant="standard"
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
