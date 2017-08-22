import { Injectable }		from '@angular/core';
import {
	Http,
  Headers,
	URLSearchParams
}							          from '@angular/http';

import { Observable }		from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ApiService {

  uid = localStorage.uid;
  cid = localStorage.cid;

  private url = '/public/index.php/wapi/';

	constructor(private http: Http) { }

	public get(uri, params?: URLSearchParams): Promise<any[]> {
		let url = this.url + uri;
    // if (!params) {
      // let params = new URLSearchParams();
    // }
    // params.set('cid', this.cid+'');
		return this.http.get(url, { search: params })
				.toPromise()
				.then( response => response.json() )
				.catch( this.handleError )
	}

  public put(uri, params?: any): Promise<any[]> {
    let url = this.url + uri,
        headers = new Headers({'Content-Type': 'application/json'});
    params = Object.assign({}, params, {cid: this.cid, uid: this.uid});
    return this.http.put(url, JSON.stringify(params), {headers})
                      .toPromise()
                      .then( response => response.json() )
                      .catch( this.handleError )
  }

  public patch(uri, params?: any): Promise<any[]> {
    let url = this.url + uri,
        headers = new Headers({'Content-Type': 'application/json'});
    params = Object.assign({}, params, {cid: this.cid, uid: this.uid});
    return this.http.patch(url, JSON.stringify(params), {headers})
                      .toPromise()
                      .then( response => response.json() )
                      .catch( this.handleError )
  }

  public post(uri, params?: any): Promise<any[]> {
    let url = this.url + uri,
        headers = new Headers({'Content-Type': 'application/json'});
    params = Object.assign({}, params, {cid: this.cid, uid: this.uid});
    return this.http.post(url, JSON.stringify(params), {headers})
                      .toPromise()
                      .then( response => response.json() )
                      .catch( this.handleError )
  }

  public del(uri): Promise<any[]> {
    let url = this.url + uri,
        headers = new Headers({'Content-Type': 'application/json'});
    return this.http.delete(url, {headers})
                      .toPromise()
                      .then( response => response.json() )
                      .catch( this.handleError )
  }

  // public del(uri, params?: any): Promise<any[]> {
  //   let url = this.url + uri,
  //       headers = new Headers({'Content-Type': 'application/json'});
  //   return this.http.delete(url, JSON.stringify(params), {headers})
  //                     .toPromise()
  //                     .then( response => response.json() )
  //                     .catch( this.handleError )
  // }

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.meesage || error);
	}

}
