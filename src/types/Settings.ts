export interface Tymy {
  Blue: string,
  Red: string
}

export interface Question {
  id: number,
  question: string,
  answer: string,
  questionImageDataURI?: string,
  answerImageDataURI?: string,
}

export default interface Settings {
  nazvyTymu: Tymy,
  questions: Array<Question>,
  backupQuestions: Array<Question>
}
