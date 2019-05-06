import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, AUTOCOMPLETE_PANEL_HEIGHT, MatSnackBar } from '@angular/material';

import { TimetableComponent } from '../timetable/timetable.component';

import { ICourse } from '../model/course';
import { CourseService } from '../services/course.service';

@Component({
    selector: 'app-courseform',
    templateUrl: './courseform.component.html',
    styleUrls: ['./courseform.component.css']
})

export class CourseformComponent implements OnInit {
    courseform: {};
    modalTitle: string;
    modalType: number;
    Monday: any;
    Tuesday: any;
    Wednesday: any;
    Thursday: any;
    Friday: any;
    detail: {};
    courseCache: any;

    constructor(
        public snackBar: MatSnackBar,
        public dialogRef: MatDialogRef<TimetableComponent>,
        private fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any
        ) {
    }

    ngOnInit() {
        this.modalTitle = this.data.modalTitle;
        this.modalType = this.data.modalType;
        this.detail = this.data.contact;
        this.courseCache = this.data.kourseCache;

        this.courseform = this.fb.group({
            courseTitle: '',
            courseNum: '',
            section: '',
            scheduleStartTime: '',
            scheduleEndTime: '',
            instructor: '',
            room: '',
            creditHours: '',
            crn: '',
            maxStudent: '',
            notes: '',
            weekday: '',
            scheduleType: 0, // 0: normal, 1: experiment
            semesterId: '',
        });

        console.log(this.courseCache);

        if (this.modalType === 1) {
            this.checkWeekDay();
            this.courseform = this.fb.group({
                courseTitle: this.detail['courseTitle'],
                courseNum: this.detail['courseNum'],
                section: this.detail['section'],
                scheduleStartTime: this.detail['scheduleStartTime'],
                scheduleEndTime: this.detail['scheduleEndTime'],
                instructor: this.detail['instructor'],
                room: this.detail['room'],
                creditHours: this.detail['creditHours'],
                crn: this.detail['crn'],
                maxStudent: this.detail['maxStudent'],
                notes: this.detail['notes'],
                weekday: this.detail['weekday'],
                scheduleType: this.detail['scheduleType'], // 0: normal, 1: experiment
                semesterId: this.detail['semesterId'],
            });
        }
    }

    onClick() {
        this.dialogRef.close('I received you message');
    }

    onSubmit(formData: any) {
        const obj = formData.value;

        const array = [];
        if (this.modalType === 0 || this.modalType === 1) {
            // tslint:disable-next-line:max-line-length
            if (!obj.courseNum || !obj.courseTitle || !obj.section || !obj.scheduleStartTime || !obj.scheduleEndTime || !obj.instructor || !obj.room || !obj.creditHours || !obj.crn || !obj.maxStudent) {
                this.showMessage('Please Complete The Form');
                return;
            }
            if (!this.timeIsValid(obj.scheduleStartTime, obj.scheduleEndTime)) {
                this.showMessage('Please Select valid Time');
                return;
            }
            if (isNaN(obj.courseNum)) {
                this.showMessage('Course Number Must be an integer');
                return;
            }
            if (isNaN(obj.section)) {
                this.showMessage('Section Must be an integer');
                return;
            }
            if (isNaN(obj.creditHours)) {
                this.showMessage('Credit Hours Must be an integer');
                return;
            }
            if (isNaN(obj.maxStudent)) {
                this.showMessage('Maximum Students Must be an integer');
                return;
            }

            if (this.Monday) {
                const md = Object.assign({}, obj);
                md.weekday = 'Monday';
                array.push(md);
            }
            if (this.Tuesday) {
                const td = Object.assign({}, obj);
                td.weekday = 'Tuesday';
                array.push(td);
            }
            if (this.Wednesday) {
                const wd = Object.assign({}, obj);
                wd.weekday = 'Wednesday';
                array.push(wd);
            }
            if (this.Thursday) {
                const tsd = Object.assign({}, obj);
                tsd.weekday = 'Thursday';
                array.push(tsd);
            }
            if (this.Friday) {
                const fd = Object.assign({}, obj);
                fd.weekday = 'Friday';
                array.push(fd);
            }
            if (array.length === 0) {
                this.showMessage('Please Select Weekday');
                return false;
            }
            this.dialogRef.close(array);

        } else if (this.modalType === 2) {
            const course = this.detail;
            if (!obj.scheduleStartTime) {
                this.showMessage('Please Select From Time');
                return;
            }
            if (!obj.scheduleEndTime) {
                this.showMessage('Please Select To Time');
                return;
            }
            if (!this.timeIsValid(obj.scheduleStartTime, obj.scheduleEndTime)) {
                this.showMessage('Please Select valid Time');
                return;
            }

            course['scheduleStartTime'] = obj.scheduleStartTime;
            course['scheduleEndTime'] = obj.scheduleEndTime;
            course['weekday'] = course['toWeekday'];

            array.push(course);
        }

        this.dialogRef.close(array);
    }

    timeIsValid(from, to) {
        const start = from.replace(':', '');
        const end = to.replace(':', '');
        if (start < 800 || start > 2059) {
            return false;
        }
        if (end < 800 || end > 2059) {
            return false;
        }
        return start < end;
    }

    showMessage(msg: string) {
        this.snackBar.open(msg, '', {
            duration: 3000
        });
    }

    saveCopy() {
        const array = [];
        if (this.Monday) {
            const md = Object.assign({}, this.detail);
            md['weekday'] = 'Monday';
            array.push(md);
        }
        if (this.Tuesday) {
            const td = Object.assign({}, this.detail);
            td['weekday'] = 'Tuesday';
            array.push(td);
        }
        if (this.Wednesday) {
            const wd = Object.assign({}, this.detail);
            wd['weekday'] = 'Wednesday';
            array.push(wd);
        }
        if (this.Thursday) {
            const tsd = Object.assign({}, this.detail);
            tsd['weekday'] = 'Thursday';
            array.push(tsd);
        }
        if (this.Friday) {
            const fd = Object.assign({}, this.detail);
            fd['weekday'] = 'Friday';
            array.push(fd);
        }
        if (array.length === 0) {
            this.showMessage('Please Select Weekday');
            return false;
        }
        this.dialogRef.close(array);
    }

    queryDelete() {
        console.log('delete course');
        this.dialogRef.close(this.detail);
    }
    checkWeekDay() {
        let courseNo   = this.detail['courseNum'] ;
        let instructor = this.detail['instructor'];
        this.Monday    = false;
        this.Tuesday   = false;
        this.Wednesday = false;
        this.Thursday  = false;
        this.Friday    = false;
        console.log(courseNo, instructor);
        for (const itemday of this.courseCache) {
            courseNo   = itemday['courseNum'];
            instructor = itemday['instructor'];
            if ( courseNo === this.detail['courseNum']  && instructor === this.detail['instructor']) {
                switch (itemday['weekday']) {
                    case 'Monday':
                        this.Monday = true;
                        break;
                    case 'Tuesday':
                        this.Tuesday = true;
                        break;
                    case 'Wednesday':
                        this.Wednesday = true;
                        break;
                    case 'Thursday':
                        this.Thursday = true;
                        break;
                    case 'Friday':
                        this.Friday = true;
                        break;
                    default:
                        break;
                }
            }
        }
    }
}
