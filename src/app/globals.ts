import { Injectable } from '@angular/core';
import { ResultType } from "./model/result-type";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable()
export class Globals {
  resultType: ResultType = ResultType.RESULT_TYPES['Observations'];
  resultsPerPage: number = 25;

  updateResultType(name: string){
    this.resultType = ResultType.getResultType(name);
    this._resultType.next(this.resultType);
  }

  private _resultType: BehaviorSubject<ResultType> = new BehaviorSubject(this.resultType);
  public readonly resultType$: Observable<ResultType> = this._resultType.asObservable();

  constructor(){
  }

}
