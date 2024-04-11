import Settings, { Target } from "../../types/Settings";
import Tym from "../../types/Tym";
import TymWin from "../../types/TymWin";
import updateTym from "../../utils/updateTym";
import "./style.css";
import testWin from "../../utils/testWin";
import { Modal, Button } from "react-bootstrap";
import { useState } from "react";

interface Props {
  tymWinState: Array<TymWin>;
  setTymWinState: React.Dispatch<React.SetStateAction<Array<TymWin>>>;
  questionNumber?: number;
  settings?: Settings;
  showedState: any
}

export default function Skupiny({
  tymWinState,
  setTymWinState,
  questionNumber,
  settings,
  showedState,
}: Props) {
  const [show, setShow] = useState(false);
  const [tymWin, setTymWin] = useState(Tym.None);
  const [showed, setShowed] = showedState;
  function setTym(tym: Tym) {
    setTymWinState(updateTym(tymWinState, tym, questionNumber));

    if (
      settings?.target == Target.Connect3 ||
      settings?.target == Target.Connect4
    ) {
      const win = testWin(tymWinState, settings?.target);

      if (win === Tym.Red || win === Tym.Blue) {
        setTymWin(win);
        setShow(true);
      }
    }
  }

  return (
    <>
      <Modal
        show={show && !showed}
        onHide={() => {
          setShow(false);
          setShowed(true);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Konec</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Skupina{" "}
          <strong>
            {tymWin === Tym.Red
              ? settings?.nazvyTymu.Red
              : settings?.nazvyTymu.Blue}
          </strong>
          &nbsp;vyhrává!
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              setShow(false);
              setShowed(true);
            }}
          >
            OK
          </Button>
        </Modal.Footer>
      </Modal>{" "}
      <div className="skupina1" onClick={() => setTym(Tym.Red)}>
        {settings?.nazvyTymu?.Red}
      </div>
      <div className="skupina2" onClick={() => setTym(Tym.Blue)}>
        {settings?.nazvyTymu?.Blue}
      </div>
    </>
  );
}
