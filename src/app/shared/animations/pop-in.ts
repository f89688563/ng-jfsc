import {
	trigger,
	state,
	style,
	transition,
	animate,
	keyframes
}					from '@angular/animations';

export const PopIn = trigger('popIn', [
	state('in', style({transform: 'translateY(0)'})),
	transition(':enter', [
		animate(500, keyframes([
			style({opacity: 0,	transform: 'translateY(100%)',	offset: 0}),
			style({opacity: 1,	transform: 'translateY(-25px)',	offset: 0.6}),
			style({opacity: 1,	transform: 'translateY(0)',		offset: 1.0})
		]))
	]),
	// transition(':leave', [
	// 	animate(300, keyframes([
	// 		style({opacity: 1,	transform: 'translateY(0)',		offset: 0}),
	// 		style({opacity: 1,	transform: 'translateY(-25px)',	offset: 0.7}),
	// 		style({opacity: 0,	transform: 'translateY(100%)',	offset: 1.0})
	// 	]))
	// ])
]);