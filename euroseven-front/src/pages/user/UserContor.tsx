import {
  Alert,
  Box,
  Button,
  InputAdornment,
  Snackbar,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { UserEntity } from "../../types";
import { MeterReadingService } from "../../services/MeterReadingService";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const defaultValues = {
  serieContorValue: "",
  indexVechiValue: 0,
  indexNouValue: 0,
  imagineValue: null,
};

const validationSchema = yup
  .object({
    serieContorValue: yup.string().required("Serie contor trebuie completată"),
    indexVechiValue: yup
      .number()
      .required("Index vechi trebuie completat")
      .typeError("Index vechi trebuie sa fie un număr"),
    indexNouValue: yup
      .number()
      .required("Index nou trebuie completat")
      .typeError("Index nou trebuie sa fie un număr")
      .moreThan(
        yup.ref("indexVechiValue"),
        "Index Nou trebuie sa fie mai mare decăt Index Vechi"
      ),
    imagineValue: yup
      .string()
      .required("Imaginea trebuie completată")
      .nullable(),
    // Since file validation cannot be done directly with yup, it will be handled separately
  })
  .required();

interface IFormInput {
  serieContorValue: string;
  indexVechiValue: number;
  indexNouValue: number;
  imagineValue: string | null;
}

export const UserContor: React.FC<{ user: UserEntity | null }> = ({ user }) => {
  const { handleSubmit, reset, control, setValue } = useForm<IFormInput>({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues,
  });

  const [file, setFile] = useState<File | null>(null);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);

  const [imageError, setImageError] = useState("");

  const handleCloseErrorSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenErrorSnackbar(false);
  };

  useEffect(() => {
    if (user && user.indexNou) {
      setValue("indexVechiValue", user.indexNou);
    }
  }, [user, setValue]);

  const handleCloseSuccessSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSuccessSnackbar(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    if (selectedFile) {
      // Check the file type
      if (!selectedFile.type.startsWith("image/")) {
        alert("File is not an image.");
        return;
      }
      // Check the file size
      if (selectedFile.size > 5242880) {
        // 5 MB in bytes
        alert("File size exceeds 5MB.");
        return;
      }
      setFile(selectedFile);
    }
  };

  const formatDate = (date: Date | null): string => {
    if (date === null) return "";
    let dateObject = new Date(date);
    const day = String(dateObject.getDate()).padStart(2, "0");
    const month = String(dateObject.getMonth() + 1).padStart(2, "0");
    const year = String(dateObject.getFullYear()); // Get the last two digits of the year.

    return `${day}/${month}/${year}`;
  };

  const onSubmit = async (data: IFormInput) => {
    if (file && user && user.codClient) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        console.log("hey");
        const base64Image = reader.result?.toString().split(",")[1]; // we only want the Base64 part, not the preceding MIME type
        const currentDate: Date = new Date();
        MeterReadingService.createMeterReading({
          serieContor: data.serieContorValue!,
          indexVechi: Number(data.indexVechiValue!),
          indexNou: Number(data.indexNouValue!),
          date: formatDate(currentDate),
          codClient: user.codClient,
          picture: base64Image!, // use the Base64 string here
        })
          .then((res) => {
            console.log("Received response:", res);
            if (!res) {
              setOpenErrorSnackbar(true);
            } else {
              setOpenSuccessSnackbar(true);
            }
            reset({
              serieContorValue: "",
              indexVechiValue: 0,
              indexNouValue: 0,
              imagineValue: undefined,
            });
            setFile(null);
            setImageError("");
          })
          .catch((error) => {
            console.error("Error creating meter reading:", error);
            setOpenErrorSnackbar(true);
            setImageError("");
          });
      };
    } else {
      setImageError("Imaginea trebuie completată");
    }
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridRowGap: "20px",
        padding: "50px",
        width: "600px",
        minHeight: "450px",
        bgcolor: "background.paper",
        boxShadow: 24,
        textAlign: "center",
      }}
    >
      <Snackbar
        open={openErrorSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseErrorSnackbar}
        sx={{ position: "absolute", bottom: 0, left: "50%", padding: "20px" }}
      >
        <Alert
          onClose={handleCloseErrorSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          Ai trimis mai mult de 2 citiri in ultima lună!
        </Alert>
      </Snackbar>
      <Snackbar
        open={openSuccessSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSuccessSnackbar}
        sx={{ position: "absolute", bottom: 0, left: "50%", padding: "20px" }}
      >
        <Alert
          onClose={handleCloseSuccessSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Citire înregistrată!
        </Alert>
      </Snackbar>
      <Typography variant="h4" fontFamily="Catesque" sx={{ mb: "5vh" }}>
        Citește Contor
      </Typography>

      <Controller
        name={"serieContorValue"}
        control={control}
        render={({
          field: { onChange, ...props },
          fieldState: { error },
          formState,
        }) => (
          <TextField
            {...props}
            required
            // disabled={disabled ? disabled : false}
            name={"serieContorValue"}
            id={"serieContorValue"}
            size={"small"}
            label={"Serie Contor"}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
            sx={{
              "& .MuiInputBase-input": {
                color: "black", // Text color
                fontFamily: "Catesque", // Font family
              },
              "& input:disabled": {
                color: "black", // Text color
                fontFamily: "Catesque", // Font family
                WebkitTextFillColor: "black",
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
        )}
        defaultValue={""}
      />
      <Controller
        name={"indexVechiValue"}
        control={control}
        render={({
          field: { onChange, ...props },
          fieldState: { error },
          formState,
        }) => (
          <TextField
            {...props}
            required
            name={"indexVechiValue"}
            id={"indexVechiValue"}
            size={"small"}
            type={"number"}
            label={"Index Vechi"}
            onChange={onChange}
            disabled={user && user.indexNou !== 0 ? true : false}
            error={!!error}
            helperText={error ? error.message : null}
            sx={{
              "& input:disabled": {
                color: "black", // Text color
                fontFamily: "Catesque", // Font family
                WebkitTextFillColor: "black",
              },
              "& .MuiInputLabel-root.Mui-disabled": {
                color: "black", // This will make the label color black when the TextField is disabled
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
                "&.Mui-disabled fieldset": {
                  borderColor: "#0054a6", // Focused border color
                },
              },
            }}
            inputProps={{
              step: 0.5,
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  sx={{
                    mt: "1px",
                    userSelect: "none",
                  }}
                  position="end"
                >
                  <Typography sx={{ fontFamily: "Catesque", color: "black" }}>
                    mc
                  </Typography>
                </InputAdornment>
              ),
            }}
          />
        )}
        defaultValue={0}
      />
      <Controller
        name={"indexNouValue"}
        control={control}
        render={({
          field: { onChange, ...props },
          fieldState: { error },
          formState,
        }) => (
          <TextField
            {...props}
            required
            // disabled={disabled ? disabled : false}
            name={"indexNouValue"}
            id={"indexNouValue"}
            size={"small"}
            type={"number"}
            label={"Index Nou"}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
            sx={{
              "& .MuiInputBase-input": {
                color: "black", // Text color
                fontFamily: "Catesque", // Font family
              },
              "& input:disabled": {
                color: "black", // Text color
                fontFamily: "Catesque", // Font family
                WebkitTextFillColor: "black",
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
            inputProps={{
              step: 0.5,
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  sx={{
                    mt: "1px",
                    userSelect: "none",
                  }}
                  position="end"
                >
                  <Typography sx={{ fontFamily: "Catesque", color: "black" }}>
                    mc
                  </Typography>
                </InputAdornment>
              ),
            }}
          />
        )}
        defaultValue={0}
      />

      <Controller
        name={"imagineValue"}
        control={control}
        render={({
          field: { onChange, ...props },
          fieldState: { error },
          formState,
        }) => (
          <Button
            component="label"
            variant="text"
            startIcon={<CloudUploadIcon />}
            sx={{
              width: "50%",
              color: "#0054a6",
              margin: "0 auto",
              display: "flex",
            }}
          >
            Incarca Imagine
            <VisuallyHiddenInput
              {...props}
              onChange={(e) => {
                handleFileChange(e);
                onChange(e);
              }}
              required
              value={""}
              type="file"
            />
          </Button>
        )}
        defaultValue={null}
      />
      {imageError !== "" && (
        <Typography color="error" fontFamily={"Catesque"}>
          {imageError}
        </Typography>
      )}

      {file && (
        <Box sx={{ margin: "0 auto", width: "50%" }}>
          <img
            alt="contor"
            src={URL.createObjectURL(file)}
            width={"200px"}
            height={"200px"}
          />
        </Box>
      )}

      <Button
        onClick={handleSubmit(onSubmit)}
        variant={"contained"}
        sx={{ backgroundColor: "#0054a6", fontFamily: "Catesque" }}
      >
        Înregistrează Citire Contor
      </Button>
      <Button
        onClick={() => {
          reset({
            serieContorValue: "",
            indexVechiValue: 0,
            indexNouValue: 0,
            imagineValue: undefined,
          });
          setFile(null);
          setImageError("");
        }}
        variant={"outlined"}
        sx={{
          borderColor: "#0054a6",
          color: "#0054a6",
          fontFamily: "Catesque",
        }}
      >
        Resetare
      </Button>
    </Box>
  );
};

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
