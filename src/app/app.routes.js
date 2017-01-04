"use strict";
var no_content_1 = require('./no-content');
var components_1 = require('./components');
exports.ROUTES = [
    { path: '',
        redirectTo: '/courses',
        pathMatch: 'full'
    },
    { path: 'login', component: components_1.LoginComponent },
    { path: 'signup', component: components_1.SignupComponent },
    { path: 'confirmation', component: components_1.ConfirmationComponent },
    { path: 'courses', component: components_1.CoursesComponent,
        children: [
            { path: 'public', component: components_1.CoursesPublicIndexComponent },
            { path: '', component: components_1.CoursesIndexComponent },
            { path: 'index', component: components_1.CoursesIndexComponent },
            { path: 'new', component: components_1.CoursesNewComponent },
            { path: 'new/parent/:parent_id', component: components_1.CoursesNewComponent },
            { path: ':course_id', component: components_1.CoursesShowComponent },
            { path: ':course_id/edit', component: components_1.CoursesEditComponent },
            { path: ':course_id/add_question', component: components_1.CoursesAddQuestionComponent },
        ]
    },
    { path: 'groups',
        children: [
            { path: 'new', component: components_1.GroupsNewComponent },
            { path: 'new/parent/:parent_id', component: components_1.GroupsNewComponent },
            { path: 'index', component: components_1.GroupsIndexComponent },
            { path: ':group_id/detail', component: components_1.GroupsShowComponent },
            { path: ':group_id/edit', component: components_1.GroupsEditComponent },
        ]
    },
    { path: 'question/analyze/:question_id', component: components_1.QuestionAnalyzeComponent },
    {
        path: 'entry', component: components_1.EntryComponent,
        children: [
            { path: 'training', component: components_1.TrainingComponent },
        ]
    },
    { path: 'entries', component: components_1.EntriesComponent,
        children: [
            { path: '', component: components_1.ActivityEntryIndexComponent },
            { path: 'results/:entry_id', component: components_1.TrainingResultComponent },
        ]
    },
    { path: 'analysis', component: components_1.UserAnalysisComponent },
    { path: '**', component: no_content_1.NoContentComponent },
];
//# sourceMappingURL=app.routes.js.map