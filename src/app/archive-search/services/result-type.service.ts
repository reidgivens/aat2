import { Injectable } from '@angular/core';
import {ResultType} from "../model/result-type";
import {BehaviorSubject, Observable} from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ResultTypeService {

  private resultType: ResultType;
  private _resultType: BehaviorSubject<ResultType> = new BehaviorSubject(this.resultType);
  public readonly resultType$: Observable<ResultType> = this._resultType.asObservable();

  private facets: any;

  // TODO: this should probably be put in some kind of config
  private serverAddress: string = 'https://webtest.aoc.nrao.edu/archiveIface/';

  constructor(private http: HttpClient) {
  }

  updateResultType(name: string){
    this.resultType = ResultType.getResultType(name);
    // load facets here before we trigger the next
    this.facets = [];
    this.loadFacets().subscribe((facets:string) => {
      this.facets = JSON.parse(facets).facet_list;
      this._resultType.next(this.resultType);
    });
  }

  loadFacets(){
    return this.http.get(this.serverAddress + this.resultType.facetsEndPoint, {responseType: "json"});
  }

  getFacets(){
    return this.facets;
  }


}
