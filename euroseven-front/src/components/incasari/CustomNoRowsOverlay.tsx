import React from "react";

const CustomNoRowsOverlay = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        fontSize: "18px", // Customize font size
        color: "black", // Customize text color,
        fontFamily: "Catesque",
        width: "100%",
      }}
    >
      Nimic găsit.
    </div>
  );
};

export default CustomNoRowsOverlay;
