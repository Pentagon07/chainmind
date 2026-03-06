import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import SimulationOverlay from '../DisruptionSim/SimulationOverlay';

export default function AppLayout() {
    const [simulating, setSimulating] = useState(false);

    return (
        <div style={{
            display: 'flex',
            minHeight: '100vh',
            background: 'var(--bg-primary)',
        }}>
            <Sidebar />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                <TopBar onSimulate={() => setSimulating(true)} />
                <main style={{
                    flex: 1,
                    overflow: 'auto',
                    position: 'relative',
                }}>
                    <Outlet />
                </main>
            </div>
            {simulating && <SimulationOverlay onClose={() => setSimulating(false)} />}
        </div>
    );
}
