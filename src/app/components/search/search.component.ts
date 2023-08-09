import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
	searchFormControl = new FormControl('');

	@Input() placeholder = 'Pesquisar';
	@Output() searchChange = new EventEmitter<string | null>();

	constructor() {
		this.searchFormControl.valueChanges
			.pipe(takeUntilDestroyed(), debounceTime(300), distinctUntilChanged())
			.subscribe(value => {
				this.searchChange.emit(value);
			});
	}
}
