import {Calibration} from "./calibration";
import {Subscan} from "./subscan";

export class Observation {

  abstract: string;
  access_estsize: number;
  cal_status: string;
  calib_level: string;
  cals: Array<Calibration>;
  coIs: Array<string>;
  data_rights: string;
  dataproduct_type: string;
  eb_id: number;
  filegroup_id: string;
  gousId: any;
  id: string;
  instrument_name: string;
  intents: Array<string>;
  legacy_id: string;
  mousId: any;
  mous_uri: string;
  num_scans: number;
  obs_band: Array<string>;
  obs_id: string;
  obs_release_date: Date;
  obs_start: Date;
  obs_stop: Date;
  pi: string;
  project_code: string;
  sci_prod_locator: string;
  sousId: any;
  subscans: Array<Subscan>;
  title: string;
  vla_configuration: string;

}
