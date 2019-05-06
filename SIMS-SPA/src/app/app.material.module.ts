import { NgModule } from '@angular/core';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatTableModule } from '@angular/material';
import { MatPaginatorModule, MatFormFieldModule, MatRadioModule, MatSelectModule, MatInputModule } from '@angular/material';
import { MatDatepickerModule, MatNativeDateModule, MatOptionModule, MatDialogModule } from '@angular/material';
import {  MatProgressSpinnerModule, MatSnackBarModule, MatCheckboxModule  } from '@angular/material';


@NgModule({
    imports: [
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatTableModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatRadioModule,
        MatSelectModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatOptionModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        MatCheckboxModule
    ],
    exports: [
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatTableModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatRadioModule,
        MatSelectModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatOptionModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        MatCheckboxModule
    ],
})
export class AppMaterialModule { }
