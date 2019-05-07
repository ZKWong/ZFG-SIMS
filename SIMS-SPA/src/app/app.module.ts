import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule, TabsModule, BsDatepickerModule, PaginationModule, ButtonsModule, ModalModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxGalleryModule } from 'ngx-gallery';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { AlertifyService } from './_services/alertify.service';
import { MemberListComponent } from './members/member-list/member-list.component';
import { appRoutes } from './routes';
import { AuthGuard } from './_guards/auth.guard';
import { UserService } from './_services/user.service';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolver/member-detail.resolver';
import { MemberListResolver } from './_resolver/member-list.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolver/member-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { ExitsurveysComponent } from './exitsurveys/exitsurveys.component';
import { GradseniorsurveysComponent } from './gradseniorsurveys/gradseniorsurveys.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { ThesisprojectComponent } from './thesisproject/thesisproject.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { HasRoleDirective } from './_directives/hasRole.directive';
import { PhotoManagementComponent } from './admin/photo-management/photo-management.component';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { AdminService } from './_services/admin.service';
import { RolesModalComponent } from './admin/roles-modal/roles-modal.component';
import { AgGridModule } from '../../node_modules/ag-grid-angular';
import { ExitsurveysviewComponent } from './exitsurveysview/exitsurveysview.component';
import { GradseniorsurveysviewComponent } from './gradseniorsurveysview/gradseniorsurveysview.component';
import { FileUploadModule } from 'ng2-file-upload';
import { ImportuserdataComponent } from './importuserdata/importuserdata.component';
import { ImportfacultydataComponent } from './importfacultydata/importfacultydata.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TooltipModule } from 'ng2-tooltip-directive';
import { SemesterService } from './services/semester.service';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { DndModule } from 'ng2-dnd';
import { AppMaterialModule } from './app.material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SemesterlistComponent } from './semesterlist/semesterlist.component';
import { SemesterformComponent } from './semesterform/semesterform.component';
import { TimetableComponent } from './timetable/timetable.component';
import { CourseformComponent } from './courseform/courseform.component';
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';


export function tokenGetter() {
   return localStorage.getItem('token');
}

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      MemberListComponent,
      MemberCardComponent,
      MemberDetailComponent,
      MemberEditComponent,
      ExitsurveysComponent,
      GradseniorsurveysComponent,
      MainpageComponent,
      ThesisprojectComponent,
      AdminPanelComponent,
      HasRoleDirective,
      UserManagementComponent,
      PhotoManagementComponent,
      PhotoEditorComponent,
      RolesModalComponent,
      ExitsurveysviewComponent,
      GradseniorsurveysviewComponent,
      ImportuserdataComponent,
      ImportfacultydataComponent,
      SemesterlistComponent,
      SemesterformComponent,
      TimetableComponent,
      CourseformComponent,
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      BsDropdownModule.forRoot(),
      BsDatepickerModule.forRoot(),
      PaginationModule.forRoot(),
      TabsModule.forRoot(),
      ButtonsModule.forRoot(),
      RouterModule.forRoot(appRoutes),
      ModalModule.forRoot(),
      AgGridModule.withComponents(null),
      NgxGalleryModule,
      FileUploadModule,
      DragDropModule,
      NgbModule,
      TooltipModule,
      NgxMaterialTimepickerModule,
      DndModule.forRoot(),
      AppMaterialModule,
      BrowserAnimationsModule,
      JwtModule.forRoot({
         config: {
            tokenGetter: tokenGetter,
            whitelistedDomains: ['localhost:5000'],
            blacklistedRoutes: ['localhost:5000/api/auth']
         }
      })
   ],
   providers: [
      AuthService,
      ErrorInterceptorProvider,
      AlertifyService,
      AuthGuard,
      UserService,
      MemberDetailResolver,
      MemberListResolver,
      MemberEditResolver,
      PreventUnsavedChanges,
      AdminService,
      SemesterService
   ],
   entryComponents: [
      RolesModalComponent,
      CourseformComponent
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
