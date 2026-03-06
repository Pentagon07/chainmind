import { Outlet } from 'react-router-dom';
import PublicNav from './PublicNav';
import PublicFooter from './PublicFooter';

export default function PublicLayout() {
    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            <PublicNav />
            <main>
                <Outlet />
            </main>
            <PublicFooter />
        </div>
    );
}
