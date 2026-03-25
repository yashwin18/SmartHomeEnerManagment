import { useState, useEffect } from 'react'
import Dashboard from './components/Dashboard'
import DeviceList from './components/DeviceList'
import './index.css'

function App() {
    const [devices, setDevices] = useState([])
    const [totalUsage, setTotalUsage] = useState(0)

    const fetchDevices = async () => {
        try {
            const response = await fetch('http://localhost:8081/api/devices')
            const data = await response.json()
            setDevices(data)
        } catch (error) {
            console.error('Error fetching devices:', error)
        }
    }

    useEffect(() => {
        fetchDevices()
    }, [])

    useEffect(() => {
        const usage = devices.reduce((acc, device) => {
            return acc + (device.powered ? device.usageWatts : 0)
        }, 0)
        setTotalUsage(usage)
    }, [devices])

    const toggleDevice = async (id) => {
        try {
            await fetch(`http://localhost:8081/api/devices/${id}/toggle`, {
                method: 'PUT'
            })
            // Refresh devices to get updated state
            fetchDevices()
        } catch (error) {
            console.error('Error toggling device:', error)
        }
    }

    const addDevice = async (device) => {
        try {
            await fetch('http://localhost:8081/api/devices', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(device)
            })
            fetchDevices()
        } catch (error) {
            console.error('Error adding device:', error)
        }
    }

    return (
        <>
            <h1>Smart Home Energy Manager</h1>
            <div className="dashboard-container">
                <Dashboard totalUsage={totalUsage} onAddDevice={addDevice} />
                <DeviceList devices={devices} onToggle={toggleDevice} />
            </div>
        </>
    )
}

export default App
