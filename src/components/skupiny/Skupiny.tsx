import Settings from "../../types/Settings";
import Tym from "../../types/Tym";
import TymWin from "../../types/TymWin";
import updateTym from "../../utils/updateTym";
import "./style.css"

interface Props {
  tymWinState: Array<TymWin>,
  setTymWinState: React.Dispatch<React.SetStateAction<Array<TymWin>>>
  questionNumber?: number,
  settings: Settings
}

export default function Skupiny({
  tymWinState,
  setTymWinState,
  questionNumber,
  settings
}: Props) {
  function setTym(tym: Tym) {
    setTymWinState(updateTym(tymWinState, tym, questionNumber))
  }
  return <>
    <div className="skupina1" onClick={() => setTym(Tym.Red)}>{settings?.nazvyTymu?.Red}</div>
    <div className="skupina2" onClick={() => setTym(Tym.Blue)}>{settings?.nazvyTymu?.Blue}</div>
  </>
}
