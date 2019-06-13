import { Injectable } from '@angular/core';
import {ResultType} from "./model/result-type";

@Injectable()
export class Globals {
  resultType: ResultType = ResultType.RESULT_TYPES['Observations'];
  resultsPerPage: number = 25;
  activeSearchFilters: Array<any> = [];
}
