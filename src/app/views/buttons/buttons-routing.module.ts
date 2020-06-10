import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EvaluationComponent } from './evaluation/evaluation.component';
import { EvaluationFormComponent } from './evaluation-form/evaluation-form.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Buttons'
    },
    children: [
      {
        path: '',
        redirectTo: 'buttons'
      },
      {
        path: 'evaluation',
        component: EvaluationComponent,
        data: {
          title: 'evaluate'
        }
      },
      {
        path: 'evaluate-form/:id',
        component: EvaluationFormComponent,
        data: {
          title: 'evaluate'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ButtonsRoutingModule {}
