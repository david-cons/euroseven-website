import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { FormInputProps } from "./FormInputProps";
import { useEffect } from "react";

export const FormInputUsername = ({ name, control, label }: FormInputProps) => {
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
          name={"name"}
          id={"name"}
          size={"small"}
          label={label}
          onChange={(data) => {
            onChange(data);
          }}
          disabled
          error={!!error}
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
        />
      )}
      defaultValue={""}
    />
  );
};
