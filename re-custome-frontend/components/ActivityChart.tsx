'use client';

import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { User } from '@/utils/types';
import { UsersService } from '@/services/userService';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ActivityChart: React.FC = () => {
  const [userData, setUserData] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const users = await UsersService.findAll();
      setUserData(users);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const chartData = {
    labels: userData.map(user => user.name),
    datasets: [
      {
        label: 'Login Count',
        data: userData.map(user => user.activityCounts.loginCount),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 1,
      },
      {
        label: 'Download Count',
        data: userData.map(user => user.activityCounts.downloadCount),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 1,
      },
    ],
  };


  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'User Activity Statistics',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-semibold text-center mb-6">User Activity Statistics</h2>
      {userData.length > 0 &&
        <Bar data={chartData} options={chartOptions} />
      }
    </div>
  );
};

export default ActivityChart;
