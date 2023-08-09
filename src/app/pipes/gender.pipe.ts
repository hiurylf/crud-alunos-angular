import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'gender',
})
export class GenderPipe implements PipeTransform {
	transform(value: string): string {
		if (!value || value.length > 1) {
			return value;
		}

		const gender = value.toUpperCase();

		if (['M', 'F'].includes(gender)) {
			return gender === 'M' ? 'Masculino' : 'Feminino';
		}

		return gender;
	}
}
