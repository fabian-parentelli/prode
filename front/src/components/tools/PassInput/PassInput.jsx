import './passInput.css';
import { useState } from 'react';
import { Icons } from 'fara-comp-react';

const PassInput = ({ password, setPassword, handleChange, required = false }) => {

    const [view, setView] = useState(false);

    const strength = calcStrength(password);
    const color = getColor(strength);

    return (
        <div className="passInput">
            <div
                className="strength-bar"
                style={{
                    width: `${strength}%`,
                    backgroundColor: color
                }}
            />

            <input type="password" autoComplete="new-password" hidden />

            <input
                name="password"
                type={view ? 'text' : 'password'}
                placeholder="Contraseña"
                value={password || ''}
                onChange={handleChange ? handleChange : (e) => setPassword(e.target.value)}
                required={required}
            />

            <Icons
                type={view ? 'eye' : 'eyeclosed'}
                color="#69C34E"
                onClick={() => setView(!view)}
                size="25px"
            />
        </div>
    );
};

export default PassInput;

function calcStrength(pass) {
    let score = 0;
    if (!pass) return 0;
    // length
    if (pass.length >= 6) score += 10;
    if (pass.length >= 10) score += 10;
    if (pass.length >= 14) score += 10;
    // character types
    if (/[a-z]/.test(pass)) score += 10;
    if (/[A-Z]/.test(pass)) score += 10;
    if (/\d/.test(pass)) score += 10;
    if (/[^A-Za-z0-9]/.test(pass)) score += 10;
    // Combinations
    if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) score += 10;
    if (/\d/.test(pass) && /[A-Za-z]/.test(pass)) score += 10;
    if (/[^\w\s]/.test(pass) && /\d/.test(pass)) score += 10;
    if (/[A-Z]/.test(pass) && /[^\w\s]/.test(pass)) score += 10;

    return Math.min(score, 100);
};

function getColor(strength) {
    if (strength < 20) return "#e74c3c";
    if (strength < 40) return "#e67e22";
    if (strength < 60) return "#f1c40f";
    if (strength < 80) return "#2ecc71";
    return "#006414";
};