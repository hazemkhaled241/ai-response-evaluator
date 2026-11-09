export type Criterion =
    | 'correctness'
    | 'instructionFollowing'
    | 'codeQuality'
    | 'clarity'
    | 'safety';

export type Score = 1 | 2 | 3 | 4 | 5;

export type ResponseScores = Record<Criterion, Score>;

export type Preference = 'A' | 'B' | 'tie';

export interface Evaluation {
    id: string,
    prompt: string,
    responseA: string,
    responseB: string,
    scoresA: ResponseScores,
    scoresB: ResponseScores,
    preferred: Preference,
    justification: string,
    createdAt: string
}




export type NewEvaluation = Omit<Evaluation, 'id' | 'createdAt'>;