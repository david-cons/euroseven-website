import f1 from "../assets/f1.jpeg";
import f2 from "../assets/f2.jpeg";
import f3 from "../assets/f3.jpeg";
import f4 from "../assets/f4.jpeg";
import f5 from "../assets/f5.jpeg";
import j1 from "../assets/j1.jpeg";
import j2 from "../assets/j2.jpeg";
import j3 from "../assets/j3.jpeg";
import j4 from "../assets/j4.jpeg";
import j5 from "../assets/j5.jpeg";
import { useState, useEffect } from "react";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, Button, IconButton } from "@mui/material";
import logo2 from "../assets/logo2.png";
export const Jumbotron = () => {
  const images = [j1, f5, j3, j4, j5];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const imageSwitchInterval = setInterval(() => {
      // Increment the image index, looping back to 0 when it reaches the end
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000); // Switch image every 10 seconds

    return () => clearInterval(imageSwitchInterval);
  }, [images]);

  const changeImage = (index: number) => {
    setCurrentImageIndex(index);
  };
  return (
    <Box
      className="jumbotron-container"
      sx={{
        width: "100%",
        height: "93vh",
        overflow: "hidden", // Prevent horizontal scrollbar
        position: "relative",
      }}
    >
      {images.map((image, index) => (
        <img
          key={index}
          height="100%"
          src={image}
          alt="jumbotron"
          className={`jumbotron ${index === currentImageIndex ? "active" : ""}`}
          style={{
            width: "100%", // Maintain aspect ratio and cover the container
            height: "100%",
            objectFit: "cover",
            position: "absolute", // Ensure images are absolutely positioned
            top: 0, // Position images at the top
            left: 0, // Position images at the left
            opacity: index === currentImageIndex ? 1 : 0, // Apply the fade-in effect to the active image
            animation:
              index === currentImageIndex ? "zoom-in 20s ease-in-out" : "none", // Apply the zoom-in animation to the active image
            transition: "opacity 1s ease",
          }}
        />
      ))}

      <Box
        className="jumbotron-overlay"
        sx={{
          position: "absolute",
          top: "5%",
          left: "50%",
          width: "100%",
          transform: "translate(-50%, -50%)",
          padding: "20px",
          color: "#fff" /* Text color */,
          display: "flex",
        }}
      >
        <img height="100px" src={logo2} alt="logo2" />
        <Box sx={{ ml: "25vh", mt: "3vh" }}>
          <Button
            variant="text"
            sx={{ mr: "25px", fontWeight: "bold", color: "white" }}
          >
            Clienti Rezidentiali
          </Button>
          <Button
            variant="text"
            sx={{ mr: "25px", fontWeight: "bold", color: "white" }}
          >
            Clienti Business
          </Button>
          <Button
            variant="text"
            sx={{ mr: "25px", fontWeight: "bold", color: "white" }}
          >
            Electripedia
          </Button>
          <Button
            variant="text"
            sx={{ mr: "25px", fontWeight: "bold", color: "white" }}
          >
            Servicii Online
          </Button>
          <Button
            variant="text"
            sx={{ mr: "25px", fontWeight: "bold", color: "white" }}
          >
            Informatii Utile
          </Button>
          <Button variant="text" sx={{ fontWeight: "bold", color: "white" }}>
            Plafonare
          </Button>
        </Box>
        <Box sx={{ ml: "34vh", mt: "2vh" }}>
          <IconButton>
            <PermIdentityIcon
              sx={{
                mr: "10px",
                width: "30px",
                height: "35px",
                color: "white",
              }}
            />
          </IconButton>
          <IconButton>
            <SearchIcon
              sx={{
                mr: "10px",
                width: "30px",
                height: "35px",
                color: "white",
              }}
            />
          </IconButton>
          <IconButton>
            <MenuIcon
              sx={{ width: "30px", height: "35px", color: "white" }}
            />
          </IconButton>
        </Box>
      </Box>
      <Box
        sx={{
          position: "absolute",
          bottom: "0",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          mb: "15px",
        }}
      >
        {images.map((_, index) => (
          <div
            key={index}
            className={`circle ${index === currentImageIndex ? "active" : ""}`}
            onClick={() => changeImage(index)}
          ></div>
        ))}
      </Box>
    </Box>
  );
};
