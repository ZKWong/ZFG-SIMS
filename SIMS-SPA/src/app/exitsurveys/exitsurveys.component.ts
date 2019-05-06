import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import * as Survey from 'survey-angular';
import * as widgets from 'surveyjs-widgets';

import 'inputmask/dist/inputmask/phone-codes/phone.js';
import { environment } from 'src/environments/environment';
import { AlertifyService } from '../_services/alertify.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../_services/auth.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../_services/user.service';
import {Injector} from '@angular/core';
import { User } from '../_models/user';
export let InjectorInstance: Injector;


widgets.icheck(Survey);
widgets.select2(Survey);
widgets.inputmask(Survey);
widgets.jquerybarrating(Survey);
widgets.jqueryuidatepicker(Survey);
widgets.nouislider(Survey);
widgets.select2tagbox(Survey);
widgets.signaturepad(Survey);
widgets.sortablejs(Survey);
widgets.ckeditor(Survey);
widgets.autocomplete(Survey);
widgets.bootstrapslider(Survey);
widgets.prettycheckbox(Survey);

Survey.Survey.cssType = 'bootstrap';
Survey.JsonObject.metaData.addProperty('questionbase', 'popupdescription:text');
Survey.JsonObject.metaData.addProperty('page', 'popupdescription:text');

@Component({
  selector: 'app-exitsurveys',
  templateUrl: './exitsurveys.component.html',
  styleUrls: ['./exitsurveys.component.css']
})
export class ExitsurveysComponent implements OnInit {
  @Output() submitSurvey = new EventEmitter<any>();

