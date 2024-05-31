import React, { useState, useEffect } from "react";
import { Loader } from "@react-three/drei";

const CustomLoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoading) {
      // When loading, hide the scrollbar
      document.body.style.overflow = "hidden";
    } else {
      // When loading is finished, show the scrollbar
      document.body.style.overflow = "auto";
    }
  }, [isLoading]);

  const containerStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background:
      "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(121,9,71,1) 35%, rgba(0,212,255,1) 100%)",
  };

  const loaderContainerStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
    background: "rgba(255, 255, 255, 0.8)",
  };

  const loaderStyles = {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#00BFFF",
  };

  if (isLoading) {
    return (
      <div style={containerStyles}>
        <div style={loaderContainerStyles}>
          <Loader
            type="Circles" // Change to the desired loader type
            color="#00BFFF" // Customize the color of the loader
            height={50} // Customize the size of the loader
            width={50} // Customize the size of the loader
          />
          <h1 style={loaderStyles}>Loading...</h1>
          <p style={loaderStyles}>
            Please wait while the models are being loaded.
          </p>
        </div>
      </div>
    );
  } else {
    return null; // Render nothing once loading is finished
  }
};

export default CustomLoadingScreen;
