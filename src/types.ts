// IoT 设备数据类型定义

export interface Device {
  id: string;
  name: string;
  type: 'truck' | 'sensor' | 'camera';
  status: 'online' | 'offline' | 'warning';
  location: string;
  lat: number;
  lng: number;
  speed: number;
  temp: number;
  last_update: string;
}

export interface DeviceSummary {
  total: number;
  devices: Device[];
  summary: {
    online: number;
    offline: number;
    warning: number;
  };
}

export interface Alert {
  id: string;
  device_id: string;
  device_name: string;
  level: 'info' | 'warning' | 'critical';
  message: string;
  time: string;
}

export interface AlertResponse {
  total: number;
  alerts: Alert[];
}

export interface TrajectoryPoint {
  lat: number;
  lng: number;
  timestamp: string;
  speed: number;
}

export interface TrajectoryResponse {
  device_id: string;
  trajectory: TrajectoryPoint[];
}

export interface Stats {
  today: {
    total_runs: number;
    total_distance: number;
    avg_speed: number;
    alert_count: number;
  };
  weekly: {
    labels: string[];
    runs: number[];
    alerts: number[];
  };
  device_status: {
    online: number;
    offline: number;
    warning: number;
  };
}
