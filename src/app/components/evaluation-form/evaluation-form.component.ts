import { Component, inject } from '@angular/core';
import { Criterion, Score } from '../../model/evaluation.model';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

export const CRITERIA: { key: Criterion, label: string }[] = [
  { key: 'correctness', label: 'Correctness' },
  { key: 'instructionFollowing', label: 'Instruction following' },
  { key: 'codeQuality', label: 'Code quality' },
  { key: 'clarity', label: 'Clarity' },
  { key: 'safety', label: 'Safety' }
]
@Component({
  selector: 'app-evaluation-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './evaluation-form.component.html',
  styleUrl: './evaluation-form.component.css'
})
export class EvaluationFormComponent {
  private fb = inject(FormBuilder);
  criteria = CRITERIA;
  touched = false;
  form = this.fb.group({
    prompt: ['', Validators.required],
    responseA: ['', Validators.required],
    responseB: ['', Validators.required],
    scoresA: this.buildScoresGroup(),
    scoresB: this.buildScoresGroup(),
    preferred: [null, Validators.required],
    justification: ['', [Validators.required, Validators.minLength(30)]]
  });


  private buildScoresGroup() {
    const controls = {} as Record<Criterion, FormControl<Score | null>>;
    for (const criterion of CRITERIA) {
      controls[criterion.key] = this.fb.control<Score | null>(null, Validators.required);
    }
    return this.fb.group(controls);
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAsTouched();
      return;
    }
    else
      console.log(this.form.getRawValue());
  }
}
