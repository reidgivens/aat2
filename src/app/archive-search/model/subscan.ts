export class SubscanDataDesc {
  bandwidth: number;
  center_frequency: number;
  id: string;
  polarizations: number;
}

export class Subscan {
  datadesc: Array<SubscanDataDesc>;
  dd_config_id: number;
  id: string;
  latitude: number;
  longitude: number;
  scan_intent: string;
  t_resolution: number;
  target_name: string;
  target_pos_ecliptic: string;
  target_pos_equatorial: string;
  target_pos_galactic: string;
}
