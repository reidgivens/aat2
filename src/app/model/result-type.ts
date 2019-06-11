export class ResultType {
  name: string;
  numResults: number; // the number of search results

  // we need to iterate over what is available to build to UI
  // I have identifing this list because we already have it in COLLECTIONS
  // but that is static so I can't iterate over it.
  //availableTypes = ['Observations','Projects','Images'];

  static OBSERVATIONS = new ResultType('Observations');
  static PROJECTS =     new ResultType('Projects');
  static IMAGES =       new ResultType('Images');

  constructor(name: string){
    this.name = name;
    this.numResults = 0;
  }
}
