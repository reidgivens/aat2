export class ResultType {
  name: string;
  numResults: number; // the number of search results
  primaryFilters: Array<string>; // see filter.service for names
  secondaryFilters: Array<string>; // see filter.service for names

  // we need to iterate over what is available to build to UI
  // I have identifing this list because we already have it in COLLECTIONS
  // but that is static so I can't iterate over it.
  //availableTypes = ['Observations','Projects','Images'];

  static RESULT_TYPES = {
    'Observations': new ResultType(
      'Observations',
      ['dates', 'frequencies', 'source-position', 'telescopes', 'configurations'],
      [ 'polarizations', 'receivers']
    ),
    'Images': new ResultType(
      'Images',
      ['dates', 'frequencies', 'source-position'],
      ['telescopes', 'configurations', 'polarizations', 'receivers']
    ),
    'Projects': new ResultType(
      'Projects',
      ['dates', 'frequencies'],
      ['source-position', 'telescopes', 'configurations', 'polarizations', 'receivers']
    ),
    'VLASS': new ResultType(
      'VLASS',
      ['dates', 'frequencies', 'source-position'],
      ['telescopes', 'configurations', 'polarizations', 'receivers']
    ),
    'RealFast': new ResultType(
      'RealFast',
      ['dates', 'frequencies', 'source-position'],
      ['telescopes', 'configurations', 'polarizations', 'receivers']
    ),
    'Pulsars': new ResultType(
      'Pulsars',
      ['dates', 'frequencies', 'source-position'],
      ['telescopes', 'configurations', 'polarizations', 'receivers']
    )
  };

  constructor(name: string, primaryFilters: Array<string>, secondaryFilters: Array<string>) {
    this.name = name;
    this.numResults = 0;
    this.primaryFilters = primaryFilters;
    this.secondaryFilters = secondaryFilters;
  }

  getResultTypes() {
    return Object.keys(ResultType.RESULT_TYPES);
  }

  setResultType(name: string) {
    return ResultType.RESULT_TYPES[name];
  }
}
