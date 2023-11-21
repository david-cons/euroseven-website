import logo2 from "../assets/logo2.png";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import anpc1 from "../assets/anpc1.png";
import anpc2 from "../assets/anpc2.png";
import {
  Box,
  Stack,
  Typography,
  Paper,
  Divider,
  IconButton,
  InputBase,
} from "@mui/material";
import React from "react";
export const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "75vh",
        backgroundColor: "#282424",
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        overflow: "hidden",
        position: "relative",
        "@media (max-width: 1344px)": {
          // Adjust this pixel value as needed
          flexDirection: "column", // Changes layout to column
          alignItems: "center", // Aligns items in the center for the column layout
        },
      }}
    >
      <Box
        sx={{
          width: "70%",
          margin: "0 auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: "3vh",
            "@media (max-width: 1344px)": {
              // Adjust this pixel value as needed
              flexDirection: "column", // Changes layout to column
              alignItems: "center", // Aligns items in the center for the column layout
            },
          }}
        >
          <img alt="logo-footer" src={logo2} width={"200px"} height={"100px"} />
          <Typography
            fontSize={"1.5rem"}
            sx={{ color: "white", mt: "3vh", mr: "4vh" }}
            fontFamily={"Catesque"}
          >
            {"Dăm energie casei tale, ca tu să pui lumea \n în mișcare."}
          </Typography>
        </Box>
        <Divider variant="middle" sx={{ background: "gray" }} />
        <Box
          sx={{
            width: "100%",
            display: "flex",
            ml: "4vh",
            mt: "6vh",
            textAlign: "left",
            gap: "10vh",
            "@media (max-width: 1344px)": {
              // Adjust this pixel value as needed
              flexDirection: "column", // Changes layout to column
              alignItems: "center", // Aligns items in the center for the column layout
              textAlign: "center",
            },
          }}
        >
          <Stack spacing={1} direction={"column"}>
            <Typography
              fontFamily={"Catesque"}
              fontSize={"1.2rem"}
              color={"#0054a6"}
              sx={{ pb: "2vh" }}
            >
              Euro Seven
            </Typography>
            <Typography
              fontFamily={"Catesque"}
              fontSize={"1rem"}
              color={"white"}
              component="a"
              href="#"
              sx={{
                textDecoration: "none",
                ":hover": {
                  cursor: "pointer",
                  color: "#0054a6",
                },
              }}
            >
              Despre noi
            </Typography>
            <Typography
              fontFamily={"Catesque"}
              fontSize={"1rem"}
              color={"white"}
              component="a"
              href="#"
              sx={{
                textDecoration: "none",
                ":hover": {
                  cursor: "pointer",
                  color: "#0054a6",
                },
              }}
            >
              Presa
            </Typography>
            <Typography
              fontFamily={"Catesque"}
              fontSize={"1rem"}
              color={"white"}
              component="a"
              href="#"
              sx={{
                textDecoration: "none",
                ":hover": {
                  cursor: "pointer",
                  color: "#0054a6",
                },
              }}
            >
              Contact
            </Typography>
            <Typography
              fontFamily={"Catesque"}
              fontSize={"1rem"}
              color={"white"}
              component="a"
              href="#"
              sx={{
                textDecoration: "none",
                ":hover": {
                  cursor: "pointer",
                  color: "#0054a6",
                },
              }}
            >
              Puncte de Lucru
            </Typography>
            <Typography
              fontFamily={"Catesque"}
              fontSize={"1rem"}
              color={"white"}
              component="a"
              href="#"
              sx={{
                textDecoration: "none",
                ":hover": {
                  cursor: "pointer",
                  color: "#0054a6",
                },
              }}
            >
              Energie electrica
            </Typography>
          </Stack>
          <Stack spacing={1} direction={"column"}>
            <Typography
              fontFamily={"Catesque"}
              fontSize={"1.2rem"}
              color={"#0054a6"}
              sx={{ pb: "2vh" }}
            >
              Utile
            </Typography>
            <Typography
              fontFamily={"Catesque"}
              fontSize={"1rem"}
              color={"white"}
              component="a"
              href="#"
              sx={{
                textDecoration: "none",
                ":hover": {
                  cursor: "pointer",
                  color: "#0054a6",
                },
              }}
            >
              Intrebari frecvente
            </Typography>
            <Typography
              fontFamily={"Catesque"}
              fontSize={"1rem"}
              color={"white"}
              component="a"
              href="#"
              sx={{
                textDecoration: "none",
                ":hover": {
                  cursor: "pointer",
                  color: "#0054a6",
                },
              }}
            >
              Reclamatii
            </Typography>
            <Typography
              fontFamily={"Catesque"}
              fontSize={"1rem"}
              color={"white"}
              component="a"
              href="#"
              sx={{
                textDecoration: "none",
                ":hover": {
                  cursor: "pointer",
                  color: "#0054a6",
                },
              }}
            >
              Cont client
            </Typography>
            <Typography
              fontFamily={"Catesque"}
              fontSize={"1rem"}
              color={"white"}
              component="a"
              href="#"
              sx={{
                textDecoration: "none",
                ":hover": {
                  cursor: "pointer",
                  color: "#0054a6",
                },
              }}
            >
              Plata online
            </Typography>
            <Typography
              fontFamily={"Catesque"}
              fontSize={"1rem"}
              color={"white"}
              component="a"
              href="#"
              sx={{
                textDecoration: "none",
                ":hover": {
                  cursor: "pointer",
                  color: "#0054a6",
                },
              }}
            >
              Factura electronica
            </Typography>
            <Typography
              fontFamily={"Catesque"}
              fontSize={"1rem"}
              color={"white"}
              component="a"
              href="#"
              sx={{
                textDecoration: "none",
                ":hover": {
                  cursor: "pointer",
                  color: "#0054a6",
                },
              }}
            >
              Tarife reglementate
            </Typography>
            <Typography
              fontFamily={"Catesque"}
              fontSize={"1rem"}
              color={"white"}
              component="a"
              href="#"
              sx={{
                textDecoration: "none",
                ":hover": {
                  cursor: "pointer",
                  color: "#0054a6",
                },
              }}
            >
              Reluarea furnizarii
            </Typography>
          </Stack>
          <Stack spacing={1} direction={"column"}>
            <Typography
              fontFamily={"Catesque"}
              fontSize={"1.2rem"}
              color={"#0054a6"}
              sx={{ pb: "2vh" }}
            >
              Informatii Legislative
            </Typography>
            <Typography
              fontFamily={"Catesque"}
              fontSize={"1rem"}
              color={"white"}
              component="a"
              href="#"
              sx={{
                textDecoration: "none",
                ":hover": {
                  cursor: "pointer",
                  color: "#0054a6",
                },
              }}
            >
              Legislatie
            </Typography>
            <Typography
              fontFamily={"Catesque"}
              fontSize={"1rem"}
              color={"white"}
              component="a"
              href="#"
              sx={{
                textDecoration: "none",
                ":hover": {
                  cursor: "pointer",
                  color: "#0054a6",
                },
              }}
            >
              Contract și condiții generale
            </Typography>
            <Typography
              fontFamily={"Catesque"}
              fontSize={"1rem"}
              color={"white"}
              component="a"
              href="#"
              sx={{
                textDecoration: "none",
                ":hover": {
                  cursor: "pointer",
                  color: "#0054a6",
                },
              }}
            >
              Furnizor de ultimă instanță (FUI)
            </Typography>
            <Typography
              fontFamily={"Catesque"}
              fontSize={"1rem"}
              color={"white"}
              component="a"
              href="#"
              sx={{
                textDecoration: "none",
                ":hover": {
                  cursor: "pointer",
                  color: "#0054a6",
                },
              }}
            >
              ANRE
            </Typography>
            <Typography
              fontFamily={"Catesque"}
              fontSize={"1rem"}
              color={"white"}
              component="a"
              href="#"
              sx={{
                textDecoration: "none",
                ":hover": {
                  cursor: "pointer",
                  color: "#0054a6",
                },
              }}
            >
              POSF
            </Typography>
            <Typography
              fontFamily={"Catesque"}
              fontSize={"1rem"}
              color={"white"}
              component="a"
              href="#"
              sx={{
                textDecoration: "none",
                ":hover": {
                  cursor: "pointer",
                  color: "#0054a6",
                },
              }}
            >
              Comparator preț gaze naturale
            </Typography>
            <Typography
              fontFamily={"Catesque"}
              fontSize={"1rem"}
              color={"white"}
              component="a"
              href="#"
              sx={{
                textDecoration: "none",
                ":hover": {
                  cursor: "pointer",
                  color: "#0054a6",
                },
              }}
            >
              Comparator preț energie electrică
            </Typography>
          </Stack>
          <Stack spacing={1} direction={"column"}>
            <Typography
              fontFamily={"Catesque"}
              fontSize={"1.2rem"}
              color={"#0054a6"}
              sx={{ pb: "2vh" }}
            >
              Distribuție
            </Typography>
            <Typography
              fontFamily={"Catesque"}
              fontSize={"1rem"}
              color={"white"}
              component="a"
              href="#"
              sx={{
                textDecoration: "none",
                ":hover": {
                  cursor: "pointer",
                  color: "#0054a6",
                },
              }}
            >
              Anunțuri
            </Typography>
            <Typography
              fontFamily={"Catesque"}
              fontSize={"1rem"}
              color={"white"}
              component="a"
              href="#"
              sx={{
                textDecoration: "none",
                ":hover": {
                  cursor: "pointer",
                  color: "#0054a6",
                },
              }}
            >
              Servicii
            </Typography>
            <Typography
              fontFamily={"Catesque"}
              fontSize={"1rem"}
              color={"white"}
              component="a"
              href="#"
              sx={{
                textDecoration: "none",
                ":hover": {
                  cursor: "pointer",
                  color: "#0054a6",
                },
              }}
            >
              Contract și condiții generale
            </Typography>
            <Typography
              fontFamily={"Catesque"}
              fontSize={"1rem"}
              color={"white"}
              component="a"
              href="#"
              sx={{
                textDecoration: "none",
                ":hover": {
                  cursor: "pointer",
                  color: "#0054a6",
                },
              }}
            >
              Legislație
            </Typography>
            <Typography
              fontFamily={"Catesque"}
              fontSize={"1rem"}
              color={"white"}
              component="a"
              href="#"
              sx={{
                textDecoration: "none",
                ":hover": {
                  cursor: "pointer",
                  color: "#0054a6",
                },
              }}
            >
              Firme autorizate
            </Typography>
            <Typography
              fontFamily={"Catesque"}
              fontSize={"1rem"}
              color={"white"}
              component="a"
              href="#"
              sx={{
                textDecoration: "none",
                ":hover": {
                  cursor: "pointer",
                  color: "#0054a6",
                },
              }}
            >
              Abrevieri
            </Typography>
          </Stack>
          <Stack spacing={2} direction={"column"} sx={{ mr: "5vh" }}>
            <Typography
              fontFamily={"Catesque"}
              fontSize={"1.2rem"}
              color={"#0054a6"}
              sx={{ pb: "2vh" }}
            >
              Abonare la newsletter
            </Typography>
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 250,
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Adresa Email"
                inputProps={{ "aria-label": "search google maps" }}
              />
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <ArrowForwardIcon sx={{ color: "#0054a6" }} />
              </IconButton>
            </Paper>
            <img alt="anpc" src={anpc1} height={"65px"} width={"260px"} />
            <img alt="anpc1" src={anpc2} height={"65px"} width={"260px"} />
          </Stack>
        </Box>
        <Divider variant="middle" sx={{ background: "gray", mt: "6vh" }} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: "2vh",
            mb: "2vh",
            "@media (max-width: 1344px)": {
              // Adjust this pixel value as needed
              flexDirection: "column", // Changes layout to column
              alignItems: "center", // Aligns items in the center for the column layout
            },
          }}
        >
          <Typography
            fontFamily={"Catesque"}
            fontSize={"1rem"}
            sx={{ color: "white", ml: "4vh", mt: "2vh" }}
          >
            ©EuroSeven
          </Typography>

          <Box sx={{ display: "flex", gap: "1vh", mr: "4vh" }}>
            <Typography
              fontFamily={"Catesque"}
              component="a"
              href="#"
              fontSize={"1rem"}
              sx={{
                color: "white",
                ml: "4vh",
                mt: "2vh",
                textDecoration: "none",
                ":hover": {
                  cursor: "pointer",
                  color: "#0054a6",
                },
              }}
            >
              Termeni și Condiții
            </Typography>
            <Typography
              fontFamily={"Catesque"}
              fontSize={"1rem"}
              component="a"
              href="#"
              sx={{
                color: "white",
                ml: "4vh",
                mt: "2vh",
                textDecoration: "none",
                ":hover": {
                  cursor: "pointer",
                  color: "#0054a6",
                },
              }}
            >
              GDPR
            </Typography>
            <Typography
              fontFamily={"Catesque"}
              fontSize={"1rem"}
              component="a"
              href="#"
              sx={{
                color: "white",
                ml: "4vh",
                mt: "2vh",
                textDecoration: "none",
                ":hover": {
                  cursor: "pointer",
                  color: "#0054a6",
                },
              }}
            >
              Cookies
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
