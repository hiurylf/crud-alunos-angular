import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IStudents } from '@interfaces/students';

@Component({
	selector: 'app-student-list',
	templateUrl: './student-list.component.html',
	styleUrls: ['./student-list.component.scss'],
})
export class StudentListComponent {
	displayedColumns: string[] = ['name', 'lastName', 'age', 'gender', 'actions'];

	@Input() students: IStudents[] | null = [];

	@Output() edit = new EventEmitter<IStudents>();
	@Output() delete = new EventEmitter<IStudents>();

	public onEdit(data: IStudents): void {
		this.edit.emit(data);
	}

	public onDelete(data: IStudents): void {
		this.delete.emit(data);
	}
}
