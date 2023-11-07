import React, { useEffect } from "react";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Controller, UseFormSetValue } from "react-hook-form";
import { Box, MenuItem } from "@mui/material";
import axios from "axios";
import { IUserFormInput } from "./ModalUser";

export const InputFormAutocomplete: React.FC<{
  name1: string;
  name2: string;
  control: any;
  label1: string;
  label2: string;
  setValue: UseFormSetValue<IUserFormInput>;
}> = ({ name1, name2, control, label1, label2, setValue }) => {
  const [judeteRomania, setJudeteRomania] = React.useState<
    { auto: string; nume: string }[]
  >([]);
  const [localitatiRomania, setLocalitatiRomania] = React.useState<
    { nume: string; simplu?: string }[]
  >([]);

  //const [disabled, setDisabled] = useState<boolean>(false);

  const filterOptions = createFilterOptions({
    matchFrom: "start",
    stringify: (option: string) => option,
  });

  useEffect(() => {
    const fetchJudete = async () => {
      await axios
        .get("https://roloca.coldfuse.io/judete", { withCredentials: false })
        .then((res) => {
          setJudeteRomania(res.data);
        });
    };
    fetchJudete();
  }, []);

  return (
    <Box sx={{ display: "flex", position: "relative", padding: "0 50px 50px 50px", }}>
      <Controller
        rules={{ required: true }}
        render={({ field: { onChange, ...props } }) => (
          <Autocomplete
            {...props}
            options={
              judeteRomania ? judeteRomania.map((judet) => judet.nume) : []
            }
            noOptionsText={"Nimic găsit."}
            filterOptions={filterOptions}
            renderInput={(params: any) => (
              <TextField
                {...params}
                required
                name={name1}
                size={"small"}
                id={name1}
                label={label1}
                sx={{
                  width: "250px",
                  position: "absolute",
                  left: 0,
                  "& input[type=number]": {
                    "-moz-appearance": "textfield",
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
                  "& .MuiAutocomplete-endAdornment": {
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
            onChange={(_, judet) => {
              if (judet) {
                const ab = judeteRomania.find((j) => j.nume === judet)?.auto;
                onChange(judet);
                axios
                  .get(`https://roloca.coldfuse.io/orase/${ab}`, {
                    withCredentials: false,
                  })
                  .then((res) => {
                    console.log(res);
                    setLocalitatiRomania(res.data);
                  });
                //setDisabled(false);
              } else {
                setLocalitatiRomania([]);
                setValue("localitateValue", "");
                //setDisabled(true);
              }
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
        name={name1}
        control={control}
      />
      <Controller
        rules={{ required: true }}
        render={({ field: { onChange, ...props } }) => (
          <Autocomplete
            {...props}
            options={
              localitatiRomania
                ? localitatiRomania.map((localitate) => localitate.nume)
                : []
            }
            noOptionsText={"Nimic găsit."}
            filterOptions={filterOptions}
            renderInput={(params: any) => (
              <TextField
                {...params}
                required
                name={name2}
                size={"small"}
                id={name2}
                label={label2}
                sx={{
                  width: "250px",
                  position: "absolute",
                  right: 0,
                  "& input[type=number]": {
                    "-moz-appearance": "textfield",
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
                  "& .MuiAutocomplete-endAdornment": {
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
            onChange={(_, localitate) => {
              onChange(localitate);
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
        name={name2}
        control={control}
      />
    </Box>
  );
};
