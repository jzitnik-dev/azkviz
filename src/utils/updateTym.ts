import Tym from "../types/Tym";
import TymWin from "../types/TymWin";

export default function updateTym(
  tymWinList: Array<TymWin>,
  tym: Tym,
  questionNumber?: number,
): Array<TymWin> {
  if (!questionNumber) return tymWinList;

  const tymWinCopy = [...tymWinList];
  for (let i = 0; i < tymWinCopy.length; i++) {
    if (tymWinCopy[i].otazkaNumber == questionNumber) {
      tymWinCopy[i].tym = tym;
      return tymWinCopy;
    }
  }

  tymWinCopy.push({
    otazkaNumber: questionNumber,
    tym: tym,
  });

  return tymWinCopy
}
