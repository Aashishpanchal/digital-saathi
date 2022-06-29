import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
export default function VerticalBarChart() {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Orders Details",
            },
        },
    };
    const labels = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
    ];
    const data = {
        labels,
        datasets: [
            {
                label: "New Orders",
                data: [40, 39, 10, 40, 39, 80, 40],
                backgroundColor: "#61efcd",
            },
            {
                label: "In Process",
                data: [40, 39, 10, 40, 39, 80, 40],
                backgroundColor: "#2485fa",
            },
            {
                label: "Delivered",
                data: [40, 39, 10, 40, 39, 80, 40],
                backgroundColor: "#00bcd7",
            },
        ],
    };
    return (<div className="bg-white dark:bg-gray-800 p-2 border dark:border-gray-600 rounded-xl shadow-sm hover:shadow-lg h-[400px] hover:cursor-pointer">
      <Bar height={400} style={{ display: "block", height: "100%" }} data={data} options={options}/>
    </div>);
}
