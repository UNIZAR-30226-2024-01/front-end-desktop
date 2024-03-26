export interface Celda {
    isRoom: boolean;
    roomName: string;
    isStartingCell: boolean | string;
    isWalkable: boolean;
    isDoor: boolean | string;
    idx: number;
  }
  