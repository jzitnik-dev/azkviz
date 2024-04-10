import Settings from "../../types/Settings";
import "./style.css";
import { useState } from "react";

interface Props {
  close: () => void;
  questionNumber?: number;
  settings?: Settings;
  isBackup: boolean;
  nextBackupQuestion: number;
}

export default function Question({
  close,
  questionNumber,
  settings,
  isBackup,
  nextBackupQuestion,
}: Props) {
  const [showReseni, setShowReseni] = useState(false);
  const question = isBackup
    ? settings?.backupQuestions[nextBackupQuestion]
    : settings?.questions[(questionNumber || 0) - 1];
  

  return (
    <div className="question">
      <h1 className="number">{questionNumber || ""}</h1>
      <div className="questions">
        {question?.question}<br />
        {question?.questionImageDataURI ? (
          <img src={question?.questionImageDataURI} />
        ) : null}
      </div>
      <div className="reseni" style={{ display: showReseni ? "block" : "none" }}>
        <h1>Řešení:</h1>
        <div className="reseniList">
          {question?.answer}<br />
          {question?.answerImageDataURI? (
            <img src={question?.answerImageDataURI} />
          ) : null}
        </div>
      </div>
      <div
        className="button resenibutton"
        onClick={() => setShowReseni(true)}
        style={{ display: showReseni ? "none" : "block" }}
      >
        Řešení
      </div>
      <div
        className="button backbutton"
        onClick={close}
        style={{ display: showReseni ? "block" : "none" }}
      >
        Zpět
      </div>
    </div>
  );
}
