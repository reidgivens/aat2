export class ResultType {
  name: string;
  numResults: number; // the number of search results
  primaryFilters: Array<string>; // see filter.service for names
  secondaryFilters: Array<string>; // see filter.service for names

  // add result types here to get them to show in the list
  // don't forget to specify the results component in app-routing.module.ts
  static RESULT_TYPES = {
    'Observations': new ResultType(
      'Observations',
      ['dates', 'frequencies', 'source-position', 'telescopes', 'configurations'],
      [ 'polarizations', 'receivers']
    ),
    'Images': new ResultType(
      'Images',
      ['source-position', 'dates', 'frequencies'],
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

  static getResultTypes() {
    return Object.keys(ResultType.RESULT_TYPES);
  }

  static getResultType(name: string) {
    return ResultType.RESULT_TYPES[name];
  }
}
