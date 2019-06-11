import {ResultType} from './result-type';

export class Collection {
  name: string; // the name of this collection
  resultType: ResultType; // the currently selected resultType
  resultTypes: Array<ResultType>; // the available resultTypes
  resultsPerPage: number; // for pagination
  DEFAULT_RESULTS_PER_PAGE = 25;

  // we need to iterate over what is available to build to UI
  // I have identifing this list because we already have it in COLLECTIONS
  // but that is static so I can't iterate over it.
  availableCollections = ['General', 'RealFast', 'Pulsars'];

  static COLLECTIONS = {
    'General':  new Collection('General',   ResultType.OBSERVATIONS, [ResultType.OBSERVATIONS, ResultType.PROJECTS, ResultType.IMAGES]),
    'RealFast': new Collection('RealFast',  ResultType.OBSERVATIONS, [ResultType.OBSERVATIONS, ResultType.PROJECTS]),
    'Pulsars':  new Collection('Pulsars',   ResultType.OBSERVATIONS, [ResultType.OBSERVATIONS, ResultType.PROJECTS, ResultType.IMAGES]),
  };
  static DEFAULT_COLLECTION = Collection.COLLECTIONS['General'];

  constructor(name: string, resultType: ResultType, resultTypes: Array<ResultType>) {
    this.name = name;
    this.resultType = resultType;
    this.resultTypes = resultTypes;
    this.resultsPerPage = this.DEFAULT_RESULTS_PER_PAGE;
  }
}
