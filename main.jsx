import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './Qrcode.css';
import Qrcode from './Qrcode.jsx';

// Debugging: Print log to check if file is loading
console.log("✅ main.jsx is running...");

const rootElement = document.getElementById('root');
console.log("Root Element:", rootElement);

if (rootElement) {
    createRoot(rootElement).render(
        <StrictMode>
            <Qrcode />
        </StrictMode>
    );
} else {
    console.error("❌ Error: Root element not found!");
}