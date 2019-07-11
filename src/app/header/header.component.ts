import { Component, OnInit } from '@angular/core';
import {verticleSlide} from "../animations";
import {AppConfigService} from "../env/app-config.service";
import {Subscription} from "rxjs";
import {CartService} from "../archive-search/services/cart.service";
import {CartItem} from "../archive-search/model/cart-item";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [verticleSlide]

})
export class HeaderComponent implements OnInit {

  public showNav = true;
  public expandItems = false;

  public config: any;
  private configSub: Subscription;

  public cart: Array<CartItem> =[];
  public cartItems: number = 0;
  public cartSize: number = 0;
  public cartSub: Subscription;

  public storage: any;

  constructor(private appConfig: AppConfigService, private cartService: CartService) {
    this.loadConfig();
    this.cartSub = this.cartService.cartItems$.subscribe(cartItems => {
      this.cart = cartItems;
      this.cartItems = cartItems.length | 0;
      this.cartSize = this.cartService.totalCartSize();
    });

    this.storage = localStorage;
  }

  ngOnInit() {
  }

  loadConfig(){
    this.configSub = this.appConfig.getConfig().subscribe((config:string) => {
      this.config = JSON.parse(config);
    });
  }

  maxAllowedFiles(){
    return parseInt(this.config.download_obs_limit) + parseInt(this.config.download_img_limit);
  }

  removeItem(uid: string){
    this.cartService.removeItem(uid);
  }

  clearCart(){
    this.cartService.clearCart();
  }

}
