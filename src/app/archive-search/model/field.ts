export class Field {
  label: string;
  name: string;
  tooltip: string;
  allowMultipleValues: boolean;

  // add fields here to get them to show in the list
  static FIELDS = {
    'mindate': new Field('From', 'mindate', 'Observations made after this date (YYYY-MM-DD)', false),
    'maxdate': new Field('To', 'maxdate', 'Observations made before this date (YYYY-MM-DD)', false),
    'startfreq': new Field('Start', 'startfreq', 'Lowest frequency to search', false),
    'endfreq': new Field('End', 'endfreq', 'Highest frequency to search', false),
    'instrument_name': new Field('Telescope', 'instrument_name', 'Select the telescopes the observations were made with', true),
    'vla_configuration': new Field('Array Configuration', 'vla_configuration', 'Select the configuration the VLA was in when the observations were made', true),
    'polarizations': new Field('Polarizations', 'polarizations', 'Select the polarizations of the desired data', true),
    'obs_band': new Field('Receivers', 'obs_band', 'Select the observation bands', true),
    'target_name': new Field('Source Name', 'target_name', 'Enter an exact match to the source name in the archive, it is recommended you use the source resolver instead.', false),
    'pi': new Field('PI Name', 'pi', 'Principal investigator name or ID', false),
    'title': new Field('Project Title', 'title', 'Enter words or phrases found in the title of the project', false),
    'abstract': new Field('Abstract Text', 'abstract', 'Enter words or phrases found in the title of the project', false),
    'text_search_str': new Field('Search', 'text_search_str', 'Search for Project Code, Title, Abstract, PI Name, or File Name', false),
    'project_code': new Field('Project Code', 'project_code', 'E.g. for VLBA: AB123; for VLA: 12A-256; for ALMA: 2015.1.00006.S', false),
    'collection_names': new Field('Collection Names', 'collection_names', 'The name of the collection', false),
    'coordsys': new Field('Sourse Position', 'coordsys', 'Select Source position coordinate system.', false),
    'radius': new Field('Search Radius', 'radius', 'Radius to search (default arcseconds)', false),
    'equinox': new Field('Equinox', 'equinox', 'Select the equinox the coordinates will reference. (J2000 or B1950)', false),
    'longitude': new Field('Galactic Longitude', 'longitude', 'Right Ascension', false),
    'latitude': new Field('Galactic Latitude', 'latitude', 'Declination', false),
    'column_filters': new Field('Column Filters', 'column_filters', 'Sort the results', false)
  };

  /*
  'solr_id': new Field('', '', '', false),
  'obs_id': new Field('', '', '', false),
  'mousId': new Field('', '', '', false),
   */

  constructor(label: string, name: string, tooltip: string, allowMultipleValues: boolean) {
    this.label = label;
    this.name = name;
    this.tooltip = tooltip;
    this.allowMultipleValues = allowMultipleValues;
  }

  static getFields() {
    return Object.keys(Field.FIELDS);
  }

  static getField(name: string): Field {
    return Field.FIELDS[name];
  }
}
