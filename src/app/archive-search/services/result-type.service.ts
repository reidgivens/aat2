import { Injectable } from '@angular/core';
import {ResultType} from "../model/result-type";
import {BehaviorSubject, Observable} from "rxjs";
import { HttpClient } from "@angular/common/http";
import { EnvService } from "../../env/env.service";

@Injectable({
  providedIn: 'root'
})
export class ResultTypeService {

  private resultType: ResultType;
  private _resultType: BehaviorSubject<ResultType> = new BehaviorSubject(this.resultType);
  public readonly resultType$: Observable<ResultType> = this._resultType.asObservable();

  private serverAddress: string = '';

  constructor(private http: HttpClient, private env: EnvService) {
    this.serverAddress = env.apiUrl;
  }

  updateResultType(name: string){
    this.resultType = ResultType.getResultType(name);
    this._resultType.next(this.resultType);
  }

}
