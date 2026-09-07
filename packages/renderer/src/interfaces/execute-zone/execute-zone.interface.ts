export interface ExecuteZoneBounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

export type GetExecuteZoneCallback = () => ExecuteZoneBounds;
