import { Injectable } from '@angular/core';
import {HttpParams} from "@angular/common/http";

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
export class WebAnalyticsService {

  private profileId: string;
  private sessionId: string;
  private alternateProfileId: string = '';
  private userAgent: string;
  private os: string;
  private browser: string;
  private deviceType: string;
  private screenResolution: string;
  private browserWidth: number;
  private browserHeight: number;
  private timeZoneOffset: number;
  private localStorage: boolean;
  private sessionStorage: boolean;
  private cookieEnabled: boolean;

  constructor() {
    this.userAgent = navigator.userAgent;
    let userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.indexOf('windows phone') >= 0) { // make sure this comes before plain windows
      this.os = 'Windows Phone';
      this.deviceType = 'Mobile';
    } else if (userAgent.indexOf('win') >= 0) {
      this.os = 'Windows';
      this.deviceType = 'Desktop';
    } else if (userAgent.indexOf('android') >= 0) {
      this.os = 'Android';
      this.deviceType = 'Mobile';
    } else if (userAgent.indexOf('linux') >= 0 || userAgent.indexOf('cros') >= 0) {
      this.os = 'Linux';
      this.deviceType = 'Desktop';
    } else if (userAgent.indexOf('iphone') >= 0 || userAgent.indexOf('ipad') >= 0) {
      this.os = 'iOS';
      this.deviceType = 'Mobile';
    } else if (userAgent.indexOf('mac') >= 0) {
      this.os = 'Mac';
      this.deviceType = 'Desktop';
    } else {
      this.os = 'Other';
      this.deviceType = 'Unknown';
    }

    if (userAgent.indexOf('firefox') >= 0) {
      this.browser = 'Firefox';
    } else if (userAgent.indexOf('opera') >= 0 || userAgent.indexOf('opr') >= 0) {
      this.browser = 'Opera';
    } else if (userAgent.indexOf('edge') >= 0){
      this.browser = 'Edge';
    } else if (userAgent.indexOf('chrome') >= 0) {
      this.browser = 'Chrome';
    } else if (userAgent.indexOf('safari') >= 0) {
      this.browser = 'Safari';
    } else if (userAgent.indexOf('trident') >= 0) {
      this.browser = 'Internet Explorer';
    } else {
      this.browser = 'Other';
    }

    this.screenResolution = window.screen.width + ' x ' + window.screen.height;
    this.browserHeight = window.innerHeight;
    this.browserWidth = window.innerWidth;
    this.timeZoneOffset = new Date().getTimezoneOffset();

    this.localStorage = storageAvailable('localStorage');
    this.sessionStorage = storageAvailable('sessionStorage');
    this.cookieEnabled = navigator.cookieEnabled;

