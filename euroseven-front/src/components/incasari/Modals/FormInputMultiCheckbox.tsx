import {
  FormControl,
  FormLabel,
  FormControlLabel,
  Checkbox,
  Grid,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Controller, FormProvider } from "react-hook-form";
import { FormInputProps } from "./FormInputProps";
import Tooltip from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";
import FormHelperText from "@mui/material/FormHelperText";
import { useFormContext } from "react-hook-form";

export const FormInputMultiCheckbox: React.FC<FormInputProps> = ({
  name,
  control,
  setValue,
  label,
  nrFacturi,
  setNrFacturi,
  sume,
  setSume,
  dates,
  setDates,
}) => {
  const [selectedItems, setSelectedItems] = useState<any>([]);

  // we are handling the selection manually here
  const handleSelect = (value: any) => {
    const isPresent = selectedItems.indexOf(value);
    if (isPresent !== -1) {
      const remaining = selectedItems.filter((item: any) => item !== value);
      setSelectedItems(remaining);
    } else {
      setSelectedItems((prevItems: any) => [...prevItems, value]);
    }
  };

  // we are setting form value manually here
  useEffect(() => {
    if (setValue) {
      setValue(name, selectedItems, { shouldValidate: true });
    }
  }, [name, selectedItems, setValue]);

  return (
      <FormControl size={"small"} variant={"outlined"}>
        {nrFacturi!.length > 0 && (
          <FormLabel component="legend" sx={{ fontFamily: "Catesque" }}>
            {label}
          </FormLabel>
        )}
        <div>
          <Grid container spacing={1} sx={{ mt: "2vh" }}>
            {nrFacturi &&
              sume &&
              nrFacturi.length > 0 &&
              nrFacturi.map((nrFactura, index) => {
                return (
                  <Grid
                    item
                    xs={3}
                    key={`key_${nrFactura}`}
                    sx={{ position: "relative", mt: "15px" }}
                  >
                    <Typography
                      sx={{
                        position: "absolute",
                        top: -25,
                        color: "black",
                        left: 43,
                        fontFamily: "Catesque",
                        fontSize: "14px",
                        opacity: "0.7",
                        fontStyle: "italic",
                      }}
                    >
                      {`${dates![index]}`}
                    </Typography>
                    <Typography
                      sx={{
                        position: "absolute",
                        top: -5,
                        color: "red",
                        left: 43,
                        fontFamily: "Catesque",
                      }}
                    >
                      {`Suma: ${sume[index]} RON`}
                    </Typography>
                    <FormControlLabel
                      control={
                        <Controller
                          name={name}
                          render={({ field }) => {
                            return (
                              <Tooltip
                                TransitionComponent={Fade}
                                TransitionProps={{ timeout: 400 }}
                                title={dates![index]}
                              >
                                <Checkbox
                                  {...field}
                                  checked={selectedItems.includes(nrFactura)}
                                  onChange={() => handleSelect(nrFactura)}
                                  sx={{
                                    "& .MuiButtonBase-root-MuiCheckbox-root":
                                      {},
                                  }}
                                />
                              </Tooltip>
                            );
                          }}
                          control={control}
                        />
                      }
                      label={`Nr. ${nrFactura}`}
                      sx={{
                        "& .MuiFormControlLabel-label": {
                          fontFamily: "Catesque",
                        },
                      }}
                    />
                  </Grid>
                );
              })}
          </Grid>
        </div>
      </FormControl>
  );
};
