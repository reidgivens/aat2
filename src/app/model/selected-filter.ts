export class SelectedFilter {
  label: string; // what we show the user
  name: string; // the name we use internally
  value: string; // the value entered
  applicable: boolean = true; // is this filter applicable to the current result-type

  constructor(label: string, name: string, value: string, applicable: boolean) {
    this.label = label;
    this.name = name;
    this.value = value;
    this.applicable = applicable;
  }
}
