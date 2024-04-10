import "./index.css";
import HexagonList from "./components/hexagonList/hexagonList";
import { useState } from "react";
import TymWin from "./types/TymWin";
import Tym from "./types/Tym";
import Question from "./components/question/question";
import updateTym from "./utils/updateTym";
import Skupiny from "./components/skupiny/Skupiny";
import canOpen from "./utils/canOpen";
import Settings from "./types/Settings";
import Config from "./components/config/Config";
import isNone from "./utils/isNone";

export default function index() {
  const [tymWinState, setTymWinState] = useState<Array<TymWin>>([]);
  const [showQuestion, setShowQuestion] = useState(false);
  const [questionNumber, setQuestionNumber] = useState<number>();
  const [settings, setSettings] = useState<Settings>();
  const [showConfig, setShowConfig] = useState(true);
  const [nextBackupQuestion, setNextBackupQuestion] = useState(-1);
  const [isBackup, setIsBackup] = useState(false);

  function open(questionNumber: number) {
    if (!canOpen(questionNumber, tymWinState)) return;
    if (isNone(questionNumber, tymWinState)) {
      setIsBackup(true);
      if (settings?.backupQuestions) {
        if (nextBackupQuestion + 1 >= settings?.backupQuestions?.length) {
          setNextBackupQuestion(0);
        } else {
          setNextBackupQuestion(nextBackupQuestion + 1);
        }
      } else {
        setNextBackupQuestion(0);
      }
    } else {
      setIsBackup(false);
    }
    setQuestionNumber(questionNumber);
    setShowQuestion(true);
  }
  function close() {
    setShowQuestion(false);
    setTymWinState(updateTym(tymWinState, Tym.None, questionNumber));
  }

  return (
    <>
      {showConfig ? (
        <Config
          setSettings={(set) => {
            setShowConfig(false);
            setSettings(set);
          }}
        />
      ) : null}
      {showQuestion ? (
        <Question
          close={close}
          questionNumber={questionNumber}
          settings={settings}
          isBackup={isBackup}
          nextBackupQuestion={nextBackupQuestion}
        />
      ) : null}
      {true ? (
        <>
          <Skupiny
            questionNumber={questionNumber}
            tymWinState={tymWinState}
            setTymWinState={setTymWinState}
            settings={settings}
          />
          <HexagonList openQuestion={open} tymWinState={tymWinState} />
        </>
      ) : null}
    </>
  );
}
