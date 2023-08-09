import { Component, OnDestroy, OnInit } from '@angular/core';
import {
	BehaviorSubject,
	map,
	Observable,
	tap,
	combineLatest,
	Subject,
	takeUntil,
	filter,
	switchMap,
} from 'rxjs';
import { IStudents } from '@interfaces/students';
import { StudentsService } from '@services/students.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@dialogs/confirm/confirm-dialog.component';
import { StudentFormComponent } from '@dialogs/student-form/student-form-dialog.component';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
	destroy$: Subject<void> = new Subject<void>();

	students$ = new Observable<IStudents[]>();
	loading$ = new BehaviorSubject<boolean>(false);
	search$ = new BehaviorSubject<string | null>(null);

	searchPlaceholder = 'Pesquisar estudantes (nome / sobrenome)';

	constructor(
		private readonly studentsService: StudentsService,
		private readonly dialog: MatDialog
	) {}

	public ngOnInit(): void {
		this.getStudents();
	}

	public ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	public onSearchChange(text: string | null): void {
		this.search$.next(text ? text.toLowerCase() : null);
	}

	public onCreate(): void {
		this.openStudentFormDialog();
	}

	public onEdit(student: IStudents): void {
		this.openStudentFormDialog(student);
	}

	public onDelete(student: IStudents): void {
		this.openDeleteDialog(student);
	}

	private getStudents(): void {
		this.loading$.next(true);

		this.students$ = combineLatest([
			this.search$,
			this.studentsService.getAll(),
		]).pipe(
			map(([search, students]) => {
				if (!search) {
					return students;
				}

				return students.filter(student => {
					const name = student.nome.toLowerCase();
					const lastName = student.sobrenome.toLowerCase();

					return name.includes(search) || lastName.includes(search);
				});
			}),
			tap(
				() => this.loading$.next(false),
				() => this.loading$.next(false)
			)
		);
	}

	private openStudentFormDialog(student?: IStudents): void {
		const dialog = this.dialog.open(StudentFormComponent, {
			width: '80%',
			data: { student },
		});

		dialog
			.afterClosed()
			.pipe(
				takeUntil(this.destroy$),
				filter(value => !!value),
				tap(() => this.loading$.next(true)),
				switchMap(student =>
					student.id
						? this.studentsService.edit(student)
						: this.studentsService.create(student)
				),
				tap(() => this.getStudents())
			)
			.subscribe();
	}

	private openDeleteDialog({ nome, sobrenome, id }: IStudents): void {
		const content = `Os dados do(a) estudante ${nome} ${sobrenome} serão removidos`;

		const dialog = this.dialog.open(ConfirmDialogComponent, {
			width: '80%',
			data: {
				title: 'Remover',
				color: 'warn',
				content,
				id,
			},
		});

		dialog
			.afterClosed()
			.pipe(
				takeUntil(this.destroy$),
				filter(value => !!value),
				tap(() => this.loading$.next(true)),
				switchMap(id => this.studentsService.deleteById(id)),
				tap(() => this.getStudents())
			)
			.subscribe();
	}
}
