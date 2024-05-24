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

  const contentStyles = {
    display: isLoading ? "none" : "block", // Hide content when loading
    textAlign: "center",
    color: "white",
  };

  if (isLoading) {
    return (
      <div style={containerStyles}>
        <div>
          <h1>Loading...</h1>
          <p>Please wait while the models are being loaded.</p>
        </div>
        <Loader
          type="Circles" // Change to the desired loader type
          color="#00BFFF" // Customize the color of the loader
          height={100} // Customize the size of the loader
          width={100} // Customize the size of the loader
          containerStyles={containerStyles} // Flex layout styles
        />
      </div>
    );
  } else {
    return null; // Render nothing once loading is finished
  }
};

export default CustomLoadingScreen;
