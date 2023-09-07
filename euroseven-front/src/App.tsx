import { Box, Button, IconButton, Typography } from "@mui/material";
import logo1 from "./assets/logo1.png";
import logo2 from "./assets/logo2.png";
import f1 from "./assets/f1.jpeg";
import f2 from "./assets/f2.jpeg";
import f3 from "./assets/f3.jpeg";
import f4 from "./assets/f4.jpeg";
import f5 from "./assets/f5.jpeg";
import card1 from "./assets/card1.jpeg";
import { useState, useEffect } from "react";
import "./App.css";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import SendIcon from "@mui/icons-material/Send";

function App() {
  const images = [f1, f2, f3, f4, f5];
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
        className="jumbotron-container"
        sx={{
          width: "100%",
          height: "80vh",
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
            className={`jumbotron ${
              index === currentImageIndex ? "active" : ""
            }`}
            style={{
              width: "100%", // Maintain aspect ratio and cover the container
              height: "100%",
              objectFit: "cover",
              position: "absolute", // Ensure images are absolutely positioned
              top: 0, // Position images at the top
              left: 0, // Position images at the left
              opacity: index === currentImageIndex ? 1 : 0, // Apply the fade-in effect to the active image
              animation:
                index === currentImageIndex
                  ? "zoom-in 20s ease-in-out"
                  : "none", // Apply the zoom-in animation to the active image
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
              sx={{ mr: "25px", fontWeight: "bold", color: "#0054a6" }}
            >
              Clienti Rezidentiali
            </Button>
            <Button
              variant="text"
              sx={{ mr: "25px", fontWeight: "bold", color: "#0054a6" }}
            >
              Clienti Business
            </Button>
            <Button
              variant="text"
              sx={{ mr: "25px", fontWeight: "bold", color: "#0054a6" }}
            >
              Electripedia
            </Button>
            <Button
              variant="text"
              sx={{ mr: "25px", fontWeight: "bold", color: "#0054a6" }}
            >
              Servicii Online
            </Button>
            <Button
              variant="text"
              sx={{ mr: "25px", fontWeight: "bold", color: "#0054a6" }}
            >
              Informatii Utile
            </Button>
            <Button
              variant="text"
              sx={{ fontWeight: "bold", color: "#0054a6" }}
            >
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
                  color: "#0054a6",
                }}
              />
            </IconButton>
            <IconButton>
              <SearchIcon
                sx={{
                  mr: "10px",
                  width: "30px",
                  height: "35px",
                  color: "#0054a6",
                }}
              />
            </IconButton>
            <IconButton>
              <MenuIcon
                sx={{ width: "30px", height: "35px", color: "#0054a6" }}
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
              className={`circle ${
                index === currentImageIndex ? "active" : ""
              }`}
              onClick={() => changeImage(index)}
            ></div>
          ))}
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: "#F4F4F4",
          width: "140vh",
          height: "45vh",
          margin: "0 auto",
          mt: "10vh",
          position: "relative",
          display: "flex",
        }}
      >
        <Typography
          variant="body1"
          component="div"
          sx={{
            fontWeight: "bold",
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            padding: "10px",
          }}
        >
          DESCOPERA OFERTELE DEDICATE
        </Typography>

        <Box
          sx={{
            width: "50vh",
            height: "25vh",
            position: "relative",
            top: "25%",
            display: "flex",
            ml: "5vh",
            mb: "10vh",
          }}
        >
          <Box
            sx={{
              height: "25vh",
              width: "35vh",
            }}
          >
            <img
              src={card1}
              alt="card1"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
          <Box
            sx={{
              width: "35vh",
              height: "20vh",
              float: "right",
              backgroundColor: "white",
              position: "absolute",
              top: "10%",
              right: "10%",
              textAlign: "center"
            }}
          >
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: "bold",
                color: "#0054a6",
                padding: "10px"
              }}
            >
              Plăteşte Factura Online
            </Typography>
            <Typography
              variant="body1"
              component="div"
              sx={{
                padding: "10px"
              }}
            >
              Este simplu, rapid şi sigur să plăteşti online factura Euro7
            </Typography>
            <Button variant="contained" endIcon={<SendIcon />} sx={{margin: "0 auto", backgroundColor: "#0054a6", width: "50%"}}>
              Plăteşte
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
