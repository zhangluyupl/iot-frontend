import { create } from 'zustand';
import axios from 'axios';
import type { Device, DeviceSummary, Alert, Stats } from '../types';

const API_BASE = 'http://localhost:8000/api';

interface DeviceStore {
  devices: Device[];
  summary: { online: number; offline: number; warning: number };
  alerts: Alert[];
  stats: Stats | null;
  selectedDevice: Device | null;
  loading: boolean;
  error: string | null;
  fetchDevices: () => Promise<void>;
  fetchAlerts: () => Promise<void>;
  fetchStats: () => Promise<void>;
  selectDevice: (device: Device | null) => void;
}

export const useDeviceStore = create<DeviceStore>((set) => ({
  devices: [],
  summary: { online: 0, offline: 0, warning: 0 },
  alerts: [],
  stats: null,
  selectedDevice: null,
  loading: false,
  error: null,

  fetchDevices: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get<DeviceSummary>(`${API_BASE}/devices`);
      const data = res.data;
      set({
        devices: data.devices,
        summary: data.summary,
        loading: false,
      });
    } catch (e: any) {
      set({ error: '无法连接后端，请确保 Python 后端已启动 (python main.py)', loading: false });
    }
  },

  fetchAlerts: async () => {
    try {
      const res = await axios.get(`${API_BASE}/alerts`);
      set({ alerts: res.data.alerts });
    } catch (e) {
      // ignore
    }
  },

  fetchStats: async () => {
    try {
      const res = await axios.get<Stats>(`${API_BASE}/stats`);
      set({ stats: res.data });
    } catch (e) {
      // ignore
    }
  },

  selectDevice: (device) => set({ selectedDevice: device }),
}));
