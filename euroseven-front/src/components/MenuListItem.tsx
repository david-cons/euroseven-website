import { Box, Typography, IconButton } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export const MenuListItem = (props: { label: string }) => {
  const { label } = props;
  return (
    <Box
      sx={
        label !== "A.N.P.C"
          ? {
              width: "100%",
              height: "40px",
              borderBottom: "0.5px solid rgb(240,240,240, .5)",
              position: "relative",
              textAlign: "left",
              ":hover": {
                backgroundColor: "#014282",
                cursor: "pointer",
              },
              userSelect: "none",
            }
          : {
              width: "100%",
              height: "40px",
              position: "relative",
              textAlign: "left",
              ":hover": {
                backgroundColor: "#014282",
                cursor: "pointer",
              },
              userSelect: "none",
            }
      }
    >
      <Typography
        fontFamily={"Catesque"}
        sx={{
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          left: "5%",
          color: "white",
        }}
      >
        {label}
      </Typography>

      <IconButton
        sx={{
          color: "white",
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          right: "1%",
        }}
      >
        <ArrowDropDownIcon fontSize="large" />
      </IconButton>
    </Box>
  );
};
