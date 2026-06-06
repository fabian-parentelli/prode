import './countdownCard.css';
import { useEffect, useState } from 'react';

const WORLD_CUP_DATE = new Date('2026-06-11T19:00:00Z'); // 4pm Argentina (UTC-3) = 19:00 UTC
const FINAL_DATE = new Date('2026-07-19T19:00:00Z'); // 4pm Argentina (UTC-3) = 19:00 UTC

const CountdownCard = () => {
    const now = new Date();
    const isWorldCupPassed = now > WORLD_CUP_DATE;
    const targetDate = isWorldCupPassed ? FINAL_DATE : WORLD_CUP_DATE;

    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const currentNow = new Date();
            const currentTarget = currentNow > WORLD_CUP_DATE ? FINAL_DATE : WORLD_CUP_DATE;
            const diff = currentTarget - currentNow;

            if (diff <= 0) {
                return { days: 0, hours: 0, minutes: 0, seconds: 0 };
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / 1000 / 60) % 60);
            const seconds = Math.floor((diff / 1000) % 60);

            return { days, hours, minutes, seconds };
        };

        setTimeLeft(calculateTimeLeft());
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const pad = (num) => String(num).padStart(2, '0');

    const items = [
        { value: timeLeft.days, label: 'Días' },
        { value: timeLeft.hours, label: 'Hrs' },
        { value: timeLeft.minutes, label: 'Min' },
        { value: timeLeft.seconds, label: 'Seg' },
    ];

    const elements = [];
    items.forEach((item, index) => {
        elements.push(
            <div key={item.label} className="countdown-item">
                <span className="countdown-value">{pad(item.value)}</span>
                <span className="countdown-label">{item.label}</span>
            </div>
        );
        if (index < items.length - 1) {
            elements.push(
                <span key={`sep-${index}`} className="countdown-separator">:</span>
            );
        }
    });

    return (
        <div className="countdown-card">
            <h3 className="countdown-title">
                {isWorldCupPassed ? 'Faltan para la Final del Mundial' : 'Faltan para el mundial'}
            </h3>

            <div className="countdown-grid">
                {elements}
            </div>

            <div className="countdown-footer">
                {isWorldCupPassed
                    ? '19 de julio de 2026 — New York, Estados Unidos'
                    : 'Partido inaugural: 11 Jun 2026 — Estadio Azteca, México'}
            </div>
        </div>
    );
};

export default CountdownCard;