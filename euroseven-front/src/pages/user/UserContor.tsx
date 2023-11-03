import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { UserEntity } from "../../types";
import { MeterReadingService } from "../../services/MeterReadingService";

const defaultValues = {
  serieContorValue: "",
  indexVechiValue: "",
  indexNouValue: "",
  imagineValue: undefined,
};

interface IFormInput {
  serieContorValue: string | undefined;
  indexVechiValue: string | undefined;
  indexNouValue: string | undefined;
  imagineValue: string | undefined;
}

export const UserContor: React.FC<{ user: UserEntity | null }> = ({ user }) => {
  const { handleSubmit, reset, control, setValue, getValues } =
    useForm<IFormInput>({
      defaultValues: defaultValues,
    });

  const [file, setFile] = useState<File | null>(null);


    

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    setFile(selectedFile);
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
    console.log(data);
    console.log(file);
    if (file && user && user.codClient) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64Image = reader.result?.toString().split(",")[1]; // we only want the Base64 part, not the preceding MIME type
        const currentDate: Date = new Date();
        await MeterReadingService.createMeterReading({
          serieContor: data.serieContorValue!,
          indexVechi: Number(data.indexVechiValue!),
          indexNou: Number(data.indexNouValue!),
          date: formatDate(currentDate),
          codClient: user.codClient,
          picture: base64Image!, // use the Base64 string here
        });
      };
    }
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridRowGap: "20px",
        padding: "50px",
        margin: "10px 300px",
        position: "absolute" as "absolute",
        top: "50%",
        left: "30%",
        transform: "translate(-50%, -50%)",
        width: "70vh",
        minHeight: "20vh",
        bgcolor: "background.paper",
        boxShadow: 24,
        textAlign: "center",
      }}
    >
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
            // disabled={disabled ? disabled : false}
            name={"indexVechiValue"}
            id={"indexVechiValue"}
            size={"small"}
            type={"number"}
            label={"Index Vechi"}
            onChange={onChange}
            error={!!error}
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
                    cm
                  </Typography>
                </InputAdornment>
              ),
            }}
          />
        )}
        defaultValue={""}
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
                    cm
                  </Typography>
                </InputAdornment>
              ),
            }}
          />
        )}
        defaultValue={""}
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
            sx={{ width: "30%", color: "#0054a6", margin: "0 auto" }}
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
        defaultValue={""}
      />

      {file && (
        <Box sx={{ margin: "0 auto", width: "50%" }}>
          <img
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
            indexVechiValue: "",
            indexNouValue: "",
            imagineValue: undefined,
          });
          setFile(null);
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
