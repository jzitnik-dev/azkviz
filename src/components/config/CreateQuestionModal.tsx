import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { Question } from "../../types/Settings";
import { useState, useRef } from "react";

interface Props {
  showModal: boolean;
  handleClose: () => void;
  handleSave: (otazka: Question) => void;
}

export default function CreateQuestionModal({
  showModal,
  handleClose,
  handleSave,
}: Props) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [uploadingImageQuestion, setUploadingImageQuestion] = useState(false);
  const [uploadingAnswerImage, setUploadingAnswerImage] = useState(false);
  const questionInputRef = useRef<HTMLInputElement>(null);
  const [selectedQuestionImage, setSelectedQuestionImage] = useState<string>();
  const answerInputRef = useRef<HTMLInputElement>(null);
  const [selectedAnswerImage, setSelectedAnswerImage] = useState<string>();

  function handleQuestionFileUpload(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    setUploadingImageQuestion(true);
    if (event.target.files && event.target.files.length > 0) {
      const image = event.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const dataURI = reader.result;
        setTimeout(() => {
          setSelectedQuestionImage(dataURI as string);
          setUploadingImageQuestion(false);
          event.target.value = "";
        }, 1000);
      };

      reader.readAsDataURL(image);
    }
  }
  function selectQuestionFile() {
    questionInputRef.current?.click();
  }

  function handleAnswerFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    setUploadingAnswerImage(true);
    if (event.target.files && event.target.files.length > 0) {
      const image = event.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const dataURI = reader.result;
        setTimeout(() => {
          setSelectedAnswerImage(dataURI as string);
          setUploadingAnswerImage(false);
          event.target.value = "";
        }, 1000);
      };

      reader.readAsDataURL(image);
    }
  }
  function selectAnswerFile() {
    answerInputRef.current?.click();
  }

  return (
    <Modal show={showModal}>
      <input
        type="file"
        ref={questionInputRef}
        onChange={handleQuestionFileUpload}
        style={{ display: "none" }}
        accept="image/*"
      />
      <input
        type="file"
        ref={answerInputRef}
        onChange={handleAnswerFileUpload}
        style={{ display: "none" }}
        accept="image/*"
      />
      <Modal.Header>
        <Modal.Title>Vytvořit otázku</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Otázka</Form.Label>
            <Form.Control
              className="mb-2"
              type="text"
              placeholder="Zde vložte otázku"
              value={question}
              onChange={(event) => {
                setQuestion(event.target.value);
              }}
            />
            {selectedQuestionImage ? (
              <img
                src={selectedQuestionImage}
                style={{ maxWidth: "100%", maxHeight: "500px" }}
              />
            ) : (
              <>
                <Button
                  variant="secondary"
                  onClick={selectQuestionFile}
                  disabled={uploadingImageQuestion}
                >
                  <>
                    {uploadingImageQuestion ? (
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
                      <>Vložit obrázek</>
                    )}
                  </>
                </Button>
                <br />
                <Form.Text>
                  Pokud chcete, můžete taky vložit obrázek k otázce.
                </Form.Text>
              </>
            )}
          </Form.Group>
          <hr />
          <Form.Group className="mb-3">
            <Form.Label>Odpověď</Form.Label>
            <Form.Control
              className="mb-2"
              type="text"
              placeholder="Zde vložte odpověď"
              value={answer}
              onChange={(event) => {
                setAnswer(event.target.value);
              }}
            />
            {selectedAnswerImage ? (
              <img
                src={selectedAnswerImage}
                style={{ maxWidth: "100%", maxHeight: "500px" }}
              />
            ) : (
              <>
                <Button variant="secondary" onClick={selectAnswerFile}>
                  <>
                    {uploadingAnswerImage ? (
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
                      <>Vložit obrázek</>
                    )}
                  </>
                </Button>
                <br />
                <Form.Text>
                  Pokud chcete, můžete taky vložit obrázek k otázce.
                </Form.Text>
              </>
            )}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="danger"
          onClick={() => {
            setQuestion("");
            setAnswer("");
            setSelectedAnswerImage("");
            setSelectedQuestionImage("");
            handleClose();
          }}
        >
          Zavřít
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            handleSave({
              id: Math.random() * 10000000,
              question: question,
              answer: answer,
              questionImageDataURI: selectedQuestionImage,
              answerImageDataURI: selectedAnswerImage,
            });
            setQuestion("");
            setAnswer("");
            setSelectedAnswerImage("");
            setSelectedQuestionImage("");
            handleClose();
          }}
        >
          Uložit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
