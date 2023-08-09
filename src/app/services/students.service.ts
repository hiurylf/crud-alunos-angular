import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IStudents } from '@interfaces/students';

@Injectable({
	providedIn: 'root',
})
export class StudentsService {
	private readonly apiUrl =
		'https://api-teste-laserchip-2023-200528dc7097.herokuapp.com/alunos';

	constructor(private readonly http: HttpClient) {}

	getAll(): Observable<IStudents[]> {
		return this.http.get<IStudents[]>(`${this.apiUrl}`);
	}

	create(data: Omit<IStudents, 'id'>): Observable<IStudents> {
		return this.http.post<IStudents>(`${this.apiUrl}`, data);
	}

	edit({ id, ...data }: IStudents): Observable<IStudents> {
		return this.http.put<IStudents>(`${this.apiUrl}/${id}`, data);
	}

	deleteById(id: number): Observable<void> {
		return this.http.delete<void>(`${this.apiUrl}/${id}`);
	}

	getOneById(id: number): Observable<void> {
		return this.http.get<void>(`${this.apiUrl}/${id}`);
	}
}
