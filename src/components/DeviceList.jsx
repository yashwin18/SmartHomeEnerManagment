function DeviceList({ devices, onToggle }) {
    return (
        <div className="card">
            <h2>Connected Devices</h2>
            <div className="device-list">
                {devices.length === 0 ? (
                    <p>No devices connected.</p>
                ) : (
                    devices.map(device => (
                        <div key={device.id} className={`card device-card ${device.powered ? 'on' : 'off'}`}>
                            <h3>{device.name}</h3>
                            <p>Type: {device.type}</p>
                            <p>Usage: {device.usageWatts} W</p>
                            <div className={`status-badge ${device.powered ? 'status-on' : 'status-off'}`}>
                                {device.powered ? 'ON' : 'OFF'}
                            </div>
                            <button onClick={() => onToggle(device.id)}>
                                {device.powered ? 'Turn Off' : 'Turn On'}
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default DeviceList
