import { Injectable } from '@angular/core';
import { CartItem} from "../model/cart-item";
import {BehaviorSubject, Observable} from "rxjs";

// from MDN - https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
function storageAvailable(type) {
  var storage;
  try {
    storage = window[type];
    var x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  }
  catch(e) {
    return e instanceof DOMException && (
        // everything except Firefox
      e.code === 22 ||
      // Firefox
      e.code === 1014 ||
      // test name field too, because code might not be present
      // everything except Firefox
      e.name === 'QuotaExceededError' ||
      // Firefox
      e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      // acknowledge QuotaExceededError only if there's something already stored
      (storage && storage.length !== 0);
  }
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems: Array<CartItem> = [];
  private _cartItems: BehaviorSubject<Array<CartItem>> = new BehaviorSubject(this.cartItems);
  public cartItems$: Observable<Array<CartItem>> = this._cartItems.asObservable();

  constructor() {
    this.loadCart();
  }

  addItem(name: string, type: string, uid: string, size: number){
    for(let i in this.cartItems){
      if(this.cartItems[i].uid == uid){
        return;
      }
    }
    let item = new CartItem(name, type, uid, size);
    this.cartItems.push(item);
    this._cartItems.next(this.cartItems);
    this.saveCart();
  }

  removeItem(uid){
    let madeChange = false;
    for(let i in this.cartItems){
      if(this.cartItems[i].uid == uid){
        this.cartItems.splice(+i,1);
        madeChange = true;
      }
    }
    if(madeChange){
      this._cartItems.next(this.cartItems);
      this.saveCart();
    }
  }

  clearCart(){
    this.cartItems = [];
    this._cartItems.next(this.cartItems);
    this.deleteCart();
  }

  totalCartSize(){
    if(this.cartItems.length < 1){
      return 0;
    } else {
      return this.cartItems.map(ciSize => ciSize.size).reduce((accum, ciSize) => {
        return accum + ciSize;
      });
    }
  }

  private saveCart(){
    if(this.cartItems.length > 0){
      let payload = JSON.stringify(this.cartItems);
      if(storageAvailable('localStorage')){ // if we have localstorage, we will us that
        localStorage.setItem('cart', payload);
        return true;
      } else if(navigator.cookieEnabled){ // we have no localstorage, so we'll try cookies
        document.cookie = "cart=" + encodeURIComponent(payload) + "; expires=Fri, 31 Dec 9999 23:59:59 GMT; domain=" + window.location.hostname + "; path=/";
        return true;
      } else { // we have no way to track this user
        return false;
      }
    } else {
      this.deleteCart();
    }
  }

  private loadCart(){
    let cart = '';
    if(storageAvailable('localStorage')){
      cart = localStorage.getItem('cart');
    } else {
      cart = decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*cart\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
    }
    if(cart){
      this.cartItems = JSON.parse(cart);
      this._cartItems.next(this.cartItems);
    }
  }

  private deleteCart(){
    if(storageAvailable('localStorage')){
      localStorage.removeItem('cart');
    } else {
      document.cookie = "cart= ;expires=Thu, 01 Jan 1970 00:00:00 GMT;";
    }
  }
}
