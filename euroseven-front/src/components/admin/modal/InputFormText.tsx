import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { FormInputProps } from "../../incasari/Modals";

export const InputFormText = ({
  name,
  control,
  label,
  textFieldName,
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
          name={textFieldName}
          id={textFieldName}
          disabled={disabled}
          size={"small"}
          label={label}
          onChange={onChange}
          error={!!error}
          sx={
            disabled
              ? {
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
                    "&.Mui-disabled fieldset": {
                      borderColor: "#0054a6", // Focused border color
                    },
                  },
                }
              : {
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
                }
          }
        />
      )}
    />
  );
};
