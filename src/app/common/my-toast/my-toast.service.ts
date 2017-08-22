import {
	Injectable,
	ComponentFactoryResolver,
	ApplicationRef,
	Injector,
	Optional,
	EmbeddedViewRef
} 								from '@angular/core';

import { Observable, Observer }	from 'rxjs/Rx';

import { MyToastComponent }		from './my-toast.component';

@Injectable()
export class MyToastService {

	constructor(
		private resolver: ComponentFactoryResolver,
		private applicationRef: ApplicationRef,
		private injector: Injector
	) { }

	show(text?: string, time?: number) {
		let componentFactory = this.resolver.resolveComponentFactory(MyToastComponent);
		let componentRef = componentFactory.create(this.injector);
		let componentRootNode = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
		this.applicationRef.attachView(componentRef.hostView);
		componentRef.onDestroy( () => {
			this.applicationRef.detachView(componentRef.hostView);
		} );
		document.body.appendChild(componentRootNode);
		if (text) componentRef.instance.text = text;
		if (time) componentRef.instance.time = time;
		componentRef.instance.hide.subscribe( () => {
			setTimeout( () => componentRef.destroy(), 300 );
		} );
		return componentRef.instance.onShow();
	}

}
