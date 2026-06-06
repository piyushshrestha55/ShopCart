"use client";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const RevenueChart = ({ orders = [] }) => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch("/api/vendor/orders");
      const { orders } = await res.json();

      // Group revenue by date
      const revenueByDate = {};
      orders
        .filter((o) => o.status !== "Cancelled")
        .forEach((o) => {
          const date = new Date(o.createdAt).toLocaleDateString();
          revenueByDate[date] = (revenueByDate[date] || 0) + o.total;
        });

      setChartData({
        labels: Object.keys(revenueByDate),
        datasets: [
          {
            label: "Revenue",
            data: Object.values(revenueByDate),
            borderColor: "rgba(59,130,246,1)", // blue-500
            backgroundColor: "rgba(59,130,246,0.2)",
            fill: true
          }
        ]
      });
    };
    fetchOrders();
  }, []);

  return (
    <div className="bg-white shadow rounded p-6 mt-8">
      <h2 className="text-lg font-semibold mb-4">Revenue Trend</h2>
      <Line data={chartData} />
    </div>
  );
};

export default RevenueChart;
