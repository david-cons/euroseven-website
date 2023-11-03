import { InputAdornment, TextField, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import { FormInputProps } from "./FormInputProps";

export const FormInputText = ({
  name,
  control,
  label,
  disabled,
}: FormInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, ...props },
        fieldState: { error },
        formState,
      }) => (
        <TextField
          {...props}
          required
          disabled={disabled ? disabled : false}
          name={"amount"}
          id={"amount"}
          size={"small"}
          type={"number"}
          label={label}
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
          InputProps={
            name === "textValue"
              ? {
                  startAdornment: (
                    <InputAdornment
                      sx={{
                        mt: "1px",
                        userSelect: "none",
                      }}
                      position="start"
                    >
                      <Typography
                        sx={{ fontFamily: "Catesque", color: "black" }}
                      >
                        RON
                      </Typography>
                    </InputAdornment>
                  ),
                }
              : {}
          }
        />
      )}
      defaultValue={""}
    />
  );
};
