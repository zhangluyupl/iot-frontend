import { useEffect } from 'react';
import { useDeviceStore } from './store/deviceStore';
import './App.css';

function App() {
  const { devices, summary, alerts, stats, loading, error, fetchDevices, fetchAlerts, fetchStats, selectDevice, selectedDevice } = useDeviceStore();

  useEffect(() => {
    fetchDevices();
    fetchAlerts();
    fetchStats();
    const interval = setInterval(() => {
      fetchDevices();
      fetchAlerts();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    if (status === 'online') return '#22c55e';
    if (status === 'warning') return '#f59e0b';
    return '#6b7280';
  };

  const getAlertColor = (level: string) => {
    if (level === 'critical') return '#ef4444';
    if (level === 'warning') return '#f59e0b';
    return '#3b82f6';
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-title">
          <span className="logo">IoT</span>
          <h1>设备监控平台</h1>
        </div>
        <div className="header-time">
          {new Date().toLocaleString('zh-CN')}
        </div>
      </header>

      {error && (
        <div className="error-banner">
          ⚠️ {error}
        </div>
      )}

      {/* KPI Cards */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-value">{devices.length}</div>
          <div className="kpi-label">设备总数</div>
        </div>
        <div className="kpi-card online">
          <div className="kpi-value">{summary.online}</div>
          <div className="kpi-label">在线</div>
        </div>
        <div className="kpi-card offline">
          <div className="kpi-value">{summary.offline}</div>
          <div className="kpi-label">离线</div>
        </div>
        <div className="kpi-card warning">
          <div className="kpi-value">{summary.warning}</div>
          <div className="kpi-label">告警</div>
        </div>
        {stats && (
          <div className="kpi-card">
            <div className="kpi-value">{stats.today.total_runs}</div>
            <div className="kpi-label">今日趟次</div>
          </div>
        )}
      </div>

      <div className="main-grid">
        {/* Device List */}
        <div className="panel">
          <div className="panel-header">
            <h2>设备列表</h2>
            <span className="refresh-hint">每5秒自动刷新</span>
          </div>
          {loading && devices.length === 0 ? (
            <div className="loading">加载中...</div>
          ) : (
            <div className="device-list">
              {devices.map((device) => (
                <div
                  key={device.id}
                  className={`device-item ${selectedDevice?.id === device.id ? 'selected' : ''}`}
                  onClick={() => selectDevice(device)}
                >
                  <div className="device-icon">
                    <span className="dot" style={{ background: getStatusColor(device.status) }} />
                  </div>
                  <div className="device-info">
                    <div className="device-name">{device.name}</div>
                    <div className="device-meta">
                      <span className="device-location">📍 {device.location}</span>
                      <span className="device-speed">{device.speed > 0 ? `${device.speed.toFixed(0)} km/h` : '静止'}</span>
                    </div>
                  </div>
                  <div className="device-status-badge" style={{ color: getStatusColor(device.status) }}>
                    {device.status === 'online' ? '在线' : device.status === 'warning' ? '告警' : '离线'}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Alert Panel */}
        <div className="panel">
          <div className="panel-header">
            <h2>AI 告警</h2>
            <span className="alert-count">{alerts.length} 条</span>
          </div>
          <div className="alert-list">
            {alerts.length === 0 ? (
              <div className="empty">暂无告警</div>
            ) : (
              alerts.map((alert) => (
                <div key={alert.id} className="alert-item">
                  <span
                    className="alert-level"
                    style={{ background: getAlertColor(alert.level) }}
                  >
                    {alert.level === 'critical' ? '急' : alert.level === 'warning' ? '警' : '息'}
                  </span>
                  <div className="alert-content">
                    <div className="alert-message">{alert.message}</div>
                    <div className="alert-meta">
                      <span>{alert.device_name}</span>
                      <span>{alert.time}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      {stats && (
        <div className="stats-bar">
          <div className="stat-item">
            <span className="stat-label">今日里程</span>
            <span className="stat-value">{stats.today.total_distance.toLocaleString()} km</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">平均车速</span>
            <span className="stat-value">{stats.today.avg_speed} km/h</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">告警总数</span>
            <span className="stat-value" style={{ color: '#ef4444' }}>{stats.today.alert_count}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">在线率</span>
            <span className="stat-value" style={{ color: '#22c55e' }}>
              {devices.length > 0 ? ((summary.online / devices.length) * 100).toFixed(0) : 0}%
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
