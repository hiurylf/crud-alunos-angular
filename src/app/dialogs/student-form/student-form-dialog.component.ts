import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IStudents } from '@interfaces/students';

export interface IStudentFormDialogData {
	student?: IStudents;
}

@Component({
	selector: 'app-student-form-dialog',
	templateUrl: './student-form-dialog.component.html',
	styleUrls: ['./student-form-dialog.component.scss'],
})
export class StudentFormComponent implements OnInit {
	form: FormGroup;

	constructor(
		public dialogRef: MatDialogRef<StudentFormComponent>,
		private readonly formBuilder: FormBuilder,
		@Inject(MAT_DIALOG_DATA) public data: IStudentFormDialogData
	) {
		this.form = this.formBuilder.group({
			id: [],
			nome: ['', [Validators.required]],
			sobrenome: ['', [Validators.required]],
			idade: ['', [Validators.required]],
			sexo: ['', [Validators.required]],
		});
	}

	public ngOnInit(): void {
		this.form.patchValue(this.data.student || {});
	}
}
