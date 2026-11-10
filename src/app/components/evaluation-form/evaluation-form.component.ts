import { Component, inject, signal } from '@angular/core';
import { CRITERIA, Criterion, Preference, Score, SCORES } from '../../model/evaluation.model';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { LowerCasePipe } from '@angular/common';


const MIN_JUSTIFICATION = 30;

@Component({
  selector: 'app-evaluation-form',
  standalone: true,
  imports: [ReactiveFormsModule, LowerCasePipe],
  templateUrl: './evaluation-form.component.html',
  styleUrl: './evaluation-form.component.css'
})
export class EvaluationFormComponent {
  private fb = inject(FormBuilder);
  criteria = CRITERIA;
  scores = SCORES;
  minJustification = MIN_JUSTIFICATION;
  saved = signal(false);

  sides = [
    { label: 'A', response: 'responseA', scores: 'scoresA' },
    { label: 'B', response: 'responseB', scores: 'scoresB' },
  ] as const;
  form = this.fb.group({
    prompt: ['', Validators.required],
    responseA: ['', Validators.required],
    responseB: ['', Validators.required],
    scoresA: this.buildScoresGroup(),
    scoresB: this.buildScoresGroup(),
    preferred: [null as Preference | null, Validators.required],
    justification: ['', [Validators.required, Validators.minLength(30)]]
  });


  private buildScoresGroup() {
    const controls = {} as Record<Criterion, FormControl<Score | null>>;
    for (const criterion of CRITERIA) {
      controls[criterion.key] = this.fb.control<Score | null>(null, Validators.required);
    }
    return this.fb.group(controls);
  }


  get justificationLength(): number {
    return this.form.controls.justification.value?.trim().length ?? 0;
  }

  showError(path: string): boolean {
    const control = this.form.get(path);
    return !!control && control.invalid && control.touched;
  }


  onSubmit() {
    if (this.form.invalid) {
      this.form.markAsTouched();
      return;
    }
    else
      console.log(this.form.getRawValue());
    this.form.reset();
    this.saved.set(true);
    setTimeout(() => this.saved.set(false), 3000);
  }
}
