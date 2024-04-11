export interface Tymy {
  Blue: string,
  Red: string
}

export enum Target {
  Connect3,
  Connect4,
  None
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
  backupQuestions: Array<Question>,
  target?: Target
}

export interface JSONSettings {
  questions: Array<Question>,
  backupQuestions: Array<Question>,
  target?: Target,
}
