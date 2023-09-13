import { Box, SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export const Icon = (props: {
  MUIIcon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  color: string;
}) => {
  return (
    <Box
      sx={{
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        border: "2px solid #dee2e6",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {props.MUIIcon && (
        <props.MUIIcon
          sx={{
            color: "white",
            backgroundColor: props.color,
            width: "30px",
            height: "30px",
            padding: "10px",
            borderRadius: "50%",
          }}
        />
      )}
    </Box>
  );
};
