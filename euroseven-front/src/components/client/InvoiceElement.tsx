import { Box } from "@mui/material";

export const InvoiceElement = (props: { color: string }) => {
  const { color } = props;
  return (
    <Box
      sx={{
        width: "30px",
        height: "40px",
        minWidth: "30px",
        minHeight: "40px",
        backgroundColor: color,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "5px",
        mr: "10px",
        "&:hover": {
          cursor: "pointer",
        },
      }}
    >
      <Box
        sx={{
          width: "20px",
          height: "2px",
          borderRadius: "75px",
          backgroundColor: "white",
        }}
      />
      <Box
        sx={{
          width: "20px",
          height: "2px",
          borderRadius: "75px",
          backgroundColor: "white",
        }}
      />
      <Box
        sx={{
          width: "20px",
          height: "2px",
          borderRadius: "75px",
          backgroundColor: "white",
        }}
      />
      <Box
        sx={{
          width: "20px",
          height: "2px",
          borderRadius: "75px",
          backgroundColor: "white",
        }}
      />
      <Box
        sx={{
          width: "10px",
          height: "2px",
          borderRadius: "75px",
          backgroundColor: "white",
        }}
      />
    </Box>
  );
};
