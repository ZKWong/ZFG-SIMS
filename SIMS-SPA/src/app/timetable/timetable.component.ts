import { Component, OnInit, OnDestroy, HostListener} from '@angular/core';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { DBOperation } from '../shared/DBOperation';
import { CourseformComponent } from '../courseform/courseform.component';
import { SemesterformComponent } from '../semesterform/semesterform.component';
import { CourseService } from '../services/course.service';
import * as html2canvas from 'html2canvas';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AlertifyService } from '../_services/alertify.service';
import { FileUploader } from 'ng2-file-upload';

@Component({
    selector: 'app-timetable',
    templateUrl: './timetable.component.html',
    styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit, OnDestroy {
    id: 0;
    courseList: any;
    contact: {};
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    isLoading: boolean;
    modalType: number;
    courseCache: any;
    Monday: any;
    Tuesday: any;
    Wednesday: any;
    Thursday: any;
    Friday: any;
    Anyday: any;
    Choiceday: any;
    toWeekday: string;
    editCache: any;
    isCopy: boolean;
    isExperiment: boolean;
    imgSrc: string;
    detailCourse: {};
    semesters: [];
    baseUrl = environment.apiUrl;
    sem_select: any = {'Id': '1', 'SemesterTime': '' };
    uploader: FileUploader;
    hasBaseDropZoneOver = false;
    importFile = {'fileName': ''};
    selectFile = '';
    justStarted = true;
    formIsClean = true;

    Course_Series: any = ['2XX', '3XX' , '4XX' , '5XX' , '6XX', 'All'];
    Course_Prefix = '2XX';

    // tslint:disable-next-line:max-line-length
    constructor(private _courseService: CourseService,
                private dialog: MatDialog ,
                public route: ActivatedRoute,
                public snackBar: MatSnackBar,
                private http: HttpClient,
                private alertify: AlertifyService,
                private router: Router) { }

    ngOnInit() {
        this.Monday = [];
        this.Tuesday = [];
        this.Wednesday = [];
        this.Thursday = [];
        this.Friday = [];
        this.Anyday = [];

        this.isLoading = false;

        this.route.params.subscribe((data) => {
            this.id = data.id;
        });
        this.initializeUploader();
        this.GetSemesters();
        this.sem_select.Id = this.id;
        this.loadCourse();
    }

    ngOnDestroy() {
        if (!this.formIsClean) {
            if (confirm('Do you want to save your changes before leaving this page?\n(click cancel to discard changes)')) {
                this.saveCourse();
                console.log('proceed to save the changes');
            } else {
                console.log('changes discarded');
            }
        }
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(CourseformComponent, {
            width: '800px',
            data: { modalType: this.modalType,
                modalTitle: this.modalTitle,
                modalBtnTitle: this.modalBtnTitle,
                contact: this.contact,
                kourseCache: this.courseCache }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                if (this.modalType === 4) {
                    const courseNo   = result.courseNum;
                    const instructor = result.instructor;
                    const idx        = this.courseCache.indexOf(result);
                    console.log(courseNo, instructor, result.weekday);
                    if (result.weekday === 'Anyday') {
                        this.courseCache.splice(idx, 1);
                    } else {
                        let hindex      = 0;
                        let hdelete    = true;
                        this.courseCache.splice(idx, 1);
                        while ( hdelete === true ) {
                            hdelete = false;
                            hindex  = 0;
                            for (const itemday of this.courseCache) {
                                if (courseNo === itemday['courseNum'] && instructor === itemday['instructor']) {
                                    hdelete = true;
                                    break;
                                }
                                hindex++;
                            }
                            if (hdelete === true) {
                                this.courseCache.splice(hindex, 1);
                            }
                        }
                    }
                } else {
                    if (this.modalType === 1) {
                        this.courseCache.forEach((item, idx) => {
                            if (this.detailCourse['uuid'] === item.uuid) {
                                // tslint:disable-next-line:no-shadowed-variable
                                const idx = this.courseCache.indexOf(item);
                                this.courseCache.splice(idx, 1);
                            }
                        });
                    }
                    if (this.modalType === 2) {
                        this.courseCache = [];
                        this.courseCache = this.editCache;
                    }
                    if (this.modalType === 3) {
                        this.isCopy = false;
                    }
                    console.log(result);

                    result.forEach((item, idx) => {
                        item.semesterId = this.id;
                        this.courseCache.push(item);
                    });
                }
                this.formIsClean = false;
                this.loadTable();
            }
        });
    }

    loadCourse(): void {
        this.isLoading = true;
        this._courseService.getAllCourse(this.id).subscribe((res) => {
            this.courseCache = res;
            this.isLoading = false;
            this.loadTable();
        });
    }

    getMins(time) {
        const arry = time.split(':');
        const mins = (20 - 8 + 1) * 60;
        const starMin = (arry[0] - 8) * 60 + Number(arry[1]);
        const rate = (starMin / mins) * 100;
        return Math.round(rate);
    }

    loadTable() {
        this.Monday = [];
        this.Tuesday = [];
        this.Wednesday = [];
        this.Thursday = [];
        this.Friday = [];
        this.Anyday = [];

        this.courseCache.forEach((item, idx) => {
            const top = this.getMins(item.scheduleStartTime);
            const bottom = 100 - this.getMins(item.scheduleEndTime);

            item.top = top;
            item.bottom = bottom;

            if (item.weekday === 'Monday') {
                this.Monday.push(item);
            } else if (item.weekday === 'Tuesday') {
                this.Tuesday.push(item);
            } else if (item.weekday === 'Wednesday') {
                this.Wednesday.push(item);
            } else if (item.weekday === 'Thursday') {
                this.Thursday.push(item);
            } else if (item.weekday === 'Friday') {
                this.Friday.push(item);
            } else if (item.weekday === 'Anyday') {
                // if (this.justStarted === true) {
                    this.Anyday.push(item);
                    console.log(this.Anyday);
                // }
            }
        });

        this.resizeItem(this.Monday);
        this.resizeItem(this.Tuesday);
        this.resizeItem(this.Wednesday);
        this.resizeItem(this.Thursday);
        this.resizeItem(this.Friday);
        this.loadChoiceday();
        this.resizeItem(this.Choiceday);
        this.justStarted = false;
    }

    resizeItem(list) {
        let array = list.slice();
        for (let x = 0; x < array.length; x ++ ) {
            let n = 0;
            let item = array[x];
            for (let i = 0; i < x; i ++ ) {
                let max = [item.top, array[i].top];
                let min = [100 - item.bottom, 100 - array[i].bottom];
                if (Math.max.apply(null, max) <= Math.min.apply(null, min)) {
                    n ++;
                }
            }
            item['left'] = 54 * n + 5;
            array = list.slice();
        }
    }

    addCourse() {
        this.modalType = 0;
        this.modalTitle = 'Add New Course';
        this.modalBtnTitle = 'Add';
        this.openDialog();
    }

    saveCourse() {
        this.isLoading = true;
        this._courseService.addCourse(this.id, this.courseCache).subscribe(res => {
            this.isLoading = false;
            this.showMessage('Save Success');
            this.formIsClean = true;
        });
    }

    detail(course) {
        if (this.isCopy) {
            this.modalType = 3;
            this.modalTitle = 'Copy Course';
        } else if (this.isExperiment) {
            this.isExperiment = false;
            const newCourse = Object.assign({}, course);
            newCourse.scheduleType = 1;
            this.courseCache.push(newCourse);
            this.loadTable();
            return false;
        } else {
            this.detailCourse = course;
            this.modalType = 1;
            this.modalTitle = 'Course Detail';
        }
        this.contact = course;
        this.openDialog();
    }

    deleteCourse(e) {
        this.modalType = 4;
        this.modalTitle = 'Confirm to Delete ?';

        this.contact = e.dragData;
        this.openDialog();
    }
    drop1(e) {
        this.toWeekday = 'Monday';
        this.editData(e.dragData);
    }
    drop2(e) {
        this.toWeekday = 'Tuesday';
        this.editData(e.dragData);
    }
    drop3(e) {
        this.toWeekday = 'Wednesday';
        this.editData(e.dragData);
    }
    drop4(e) {
        this.toWeekday = 'Thursday';
        this.editData(e.dragData);
    }
    drop5(e) {
        this.toWeekday = 'Friday';
        this.editData(e.dragData);
    }

    editData(data) {
        this.editCache = this.courseCache.slice();
        const idx = this.editCache.indexOf(data);
        this.editCache.splice(idx, 1);

        data.toWeekday = this.toWeekday;
        this.modalType = 2;
        this.modalTitle = 'Select Time';
        this.contact = data;
        this.openDialog();
    }

    showMessage(msg: string) {
        this.snackBar.open(msg, '', {
            duration: 3000
        });
    }

    preview() {
        html2canvas(document.querySelector('#courseTable')).then(canvas => {
            canvas.style.width = '100%';
            this.imgSrc = canvas.toDataURL('image/png');
            const newwin = window.open();
            newwin.document.write('<img src="' + this.imgSrc + '" />');
            newwin.document.title = 'Preview Course Scheduling';
        });
    }

    export() {
        html2canvas(document.querySelector('#courseTable')).then(canvas => {
            canvas.style.width = '100%';
            this.imgSrc = canvas.toDataURL('image/png');
            const base64Img = this.imgSrc;
            const oA = document.createElement('a');
            oA.href = base64Img;
            oA.download = 'Course Scheduling';
            const event = document.createEvent('MouseEvents');
            event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            oA.dispatchEvent(event);
        });
    }

    GetSemesters() {
        console.log(this.baseUrl);
        this.http.get(this.baseUrl + 'CourseSchedules/GetSemesters').subscribe(
          (res: any) => {
            this.semesters = res;
          }, error => {
            this.alertify.error('GetSemesters() ' + error);
            console.log(error);
          }
        );
    }

    onSelectSemester(sem_selected) {
        console.log(this.sem_select);
        this.router.navigate(['/timetable', this.sem_select.Id]);
        this.justStarted = true;
        if (!this.formIsClean) {
            if (confirm('Do you want to save your changes before goto other semester schedules?\n(click cancel to discard changes)')) {
                this.saveCourse();
                console.log('proceed to save the changes');
            } else {
                console.log('changes discarded');
            }
        }
        this.formIsClean = true;
        this.Anyday = [];
        this.id = this.sem_select.Id;
        this.loadCourse();
    }
    onSelectCourseSeries(kourse_prefix_selected) {
        console.log(this.Course_Prefix);
        this.loadChoiceday();
        this.resizeItem(this.Choiceday);
    }
    fileOverBase(e: any): void {
        this.hasBaseDropZoneOver = e;
    }

    initializeUploader() {
    this.uploader = new FileUploader({
        authToken: 'Bearer ' + localStorage.getItem('token'),
        isHTML5: true,
        removeAfterUpload: true,
        autoUpload: false,
        maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => {
        file.withCredentials = false;
        if (this.importFile.fileName !== '') {
            const fNames = this.importFile.fileName.split('\\');
            const hLen = (fNames.length - 1);
            this.selectFile = fNames[hLen];
        }
    };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
        if (response) {
        console.log(response);
        this.alertify.message(response);
        this.justStarted = true;
        this.Anyday = [];
        this.loadCourse();
        this.importFile.fileName = '';
        this.selectFile = '';
        }
    };
    }

    importcourse_schedule() {
    if (this.importFile.fileName === '') {
        this.alertify.warning('Please select a valid csv file');
        return;
    }
    const fNames = this.importFile.fileName.split('\\');
    const hLen = (fNames.length - 1);
    console.log(this.importFile);

    this.uploader.setOptions( {url: this.baseUrl +
        'CourseSchedules/importcourse_schedule/' + fNames[hLen] });
    console.log(this.uploader.options.url);
    this.uploader.uploadAll();
    }
    exportExcel() {
        this._courseService.getCourseExcel(this.id);
    }

    loadChoiceday() {
        this.Choiceday = [];
        let firstDigit = '';
        let firstDigit_Choice = this.Course_Prefix.substring(0, 1);
        if (this.Anyday === []) {return; }
        for (const itemday of this.Anyday) {
            if (this.Course_Prefix === 'All') {
                this.Choiceday.push(itemday);
            } else {
                firstDigit = itemday['courseNum'];
                firstDigit = firstDigit.substring(0, 1);
                if ( firstDigit === firstDigit_Choice) {
                    this.Choiceday.push(itemday);
                }
            }
        }
    }
}
