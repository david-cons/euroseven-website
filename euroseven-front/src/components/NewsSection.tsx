import { Box, Typography } from "@mui/material";
import { NewsCard } from "./NewsCard";
import { useState, useEffect } from "react";

export const NewsSection = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 600);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 600);
    };

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call the handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const changeCard = (index: number) => {
    setCurrentCardIndex(index);
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "911px",
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
      <Box
        sx={{
          display: "flex",
          mt: "3vh",
          margin: "0 auto",
          flexDirection: isSmallScreen ? "column" : "row",
        }}
      >
        {[...Array(4)].map((_, index) => (
          <NewsCard
            key={index}
            sx={{
              display: isSmallScreen
                ? currentCardIndex === index
                  ? "block"
                  : "none"
                : "block",
            }}
          />
        ))}

        {isSmallScreen && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              margin: "0 auto",
              mt: "8vh",
            }}
          >
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className={`circle ${
                  index === currentCardIndex ? "active" : ""
                }`}
                onClick={() => changeCard(index)}
              ></div>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};
