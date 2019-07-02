# Archive2

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.9.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Archive Config

Configuration variables can be set in the env.js file located next to the index.html file. These variables will be loaded into the angular app through the EnvService. 

The env.js file can be modified without having to rebuild the application.

## Search Filters

What filters are available and where is controlled by the active ResultType. These are defined in model/result-type.

Each resultType has a primary and secondary filter list. Secondary filters are hidden behind the "more" link in the interface.

The values in these lists are the names of UI filter sets defined in services/filter.service.

### Creating Filters

1) Create the filter component under app.filters e.g. ng generate component filters/[name of filter]
2) import that filter component into services/filter.service, and add it to the static filters property with a name. Make the name the same as the folder that stores the component - not that is has to, but lets be consistent
3) import the filter component into the module and add it to both declarations and entryComponents
4) add the name of the filter to any result-type's primary or secondary filter list in model/result-type

### Filter Fields

Filters are UI components that contain the filter fields. As many fields as you want to be put into a filter, all filters do is control when they are visible or not.

Fields are defined in model/fields. The names of these fields should match the parameters expected at the endpoint the search query is submitted to - well, because that is what is going to be submitted.

Any field with allowMultipleValues = true will expect that facets (valid values) can be returned from that resultTypes facet endpoint. If a call to get the facets for a resultType doesn't return anything for that field, it will not be included in search requests.

Define the fields here first before creating a filter. Any input controls in a filter that does't have an field entry in the model will be ignored on search submit. This was on purpose so we can put controls in that don't get submitted, but be aware if its not in the model it ain't gonna work.

## Search Results Views

Search results views are also control by resultTypes (defined in model/result-type). Every resultType defined there will be available as a search type and switching between them will control what filters are available as well as how the results are displayed.

Unlike filters which are dynamcially inserted components, the search results are just plain old components inserted in the ui via the template in the archive-search component. Which one to be displayed is controlled with a simple *ngIf and matches on resultType.name.

You can create a search result view by just making a component (e.g. ng generate component whatevername-result) and including that in the template of the archive-search component (e.g.

`<app-whatevername-result *ngIf="resultType && resultType.name == 'nameOfResultType'" [searchResults]="searchResults"></app-whatevername-result>);`

Make sure the [searchResults]="searchResults" is present because that is how the serach results data is passed to this component, and that the resultType name is set to match the resultType you want this to show for. 

Also make sure in the search result component you make, you catch the search results coming in using the import decorator: `@Input() searchResults: Array<any> = [];`.
