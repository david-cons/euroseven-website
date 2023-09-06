import { Box, Button, Typography } from "@mui/material";
import logo1 from "./assets/logo1.png";
import logo2 from "./assets/logo2.png";
import f1 from "./assets/f1.jpeg";
import f2 from "./assets/f2.jpeg";
import f3 from "./assets/f3.jpeg";
import f4 from "./assets/f4.jpeg";
import f5 from "./assets/f5.jpeg";
import { useState, useEffect } from "react";
import "./App.css";

function App() {

  const images = [f1, f2, f3, f4, f5];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const imageSwitchInterval = setInterval(() => {
      // Increment the image index, looping back to 0 when it reaches the end
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000); // Switch image every 10 seconds

    return () => clearInterval(imageSwitchInterval);
  }, []);

  const currentImage = images[currentImageIndex];

  return (
    <Box>
      <Box
        sx={{
          height: "7vh",
          width: "100%",
          display: "flex",
          position: "relative",
        }}
      >
        <img
          height="50px"
          src={logo1}
          alt="logo1"
          style={{
            padding: "10px",
            top: "50%",
            position: "absolute",
            margin: "0",
            transform: "translateY(-50%)",
          }}
        />
        <Box
          sx={{
            top: "45%",
            position: "absolute",
            margin: "0",
            transform: "translateY(-50%)",
            left: "20vh",
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: "bold",
              flexGrow: 1,
              fontSize: "18px",
              color: "#0054a6",
            }}
          >
            MyEuroSeven
          </Typography>
          <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
            Creează-ți cont MyEuroSeven si bucură-te de toate beneficiile
            oferite.
          </Typography>
        </Box>
        <Button
          variant="contained"
          sx={{
            top: "50%",
            position: "absolute",
            margin: "0",
            transform: "translateY(-50%)",
            right: "5%",
            borderRadius: "20px",
            backgroundColor: "#0054a6",
            "&:hover": {
              backgroundColor: "#0054a6",
            },
          }}
        >
          Intra in Cont
        </Button>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          overflow: "hidden", // Prevent horizontal scrollbar
          position: "relative",
        }}
      >
        <img
          height="100%"
          src={currentImage}
          alt="jumbotron image"
          className="jumbotron-image"
          style={{
            animation: "zoom-in 20s ease infinite", // Apply the zoom-in animation on page load
            width: "100%", // Maintain aspect ratio and cover the container
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Box>
    </Box>
  );
}

export default App;
