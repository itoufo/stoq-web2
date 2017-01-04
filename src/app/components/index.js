"use strict";
/**
 * エラー関連
 */
var errors_1 = require("./errors");
exports.NotFoundComponent = errors_1.NotFoundComponent;
exports.ServerErrorComponent = errors_1.ServerErrorComponent;
/**
 * レイアウト関係
 */
var layouts_1 = require("./layouts");
exports.HeaderComponent = layouts_1.HeaderComponent;
exports.FooterComponent = layouts_1.FooterComponent;
exports.SidebarComponent = layouts_1.SidebarComponent;
exports.RightSidebarComponent = layouts_1.RightSidebarComponent;
exports.PopupComponent = layouts_1.PopupComponent;
/**
 * ユーザ関連
 */
var users_1 = require("./users");
exports.UserAnalysisComponent = users_1.UserAnalysisComponent;
/**
 * 認証関係
 */
var auth_1 = require("./auth");
exports.LoginComponent = auth_1.LoginComponent;
exports.SignupComponent = auth_1.SignupComponent;
exports.ConfirmationComponent = auth_1.ConfirmationComponent;
exports.ResetPasswordComponent = auth_1.ResetPasswordComponent;
/**
 * コース関連
 */
var courses_1 = require("./courses");
exports.CoursesAddQuestionComponent = courses_1.CoursesAddQuestionComponent;
exports.CoursesEditComponent = courses_1.CoursesEditComponent;
exports.CoursesIndexComponent = courses_1.CoursesIndexComponent;
exports.CoursesNewComponent = courses_1.CoursesNewComponent;
exports.CoursesPublicIndexComponent = courses_1.CoursesPublicIndexComponent;
exports.CoursesShowComponent = courses_1.CoursesShowComponent;
exports.CoursesFormComponent = courses_1.CoursesFormComponent;
exports.CoursesComponent = courses_1.CoursesComponent;
/**
 * Question関連
 */
var questions_1 = require("./questions");
exports.QuestionAnalyzeComponent = questions_1.QuestionAnalyzeComponent;
exports.QuestionsFormComponent = questions_1.QuestionsFormComponent;
exports.QuestionsNewComponent = questions_1.QuestionsNewComponent;
/**
 * エントリー関連
 */
var activity_entry_1 = require("./activity_entry");
exports.ActivityEntryIndexComponent = activity_entry_1.ActivityEntryIndexComponent;
/**
 * トレーニング関係
 */
var activity_entry_2 = require("./activity_entry");
exports.EntryComponent = activity_entry_2.EntryComponent;
exports.TrainingComponent = activity_entry_2.TrainingComponent;
exports.TrainingResultComponent = activity_entry_2.TrainingResultComponent;
exports.EntriesComponent = activity_entry_2.EntriesComponent;
/**
 * グループ関連
 */
var groups_1 = require("./groups");
exports.GroupsNewComponent = groups_1.GroupsNewComponent;
exports.GroupsShowComponent = groups_1.GroupsShowComponent;
exports.GroupsIndexComponent = groups_1.GroupsIndexComponent;
exports.GroupsEditComponent = groups_1.GroupsEditComponent;
exports.GroupsFormComponent = groups_1.GroupsFormComponent;
/**
 * 答え関係
 */
var answers_1 = require("./answers");
exports.AnswersFormComponent = answers_1.AnswersFormComponent;
//# sourceMappingURL=index.js.map