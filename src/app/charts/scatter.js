"use client";
import { useRef, useEffect, useState } from "react";
import Chart from "chart.js/auto";
import asteriodData from "../../../lib/nasa/sppedData";

export default function Scatter() {
  const [error, setError] = useState("");
  const chartX = useRef(null);
  const chartInstance = useRef(null);
  const [chartDataRef, setChartData] = useState(null); // Holds the chart data to prevent re-render issues

  useEffect(() => {
    const getData = async () => {
      try {
        const speedData = await asteriodData();
        setChartData(speedData); // Store data in ref to prevent re-renders

        if (!chartX.current) return; // Ensure the canvas exists

        // If a chart instance exists, destroy it before creating a new one
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }

        const ctx = chartX.current.getContext("2d");

        // Create a new chart
        chartInstance.current = new Chart(ctx, {
          type: "scatter",
          data: {
            datasets: [
              {
                label: "Near earth objects Estimated Size (meter) vs Max Speed (m/s)",
                data: speedData, // [hazardous, non-hazardous]
                backgroundColor: "rgb(255, 99, 132)",
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false, // Allow chart to stretch based on the parent container
          },
        });
      } catch (err) {
        console.error(err.message);
        setError("Failed to fetch asteroid data.");
      }
    };

    getData();

    // Cleanup: Destroy chart when the component unmounts
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []); // Run only once when the component mounts

  return (
    <div className="flex-grow w-1/2 h-1/2">
      {error && <p className="text-red-500">{error}</p>}
      <canvas ref={chartX} className="w-full h-full"></canvas>
    </div>
  );
}
