import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);
export default function DoughnutChart() {
    const data = {
        labels: ["Farmers", "Warehouses", "Retailers"],
        datasets: [
            {
                data: [23, 5, 8],
                backgroundColor: ["#61efcd", "#2485fa", "#f9a825"],
                borderColor: ["#61efcd", "#2485fa", "#f9a825"],
                borderWidth: 1,
            },
        ],
    };
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Users Details",
            },
        },
    };
    return (<div className="bg-white dark:bg-gray-800 p-2 border dark:border-gray-600 rounded-xl h-[400px]  shadow-sm hover:shadow-lg hover:cursor-pointer">
      <Doughnut height={400} style={{ display: "block", height: "100%" }} data={data} options={options}/>
    </div>);
}
