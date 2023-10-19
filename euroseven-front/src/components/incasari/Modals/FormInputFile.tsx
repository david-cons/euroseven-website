import { Button, styled } from "@mui/material";
import { Controller } from "react-hook-form";
import { FormInputProps } from "./FormInputProps";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export const FormInputFile: React.FC<FormInputProps> = ({
  name,
  control,
  label,
  handleFileChange,
}) => {
  return (
    <>
      <Controller
        name={name}
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
            sx={{ width: "20%", color: "#0054a6" }}
          >
            Incarca Factura
            <VisuallyHiddenInput
              {...props}
              onChange={(e) => {
                handleFileChange && handleFileChange(e);
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
    </>
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
