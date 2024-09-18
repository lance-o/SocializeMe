"use client";
import { useState } from "react";
import "./Image3D.css"; // CSS file for styling

import Image from "next/image";
export default function Image3D(props) {
  const [rotation, setRotation] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e) => {
    const { width, height, left, top } = e.target.getBoundingClientRect();
    const mouseX = e.clientX - left;
    const mouseY = e.clientY - top;

    // Calculate rotation based on mouse position
    const rotateY = (mouseX / width) * 30 - 25; // Tilt left/right
    const rotateX = -((mouseY / height) * 30) + 25; // Tilt up/down

    setRotation({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ rotateX: 0, rotateY: 0 }); // Reset rotation on mouse leave
  };

  return (
    <div
      className="img-container"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Image
        width={100}
        height={100}
        src={props.src}
        className="img"
        style={{
          transform: `rotateX(${rotation.rotateX}deg) rotateY(${rotation.rotateY}deg)`,
        }}
        alt="Fancy 3D Image"
      />
    </div>
  );
}