  @Input()
  json: object;
  surveyModel: Survey.Model;
  rawModel: {};
  student1: User;
  surveyJson: any = {
    pages: [
      {
        name: 'exitsurvey',
        elements: [
          {
            name: 'surveyDate',
            title: 'Date',
            type: 'text',
            inputType: 'date',
            isRequired: true,
          },
          {
            name: 'studentName',
            title: 'Name',
            type: 'text',
            isRequired: true
          },
          {
            name: 'ssId',
            title: 'Student ID',
            type: 'text',
            /*validators: [
              {
                type: 'numeric',
                minValue: 850000000,
                maxValue: 859999999
              }
            ]*/
          },
          {
            name: 'degreeProgram',
            title: 'Select one of your Computer Science degree program',
            type: 'radiogroup',
            colCount: 4,
            choices: ['B.A.', 'B.S.', 'M.S.', 'Ph.D.'],
            isRequired: true
          },
          {
            type: 'dropdown',
            title: 'Term of Expected Graduation',
            name: 'termGraduateSemester',
            isRequired: true,
            choices: [
              'Spring',
              'Summer',
              'Fall'
            ],
          },
          {
            name: 'termGraduateYear',
            title: 'Year',
            type: 'text',
            isRequired: true,
            validators: [
              {
                type: 'numeric'
              }
            ]
          },
          {
            type: 'html',
            html: '<h5>Personal Contact Information</h5>'
          },
          {
            name: 'contact1Name',
            type: 'text',
            isRequired: true,
            title: 'Name'
          },
          {
            type: 'text',
            name: 'contact1Address',
            isRequired: true,
            title: 'Address'
          },
          {
            type: 'text',
            name: 'contact1PhoneHome',
            title: 'Home Phone',
            validators: [
              {
                type: 'numeric'
              }
            ]
          },
          {
            type: 'text',
            name: 'contact1PhoneWork',
            title: 'Work Phone',
            validators: [
              {
                type: 'numeric'
              }
            ]
          },
          {
            type: 'text',
            name: 'contact1PhoneCell',
            title: 'Cell Phone',
            isRequired: true,
            validators: [
              {
                type: 'numeric'
              }
            ]
          },
          {
            type: 'text',
            name: 'contact1Email',
            title: 'Email',
            isRequired: true,
            validators: [
              {
                  type: 'email'
              }
            ]
          },
          {
            type: 'radiogroup',
            name: 'contactOtherOption',
            title: 'Please select:',
            titleLocation: 'left',
            choices: [
              'Parent',
              'Sibling',
              'Other Relative',
              'Friend'
            ],
            colCount: 4
          },
          {
            type: 'html',
            html: '<h5>Other Contact Information</h5>'
          },
          {
            name: 'contact2Name',
            type: 'text',
            title: 'Name'
          },
          {
            type: 'text',
            name: 'contact2Address',
            title: 'Address'
          },
          {
            type: 'text',
            name: 'contact2PhoneHome',
            title: 'Home Phone',
            validators: [
              {
                type: 'numeric'
              }
            ]
          },
          {
            type: 'text',
            name: 'contact2PhoneWork',
            title: 'Work Phone',
            validators: [
              {
                type: 'numeric'
              }
            ]
          },
          {
            type: 'text',
            name: 'contact2PhoneCell',
            title: 'Cell Phone',
            validators: [
              {
                type: 'numeric'
              }
            ]
          },
          {
            type: 'text',
            name: 'contact2Email',
            title: 'Email',
            validators: [
              {
                  type: 'email'
              }
            ]
          },
          {
            name: 'assessQ',
            // tslint:disable-next-line:max-line-length
            title: 'Please rate your expectations about the CS program (EX = Exceeds; MT = Meets; ' +
               'MA = Marginally Acceptable; UN = Unacceptable)',
            type: 'matrix',
            isRequired: true,
            columns: [
              {
               value: 'Exceeds',
               text: 'EX'
              },
              {
               value: 'Meets',
               text: 'MT'
              },
              {
               value: 'Marginally Acceptable',
               text: 'MA'
              },
              {
               value: 'Unacceptable',
               text: 'UN'
              }
             ],
             rows: [
              {
               value: 'assessQ1',
               text: 'The advisement quality in the department'
              },
              {
               value: 'assessQ2',
               text: 'The program prepared me for my career'
              },
              {
               value: 'assessQ3',
               text: 'The quality of the education I have received in the department'
              }
            ]
          },
          {
            name: 'assessComment',
            title: 'Please write any recommendation you have to improve the CS program',
            type: 'comment'
          },
          {
            type: 'html',
            html: '<h5>If you have decided to pursue a graduate or professional degree, please provide the following information:</h5>'
          },
          {
            name: 'furtherStudySchool',
            type: 'text',
            title: 'School'
          },
          {
            name: 'furtherStudyMajor',
            type: 'text',
            title: 'Major'
          },
          {
            name: 'furtherStudyScholarship',
            type: 'text',
            title: 'Scholarship/Assistantship'
          },
          {
            type: 'html',
            html: '<h5>If you have started searching for employment, please provide the following information:</h5>'
          },
          {
            type: 'text',
            name: 'jobSearchDuration',
            title: 'Number of months searching:'
          },
          {
            type: 'text',
            name: 'jobSearchNumInterview',
            title: 'Number of interviews you had:'
          },
          {
            type: 'text',
            name: 'jobSearchNumOffer',
            title: 'Number of job offers obtained:'
          },
          {
            type: 'text',
            name: 'jobSearchAvgSalary',
            title: 'Average starting salary offered:'
          },
          {
            type: 'html',
            html: '<h5>If you have already accepted an offer, please provide the following information if possible:</h5>'
          },
          {
            type: 'text',
            name: 'jobCompany',
            title: 'Company:'
          },
          {
            type: 'text',
            name: 'jobCity',
            title: 'City:'
          },
          {
            type: 'text',
            name: 'jobTitle',
            title: 'Position/Title:'
          },
          {
            type: 'text',
            name: 'jobCompanyContact',
            title: 'Your Company contact information (if available):'
          },
          {
            type: 'text',
            name: 'jobCompanyWeb',
            title: 'Web address:'
          },
          {
            type: 'text',
            name: 'jobSalary',
            title: 'Starting salary:'
          },
         {
          type: 'radiogroup',
          name: 'NetworkingQ1',
          isRequired: true,
          title: 'May we refer students to you for questions regarding the CS field as career?',
          choices: [
            'YES',
            'NO'
          ],
          colCount: 2
        },
        {
          type: 'radiogroup',
          name: 'NetworkingQ2',
          isRequired: true,
          title: 'Can students use you as a contact for possible job prospects?',
          choices: [
            'YES',
            'NO'
          ],
          colCount: 2
        },
        ]
      }]
  };
  baseUrl = environment.apiUrl;

