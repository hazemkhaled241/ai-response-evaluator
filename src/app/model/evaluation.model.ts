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

export const CRITERIA: { key: Criterion; label: string }[] = [
    { key: 'correctness', label: 'Correctness' },
    { key: 'instructionFollowing', label: 'Instruction following' },
    { key: 'codeQuality', label: 'Code quality' },
    { key: 'clarity', label: 'Clarity' },
    { key: 'safety', label: 'Safety' },
];

export const SCORES: Score[] = [1, 2, 3, 4, 5];




export type NewEvaluation = Omit<Evaluation, 'id' | 'createdAt'>;

export interface PreferencePair {
    prompt: string;
    chosen: string;
    rejected: string;
    justification: string;
}