export class Field {
  label: string;
  name: string;
  tooltip: string;
  allowMultipleValues: boolean;
  facets: Array<any>;

  // add fields here to get them to show in the list
  static FIELDS = {
    'to_date': new Field('To', 'to_date', 'Observation made before this date (YYYY-MM-DD)', false, []),
    'from_date': new Field ('From', 'from_date', 'Observation made after this date (YYYY-MM-DD)', false, []),
    'start_frequency': new Field('Start', 'start_frequency', 'Lowest frequency to search', false, []),
    'end_frequency': new Field('End', 'end_frequency', 'Highest frequency to search', false, []),
    'telescope': new Field('Telescope', 'telescope', 'Include data from this instrument', true, []),
    'configuration': new Field('Configuration', 'configuration', 'Include data from instruments in this configuration', true, []),
    'polarization': new Field('Polarization', 'polarization', 'Include data with these polarizations', true, []),
    'receivers': new Field('Receivers','receivers','Data observed with these bands', true, [])
  };

  constructor(label: string, name: string, tooltip: string, allowMultipleValues: boolean, facets: Array<any>) {
    this.label = label;
    this.name = name;
    this.tooltip = tooltip;
    this.allowMultipleValues = allowMultipleValues;
    this.facets = facets;
  }

  static getFields() {
    return Object.keys(Field.FIELDS);
  }

  static getField(name: string) :Field {
    return Field.FIELDS[name];
  }
}