  constructor(private userService: UserService, private authService: AuthService,
    private http: HttpClient, private injector: Injector,
    private route: ActivatedRoute, private alertify: AlertifyService) { InjectorInstance = this.injector;  }

  ngOnInit() {
    this.student1 = JSON.parse(localStorage.getItem('user'));
    this.surveyModel = new Survey.Model(this.surveyJson);
    this.GetExitSurvey();
    this.surveyModel.onComplete.add(this.sendDataToServer);
    Survey.StylesManager.applyTheme('bootstrap');
    Survey.defaultBootstrapCss.navigationButton = 'btn btn-primary';
    Survey.SurveyNG.render('surveyElement', { model: this.surveyModel });
  }
  GetExitSurvey() {
    /*this.surveyModel.data = {};
    const user1 = JSON.parse(localStorage.getItem('user'));
    console.log('firstname:', user1.userName);
    this.http.get(this.baseUrl + 'ExitSurveys/GetExitSurvey/' + user1.userName).subscribe(
      (res: any) => {
        this.surveyModel.data = res;
        console.log(this.surveyModel.data);
      }, error => {
        this.alertify.error('GetExitSurveys() ' + error);
      }
    );*/
    this.surveyModel.data = {};
    this.rawModel         = {};
    let SsId              = this.student1['username'];
    let xDate             = new Date(Date.now()).toISOString();
    xDate                 = xDate.substr(0, 10);
    const oYear             = new Date(); // let
    const xYear             = oYear.getFullYear(); // let
    SsId                  = SsId.toLocaleLowerCase();
    if ((SsId.substr(0, 3) === 'siu') && (SsId.length > 11)) {SsId = SsId.substr(3, 9); }
    Object.assign(this.rawModel, {
      surveyDate: xDate,
      studentName: this.student1['username'],
      ssId: SsId,
      termGraduateYear: xYear
    });
    this.surveyModel.data = this.rawModel;
    const user1 = JSON.parse(localStorage.getItem('user'));
    this.http.get(this.baseUrl + 'ExitSurveys/GetExitSurvey/' + user1.username).subscribe(
      (res: any) => {
        this.rawModel = res;
        if (this.rawModel === null) { return; }
        if (this.rawModel === {})   { return; }
        let sDate = JSON.stringify(this.rawModel['surveyDate']);
        if (sDate.length > 10) {sDate = sDate.substr(1, 10); }
        this.rawModel['surveyDate'] = sDate;

         Object.assign(this.rawModel, {
          termGraduateSemester: this.rawModel['termGraDuateSemester'],
          termGraduateYear: this.rawModel['termGraDuateYear'],
          NetworkingQ1: this.rawModel['networkingQ1'],
          NetworkingQ2: this.rawModel['networkingQ2'],
          assessQ: {
            assessQ1: this.rawModel['assessQ1'],
            assessQ2: this.rawModel['assessQ2'],
            assessQ3: this.rawModel['assessQ3']
          }
        });
        this.surveyModel.data = this.rawModel;
        console.log(this.surveyModel.data);
      }, error => {
        this.alertify.error('GetExitSurveys() ' + error);
      }
    );
  }

  sendDataToServer(surveyModel) {
    const objSurvey = new ClassSurvey();
    objSurvey.sendData(surveyModel.data);
  }

}
export class ClassSurvey implements OnInit {
  baseUrl = environment.apiUrl;
  private http: HttpClient;
  constructor() {
    this.http = InjectorInstance.get<HttpClient>(HttpClient);
  }
  ngOnInit() {}

  sendData(surveyData) {
    console.log(surveyData);
    this.http.post( this.baseUrl + 'ExitSurveys', surveyData).subscribe(
      (res: any) => {
        console.log('Exit Survey Updated');
      }, error => {
        console.log('Exit Survey Update Error');
      }
    );
  }

}
