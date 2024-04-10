import Tym from "../types/Tym";
import TymWin from "../types/TymWin";

export default function canOpen(questionNumber: number, winList: Array<TymWin>) {
  const questions: Array<number> = []
  winList.forEach(el => {
    if (el.tym == Tym.Blue || el.tym == Tym.Red) {
      questions.push(el.otazkaNumber)
    }
  })

  return !questions.includes(questionNumber)
}
