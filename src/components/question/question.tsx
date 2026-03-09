import Settings from "../../types/Settings";
import Tym from "../../types/Tym";
import "./style.css";
import { useState, useEffect, Dispatch, SetStateAction } from "react";

interface Props {
  close: () => void;
  questionNumber?: number;
  settings?: Settings;
  isBackup: boolean;
  nextBackupQuestion: number;
  answeringTeam: Tym;
  timeExpired: boolean;
  setTimeExpired: Dispatch<SetStateAction<boolean>>;
}

export default function Question({
  close,
  questionNumber,
  settings,
  isBackup,
  nextBackupQuestion,
  answeringTeam,
  timeExpired,
  setTimeExpired,
}: Props) {
  const [showReseni, setShowReseni] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | undefined>();
  const [timerStarted, setTimerStarted] = useState(false);
  const question = isBackup
    ? settings?.backupQuestions[nextBackupQuestion]
    : settings?.questions[(questionNumber || 0) - 1];

  useEffect(() => {
    if (settings?.answerTime && !showReseni && !timeExpired && timerStarted) {
      setTimeLeft(settings.answerTime);
      const interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === undefined || prev <= 1) {
            clearInterval(interval);
            setTimeExpired(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setTimeLeft(undefined);
    }
  }, [
    settings?.answerTime,
    showReseni,
    timeExpired,
    questionNumber,
    setTimeExpired,
    timerStarted,
  ]);

  useEffect(() => {
    if (showReseni) {
      setTimeLeft(undefined);
    }
  }, [showReseni]);


  const getOtherTeamName = () => {
    if (answeringTeam === Tym.Red) {
      return settings?.nazvyTymu.Blue;
    } else if (answeringTeam === Tym.Blue) {
      return settings?.nazvyTymu.Red;
    }
    return "";
  };

  return (
    <div className="question">
      <h1 className="number">{questionNumber || ""}</h1>
      
      {settings?.answerTime && !showReseni && timerStarted && (
        <div className="timer-display">
          {timeLeft !== undefined && (
            <div className={`timer ${timeLeft <= 5 ? "timer-warning" : ""}`}>
              {timeLeft}s
            </div>
          )}
        </div>
      )}

      {settings?.answerTime && timeExpired && !showReseni && timerStarted && (
        <div className="time-expired-message">
          Čas vypršel!{" "}
          {getOtherTeamName() ? `${getOtherTeamName()} může odpovídat` : ""}
        </div>
      )}

      <div className="questions">
        <span
          dangerouslySetInnerHTML={{ __html: question?.question || "" }}
        ></span>
        <br />
        {question?.questionImageDataURI ? (
          <img
            src={question?.questionImageDataURI}
            style={{ maxHeight: "500px" }}
          />
        ) : null}
      </div>
      <div className="reseni" style={{ display: showReseni ? "block" : "none" }}>
        <h1>Řešení:</h1>
        <div className="reseniList">
          <span dangerouslySetInnerHTML={{ __html: question?.answer || "" }}></span>
          <br />
          {question?.answerImageDataURI ? (
            <img
              src={question?.answerImageDataURI}
              style={{ maxHeight: "500px" }}
            />
          ) : null}
        </div>
      </div>

      {settings?.answerTime && !timerStarted && !showReseni ? (
        <div
          className="button timerbutton"
          onClick={() => setTimerStarted(true)}
        >
          Spustit odpočítávání
        </div>
      ) : (
        <div
          className="button resenibutton"
          onClick={() => setShowReseni(true)}
          style={{ display: showReseni ? "none" : "block" }}
        >
          Řešení
        </div>
      )}
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
