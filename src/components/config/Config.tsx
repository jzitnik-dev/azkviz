import Settings, { Question, Target, JSONSettings } from "../../types/Settings";
import CreateQuestionModal from "./CreateQuestionModal";
import "./style.css";
import { useState, useRef } from "react";
import { Button, Form, Spinner, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faPlus,
  faSave,
  faTrash,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";

interface Params {
  setSettings: (settings: Settings) => void;
}

export default function Config({ setSettings }: Params) {
  const [showMainPage, setShowMainPage] = useState(true);
  const [showCreateConfig, setShowCreateConfig] = useState(false);
  const [mainOtazky, setMainOtazky] = useState<Array<Question>>([]);
  const [secondOtazky, setSecondOtazky] = useState<Array<Question>>([]);
  const [creatingOtazka, setCreatingOtazka] = useState(false);
  const [creatingMainOtazka, setCreatingMainOtazka] = useState(false);
  const [showTymy, setShowTymy] = useState(false);
  const [skupinajednaName, setSkupinajednaName] = useState("");
  const [skupinadvaName, setSkupinadvaName] = useState("");
  const [savetoFileLoading, setSavetoFileLoading] = useState(false);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [target, setTarget] = useState(Target.None);
  const [useOriginal, setUseOriginal] = useState(true);

  function changeTarget(event: React.ChangeEvent<HTMLSelectElement>) {
    if (event.target.value == "none") {
      setTarget(Target.None);
    } else if (event.target.value == "3") {
      setTarget(Target.Connect3);
    } else if (event.target.value == "4") {
      setTarget(Target.Connect4);
    }
  }
  function importConfig() {
    fileInputRef.current?.click();
  }
  function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    setLoadingUpload(true);
    if (event.target.files && event.target.files.length > 0) {
      const image = event.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const data = JSON.parse(reader.result as string) as JSONSettings;

        setMainOtazky(data.questions);
        setSecondOtazky(data.backupQuestions);
        if (data.target == 0) {
          setTarget(Target.Connect3);
        } else if (data.target == 1) {
          setTarget(Target.Connect4);
        } else if (data.target == 2) {
          setTarget(Target.None);
        }
        setUseOriginal(data.questions.length === 28);

        setTimeout(() => {
          event.target.value = "";
          setLoadingUpload(false);
          setShowCreateConfig(false);
          setShowMainPage(false);
          setShowTymy(true);
        }, 1000);
      };

      reader.readAsText(image);
    }
  }
  function start() {
    setSettings({
      questions: mainOtazky,
      backupQuestions: secondOtazky,
      nazvyTymu: {
        Red: skupinajednaName,
        Blue: skupinadvaName,
      },
      target: target,
      useOriginalType: useOriginal,
    });
  }
  function saveAndContinue() {
    if (mainOtazky.length != (useOriginal ? 28 : 25)) {
      alert(`Musíte mít ${useOriginal ? "28" : "25"} hlavních otázek!`);
      return;
    }
    if (secondOtazky.length < 1) {
      alert("Musíte mít alespoň jednu náhradní otázku!");
      return;
    }

    setShowCreateConfig(false);
    setShowTymy(true);
  }
  function saveToFile() {
    setSavetoFileLoading(true);
    if (mainOtazky.length != (useOriginal ? 28 : 25)) {
      alert(`Musíte mít ${useOriginal ? "28" : "25"} hlavních otázek!`);
      setSavetoFileLoading(false);
      return;
    }
    if (secondOtazky.length < 1) {
      alert("Musíte mít alespoň jednu náhradní otázku!");
      setSavetoFileLoading(false);
      return;
    }

    const settings = {
      questions: mainOtazky,
      backupQuestions: secondOtazky,
      target: target,
    };
    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," +
        encodeURIComponent(JSON.stringify(settings)),
    );
    element.setAttribute("download", "az-kviz_záloha.json");

    element.style.display = "none";
    document.body.appendChild(element);

    setTimeout(() => {
      setSavetoFileLoading(false);
    }, 2000);

    element.click();

    document.body.removeChild(element);
  }

  function removeMainQuestion(id: number) {
    setMainOtazky(mainOtazky.filter((e) => e.id != id));
  }
  function removeSecondQuestion(id: number) {
    setSecondOtazky(secondOtazky.filter((e) => e.id != id));
  }
  function createMainOtazka() {
    setCreatingOtazka(true);
    setCreatingMainOtazka(true);
  }
  function createSecondOtazka() {
    setCreatingOtazka(true);
    setCreatingMainOtazka(false);
  }
  function closeOtazka() {
    setCreatingOtazka(false);
  }
  function saveOtazka(otazka: Question) {
    if (creatingMainOtazka) {
      const otazky = [...mainOtazky];
      otazky.push(otazka);
      setMainOtazky(otazky);
    } else {
      const otazky = [...secondOtazky];
      otazky.push(otazka);
      setSecondOtazky(otazky);
    }
  }

  return (
    <div className="settings">
      <CreateQuestionModal
        showModal={creatingOtazka}
        handleClose={closeOtazka}
        handleSave={saveOtazka}
      />
      {showMainPage ? (
        <>
          <h1>AZ-kvíz</h1>
          <div className="buttonsList">
            <Button onClick={importConfig}>
              {loadingUpload ? (
                <>
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  Nahrávání...
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faUpload}></FontAwesomeIcon>
                  &nbsp;&nbsp;Importovat konfiguraci
                </>
              )}
            </Button>
            <Button
              onClick={() => {
                setShowMainPage(false);
                setShowCreateConfig(true);
              }}
            >
              <>
                <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                &nbsp;&nbsp;Vytvořit konfiguraci
              </>
            </Button>
          </div>
          <div
            style={{
              textAlign: "left",
              paddingBottom: "50px",
              marginTop: "10px",
            }}
          >
            <h2>Vytvoření konfigurace</h2>
            <p>
              Při prvním použití si musíte vytvořit konfiguraci. Stiskněte na
              "Vytvořit konfiguraci". Vyberete typ hry. Máte na výber originální
              nebo vlastní. Při originálním vyberete 28 hlavních otázek, při
              vlastním 25 hlavních otázek a taky záložní otázky. Následně si
              veberete cíl hry. Systém využívá cíl hry pro zjištění stavu a
              upozorní při výhře jednoho z týmů.&nbsp;
              <strong>
                Poté vysoce doporučuji si uložit konfiguraci, protože nyní když
                stránku zavřete, konfigurace se vám smaže.&nbsp;
              </strong>
              Poté klikněte "Pokračovat" a vyberte názvy týmu. (názvy týmu
              nejsou nikdy uloženy do souboru)
            </p>
            <h2>Jak hrát</h2>
            <p>
              Vyberte políčku a ukáže se vám otázka. Poté co odpovíte na otázku
              stiskněte na tlačítko s nápisem "Řešení". Jakmile máte řešení
              zkontrolované stiskněte "Zpět". Nyní se vrátíte zpět na herní
              pole. Políčko které jste vybrali zešedne. Nyní můžete vybrat jaká
              skupina danou otázku uhodlo pomocí tlačítek vlevo nahoře a vpravo
              nahoře. Pokud žádná skupina otázku neuhodla, pole necháváte šedé.
            </p>
            <h2>Náhradní otázky</h2>
            <p>
              Pokud kliknete na šedé políčko stránka vám vybere náhodnou záložní
              otázku z listu záložních otázek. Pokud budete mít málo záložních
              otázek, otázky se mohou začít opakovat.
            </p>
            <h2>Základní informace</h2>
            <p>
              Upravitelný AZ-Kvíz jako webová stránka. Webová stránka je napsaná
              v TypeScriptu.{" "}
              <a
                href="https://github.com/JZITNIK-github/azkviz"
                target="_blank"
              >
                Zdrojový kód
              </a>
              <br />
              <strong>Hrací pole funguje pouze na počítači.</strong>
            </p>
          </div>
          <footer style={{ bottom: 0, position: "fixed" }}>
            <p>
              © Copyright <a href="https://jzitnik.dev">Jakub Žitník</a>. All
              rights reserved.
            </p>
          </footer>
        </>
      ) : null}
      {showCreateConfig ? (
        <>
          <Button
            className="backButton"
            onClick={() => {
              setMainOtazky([]);
              setSecondOtazky([]);
              setShowCreateConfig(false);
              setShowMainPage(true);
            }}
            variant="secondary"
          >
            <>
              <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
              &nbsp;&nbsp;Zpět
            </>
          </Button>
          <Button
            className="rightButton"
            variant="success"
            onClick={saveToFile}
          >
            {savetoFileLoading ? (
              <>
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Ukládání...
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faSave}></FontAwesomeIcon>
                &nbsp;&nbsp;Uložit konfiguraci do souboru{" "}
              </>
            )}
          </Button>
          <h1>Vytvoření konfigurace</h1>
          <p>Zde si vložíte otázky a odpovědi a nastavíte hru.</p>
          <hr />
          <div>
            <h2>Typ hry</h2>

            <Row className={"justify-content-center"}>
              <Col md={"auto"} className={"text-center"}>
                <div
                  className={
                    "d-flex justify-content-center align-items-center rounded border border-3 border-primary mx-auto " +
                    (useOriginal ? "bg-primary" : "bg-light opacity-60")
                  }
                  style={{
                    transition: "all 0.2s",
                    width: 300,
                    height: 300,
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setUseOriginal(true);
                  }}
                >
                  <img
                    src={"img/original.png"}
                    alt={"Classická verze"}
                    height={275}
                    width={275}
                    style={{
                      objectFit: "contain",
                    }}
                    draggable="false"
                  />
                </div>
                <p className={"mt-2 fw-semibold "}>Originální (doporučuji)</p>
              </Col>
              <Col md={"auto"} className={"text-center"}>
                <div
                  className={
                    "d-flex justify-content-center align-items-center rounded border border-3 border-primary mx-auto " +
                    (!useOriginal ? "bg-primary" : "bg-light opacity-60")
                  }
                  style={{
                    transition: "all 0.2s",
                    width: 300,
                    height: 300,
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setUseOriginal(false);
                  }}
                >
                  <img
                    src={"/img/custom.png"}
                    alt={"Classická verze"}
                    height={275}
                    width={275}
                    style={{
                      objectFit: "contain",
                    }}
                    draggable="false"
                  />
                </div>
                <p className={"mt-2 fw-semibold "}>Vlastní</p>
              </Col>
            </Row>
          </div>
          <hr />
          <div>
            <h2>{useOriginal ? 28 : 25} hlavních otázek</h2>
            <small>
              {mainOtazky.length}/{useOriginal ? 28 : 25}
            </small>
            <div className="buttonsList">
              <Button
                onClick={createMainOtazka}
                disabled={mainOtazky.length >= (useOriginal ? 28 : 25)}
              >
                <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                &nbsp;&nbsp;Přidat otázku
              </Button>
            </div>
            <div className="otazkyList">
              {mainOtazky.map((el) => {
                return (
                  <div className="otazka" key={el.id}>
                    <div>
                      <h4>Otázka:</h4>
                      <p>{el.question.replace(/<br>/g, " ")}</p>
                    </div>
                    <div>
                      <h4>Odpověd:</h4>
                      <p>{el.answer.replace(/<br>/g, " ")}</p>
                    </div>

                    <div>
                      <Button
                        variant="danger"
                        onClick={() => removeMainQuestion(el.id)}
                      >
                        <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                        &nbsp;&nbsp;Odstranit
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <hr />
          <div>
            <h2>Náhradní otázky</h2>
            <p>
              Tyto otázky jsou využity při odpovídání šedého políčka. Doporučuji
              minimálně 5 náhradních otázek.
            </p>
            <div className="buttonsList">
              <Button onClick={createSecondOtazka}>
                <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                &nbsp;&nbsp;Přidat otázku
              </Button>
            </div>
            <div className="otazkyList">
              {secondOtazky.map((el) => {
                return (
                  <div className="otazka">
                    <div>
                      <h4>Otázka:</h4>
                      <p>{el.question.replace(/<br>/g, " ")}</p>
                    </div>
                    <div>
                      <h4>Odpověd:</h4>
                      <p>{el.answer.replace(/<br>/g, " ")}</p>
                    </div>

                    <div>
                      <Button
                        variant="danger"
                        onClick={() => removeSecondQuestion(el.id)}
                      >
                        <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                        &nbsp;&nbsp;Odstranit
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
            <hr />
            <div>
              <h2>Cíl hry</h2>
              <p>
                Systém využívá cíl hry pro zjištění stavu a upozorní při výhře
                jednoho z týmů.{" "}
              </p>
              <div className="buttonsList">
                <Form.Select
                  onChange={changeTarget}
                  style={{ width: "fit-content" }}
                >
                  <option value="none">Žádný</option>
                  <option value="3">Propojit 3 strany</option>
                  {!useOriginal ? (
                    <option value="4">Propojit 4 strany</option>
                  ) : null}
                </Form.Select>
              </div>
            </div>
            <hr />
            <strong>
              Před pokračováním doporučuji si konfiguraci uložit!!!
            </strong>
            <br />
            <Button variant="success" onClick={saveAndContinue}>
              Prokračovat&nbsp;&nbsp;
              <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
            </Button>
            <br />
            <br />
          </div>
        </>
      ) : null}
      {showTymy ? (
        <>
          <Button
            className="backButton"
            variant="secondary"
            onClick={() => {
              setMainOtazky([]);
              setSecondOtazky([]);
              setShowTymy(false);
              setShowMainPage(true);
            }}
          >
            <>
              <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
              &nbsp;&nbsp;Zpět
            </>
          </Button>
          <h1>Týmy</h1>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              textAlign: "left",
            }}
          >
            <Form
              style={{
                border: "1px solid black",
                padding: "30px",
                margin: "10px",
                borderRadius: "10px",
                backgroundColor: "white",
              }}
            >
              <Form.Group>
                <Form.Text>1. Skupina</Form.Text>
                <Form.Control
                  type="text"
                  placeholder="Název první skupiny"
                  value={skupinajednaName}
                  onChange={(event) => {
                    setSkupinajednaName(event.target.value);
                  }}
                ></Form.Control>
              </Form.Group>
              <hr />
              <Form.Group>
                <Form.Text>2. Skupina</Form.Text>
                <Form.Control
                  type="text"
                  placeholder="Název druhé skupiny"
                  value={skupinadvaName}
                  onChange={(event) => {
                    setSkupinadvaName(event.target.value);
                  }}
                ></Form.Control>
              </Form.Group>
              <hr />
              <Button onClick={start}>Začít</Button>
            </Form>
          </div>
        </>
      ) : null}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        style={{ display: "none" }}
        accept="application/json"
      />
    </div>
  );
}
