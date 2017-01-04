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
  ResetPasswordComponent,
} from './components'

export const ROUTES: Routes = [
  { path: '',
    redirectTo: '/courses',
    pathMatch: 'full'

  },
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'reset_password', component: ResetPasswordComponent},
  { path: 'confirmation', component: ConfirmationComponent},
  { path: 'courses', component: CoursesComponent,
    children: [
      { path: 'public', component: CoursesPublicIndexComponent},
      { path: '', component: CoursesIndexComponent},
      { path: 'index', component: CoursesIndexComponent },
      { path: 'new', component: CoursesNewComponent },
      { path: 'new/parent/:parent_id', component: CoursesNewComponent },
      { path: ':course_id', component: CoursesShowComponent},
      {path: ':course_id/edit', component: CoursesEditComponent},
      {path: ':course_id/add_question', component: CoursesAddQuestionComponent},
    ]
  },
  { path: 'groups',
    children: [
      { path: 'new', component: GroupsNewComponent },
      { path: 'new/parent/:parent_id', component: GroupsNewComponent },
      { path: 'index', component: GroupsIndexComponent },
      { path: ':group_id/detail', component: GroupsShowComponent },
      { path: ':group_id/edit', component: GroupsEditComponent },
    ]
  },
  { path: 'question/analyze/:question_id', component: QuestionAnalyzeComponent, },
  {
    path: 'entry', component: EntryComponent,
    children: [
      { path: 'training', component: TrainingComponent},
    ]
  },
  { path: 'entries', component: EntriesComponent,
    children: [
      { path: '', component: ActivityEntryIndexComponent},
      { path: 'results/:entry_id', component: TrainingResultComponent},
    ]
  },
  { path: 'analysis', component: UserAnalysisComponent},
  { path: '**',    component: NoContentComponent },
];
