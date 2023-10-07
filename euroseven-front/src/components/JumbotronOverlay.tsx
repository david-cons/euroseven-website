import { Box, Button, IconButton } from "@mui/material";
import { LandingPageMenu } from "./LandingPageMenu";
import logo2 from "../assets/logo2.png";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useRef } from "react";

export const JumbotronOverlay = () => {
  const [isBoxVisible, setIsBoxVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setIsBoxVisible(!isBoxVisible);
    setIsOpen(!isOpen);
  };
  return (
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
      <Box sx={{ ml: "33vh", mt: "2vh" }}>
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
              mr: "12px",
              width: "30px",
              height: "35px",
              color: "#0054a6",
            }}
          />
        </IconButton>
      </Box>
      <a
        id="menu-icon"
        className={isOpen ? "close" : ""}
        onClick={handleClick}
        style={{ zIndex: isOpen ? 2 : 1 }}
      >
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </a>

      {isBoxVisible && <LandingPageMenu boxRef={boxRef} isOpen={isOpen} />}
    </Box>
  );
};
