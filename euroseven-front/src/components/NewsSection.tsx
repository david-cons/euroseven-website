import { Box, Typography } from "@mui/material";
import { NewsCard } from "./NewsCard";

export const NewsSection = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        mt: "4vh",
        background: "linear-gradient(to bottom,#FFFFFF,#dee2e6)",
        display: "flex",
        textAlign: "center",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <Typography
        variant="h3"
        component="div"
        sx={{
          color: "black",
          position: "absolute",
          top: 0,
          mt: "5vh",
          borderBottom: "1px solid #0054a6",
        }}
      >
        Noutăți
      </Typography>
      <Box sx={{ display: "flex", mt: "3vh" }}>
        <NewsCard />
        <NewsCard />
        <NewsCard />
        <NewsCard />
      </Box>
    </Box>
  );
};
