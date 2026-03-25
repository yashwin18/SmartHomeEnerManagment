import { useState } from 'react'

function Dashboard({ totalUsage, onAddDevice }) {
    const [newDeviceName, setNewDeviceName] = useState('')
    const [newDeviceType, setNewDeviceType] = useState('Light')
    const [newDeviceWatts, setNewDeviceWatts] = useState(10)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!newDeviceName) return

        onAddDevice({
            name: newDeviceName,
            type: newDeviceType,
            usageWatts: parseFloat(newDeviceWatts),
            powered: false
        })

        setNewDeviceName('')
        setNewDeviceWatts(10)
    }

    return (
        <div className="card">
            <h2>Energy Dashboard</h2>
            <div className="total-usage-display">
                {totalUsage} W
            </div>
            <p>Current Total Consumption</p>

            <hr />

            <h3>Add New Device</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input
                    type="text"
                    placeholder="Device Name"
                    value={newDeviceName}
                    onChange={(e) => setNewDeviceName(e.target.value)}
                    style={{ padding: '8px' }}
                />
                <select
                    value={newDeviceType}
                    onChange={(e) => setNewDeviceType(e.target.value)}
                    style={{ padding: '8px' }}
                >
                    <option value="Light">Light</option>
                    <option value="Fan">Fan</option>
                    <option value="AC">AC</option>
                    <option value="TV">TV</option>
                    <option value="Other">Other</option>
                </select>
                <input
                    type="number"
                    placeholder="Watts"
                    value={newDeviceWatts}
                    onChange={(e) => setNewDeviceWatts(e.target.value)}
                    style={{ padding: '8px' }}
                />
                <button type="submit">Add Device</button>
            </form>
        </div>
    )
}

export default Dashboard
