"use client";
import { useRef, useEffect, useState } from "react";
import Chart from "chart.js/auto";
import asteriodData from "../../../lib/nasa/sppedData";

export default function Page() {
  const [error, setError] = useState("");
  const chartX = useRef(null);
  const chartInstance = useRef(null);
  const [chartDataRef,setChartData] = useState(null); // Holds the chart data to prevent re-render issues

  useEffect(() => {
    const getData = async () => {
      try {
        const speedData = await asteriodData();
        setChartData(speedData) // Store data in ref to prevent re-renders

        if (!chartX.current) return; // Ensure the canvas exists

        // If a chart instance exists, destroy it before creating a new one
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }
        const canvas = chartX.current;
        const container = canvas.parentElement;

        // Set the canvas width and height to match the container's size
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;

        const ctx = canvas.getContext("2d");

        // Create a new chart
        chartInstance.current = new Chart(ctx, {
          type: "scatter",
          data: {
            datasets: [
              {
                label: "Estimated Size (meter) vs Max Speed (m/s)",
                data: speedData, // [hazardous, non-hazardous]
                backgroundColor: "rgb(255, 99, 132)",
              },
            ],
          },
          options: {
            responsive: false,
            animation: {
              duration: 0, // Disable animation
            },
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
    <>
      <div className="w-3/5 h-full">
        {error && <p className="text-red-500">{error}</p>}
        <canvas  ref={chartX}></canvas>
      </div>
    </>
  );
}
