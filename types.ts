export interface LayerInfo {
  id: number;
  name: string;
  enName: string;
  description: string;
  protocols: string[];
  summary: string; // The "one sentence" summary
  color: string;
  icon: string;
}

export interface TcpLayerInfo {
  name: string;
  osiMapping: number[]; // Which OSI layers map to this (e.g., [7, 6, 5])
  description: string;
  color: string;
}

export interface EngineeringLayerInfo {
  level: string; // L1, L2, L3
  name: string;
  device: string;
  concepts: string[];
  description: string;
  color: string;
}