import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { NoContentComponent } from './no-content';

import { DataResolver } from './app.resolver';

import {
  CoursesComponent,
  CoursesNewComponent,
  CoursesEditComponent,
  ConfirmationComponent,
  CoursesIndexComponent,
  CoursesPublicIndexComponent,
  CoursesShowComponent,
  ActivityEntryIndexComponent,
  QuestionAnalyzeComponent,
  QuestionsFormComponent,
  QuestionsNewComponent,
  CoursesAddQuestionComponent,
  TrainingComponent,
  TrainingResultComponent,
  UserAnalysisComponent,
  SignupComponent,
  LoginComponent,
  EntriesComponent,
  EntryComponent,
  GroupsNewComponent,
  GroupsShowComponent,
  GroupsIndexComponent,
  GroupsEditComponent,
} from './components'

export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'home',  component: HomeComponent },
  { path: 'about', component: AboutComponent },
  {
    path: 'detail', loadChildren: () => System.import('./+detail')
      .then((comp: any) => comp.default),
  },
  { path: '**',    component: NoContentComponent },
];
