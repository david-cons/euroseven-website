import f5 from "../assets/f5.jpeg";
import j1 from "../assets/j1.jpeg";
import j3 from "../assets/j3.jpeg";
import j4 from "../assets/j4.jpeg";
import j5 from "../assets/j5.jpeg";
import { useState, useEffect, useRef, useMemo } from "react";
import { Box } from "@mui/material";
import { JumbotronOverlay } from "./JumbotronOverlay";

export const Jumbotron = () => {
  const images: string[] = useMemo(() => {
    return [j1, f5, j3, j4, j5];
  }, []);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [startX, setStartX] = useState<number | null>(null);
  const jumbotronImageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    let objectRef: HTMLImageElement | null = null;
    const handleImageTransition = () => {
      if (jumbotronImageRef.current) {
        objectRef = jumbotronImageRef.current;
        jumbotronImageRef.current.style.transition = "none";
        jumbotronImageRef.current.style.transform = "translateX(0)";
        setTimeout(() => {
          if (jumbotronImageRef.current) {
            jumbotronImageRef.current.style.transition =
              "transform 0.5s ease-in-out";
          }
        }, 0);
      }
    };

    if (jumbotronImageRef.current) {
      jumbotronImageRef.current.addEventListener(
        "transitionend",
        handleImageTransition
      );
    }

    return () => {
      if (objectRef) {
        objectRef.removeEventListener("transitionend", handleImageTransition);
      }
    };
  }, [currentImageIndex]);

  useEffect(() => {
    const imageSwitchInterval = setInterval(() => {
      // Increment the image index, looping back to 0 when it reaches the end
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000); // Switch image every 10 seconds

    return () => clearInterval(imageSwitchInterval);
  }, [images]);

  const handleMouseDown = (e: React.MouseEvent<HTMLImageElement>) => {
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
    if (startX !== null) {
      const deltaX = e.clientX - startX;
      if (jumbotronImageRef.current) {
        jumbotronImageRef.current.style.transform = `translateX(${deltaX}px)`;
      }
    }
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLImageElement>) => {
    if (startX !== null) {
      const deltaX = startX - e.clientX;
      if (Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
          changeImage(currentImageIndex + 1);
        } else {
          changeImage(currentImageIndex - 1);
        }
      }
      setStartX(null);
      if (jumbotronImageRef.current) {
        jumbotronImageRef.current.style.transform = "translateX(0)";
      }
    }
  };

  const changeImage = (index: number) => {
    if (index < 0) {
      index = images.length - 1;
    } else if (index >= images.length) {
      index = 0;
    }

    // Reset opacity for all images
    const imageElements = document.querySelectorAll(
      ".jumbotron:not(.jumbotron-overlay)"
    ) as NodeListOf<HTMLImageElement>;

    imageElements.forEach((imageElement) => {
      imageElement.style.opacity = "0";
    });

    // Set the new current image to full opacity
    if (imageElements[index]) {
      imageElements[index].style.opacity = "1";
    }

    setCurrentImageIndex(index);
  };

  return (
    <Box
      className="jumbotron-container"
      sx={{
        minWidth: "100%",
        minHeight: "89vh",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt="jumbotron"
          className={`jumbotron ${index === currentImageIndex ? "active" : ""}`}
          style={{
            width: "100%", // Maintain aspect ratio and cover the container
            height: "100%",
            objectFit: "cover",
            position: "absolute",
            top: 0,
            left: 0,
            opacity: index === currentImageIndex ? 1 : 0, // Apply the fade-in effect to the active image
            animation:
              index === currentImageIndex ? "zoom-in 20s ease-in-out" : "none", // Apply the zoom-in animation to the active image
            transition: "opacity 1s ease",
            flexShrink: 0,
          }}
          ref={jumbotronImageRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          draggable="false"
          unselectable="on"
        />
      ))}
      <JumbotronOverlay />
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
