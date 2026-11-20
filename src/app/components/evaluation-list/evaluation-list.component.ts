import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { EvaluationService } from '../../services/evaluation.service';
import { averageScore } from '../../model/evaluation.model';

@Component({
  selector: 'app-evaluation-list',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './evaluation-list.component.html',
  styleUrl: './evaluation-list.component.css'
})
export class EvaluationListComponent {

  private evaluationService = inject(EvaluationService);

  evaluations = this.evaluationService.evaluations;
  count = this.evaluationService.count;
  average = averageScore;


  remove(id: string): void {
    this.evaluationService.remove(id);
  }

  clearAll(): void {
    if (confirm('Delete all saved evaluations? This cannot be undone.')) {
      this.evaluationService.clear();
    }
  }

  exportJson(): void {
    this.download(this.evaluationService.toJson(), 'evaluations.json', 'application/json');
  }

  exportPreferencePairs(): void {
    this.download(
      this.evaluationService.toPreferenceJsonl(),
      'preference-pairs.jsonl',
      'application/x-ndjson',
    );
  }
  private download(content: string, fileName: string, type: string): void {
    const url = URL.createObjectURL(new Blob([content], { type }));
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
  }
}
