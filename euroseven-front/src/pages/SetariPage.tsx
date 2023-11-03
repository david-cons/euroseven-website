import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import { UserEntity } from "../types";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { UserService } from "../services/UserService";

export const SetariPage: React.FC<{
  user: UserEntity | null;
  setUser: React.Dispatch<React.SetStateAction<UserEntity | null>>;
}> = ({ user, setUser }) => {
  const [prenume, setPrenume] = useState<string | undefined>("");
  const [nume, setNume] = useState<string | undefined>("");
  const [username, setUsername] = useState<string | undefined>("");
  const [telefon, setTelefon] = useState<string | undefined>("");
  const [localitate, setLocalitate] = useState<string | undefined | null>("");
  const [adresa, setAdresa] = useState<string | undefined>("");
  const [judet, setJudet] = useState<string | undefined>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
    setOpenErrorSnackbar(false);
  };

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newSelectedFile = event.target.files?.[0];

    if (newSelectedFile) {
      setSelectedFile(newSelectedFile);
    }
  };

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const changePrenume = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrenume(event.target.value);
  };

  const changeNume = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNume(event.target.value);
  };

  const changeJudet = (event: React.ChangeEvent<HTMLInputElement>) => {
    setJudet(event.target.value);
  };

  const changeTelefon = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTelefon(event.target.value);
  };

  const changeLocalitate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalitate(event.target.value);
  };

  const changeAdresa = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAdresa(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = `${prenume} ${nume}`;
    await UserService.updateUser(
      user?.id,
      name,
      adresa,
      judet,
      localitate,
      telefon
    ).then((res) => {
      setUser(res);
    });
    setOpenSnackbar(true);
  };

  const handleUploadImage = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    UserService.uploadImage(selectedFile, user?.id).then((res) => {
      setOpenSnackbar(true);
      if (res) {
        setUser(res);
      } else {
        setOpenErrorSnackbar(true);
      }
    });
  };

  useEffect(() => {
    const parts = user?.name?.split(" ");
    if (parts) {
      const firstName = parts[0];
      const lastName = parts.slice(1).join(" ");
      setPrenume(firstName);
      setNume(lastName);
    }
    setUsername(user?.username);
    setTelefon(user?.phone);
    setLocalitate(user?.localitate);
    setJudet(user?.judet);
    setAdresa(user?.address);
  }, [user]);

  return (
    <Box sx={{ width: "100%" }}>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        sx={{ position: "absolute", bottom: 0, left: 0, padding: "20px" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Contul tau a fost actualizat cu succes!
        </Alert>
      </Snackbar>
      <Snackbar
        open={openErrorSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        sx={{ position: "absolute", bottom: 0, left: 0, padding: "20px" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          Poza este goala sau de marime prea mare!
        </Alert>
      </Snackbar>
      <Container
        sx={{
          width: "100%",
          position: "relative",
          height: "8vh",
          textAlign: "left",
        }}
      >
        <Typography
          fontFamily={"Catesque"}
          fontWeight={"bold"}
          fontSize={"32px"}
        >
          Setări
        </Typography>
      </Container>
      <Container sx={{ display: "flex" }}>
        <Paper
          elevation={5}
          className="card-single"
          sx={{
            display: "flex",
            justifyContent: "center",
            background: "white",
            padding: "2rem",
            width: "250px",
            height: "250px",
            borderRadius: "12px",
            boxShadow: "0 8px 16px -8px rgba(0, 0, 0, 0.3)",
            border: "0.1px solid #e0e0e0",
            transition: "transform 0.2s ease-in-out",
            position: "relative",
            alignItems: "center",
            mr: "25px",
          }}
        >
          <Box>
            <form onSubmit={(e: any) => handleUploadImage(e)}>
              <Avatar
                alt="titi"
                src={
                  selectedFile
                    ? URL.createObjectURL(selectedFile) // Use the selected file URL
                    : `data:image/jpeg;base64,${user?.image}` // Use the admin's image URL
                }
                onClick={handleAvatarClick}
                sx={{
                  width: "100px",
                  height: "100px",
                  margin: "0 auto",
                  cursor: "pointer",
                }}
              />
              <input
                onChange={handleFileInputChange}
                accept="image/*"
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
              />
              <Typography
                sx={{
                  fontFamily: "Catesque",
                  fontSize: "20px",
                  mt: "10px",
                  mb: "20px",
                }}
              >
                {`${user?.name}`}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Catesque",
                  fontSize: "16px",
                  mt: "10px",
                  color: "#8e939d",
                  mb: "25px",
                }}
              >
                {user?.role === "ROLE_ADMIN" && "Administrator"}
                {user?.role === "ROLE_INCASARI" && "Incasari"}
                {user?.role === "ROLE_USER" && "Client"}
              </Typography>
              <Divider sx={{ mt: "10px", width: "315px" }} />
              <Button
                type="submit"
                variant={"contained"}
                endIcon={<UploadIcon />}
                sx={{
                  backgroundColor: "#0054a6",
                  "&:hover": {
                    backgroundColor: "#0054a6",
                    color: "white",
                  },
                  position: "absolute",
                  bottom: "0",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "200px",
                  mb: "8px",
                  fontFamily: "Catesque",
                }}
              >
                Încarcă imagine
              </Button>
            </form>
          </Box>
        </Paper>
        <Paper
          elevation={5}
          className="card-single"
          sx={{
            display: "flex",
            background: "white",
            padding: "2rem",
            width: "750px",
            height: "350px",
            borderRadius: "12px",
            boxShadow: "0 8px 16px -8px rgba(0, 0, 0, 0.3)",
            border: "0.1px solid #e0e0e0",
            transition: "transform 0.2s ease-in-out",
            position: "relative",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              mt: "20px",
              padding: "20px",
              textAlign: "left",
            }}
          >
            <Typography fontFamily={"Catesque"} fontSize={"20px"}>
              Detalii Cont
            </Typography>
            <Typography
              fontFamily={"Catesque"}
              fontSize={"16px"}
              sx={{
                color: "#8e939d",
              }}
            >
              Informațiile pot fii editate
            </Typography>
          </Box>
          <form onSubmit={handleSubmit}>
            <Box sx={{ flexGrow: 1, mt: "10vh" }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    name={"prenume"}
                    id={"prenume"}
                    size={"small"}
                    label={"Prenume"}
                    value={prenume}
                    onChange={changePrenume}
                    sx={{
                      "& .MuiInputBase-input": {
                        color: "black", // Text color
                        fontFamily: "Catesque", // Font family
                      },
                      "& .MuiInputLabel-root": {
                        color: "black", // Label color
                        fontFamily: "Catesque", // Font family
                        fontSize: "18px",
                      },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#0054a6", // Border color
                        },
                        "&:hover fieldset": {
                          borderColor: "#0054a6", // Hover border color
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#0054a6", // Focused border color
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name={"nume"}
                    id={"nume"}
                    size={"small"}
                    label={"Nume"}
                    value={nume}
                    onChange={changeNume}
                    sx={{
                      "& .MuiInputBase-input": {
                        color: "black", // Text color
                        fontFamily: "Catesque", // Font family
                      },
                      "& .MuiInputLabel-root": {
                        color: "black", // Label color
                        fontFamily: "Catesque", // Font family
                        fontSize: "18px",
                      },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#0054a6", // Border color
                        },
                        "&:hover fieldset": {
                          borderColor: "#0054a6", // Hover border color
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#0054a6", // Focused border color
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    disabled
                    name={"username"}
                    id={"username"}
                    size={"small"}
                    label={"Email"}
                    value={username}
                    sx={{
                      "& input:disabled": {
                        color: "black", // Text color
                        fontFamily: "Catesque", // Font family
                        WebkitTextFillColor: "black",
                      },
                      "& .MuiInputLabel-root": {
                        fontFamily: "Catesque", // Font family
                        fontSize: "18px",
                      },
                      "& .MuiInputLabel-root.Mui-disabled": {
                        // Specifically target the disabled label
                        color: "black",
                      },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#0054a6", // Border color
                        },
                        "&:hover fieldset": {
                          borderColor: "#0054a6", // Hover border color
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#0054a6", // Focused border color
                        },
                        "&.Mui-disabled fieldset": {
                          borderColor: "#0054a6", // Disabled border color
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name={"phone"}
                    id={"phone"}
                    size={"small"}
                    label={"Telefon"}
                    value={telefon}
                    onChange={changeTelefon}
                    sx={{
                      "& .MuiInputBase-input": {
                        color: "black", // Text color
                        fontFamily: "Catesque", // Font family
                      },
                      "& .MuiInputLabel-root": {
                        color: "black", // Label color
                        fontFamily: "Catesque", // Font family
                        fontSize: "18px",
                      },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#0054a6", // Border color
                        },
                        "&:hover fieldset": {
                          borderColor: "#0054a6", // Hover border color
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#0054a6", // Focused border color
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id={"judet"}
                    name={"judet"}
                    size={"small"}
                    label={"Județ"}
                    value={judet}
                    onChange={changeJudet}
                    sx={{
                      "& .MuiInputBase-input": {
                        color: "black", // Text color
                        fontFamily: "Catesque", // Font family
                      },
                      "& .MuiInputLabel-root": {
                        color: "black", // Label color
                        fontFamily: "Catesque", // Font family
                        fontSize: "18px",
                      },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#0054a6", // Border color
                        },
                        "&:hover fieldset": {
                          borderColor: "#0054a6", // Hover border color
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#0054a6", // Focused border color
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id={"localitate"}
                    name={"localitate"}
                    size={"small"}
                    label={"Localitate"}
                    value={localitate}
                    onChange={changeLocalitate}
                    sx={{
                      "& .MuiInputBase-input": {
                        color: "black", // Text color
                        fontFamily: "Catesque", // Font family
                      },
                      "& .MuiInputLabel-root": {
                        color: "black", // Label color
                        fontFamily: "Catesque", // Font family
                        fontSize: "18px",
                      },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#0054a6", // Border color
                        },
                        "&:hover fieldset": {
                          borderColor: "#0054a6", // Hover border color
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#0054a6", // Focused border color
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id={"address"}
                    size={"small"}
                    label={"Adresa"}
                    value={adresa}
                    onChange={changeAdresa}
                    sx={{
                      "& .MuiInputBase-input": {
                        color: "black", // Text color
                        fontFamily: "Catesque", // Font family
                      },
                      "& .MuiInputLabel-root": {
                        color: "black", // Label color
                        fontFamily: "Catesque", // Font family
                        fontSize: "18px",
                      },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#0054a6", // Border color
                        },
                        "&:hover fieldset": {
                          borderColor: "#0054a6", // Hover border color
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#0054a6", // Focused border color
                        },
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
            <Button
              variant={"contained"}
              sx={{
                backgroundColor: "#0054a6",
                "&:hover": {
                  backgroundColor: "#0054a6",
                  color: "white",
                },
                position: "absolute",
                bottom: "0",
                right: "0",
                width: "175px",
                mb: "10px",
                mr: "20px",
                fontFamily: "Catesque",
              }}
              type="submit"
            >
              Salveaza
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};
