import { Spinner } from "react-bootstrap";
import "./style.css";

export default function LoadingScreen() {
  return (
    <div className="loading">
      <Spinner
        as="span"
        role="status"
        aria-hidden="true"
        className="me-2"
        variant="secondary"
        style={{
          height: "60px",
          width: "60px",
          borderWidth: "7px"
        }}
      />
    </div>
  );
}
