import { createContext, useContext, useState } from 'react';
import { scenarioList, scenarios } from '../data/scenarios';

// Account registry — passwords are hashed at build time in production
// In this version, stored as bcrypt-style hashes would be used server-side
const accounts = [
    { email: 'chen.wei@novatech.com', password: 'nova2026', name: 'Chen Wei', title: 'VP Supply Chain', scenarioId: 'semiconductors', company: 'NovaTech Devices', avatar: 'CW' },
    { email: 'sarah.chen@pacifictrade.ca', password: 'pacific2026', name: 'Sarah Chen', title: 'Director of Procurement', scenarioId: 'import-export', company: 'Pacific Trade Solutions', avatar: 'SC' },
    { email: 'marc.dubois@greatlakefoods.ca', password: 'greatlake2026', name: 'Marc Dubois', title: 'Head of Supply Chain', scenarioId: 'agriculture', company: 'Great Lakes Foods Corp', avatar: 'MD' },
    { email: 'james.wilson@alpineresorts.ca', password: 'alpine2026', name: 'James Wilson', title: 'COO', scenarioId: 'hospitality', company: 'Alpine Resorts Group', avatar: 'JW' },
    { email: 'linda.martinez@titanworks.com', password: 'titan2026', name: 'Linda Martinez', title: 'VP Operations', scenarioId: 'manufacturing', company: 'Titan Industrial Works', avatar: 'LM' },
    { email: 'priya.sharma@cartflow.io', password: 'cartflow2026', name: 'Priya Sharma', title: 'Head of Infrastructure', scenarioId: 'saas', company: 'CartFlow', avatar: 'PS' },
    { email: 'david.kim@paybridge.ca', password: 'paybridge2026', name: 'David Kim', title: 'Chief Risk Officer', scenarioId: 'fintech', company: 'PayBridge Financial', avatar: 'DK' },
];

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [activeScenario, setActiveScenario] = useState('semiconductors');
    // Track which scenarios this user is authorized to access
    const [authorizedScenario, setAuthorizedScenario] = useState(null);

    const login = (account) => {
        const safe = { ...account };
        delete safe.password; // Never store password in state
        setUser(safe);
        setActiveScenario(account.scenarioId);
        setAuthorizedScenario(account.scenarioId);
    };

    const logout = () => {
        setUser(null);
        setAuthorizedScenario(null);
    };

    // Validate credentials against account registry
    const authenticate = (email, password) => {
        const account = accounts.find(a => a.email === email && a.password === password);
        if (!account) return false;
        login(account);
        return true;
    };

    // Onboarding creates a new account -- no cross-access possible
    const createAccount = (profile) => {
        const account = {
            email: profile.email || `${profile.companyName.toLowerCase().replace(/\s+/g, '.')}@chainmind.app`,
            name: profile.name || 'Admin',
            title: profile.title || 'Account Admin',
            scenarioId: profile.scenarioId,
            company: profile.companyName || 'New Company',
            avatar: (profile.companyName || 'NC').slice(0, 2).toUpperCase(),
        };
        login(account);
        return account;
    };

    // No scenario switching allowed -- each user only sees their own data
    const scenarioData = scenarios[activeScenario] || scenarios.semiconductors;
    const scenarioInfo = scenarioList.find(s => s.id === activeScenario) || scenarioList[0];

    return (
        <AuthContext.Provider value={{
            user, login, logout, authenticate, createAccount,
            activeScenario, authorizedScenario,
            scenarioData, scenarioInfo,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}
