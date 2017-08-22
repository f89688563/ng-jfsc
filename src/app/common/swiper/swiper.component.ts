import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

@Component({
  	selector: 'app-swiper',
  	templateUrl: './swiper.component.html',
  	styleUrls: ['./swiper.component.scss'],
  	encapsulation: ViewEncapsulation.None
})
export class SwiperComponent implements OnInit {

    @Input() data: any[] = [
        { corver: 'assets/images/banner.jpeg', title: '标题1' }
    ];

    options: any = {
      // 立方体旋转
      // effect: 'cube',
      // grabCursor: true,
      // cube: {
      //     shadow: true,
      //     slideShadows: true,
      //     shadowOffset: 100,
      //     shadowScale: 0.6
      // },

      // 正常左右轮播
      effect: 'slide',
      spaceBetween: 30,

      // 翻页
      // effect : 'flip',
      // flip: {
      //       slideShadows : true,
      //       limitRotation : true,
      // },

      // 预览
      // effect : 'coverflow',
      // slidesPerView: 2,
      // centeredSlides: true,
      // coverflow: {
      //     rotate: 30,
      //     stretch: 10,
      //     depth: 60,
      //     modifier: 2,
      //     slideShadows : true
      // },

      autoplay: 3000,
      autoplayDisableOnInteraction: false   // 手动划后不停止自动滑动事件
    };

  	constructor() { }

  	ngOnInit() {
    }

    navigateTo(id: number) {
      console.log(id)
    }

}
