import { Component } from '@angular/core';
import { EvaluationFormComponent } from './components/evaluation-form/evaluation-form.component';
import { EvaluationListComponent } from './components/evaluation-list/evaluation-list.component';

@Component({
  selector: 'app-root',
  imports: [EvaluationFormComponent, EvaluationListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ai-response-evaluator';
}
