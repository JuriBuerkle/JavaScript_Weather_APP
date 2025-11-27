import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import './TemperatureChart.css';

// Регистрируем компоненты Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

interface TemperatureChartProps {
    times: string[];
    temperatures: number[];
    temperatureUnit: string;
}

const TemperatureChart: React.FC<TemperatureChartProps> = ({
    times,
    temperatures,
    temperatureUnit,
}) => {
    // Берем только первые 24 часа
    const displayTimes = times.slice(0, 24).map((time) => {
        const date = new Date(time);
        return date.getHours() + ':00';
    });
    const displayTemperatures = temperatures.slice(0, 24);

    const data = {
        labels: displayTimes,
        datasets: [
            {
                label: `Temperature (${temperatureUnit})`,
                data: displayTemperatures,
                fill: true,
                borderColor: '#00ffff',
                backgroundColor: (context: any) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                    gradient.addColorStop(0, 'rgba(0, 255, 255, 0.4)');
                    gradient.addColorStop(0.5, 'rgba(138, 43, 226, 0.2)');
                    gradient.addColorStop(1, 'rgba(0, 255, 255, 0)');
                    return gradient;
                },
                tension: 0.4,
                pointBackgroundColor: '#00ffff',
                pointBorderColor: '#0a0a1a',
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 8,
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#00ffff',
                pointHoverBorderWidth: 3,
                borderWidth: 3,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
                labels: {
                    color: '#00ffff',
                    font: {
                        family: "'Orbitron', sans-serif",
                        size: 12,
                        weight: 500,
                    },
                    padding: 20,
                },
            },
            title: {
                display: false,
            },
            tooltip: {
                backgroundColor: 'rgba(10, 10, 30, 0.95)',
                titleColor: '#00ffff',
                bodyColor: '#fff',
                borderColor: 'rgba(0, 255, 255, 0.5)',
                borderWidth: 1,
                padding: 15,
                displayColors: false,
                titleFont: {
                    family: "'Orbitron', sans-serif",
                    size: 14,
                },
                bodyFont: {
                    family: "'Rajdhani', sans-serif",
                    size: 16,
                },
            },
        },
        scales: {
            y: {
                beginAtZero: false,
                ticks: {
                    color: 'rgba(0, 255, 255, 0.7)',
                    font: {
                        family: "'Rajdhani', sans-serif",
                        size: 12,
                    },
                },
                grid: {
                    color: 'rgba(0, 255, 255, 0.1)',
                    lineWidth: 1,
                },
                border: {
                    color: 'rgba(0, 255, 255, 0.3)',
                },
            },
            x: {
                ticks: {
                    color: 'rgba(0, 255, 255, 0.7)',
                    maxRotation: 45,
                    minRotation: 45,
                    font: {
                        family: "'Rajdhani', sans-serif",
                        size: 11,
                    },
                },
                grid: {
                    color: 'rgba(0, 255, 255, 0.05)',
                    lineWidth: 1,
                },
                border: {
                    color: 'rgba(0, 255, 255, 0.3)',
                },
            },
        },
        interaction: {
            intersect: false,
            mode: 'index' as const,
        },
    };

    return (
        <div className="chart-container">
            <Line data={data} options={options} />
        </div>
    );
};

export default TemperatureChart;
