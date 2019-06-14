import { Injectable } from '@angular/core';
import { ResultType } from "./model/result-type";
import { SelectedFilter } from "./model/selected-filter";

@Injectable()
export class Globals {
  resultType: ResultType = ResultType.RESULT_TYPES['Observations'];
  resultsPerPage: number = 25;
  selectedFilters: Array<SelectedFilter> = [
    new SelectedFilter('From','from_date','2019-02-05',true),
    new SelectedFilter('To','to_date','2019-04-15',true),
    new SelectedFilter('Telescope','telescope','VLA',true),
    new SelectedFilter('Telescope','telescope','VBLA',true)
  ];
}
