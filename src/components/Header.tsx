import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <header>
            <h1>Azure AI Health Insights Demo</h1>
            <nav>
                <ul>
                    <li><Link to="/">Dashboard</Link></li>
                    <li><Link to="/endpoint-config">Endpoint Configuration</Link></li>
                    <li><Link to="/results">Results Viewer</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;