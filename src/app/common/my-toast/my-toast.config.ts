import { Injectable }	from '@angular/core';

export type MyToastConfigType = {
	text: string,
	time: number
};

@Injectable()
export class MyToastConfig {
	config?: MyToastConfigType = {
		text: 'ok',
		time: 2000
	};
}