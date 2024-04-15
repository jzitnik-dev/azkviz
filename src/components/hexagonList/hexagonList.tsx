import "./style.css";
import TymWin from "../../types/TymWin";
import Tym from "../../types/Tym";

interface Props {
  openQuestion: (questionNumber: number) => void;
  tymWinState: Array<TymWin>;
}

export default function HexagonList({ openQuestion, tymWinState }: Props) {
  const converted: { [key: number]: string} = {};
  tymWinState.forEach((el) => {
    if (el.tym == Tym.Red) {
      converted[el.otazkaNumber] = "red";
    }
    else if (el.tym == Tym.Blue) {
      converted[el.otazkaNumber] = "blue";
    }
    else if (el.tym == Tym.None) {
      converted[el.otazkaNumber] = "gray";
    }
  });
  return (
    <div className="hexagonListContainer">
      <div className="hexagonList">
        <div className="hex-row">
          <div className={"hex " + converted[1] || ""} style={{ marginLeft: "376px" }}>
            <span
              className="number"
              style={{ left: "423px", top: "20px" }}
              onClick={() => openQuestion(1)}
            >
              1
            </span>
            <div className="left"></div>
            <div className="middle"></div>
            <div className="right"></div>
          </div>
        </div>
        <div className="hex-row" style={{ marginLeft: "188px" }}>
          <div className={"hex even " + converted[11] || ""}>
            <span
              className="number"
              style={{ left: "225px", top: "130px" }}
              onClick={() => openQuestion(11)}
            >
              11
            </span>
            <div className="left"></div>
            <div className="middle"></div>
            <div className="right"></div>
          </div>
          <div className={"hex " + converted[6] || ""}>
            <span
              className="number"
              style={{ left: "330px", top: "80px" }}
              onClick={() => openQuestion(6)}
            >
              6
            </span>
            <div className="left"></div>
            <div className="middle"></div>
            <div className="right"></div>
          </div>
          <div className={"hex even " + converted[7] || ""}>
            <span
              className="number"
              style={{ left: "425px", top: "130px" }}
              onClick={() => openQuestion(7)}
            >
              7
            </span>
            <div className="left"></div>
            <div className="middle"></div>
            <div className="right"></div>
          </div>
          <div className={"hex " + converted[2] || ""}>
            <span
              className="number"
              style={{ left: "520px", top: "80px" }}
              onClick={() => openQuestion(2)}
            >
              2
            </span>
            <div className="left"></div>
            <div className="middle"></div>
            <div className="right"></div>
          </div>
          <div className={"hex even " + converted[3] || ""}>
            <span
              className="number"
              style={{ left: "614px", top: "130px" }}
              onClick={() => openQuestion(3)}
            >
              3
            </span>
            <div className="left"></div>
            <div className="middle"></div>
            <div className="right"></div>
          </div>
        </div>
        <div className="hex-row">
          <div className={"hex even " + converted[21] || ""}>
            <span
              className="number"
              style={{ left: "36px", top: "235px" }}
              onClick={() => openQuestion(21)}
            >
              21
            </span>
            <div className="left"></div>
            <div className="middle"></div>
            <div className="right"></div>
          </div>
          <div className={"hex " + converted[16] || ""}>
            <span
              className="number"
              style={{ left: "128px", top: "185px" }}
              onClick={() => openQuestion(16)}
            >
              16
            </span>
            <div className="left"></div>
            <div className="middle"></div>
            <div className="right"></div>
          </div>
          <div className={"hex even " + converted[17] || ""}>
            <span
              className="number"
              style={{ left: "223px", top: "238px" }}
              onClick={() => openQuestion(17)}
            >
              17
            </span>
            <div className="left"></div>
            <div className="middle"></div>
            <div className="right"></div>
          </div>
          <div className={"hex " + converted[12] || ""}>
            <span
              className="number"
              style={{ left: "317px", top: "182px" }}
              onClick={() => openQuestion(12)}
            >
              12
            </span>
            <div className="left"></div>
            <div className="middle"></div>
            <div className="right"></div>
          </div>
          <div className={"hex even " + converted[13] || ""}>
            <span
              className="number"
              style={{ left: "411px", top: "235px" }}
              onClick={() => openQuestion(13)}
            >
              13
            </span>
            <div className="left"></div>
            <div className="middle"></div>
            <div className="right"></div>
          </div>
          <div className={"hex " + converted[8] || ""}>
            <span
              className="number"
              style={{ left: "518px", top: "182px" }}
              onClick={() => openQuestion(8)}
            >
              8
            </span>
            <div className="left"></div>
            <div className="middle"></div>
            <div className="right"></div>
          </div>
          <div className={"hex even " + converted[9] || ""}>
            <span
              className="number"
              style={{ left: "614px", top: "234px" }}
              onClick={() => openQuestion(9)}
            >
              9
            </span>
            <div className="left"></div>
            <div className="middle"></div>
            <div className="right"></div>
          </div>
          <div className={"hex " + converted[4] || ""}>
            <span
              className="number"
              style={{ left: "705px", top: "182px" }}
              onClick={() => openQuestion(4)}
            >
              4
            </span>
            <div className="left"></div>
            <div className="middle"></div>
            <div className="right"></div>
          </div>
          <div className={"hex even " + converted[5] || ""}>
            <span
              className="number"
              style={{ left: "801px", top: "234px" }}
              onClick={() => openQuestion(5)}
            >
              5
            </span>
            <div className="left"></div>
            <div className="middle"></div>
            <div className="right"></div>
          </div>
        </div>
        <div className="hex-row" style={{ marginLeft: "94px" }}>
          <div className={"hex " + converted[22] || ""}>
            <span
              className="number"
              style={{ left: "129px", top: "289px" }}
              onClick={() => openQuestion(22)}
            >
              22
            </span>
            <div className="left"></div>
            <div className="middle"></div>
            <div className="right"></div>
          </div>
          <div className={"hex even " + converted[23] || ""}>
            <span
              className="number"
              style={{ left: "224px", top: "345px" }}
              onClick={() => openQuestion(23)}
            >
              23
            </span>
            <div className="left"></div>
            <div className="middle"></div>
            <div className="right"></div>
          </div>
          <div className={"hex " + converted[18] || ""}>
            <span
              className="number"
              style={{ left: "317px", top: "288px" }}
              onClick={() => openQuestion(18)}
            >
              18
            </span>
            <div className="left"></div>
            <div className="middle"></div>
            <div className="right"></div>
          </div>
          <div className={"hex even " + converted[19] || ""}>
            <span
              className="number"
              style={{ left: "411px", top: "343px" }}
              onClick={() => openQuestion(19)}
            >
              19
            </span>
            <div className="left"></div>
            <div className="middle"></div>
            <div className="right"></div>
          </div>
          <div className={"hex " + converted[14] || ""}>
            <span
              className="number"
              style={{ left: "505px", top: "290px" }}
              onClick={() => openQuestion(14)}
            >
              14
            </span>
            <div className="left"></div>
            <div className="middle"></div>
            <div className="right"></div>
          </div>
          <div className={"hex even " + converted[15] || ""}>
            <span
              className="number"
              style={{ left: "599px", top: "343px" }}
              onClick={() => openQuestion(15)}
            >
              15
            </span>
            <div className="left"></div>
            <div className="middle"></div>
            <div className="right"></div>
          </div>
          <div className={"hex " + converted[10] || ""}>
            <span
              className="number"
              style={{ left: "694px", top: "288px" }}
              onClick={() => openQuestion(10)}
            >
              10
            </span>
            <div className="left"></div>
            <div className="middle"></div>
            <div className="right"></div>
          </div>
        </div>
        <div className="hex-row">
          <div className={"hex " + converted[24] || ""} style={{ marginLeft: "282px" }}>
            <span
              className="number"
              style={{ left: "318px", top: "400px" }}
              onClick={() => openQuestion(24)}
            >
              24
            </span>
            <div className="left"></div>
            <div className="middle"></div>
            <div className="right"></div>
          </div>
          <div className={"hex even " + converted[25] || ""}>
            <span
              className="number"
              style={{ left: "413px", top: "451px" }}
              onClick={() => openQuestion(25)}
            >
              25
            </span>
            <div className="left"></div>
            <div className="middle"></div>
            <div className="right"></div>
          </div>
          <div className={"hex " + converted[20] || ""}>
            <span
              className="number"
              style={{ left: "506px", top: "400px" }}
              onClick={() => openQuestion(20)}
            >
              20
            </span>
            <div className="left"></div>
            <div className="middle"></div>
            <div className="right"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
