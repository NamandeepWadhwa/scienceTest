"use client";
import { useRef, useEffect, useState } from "react";
import Chart from "chart.js/auto";
import asteriodData from "../../../lib/nasa/asteriodData";

export default function Page() {
  const [error, setError] = useState("");
  const chartX = useRef(null);
  const chartInstance = useRef(null);
  const [chartDataRef,setChartData] = useState(null); // Holds the chart data to prevent re-render issues

  useEffect(() => {
    const getData = async () => {
      try {
        const pieChartData = await asteriodData();
        setChartData(pieChartData) // Store data in ref to prevent re-renders

        if (!chartX.current) return; // Ensure the canvas exists

        // If a chart instance exists, destroy it before creating a new one
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }

        // Create a new chart
        chartInstance.current = new Chart(chartX.current, {
          type: "pie",
          data: {
            labels: ["Hazardous", "Non-Hazardous"],
            datasets: [
              {
                data: pieChartData, // [hazardous, non-hazardous]
                backgroundColor: ["#FF6384", "#36A2EB"],
                hoverBackgroundColor: ["#FF6384", "#36A2EB"],
              },
            ],
          },
          options: {
            responsive: true,
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
      <div className="w-1/2 h-1/2 relative overflow-hidden flex  ">
        {error && <p className="text-red-500">{error}</p>}
        <canvas ref={chartX}></canvas>
        {chartDataRef && (
          <div className="flex-col">
            <div className="mt-4">
              <p>
                Asteroid categorization based on their closest approach to Earth
                in the last 7 days
              </p>
            </div>
            <div className="mt-4">
              <h2 className="text-lg font-bold">Asteroid Data:</h2>
              <p>Total Asteroids: {chartDataRef[0] + chartDataRef[1]}</p>
              <p>Hazardous: {chartDataRef[0]}</p>
              <p>Non-Hazardous: {chartDataRef[1]}</p>
            </div>
          </div>
        )}
      </div>

      {/* Display counts without re-rendering the chart */}
    </>
  );
}
