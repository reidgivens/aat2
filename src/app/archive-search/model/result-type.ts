export class ResultType {
  name: string;
  primaryFilters: Array<string>; // see filter.service for names
  secondaryFilters: Array<string>; // see filter.service for names
  resultsEndPoint: string; // where to get search results from
  facetsEndPoint: string; // where to get facets from

  // add result types here to get them to show in the list
  // don't forget to specify the results component in app-routing.module.ts
  // the filters list should reference the components to display for filters, which may have more than input control
  // these do not refer to individual fields actually pass to the back end
  static RESULT_TYPES = {
    'Observations': new ResultType(
      'Observations',
      ['text-search', 'dates', 'frequencies', 'source-position', 'telescopes', 'configurations'],
      [ 'polarizations', 'receivers','project'],
      'restapi_get_paged_exec_blocks',
      'restapi_get_execution_block_facets'
    ),
    'Images': new ResultType(
      'Images',
      ['text-search', 'source-position', 'dates', 'frequencies', 'project'],
      ['telescopes', 'configurations', 'polarizations', 'receivers'],
      'restapi_get_paged_images',
      'restapi_get_image_facets'
    ),
    'Projects': new ResultType(
      'Projects',
      ['text-search', 'dates', 'frequencies'],
      ['source-position', 'telescopes', 'configurations', 'polarizations', 'receivers'],
      'restapi_get_eb_project_view',
      'restapi_get_execution_block_facets'
    )
  };

  constructor(name: string, primaryFilters: Array<string>, secondaryFilters: Array<string>, resultsEndPoint: string, facetsEndPoint: string) {
    this.name = name;
    this.primaryFilters = primaryFilters;
    this.secondaryFilters = secondaryFilters;
    this.resultsEndPoint = resultsEndPoint;
    this.facetsEndPoint = facetsEndPoint
  }

  static getResultTypes() {
    return Object.keys(ResultType.RESULT_TYPES);
  }

  static getResultType(name: string) {
    return ResultType.RESULT_TYPES[name];
  }
}
