import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolver/member-detail.resolver';
import { MemberListResolver } from './_resolver/member-list.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolver/member-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { ExitsurveysComponent } from './exitsurveys/exitsurveys.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { GradseniorsurveysComponent } from './gradseniorsurveys/gradseniorsurveys.component';
import { ThesisprojectComponent } from './thesisproject/thesisproject.component';
import { RegisterComponent } from './register/register.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { ExitsurveysviewComponent } from './exitsurveysview/exitsurveysview.component';
import { GradseniorsurveysviewComponent } from './gradseniorsurveysview/gradseniorsurveysview.component';
import { ImportuserdataComponent } from './importuserdata/importuserdata.component';
import { ImportfacultydataComponent } from './importfacultydata/importfacultydata.component';
import { SemesterlistComponent } from './semesterlist/semesterlist.component';
import { SemesterformComponent } from './semesterform/semesterform.component';
import { TimetableComponent } from './timetable/timetable.component';

export const appRoutes: Routes = [
    { path : '', component: HomeComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path : 'mainpage', component: MainpageComponent },
            { path : 'members', component: MemberListComponent, resolve: {users: MemberListResolver}},
            { path : 'members/:id', component: MemberDetailComponent, resolve: {user: MemberDetailResolver}},
            { path : 'member/edit', component: MemberEditComponent, resolve: {user: MemberEditResolver},
                                    canDeactivate: [PreventUnsavedChanges]},
            { path : 'member/edit/:id', component: MemberEditComponent, resolve: {user: MemberEditResolver},
                                    canDeactivate: [PreventUnsavedChanges]},
            { path : 'exitsurveys', component: ExitsurveysComponent },
            { path : 'gradseniorsurveys', component: GradseniorsurveysComponent },
            { path : 'thesisproject', component: ThesisprojectComponent },
            { path : 'register', component: RegisterComponent },
            { path : 'admin', component: AdminPanelComponent, data: {roles: ['Admin', 'Staff' ]}},
            { path : 'exitsurveysview', component: ExitsurveysviewComponent },
            { path : 'gradseniorsurveysview', component: GradseniorsurveysviewComponent },
            { path : 'importuserdata', component: ImportuserdataComponent },
            { path : 'importfacultydata', component: ImportfacultydataComponent },
            { path : 'semesterlist', component: SemesterlistComponent },
            { path: 'semesterform', component: SemesterformComponent },
            { path: 'timetable/:id', component: TimetableComponent }
        ]
    },
    { path : '**', redirectTo: '', pathMatch: 'full' }
];
