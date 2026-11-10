import { Component } from '@angular/core';
import { EvaluationFormComponent } from './components/evaluation-form/evaluation-form.component';

@Component({
  selector: 'app-root',
  imports: [EvaluationFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ai-response-evaluator';
}
