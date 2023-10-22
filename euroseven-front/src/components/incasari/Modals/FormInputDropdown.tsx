import React, { useEffect, useState } from "react";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { FormInputProps } from "./FormInputProps";
import { InvoiceService } from "../../../services/InvoiceService";
import { UserService } from "../../../services/UserService";
import { Controller } from "react-hook-form";
import { MenuItem } from "@mui/material";

export const FormInputDropdown: React.FC<FormInputProps> = ({
  name,
  control,
  label,
  nrFacturi,
  setNrFacturi,
  sume,
  setSume,
  user,
  setUser,
  disabled,
  dates,
  setDates,
}) => {
  const [coduriClient, setCoduriClient] = useState<string[]>([]);

  const filterOptions = createFilterOptions({
    matchFrom: "start",
    stringify: (option: string) => option,
  });

  useEffect(() => {
    const fetchCoduriClienti = async () => {
      await UserService.getCoduriClienti()
        .then((res) => {
          console.log(res);
          setCoduriClient(res.map((number) => String(number)));
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchCoduriClienti();
  }, []);

  return (
    <Controller
      rules={{ required: true }}
      render={({ field: { onChange, ...props } }) => (
        <Autocomplete
          {...props}
          options={coduriClient}
          noOptionsText={"Nimic găsit."}
          filterOptions={filterOptions}
          disabled={disabled ? disabled : false}
          renderInput={(params: any) => (
            <TextField
              {...params}
              required
              name={"codClient"}
              size={"small"}
              id={"codClient"}
              label={"Cod Client"}
              disabled={disabled ? disabled : false}
              type="number"
              sx={{
                "& input[type=number]": {
                  "-moz-appearance": "textfield",
                },
                "& input:disabled": {
                  color: "black", // Text color
                  fontFamily: "Catesque", // Font family
                  WebkitTextFillColor: "black",
                },
                "& input[type=number]::-webkit-outer-spin-button": {
                  "-webkit-appearance": "none",
                  margin: 0,
                },
                "& input[type=number]::-webkit-inner-spin-button": {
                  "-webkit-appearance": "none",
                  margin: 0,
                },
                "& .MuiInputBase-input": {
                  color: "black", // Text color
                  fontFamily: "Catesque", // Font family
                },

                "& .MuiInputLabel-root": {
                  color: "black", // Label color
                  fontFamily: "Catesque", // Font family
                  fontSize: "18px",
                  "&.Mui-focused fieldset": {
                    borderColor: "#0054a6", // Focused border color
                  },
                  "&.Mui-disabled": {
                    color: "black", // Label color for disabled state
                  },
                },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-disabled .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#0054a6", // Border color for disabled input
                  },
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
                "& .MuiAutocomplete-endAdornment": {
                  "& .MuiButtonBase-root": {
                    color: "#0054a6",
                    "&:hover": {
                      backgroundColor: "transparent",
                    },
                  },
                },
                userSelect: "none",
              }}
            />
          )}
          onChange={(_, data) => {
            onChange(data);
            UserService.getUserByCodClient(Number(data)).then((res) => {
              console.log(res);
              setUser && setUser(res);
            });
            InvoiceService.getAllNrFacturiByCodClient(Number(data)).then(
              (res) => {
                console.log(res);
                setNrFacturi &&
                  setNrFacturi(res.map((number) => String(number.nrFactura)));
                setSume &&
                  setSume(res.map((number) => String(number.restDePlata)));
                setDates &&
                  setDates(
                    res.map((date) => transformDateFormat(date.created_date))
                  );
              }
            );
          }}
          renderOption={(props, option) => (
            <MenuItem
              {...props}
              sx={{ fontFamily: "Catesque", fontSize: "16px" }} // Apply the desired font family and font size
            >
              {option}
            </MenuItem>
          )}
        />
      )}
      defaultValue={""}
      name={name}
      control={control}
    />
  );
};

function transformDateFormat(dateStr: string): string {
  const [year, month, day] = dateStr.split("-");
  return `${day}/${month}/${year}`;
}