    this.getProfileId();
    this.getSessionId();
  }

  getAllVars(){
    return this;
  }

  /*
  This gets a profile id or creates and saves if it doesn't already exists
  it tries to use persistent localStorage, but falls back to a long life cookie
  */
  getProfileId(){
    let profileId = '';
    if(storageAvailable('localStorage')){ // if we have localstorage, we will look there
      profileId = localStorage.getItem('analyticsProfileId');
    } else if(navigator.cookieEnabled){ // we have no localstorage, so we'll try cookies
      profileId = decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*analyticsProfileId\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
    } else { // we have no way to track this user
      profileId = 'Unknown';
    }
    if(!profileId || profileId.length < 1){
      profileId = (Date.now().toString(36) + Math.random().toString(36).substr(2, 9)).toUpperCase();
      if(storageAvailable('localStorage')){ // if we have localstorage, we will look there
        localStorage.setItem('analyticsProfileId', profileId);
      } else if(navigator.cookieEnabled){ // we have no localstorage, so we'll try cookies
        document.cookie = "analyticsProfileId=" + profileId + "; expires=Fri, 31 Dec 9999 23:59:59 GMT; domain=" + window.location.hostname + "; path=/";
      }
    }
    this.profileId = profileId;
  }

  /*
  This gets a sessionId or creates and saves if it doesn't already exists
  it tries to use sessionStorage, but falls back to a session cookie
  */
  getSessionId(){
    let sessionId = '';
    if(storageAvailable('sessionStorage')){ // if we have localstorage, we will look there
      sessionId = sessionStorage.getItem('analyticsSessionId');
    } else if(navigator.cookieEnabled){ // we have no localstorage, so we'll try cookies
      sessionId = decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*analyticsSessionId\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
    } else { // we have no way to track this user
      sessionId = 'Unknown';
    }
    if(!sessionId || sessionId.length < 1){
      sessionId = (Date.now().toString(36) + Math.random().toString(36).substr(2, 9)).toUpperCase();
      if(storageAvailable('sessionStorage')){ // if we have localstorage, we will look there
        localStorage.setItem('analyticsSessionId', sessionId);
      } else if(navigator.cookieEnabled){ // we have no localstorage, so we'll try cookies
        document.cookie = "analyticsSessionId=" + sessionId + "; domain=" + window.location.hostname + "; path=/";
      }
    }
    this.sessionId = sessionId;
  }

  /*
  Call sendBeacon directly for normal page load / view change types of reporting.
  if you want to report the occurance of an event use sendEvent.
  Additional parameters can also be send with a beacon - the expectation is you will send an object.
  Each { key: 'value' } pair in the object will report individually and this is only way to send multiple params.
  It will also accept key=value or key:value, but this can take only one pair.
  The type of the beacon must be one of 'beacon','event', or 'profile'.
  'beacon' is for standard pageview type tracking.
  'event' is for tracking events that occur, but do not count as pageviews.
  'profile' is used to identity and alias users and also do not count as pageviews.
  */
  sendBeacon(additionalParams: any = {}, type: string = 'beacon'):void{
    let httpParams = new HttpParams();

    // first the basic profile stuff we send with each beacon
    httpParams = httpParams.append('path', window.location.pathname || '');
    httpParams = httpParams.append('hash', window.location.hash || '');
    httpParams = httpParams.append('hostName', window.location.hostname || '');
    httpParams = httpParams.append('href', window.location.href || '');
    // gather any url parameters
    let params = location.search.substring(1);
    if(params && params.length > 0){
      params = '{"' + decodeURI(params).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}';
    }
    httpParams = httpParams.append('params', params);
    // now the basics of this user / session
    httpParams = httpParams.append('profileId', this.profileId);
    httpParams = httpParams.append('alternateId', this.alternateProfileId);
    httpParams = httpParams.append('sessionId', this.sessionId);
    httpParams = httpParams.append('userAgent', this.userAgent);
    httpParams = httpParams.append('os', this.os);
    httpParams = httpParams.append('browser', this.browser);
    httpParams = httpParams.append('deviceType', this.deviceType);
    httpParams = httpParams.append('screenResolution', this.screenResolution);
    httpParams = httpParams.append('browserWidth', this.browserWidth.toString());
    httpParams = httpParams.append('browserHeight', this.browserHeight.toString());
    httpParams = httpParams.append('timeZoneOffset', this.timeZoneOffset.toString());
    httpParams = httpParams.append('localStorage', this.localStorage ? 'true' : 'false');
    httpParams = httpParams.append('sessionStorage', this.sessionStorage ? 'true' : 'false');
    httpParams = httpParams.append('cookieEnabled', this.cookieEnabled ? 'true' : 'false');

    // make sure we have an acceptable type
    let allowedTypes = ['beacon','event','profile'];
    type = type.toLowerCase();
    if(!allowedTypes.includes(type)){
      type = 'beacon';
    }
    httpParams = httpParams.append('type', type);

    // now deal with any additional Params
    try {
      if (additionalParams) {
        if (typeof additionalParams == "object") {
          for (let key in additionalParams) {
            if (additionalParams.hasOwnProperty(key)) {
              httpParams = httpParams.append(key, additionalParams[key]);
            }
          }
        } else if (typeof additionalParams == 'string'){ // in case a key=val string was sent in
          let splitAt = additionalParams.indexOf('=');
          if(splitAt == -1){
            splitAt = additionalParams.indexOf(':'); // if not delimited by =, maybe by :
          }
          if(splitAt > 0){ // a delimiter at index 0 doesn't really have a key, so it needs to be greater than
            let key = additionalParams.substring(0,splitAt).trim();
            let val = additionalParams.substring(splitAt +1).trim();
            if(key.length > 0 && val.length > 0){ // they both need a value
              httpParams = httpParams.append(key, val);
            }
          }
        }
      }
    } catch (e) {
      console.warn(e);
    }
    console.warn('Analytics call:');
    console.log(httpParams);
    //return this.http.post(endPoint, params);
  }

  /*
  This is a little helper method equivalent to calling sendBeacon({events: 'event1,event2'}, 'event');
  Using this method should make it easier to tell what your trying to track in the code, and also
    ensures the 'event' type is sent with the beacon, which makes a difference on the back end.
  Events iterative, so every time an event is sent the total count on the back end increases by 1.
  Use SendEvents to track when events occur that are not tied to view/page changes
    like starting workflow or adding an item to the cart.
  The events parameter passed in should be a string of the event name.
  To report multiple events at once, send a comma separated list.
  Be consistent with casing so the backend can match it all up correctly.
  Additional parameters can also be send with a beacon - the expectation is you will send an object.
  This is good for things related to the event, such as number of items in an order or total filesize of a download.
  Each { key: 'value' } pair in the object will report individually and this is only way to send multiple params.
  It will also accept key=value or key:value, but this can take only one pair.
  */
  sendEvent(events: string = '', additionalParameters: any = {}):void{
    let ap2send = {};
    if(events && events.length > 0) {
      ap2send['events'] = events;
      if(additionalParameters){
        if (typeof additionalParameters == "object") {
          for (let key in additionalParameters) {
            if (additionalParameters.hasOwnProperty(key)) {
              ap2send[key] = additionalParameters[key];
            }
          }
        } else if (typeof additionalParameters == 'string'){ // in case a key=val string was sent in
          let splitAt = additionalParameters.indexOf('=');
          if(splitAt == -1){
            splitAt = additionalParameters.indexOf(':'); // if not delimited by =, maybe by :
          }
          if(splitAt > 0){ // a delimiter at index 0 doesn't really have a key, so it needs to be greater than
            let key = additionalParameters.substring(0,splitAt).trim();
            let val = additionalParameters.substring(splitAt +1).trim();
            if(key.length > 0 && val.length > 0){ // they both need a value
              ap2send[key] = val;
            }
          }
        }
      }
      this.sendBeacon(ap2send, 'event');
    }
  }

  /*
  By default, every visitor that doesn't have a profile id in localStorage or a cookie gets assigned a random id.
  If we later get an identifier for this user (they login), we can use this method to send that identifier
    to the backend so we can glue the id's together and get a better picture of this user over time across sessions
    and devices.
  */
  sendAlias(alternateId: string = ''):void{
    if(alternateId && alternateId.length > 0){
      this.alternateProfileId = alternateId;
      this.sendBeacon({}, 'profile');
    }
  }
}
