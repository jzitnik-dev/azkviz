import { Target } from "../types/Settings";
import Tym from "../types/Tym";
import TymWin from "../types/TymWin";
import Settings from "../types/Settings";

type GraphData = {
  [node: number]: (number | undefined)[];
};
function getAdjacentOriginal(
  questionNumber: number,
): Array<number | undefined> {
  const data: GraphData = {
    1: [undefined, undefined, undefined, 3, 2, undefined],
    3: [1, undefined, undefined, 6, 5, 2],
    6: [3, undefined, undefined, 10, 9, 5],
    10: [6, undefined, undefined, 15, 14, 9],
    15: [10, undefined, undefined, 21, 20, 14],
    21: [15, undefined, undefined, 28, 27, 20],
    28: [21, undefined, undefined, undefined, undefined, 27],
    27: [20, 21, 28, undefined, undefined, 26],
    26: [19, 20, 27, undefined, undefined, 25],
    25: [18, 19, 26, undefined, undefined, 24],
    24: [17, 18, 25, undefined, undefined, 23],
    23: [16, 17, 24, undefined, undefined, 22],
    22: [undefined, 16, 23, undefined, undefined, undefined],
    16: [undefined, 11, 17, 23, 22, undefined],
    11: [undefined, 7, 12, 17, 16, undefined],
    7: [undefined, 4, 8, 12, 11, undefined],
    4: [undefined, 2, 5, 8, 7, undefined],
    2: [undefined, 1, 3, 5, 4, undefined],
    5: [2, 3, 6, 9, 8, 4],
    9: [5, 6, 10, 14, 13, 8],
    8: [5, 9, 13, 12, 7, 4],
    12: [7, 8, 13, 18, 17, 11],
    13: [8, 9, 14, 19, 18, 12],
    14: [9, 10, 15, 20, 29, 23],
    17: [11, 12, 18, 24, 23, 16],
    18: [12, 13, 19, 25, 24, 17],
    19: [13, 14, 20, 26, 25, 18],
    20: [14, 15, 21, 27, 26, 19],
  };

  return data[questionNumber];
}
function getAdjacent(questionNumber: number): Array<number | undefined> {
  const data: GraphData = {
    1: [undefined, undefined, 2, 7, 6, undefined],
    2: [undefined, undefined, 3, 8, 7, 1],
    3: [undefined, undefined, 4, 9, 8, 2],
    4: [undefined, undefined, 5, 10, 9, 3],
    5: [undefined, undefined, undefined, undefined, 10, 4],
    10: [4, 5, undefined, undefined, 15, 9],
    15: [9, 10, undefined, undefined, 20, 14],
    20: [14, 15, undefined, undefined, 20, 14],
    25: [19, 20, undefined, undefined, undefined, 24],
    24: [18, 19, 25, undefined, undefined, 23],
    23: [17, 18, 24, undefined, undefined, 22],
    22: [16, 17, 23, undefined, undefined, 21],
    21: [16, 22, undefined, undefined, undefined, undefined],
    16: [undefined, 11, 17, 22, 21, undefined],
    11: [undefined, 6, 12, 17, 16, undefined],
    6: [undefined, 1, 7, 12, 11, undefined],
  };

  if (Object.keys(data).includes(questionNumber.toString())) {
    return data[questionNumber];
  }

  const adjacent = [
    questionNumber - 6,
    questionNumber - 5,
    questionNumber + 1,
    questionNumber + 6,
    questionNumber + 5,
    questionNumber - 1,
  ].map((el) => {
    if (el <= 25 && el >= 1) {
      return el;
    } else {
      return undefined;
    }
  });

  return adjacent;
}

function getPath(
  winTymState: TymWin[],
  questionNumber: number,
  tym: Tym,
  settings: Settings,
  previousPath?: Set<number>,
): Set<number> {
  const adjacent = settings.useOriginalType
    ? getAdjacentOriginal(questionNumber)
    : getAdjacent(questionNumber);
  const converted: { [key: number]: Tym } = {};
  winTymState.forEach((el) => {
    converted[el.otazkaNumber] = el.tym;
  });
  const finalAd = adjacent.filter(
    (el) => el !== undefined && converted[el] == tym && !previousPath?.has(el),
  );
  let path: Set<number> = previousPath || new Set();
  path.add(questionNumber);

  for (const number of finalAd) {
    path.add(number || 0);
    path = new Set([
      ...path,
      ...getPath(winTymState, number || 0, tym, settings, path),
    ]);
  }

  return path;
}
function testWinPath(path: Set<number>, target: Target, settings: Settings) {
  if (settings.useOriginalType) {
    const data = {
      left: new Set([1, 2, 4, 7, 11, 16, 22]),
      right: new Set([1, 3, 6, 10, 15, 21, 28]),
      bottom: new Set([22, 23, 24, 25, 26, 27, 28]),
    };

    function hasCommonElement(set1: Set<number>, set2: Set<number>) {
      for (const item of set1) {
        if (set2.has(item)) {
          return true;
        }
      }
      return false;
    }

    const leftState = hasCommonElement(data.left, path);
    const rightState = hasCommonElement(data.right, path);
    const bottomState = hasCommonElement(data.bottom, path);

    const sideCount = [
      leftState,
      rightState,
      bottomState,
    ].filter(Boolean).length;

    if (sideCount >= 3) {
      return true;
    }
    return false;
  }
  const data = {
    leftTop: new Set([1, 6, 11, 16, 21]),
    rightTop: new Set([1, 2, 3, 4, 5]),
    rightBottom: new Set([5, 10, 15, 20, 25]),
    leftBottom: new Set([25, 24, 23, 22, 21]),
  };

  function hasCommonElement(set1: Set<number>, set2: Set<number>) {
    for (const item of set1) {
      if (set2.has(item)) {
        return true;
      }
    }
    return false;
  }

  const leftTopState = hasCommonElement(data.leftTop, path);
  const rightTopState = hasCommonElement(data.rightTop, path);
  const rightBottomState = hasCommonElement(data.rightBottom, path);
  const leftBottomState = hasCommonElement(data.leftBottom, path);

  const sideCount = [
    leftTopState,
    rightTopState,
    rightBottomState,
    leftBottomState,
  ].filter(Boolean).length;

  if (target == Target.Connect3 && sideCount >= 3) {
    return true;
  } else if (target == Target.Connect4 && sideCount >= 4) {
    return true;
  }

  return false;
}

function testWinTym(winTymState: TymWin[], tym: Tym, target: Target, settings: Settings): boolean {
  const converted: Array<number> = [];
  let discovered: Set<number> = new Set();
  winTymState.forEach((el) => {
    if (el.tym == tym) {
      converted.push(el.otazkaNumber);
    }
  });

  for (const el of converted) {
    if (discovered.has(el)) {
      continue;
    }
    const path = getPath(winTymState, el, tym, settings);
    discovered = new Set([...discovered, ...path]);

    if (testWinPath(path, target, settings)) {
      return true;
    }
  }

  return false;
}

export default function testWin(
  winTymState: TymWin[],
  target: Target,
  settings: Settings
): Tym | undefined {
  if (testWinTym(winTymState, Tym.Red, target, settings)) {
    return Tym.Red;
  } else if (testWinTym(winTymState, Tym.Blue, target, settings)) {
    return Tym.Blue;
  }
}
