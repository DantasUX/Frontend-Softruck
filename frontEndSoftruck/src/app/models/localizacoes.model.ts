export interface Root {
  courses: Course[];
}

export interface Course {
  start_at: string;
  end_at: string;
  distance: number;
  speed_max: number;
  stops: number;
  total_stop_time: number;
  stop_points: StopPoints;
  gps_count: number;
  duration: number;
  speed_avg: number;
  gps: Gp[];
}

export interface StopPoints {
  type: string;
  crs: Crs;
  coordinates: number | undefined[][];
}

export interface Crs {
  type: string;
  properties: Properties;
}

export interface Properties {
  name: string;
}

export interface Gp {
  longitude: number;
  latitude: number;
  acquisition_time_unix: number;
  speed: number;
  direction: number;
  acquisition_time: string;
  address?: string;
}
