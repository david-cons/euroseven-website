import logo2 from "../assets/logo2.png";
import anpc1 from "../assets/anpc1.png";
import anpc2 from "../assets/anpc2.png";
import {
  Box,
  Stack,
  Typography,
  Button,
  Paper,
  TextField,
} from "@mui/material";
export const Footer = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "75vh",
        backgroundColor: "#282424",
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        position: "relative",
      }}
    >
      <Box sx={{ display: "flex", mt: "10vh" }}>
        <Stack spacing={2}>
          <Typography
            variant="h6"
            component="div"
            sx={{
              color: "white",
              fontWeight: "bold",
              letterSpacing: "1px",
              mt: "5vh",
              fontSize: "18px",
            }}
          >
            EuroSeven
          </Typography>
          <Button
            variant="text"
            sx={{
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: "transparent",
                color: "white",
              },
              color: "#0054a6",
              fontSize: "12px",
            }}
          >
            Noutati
          </Button>
          <Button
            variant="text"
            sx={{
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: "transparent",
              },
              color: "#0054a6",
              fontSize: "12px",
            }}
          >
            Business News
          </Button>
          <Button
            variant="text"
            sx={{
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: "transparent",
              },
              color: "#0054a6",
              fontSize: "12px",
            }}
          >
            Despre Noi
          </Button>
          <Button
            variant="text"
            sx={{
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: "transparent",
              },
              color: "#0054a6",
              fontSize: "12px",
            }}
          >
            Etica
          </Button>
          <Button
            variant="text"
            sx={{
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: "transparent",
              },
              color: "#0054a6",
              fontSize: "12px",
            }}
          >
            Cariere
          </Button>
        </Stack>
        <Stack spacing={2}>
          <Typography
            variant="h6"
            component="div"
            sx={{
              color: "white",
              fontWeight: "bold",
              letterSpacing: "1px",
              mt: "5vh",
              fontSize: "18px",
            }}
          >
            Utile
          </Typography>
          <Button
            variant="text"
            sx={{
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: "transparent",
              },
              color: "#0054a6",
              fontSize: "12px",
            }}
          >
            Cont Client
          </Button>
          <Button
            variant="text"
            sx={{
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: "transparent",
              },
              color: "#0054a6",
              fontSize: "12px",
            }}
          >
            Plata Online
          </Button>
          <Button
            variant="text"
            sx={{
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: "transparent",
              },
              color: "#0054a6",
              fontSize: "12px",
            }}
          >
            Transmitere Index
          </Button>
          <Button
            variant="text"
            sx={{
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: "transparent",
              },
              color: "#0054a6",
              fontSize: "12px",
            }}
          >
            Intrebari Frecvente
          </Button>
          <Button
            variant="text"
            sx={{
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: "transparent",
              },
              color: "#0054a6",
              fontSize: "12px",
            }}
          >
            Factura pe email
          </Button>
          <Button
            variant="text"
            sx={{
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: "transparent",
              },
              color: "#0054a6",
              fontSize: "12px",
            }}
          >
            ANPC
          </Button>
          <Button
            variant="text"
            sx={{
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: "transparent",
              },
              color: "#0054a6",
              fontSize: "12px",
            }}
          >
            ANRE
          </Button>
          <Button
            variant="text"
            sx={{
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: "transparent",
              },
              color: "#0054a6",
              fontSize: "12px",
            }}
          >
            Contact
          </Button>
          <Paper
            elevation={0}
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "20px",
              backgroundColor: "transparent",
              margin: "0 auto",
            }}
          >
            <img
              src={anpc1}
              alt="anpc1"
              width="175px"
              height={"50px"}
              style={{ marginBottom: "20px" }}
            />
            <img src={anpc2} alt="anpc2" width="175px" height={"50px"} />
          </Paper>
        </Stack>
        <Stack spacing={2}>
          <Typography
            variant="h6"
            component="div"
            sx={{
              color: "white",
              fontWeight: "bold",
              letterSpacing: "1px",
              mt: "5vh",
              fontSize: "18px",
            }}
          >
            Legislative
          </Typography>
          <Button
            variant="text"
            sx={{
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: "transparent",
              },
              fontSize: "12px",
              color: "#0054a6",
            }}
          >
            Contracte si Conditii Generale
          </Button>
          <Button
            variant="text"
            sx={{
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: "transparent",
              },
              fontSize: "12px",
              color: "#0054a6",
            }}
          >
            Legislatie
          </Button>
          <Button
            variant="text"
            sx={{
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: "transparent",
              },
              color: "#0054a6",
              fontSize: "12px",
            }}
          >
            Tarife
          </Button>
          <Button
            variant="text"
            sx={{
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: "transparent",
              },
              color: "#0054a6",
              fontSize: "12px",
            }}
          >
            Serviciu Universal
          </Button>
          <Button
            variant="text"
            sx={{
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: "transparent",
              },
              color: "#0054a6",
              fontSize: "12px",
            }}
          >
            Sistem calificare achiziții
          </Button>
          <Button
            variant="text"
            sx={{
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: "transparent",
              },
              color: "#0054a6",
              fontSize: "12px",
            }}
          >
            Sistem dinamic de achiziții
          </Button>
        </Stack>
        <Stack spacing={2} sx={{ ml: "10vh" }}>
          <Typography
            variant="h6"
            component="div"
            sx={{
              color: "white",
              fontWeight: "bold",
              letterSpacing: "1px",
              mt: "5vh",
              fontSize: "18px",
            }}
          >
            Newsletter
          </Typography>
          <form style={{ display: "flex", flexDirection: "column" }}>
            <TextField
              variant="outlined"
              label="Email"
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#0054a6",
                  },
                },
                "& .MuiOutlinedInput-input": {
                  color: "white",
                },
                "& .MuiInputLabel-root": {
                  color: "#0054a6",
                },
                "& .MuiInputLabel-outlined": {
                  color: "white",
                },
                color: "#0054a6",
              }}
            />
            <TextField
              variant="outlined"
              label="Prenume"
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#0054a6",
                  },
                },
                "& .MuiOutlinedInput-input": {
                  color: "white",
                },
                "& .MuiInputLabel-root": {
                  color: "#0054a6",
                },
                "& .MuiInputLabel-outlined": {
                  color: "white",
                },
                mt: "20px",
              }}
            />
            <TextField
              variant="outlined"
              label="Nume"
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#0054a6",
                  },
                },
                "& .MuiOutlinedInput-input": {
                  color: "white",
                },
                "& .MuiInputLabel-root": {
                  color: "#0054a6",
                },
                "& .MuiInputLabel-outlined": {
                  color: "white",
                },
                mt: "20px",
              }}
            />
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#0054a6",
                fontSize: "12px",
                mt: "20px",
              }}
            >
              Aboneaza-te
            </Button>
          </form>
        </Stack>
      </Box>
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          right: 0,
          padding: "15px",
          color: "#666666",
        }}
      >
        <img
          src={logo2}
          alt="footer-logo"
          height={"100px"}
          style={{ padding: "20px" }}
        />
        <Typography>
          © 2023 EuroSeven Industry - Toate drepturile rezervate
        </Typography>
      </Box>
    </Box>
  );
};
