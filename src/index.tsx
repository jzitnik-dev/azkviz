import "./index.css";
import HexagonList from "./components/hexagonList/hexagonList";
import { useState, useEffect } from "react";
import TymWin from "./types/TymWin";
import Tym from "./types/Tym";
import Question from "./components/question/question";
import updateTym from "./utils/updateTym";
import Skupiny from "./components/skupiny/Skupiny";
import canOpen from "./utils/canOpen";
import Settings from "./types/Settings";
import Config from "./components/config/Config";
import isNone from "./utils/isNone";
import OriginalHexagonList from "./components/hexagonList/hexagonListOriginal";
import FullscreenButton from "./components/fullscreenButton/FullscreenButton";
import LoadingScreen from "./components/loadingScreen/LoadingScreen";

export default function Index() {
  const [tymWinState, setTymWinState] = useState<Array<TymWin>>([]);
  const [showQuestion, setShowQuestion] = useState(false);
  const [questionNumber, setQuestionNumber] = useState<number>();
  const [settings, setSettings] = useState<Settings>();
  const [showConfig, setShowConfig] = useState(true);
  const [nextBackupQuestion, setNextBackupQuestion] = useState(-1);
  const [isBackup, setIsBackup] = useState(false);
  const showedState = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

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
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <FullscreenButton />
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
          {!showConfig && !showQuestion ? (
            <>
              <Skupiny
                questionNumber={questionNumber}
                tymWinState={tymWinState}
                setTymWinState={setTymWinState}
                settings={settings}
                showedState={showedState}
              />
              {settings?.useOriginalType ? (
                <OriginalHexagonList
                  openQuestion={open}
                  tymWinState={tymWinState}
                />
              ) : (
                <HexagonList openQuestion={open} tymWinState={tymWinState} />
              )}
            </>
          ) : null}
        </>
      )}
    </>
  );
}
