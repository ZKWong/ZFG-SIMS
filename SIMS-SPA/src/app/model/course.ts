export interface ICourse {
    uuid: number;
    courseTitle: string;
    courseNum: number;
    section: number;
    scheduleStartTime: string;
    scheduleEndTime: string;
    instructor: string;
    room: string;
    creditHours: number;
    crn: string;
    maxStudent: number;
    notes: string;
    weekday: string;
    scheduleType: number;
    semesterId: number;
}
