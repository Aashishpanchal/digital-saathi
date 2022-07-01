import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutChart(props: {
  data?: {
    labels: string[];
    datasets: {
      data: number[];
      backgroundColor: string[];
      borderColor: string[];
      borderWidth: number;
    }[];
  };
}) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Users Details",
      },
    },
  };
  return (
    <div className="bg-white dark:bg-gray-800 p-2 border dark:border-gray-600 rounded-xl h-[400px]  shadow-sm hover:shadow-lg hover:cursor-pointer">
      {props.data && (
        <Doughnut
          height={400}
          style={{ display: "block", height: "100%" }}
          data={props.data}
          options={options}
        />
      )}
    </div>
  );
}
