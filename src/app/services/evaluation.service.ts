import { computed, Injectable, signal, Signal } from '@angular/core';
import { Evaluation, NewEvaluation, PreferencePair } from '../model/evaluation.model';

const STORAGE_KEY = 'ai-response-evaluator:evaluations';
@Injectable({
  providedIn: 'root'
})
export class EvaluationService {
  private readonly _evaluations = signal<Evaluation[]>(this.load())
  readonly evaluations = this._evaluations.asReadonly();
  readonly count = computed(() => {
    this._evaluations.length;
  })
  constructor() { }

  add(data: NewEvaluation): Evaluation {
    const evaluation: Evaluation = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    }
    this._evaluations.update((list) => [evaluation, ...list]);
    this.save();
    return evaluation;

  }

  remove(id: string): void {
    this._evaluations.update((list) => list.filter((e) => e.id !== id));
    this.save();
  }

  clear(): void {
    this._evaluations.set([]);
    this.save();
  }
  //2 bueatify
  toJson(): string {
    return JSON.stringify(this._evaluations(), null, 2);
  }
  private load(): Evaluation[] {
    try {
      const row = localStorage.getItem(STORAGE_KEY);
      const parsed: unknown = row ? JSON.parse(row) : [];
      return Array.isArray(parsed) ? parsed as Evaluation[] : [];
    } catch {
      return [];
    }
  }

  toPreferenceJsonl(): string {
    return this.toPreferencePairs()
      .map((pair) => JSON.stringify(pair))
      .join('\n');
  }

  toPreferencePairs(): PreferencePair[] {
    return this._evaluations()
      .filter((e) => e.preferred !== 'tie')
      .map((e) => ({
        prompt: e.prompt,
        chosen: e.preferred === 'A' ? e.responseA : e.responseB,
        rejected: e.preferred === 'A' ? e.responseB : e.responseA,
        justification: e.justification,
      }));
  }

  private save(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this._evaluations))
    } catch (e) {
      throw (e);
    }
  }
}
