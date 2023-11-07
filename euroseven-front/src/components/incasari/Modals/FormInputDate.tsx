import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Controller } from "react-hook-form";
import { FormInputProps } from "./FormInputProps";

export const FormInputDate = ({ name, control, label }: FormInputProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <DatePicker
            label={label}
            value={value}
            onChange={onChange}
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
              "& .MuiInputAdornment-root": {
                color: "#0054a6",
                "& .MuiButtonBase-root": {
                  color: "#0054a6",
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                },
              },
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
};
