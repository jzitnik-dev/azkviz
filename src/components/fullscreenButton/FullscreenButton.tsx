import { useState } from "react";
import "./style.css";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompress, faExpand } from "@fortawesome/free-solid-svg-icons";

export default function FullscreenButton() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement
        .requestFullscreen()
        .then(() => {
          setIsFullscreen(true);
        })
        .catch((err) => {
          console.error("Error attempting to enable full-screen mode:", err);
        });
    } else if (document.exitFullscreen) {
      document
        .exitFullscreen()
        .then(() => {
          setIsFullscreen(false);
        })
        .catch((err) => {
          console.error("Error attempting to exit full-screen mode:", err);
        });
    }
  };
  return (
    <Button
      className="fullscreenbutton"
      variant="light"
      onClick={toggleFullscreen}
    >
      <FontAwesomeIcon icon={!isFullscreen ? faExpand : faCompress} />
    </Button>
  );
}
