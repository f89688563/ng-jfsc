import { Component, OnInit, ViewChild } 	  from '@angular/core';
import { ActivatedRoute }       from '@angular/router';
import { URLSearchParams }      from '@angular/http';

import { ToastService }         from 'ngx-weui/toast';

import { ApiService }           from '../../shared/api.service';

import { MyToastService }       from '../../common/my-toast/my-toast.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {

    data: any[] = [];
    goodsRec: any[] = [];
    goodsHot: any[] = [];
    info: any = {};
    uid = localStorage.uid;
    cid = localStorage.cid;
    params: any;

  	constructor(
      public as: ApiService,
      public ar: ActivatedRoute,
      public mts: MyToastService
    ) { }

  	ngOnInit() {
      this.ar.params.subscribe( params => {
        if (params.cid) localStorage.cid = params.cid;
        this.params = new URLSearchParams();
        this.params.set('cid', localStorage.cid);
      } )

      this.loadAd();
      this.loadRec();
      this.loadHot();
      this.loadInfo();

      setTimeout( () => {
        // this.mts.show();
      }, 1000 )

  	}

    loadInfo() {
      this.as.get('member/'+localStorage.uid, this.params)
              .then( res => this.info = res['info'] );
    }

  	loadAd() {
      this.as.get('ad', this.params)
              .then( res => {
                let lists = res['lists'];
                if(lists.length > 0) {
                  lists.map( item => {
                    let url = item['url'],
                        corver = item['corver']
                    if (!url) {
                      url = '/'+item['type']+'/'+item['iid'];
                    }
                    this.data.push( {corver, url} )
                  } )
                }
              });
  	}

  	loadRec() {
      this.as.get('goods/rec', this.params)
              .then( res => this.goodsRec = res['lists'] );
  	}

  	loadHot(){
      this.as.get('goods/hot', this.params)
              .then( res => this.goodsHot = res['lists'] );
  	}

}
