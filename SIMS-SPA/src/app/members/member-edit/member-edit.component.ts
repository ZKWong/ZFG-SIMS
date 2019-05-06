import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { User } from 'src/app/_models/user';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { isNull } from 'util';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  user: User;
  faculty: User[];
  userParams: any = {};
  pagination: Pagination;
  bsConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  bscStartDate = '';
  bscGradDate = '';
  msStartDate = '';
  msCommFormDate = '';
  msDefenseDate = '';
  msGradDate = '';
  docStartDate = '';
  docAcceptDate = '';
  docCommFormDate = '';
  docDefenseDate = '';
  docGradDate = '';
  bsDate = '';
  bgDate = '';
  msDate = '';
  mcfDate = '';
  mdDate = '';
  mgDate = '';
  dsDate = '';
  daDate = '';
  dcfDate = '';
  ddDate = '';
  dgDate = '';
  usrName = '';

  baseUrl    = environment.apiUrl;
  rowData = [];
  bDegreeBsc = true;
  bDegreeMaster = false;
  bDegreePhd    = false;
  Advisors_Extra: any = [];
  Advisors: any = [];

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private route: ActivatedRoute, private alertify: AlertifyService,
    private userService: UserService, private authService: AuthService, 
    private http: HttpClient) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
      this.bsDate = this.user['bachelorsStartDate'];
      console.log('ngOnInit bsDate: ', this.bsDate);
      this.bscStartDate = this.bsDate.substring(3, 5) + '/' + this.bsDate.substring(0, 2) + '/' + this.bsDate.substring(6, 10);
      this.user['bachelorsStartDate'] = this.bscStartDate;
      console.log('ngOnInit bsDate: ', this.bsDate, this.user['bachelorsStartDate']);

      this.bgDate = this.user['bachelorsGradDate'];
      this.bscGradDate = this.bgDate.substring(3, 5) + '/' + this.bgDate.substring(0, 2) + '/' + this.bgDate.substring(6, 10);
      this.user['bachelorsGradDate'] = this.bscGradDate;

      this.msDate = this.user['mastersStartDate'];
      this.msStartDate = this.msDate.substring(3, 5) + '/' + this.msDate.substring(0, 2) + '/' + this.msDate.substring(6, 10);
      this.user['mastersStartDate'] = this.msStartDate;

      this.mcfDate = this.user['mastersCommFormDate'];
      this.msCommFormDate = this.mcfDate.substring(3, 5) + '/' + this.mcfDate.substring(0, 2) + '/' + this.mcfDate.substring(6, 10);
      this.user['mastersCommFormDate'] = this.msCommFormDate;

      this.mdDate = this.user['mastersDefenseDate'];
      this.msDefenseDate = this.mdDate.substring(3, 5) + '/' + this.mdDate.substring(0, 2) + '/' + this.mdDate.substring(6, 10);
      this.user['mastersDefenseDate'] = this.msDefenseDate;

      this.mgDate = this.user['mastersGradDate'];
      this.msGradDate = this.mgDate.substring(3, 5) + '/' + this.mgDate.substring(0, 2) + '/' + this.mgDate.substring(6, 10);
      this.user['mastersGradDate'] = this.msGradDate;

      this.dsDate = this.user['doctorateStartDate'];
      this.docStartDate = this.dsDate.substring(3, 5) + '/' + this.dsDate.substring(0, 2) + '/' + this.dsDate.substring(6, 10);
      this.user['doctorateStartDate'] = this.docStartDate;

      this.daDate = this.user['dateAcceptedForCandidacy'];
      this.docAcceptDate = this.daDate.substring(3, 5) + '/' + this.daDate.substring(0, 2) + '/' + this.daDate.substring(6, 10);
      this.user['dateAcceptedForCandidacy'] = this.docAcceptDate;

      this.dcfDate = this.user['doctorateCommFormDate'];
      this.docCommFormDate = this.dcfDate.substring(3, 5) + '/' + this.dcfDate.substring(0, 2) + '/' + this.dcfDate.substring(6, 10);
      this.user['doctorateCommFormDate'] = this.docCommFormDate;

      this.ddDate = this.user['dissertationDefenseDate'];
      this.docDefenseDate = this.ddDate.substring(3, 5) + '/' + this.ddDate.substring(0, 2) + '/' + this.ddDate.substring(6, 10);
      this.user['dissertationDefenseDate'] = this.docDefenseDate;

      this.dgDate = this.user['doctorateGradDate'];
      this.docGradDate = this.dgDate.substring(3, 5) + '/' + this.dgDate.substring(0, 2) + '/' + this.dgDate.substring(6, 10);
      this.user['doctorateGradDate'] = this.docGradDate;
       // if (!(this.user['bachelorsMentor'])) {this.user['bachelorsMentor'] = 'none';}
      this.usrName = this.user['username'];
      //console.log('ngOnInit', this.usrName, this.user);
    });
    this.userParams.role = 'Faculty';
    this.loadFaculty();
    this.GetUserData();
    this.GetAdvisorsData();
  }
  loadFaculty() {
    // console.log('loadfaculty:', this.userParams);
    this.userService.getUsers(null, null, this.userParams).subscribe((res: PaginatedResult<User[]>) => {
      this.faculty = res.result;
      console.log('Faculty', this.faculty);
      this.pagination = res.pagination;
    }, error => {
      this.alertify.error(error);
    });
  }

  updateUser() {
    // this.userService.updateUser(this.authService.decodedToken.nameid, this.user).subscribe(next => {
      if (isNull( this.user['username'] )) {this.user['username'] = this.usrName;}
      console.log('updateUser:', this.user);
      this.userService.updateUser(this.user.id, this.user).subscribe(next => {
      this.alertify.success('Profile updated successfully');
      this.editForm.reset(this.user);
    }, error => {
      this.alertify.error(error);
    });
  }
  updateMainPhoto(photoUrl) {
    this.user.photoUrl = photoUrl;
  }

  GetUserData() {
    console.log('GetUserData user-id:' + this.user.id);
    this.http.get(this.baseUrl + 'UsersData/GetUserData/' + this.user.id).subscribe(
      (res: any) => {
        console.log('GetUserData()', res);
        if (res === []) { return; }
        this.rowData = res;
        this.bsDate = this.rowData['BachelorsStartDate'];
        this.bsDate = this.bsDate.substring(0, 10);
        this.rowData['BachelorsStartDate'] = this.bsDate.substring(5, 7) + '/' +
                                             this.bsDate.substring(8, 10) + '/' + this.bsDate.substring(0, 4);
        
        this.bgDate = this.rowData['BachelorsGradDate'];
        this.bgDate = this.bgDate.substring(0, 10);
        this.rowData['BachelorsGradDate'] = this.bgDate.substring(5, 7) + '/' +
                                             this.bgDate.substring(8, 10) + '/' + this.bgDate.substring(0, 4);
        console.log('bscDate II: ', this.rowData['BachelorsStartDate'], this.rowData['BachelorsGradDate']);
        this.bgDate = this.rowData['MastersStartDate'];
        this.bgDate = this.bgDate.substring(0, 10);
        this.rowData['MastersStartDate'] = this.bgDate.substring(5, 7) + '/' +
                                             this.bgDate.substring(8, 10) + '/' + this.bgDate.substring(0, 4);
        this.bgDate = this.rowData['MastersCommFormedDate'];
        this.bgDate = this.bgDate.substring(0, 10);
        this.rowData['MastersCommFormedDate'] = this.bgDate.substring(5, 7) + '/' +
                                              this.bgDate.substring(8, 10) + '/' + this.bgDate.substring(0, 4);
        this.bgDate = this.rowData['MastersDefenseDate'];
        this.bgDate = this.bgDate.substring(0, 10);
        this.rowData['MastersDefenseDate'] = this.bgDate.substring(5, 7) + '/' +
                                              this.bgDate.substring(8, 10) + '/' + this.bgDate.substring(0, 4);
        this.bgDate = this.rowData['MastersGradDate'];
        this.bgDate = this.bgDate.substring(0, 10);
        this.rowData['MastersGradDate'] = this.bgDate.substring(5, 7) + '/' +
                                              this.bgDate.substring(8, 10) + '/' + this.bgDate.substring(0, 4);
        if (this.rowData['DegreeProgram'] === 'M') {
          this.bDegreeMaster = true;
        } else if (this.rowData['DegreeProgram'] === 'P') {
          this.bDegreePhd = true;
          this.bDegreeMaster = true;
        }
      }, error => {
        this.alertify.error('GetUserData()' + error);
      }
    );
  }

  GetAdvisorsData() {
    let hIndex = 0;
    this.http.get(this.baseUrl + 'UsersData/GetFacultyData').subscribe(
      (res: any) => {
        if (res === []) { return; }
        this.Advisors = res;
        this.Advisors_Extra = [];
        while (hIndex < this.Advisors.length) {
          if (this.Advisors[hIndex]['last_name'] !== 'TBA') {
            this.Advisors[hIndex]['fullname'] = 'Dr. ' + this.Advisors[hIndex]['first_name'] + ' ' +
                                              this.Advisors[hIndex]['last_name'];
            this.Advisors_Extra.push(this.Advisors[hIndex]);
          } else {
            this.Advisors[hIndex]['fullname'] = '';
          }
          
          hIndex++;
        }
        console.log('GetAdvisorsData()', this.Advisors);
      }, error => {
        this.alertify.error('GetAdvisorsData()' + error);
      }
    );
  }

  updateUserProfile() {
    this.http.post(this.baseUrl + 'UsersData/updateUserProfile', this.rowData).subscribe(
      (res: any) => {
        this.GetUserData();
        this.alertify.success('Profile updated successfully');
        this.editForm.reset(this.user);
      }, error => {
        this.alertify.error('updateUserProfile()' + error);
      }
    );
  }

}
