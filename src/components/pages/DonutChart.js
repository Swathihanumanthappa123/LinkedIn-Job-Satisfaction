import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const FlexChart = (result) => {
  result = result.result;
  // Parse each score as integer
  const overallMatch = result.OverallMatch;
  const skillsMatch = result.SkillsMatch;
  const compensationScore = result.CompensationScore;
  const cultureScore = result.CultureScore;

  console.log(result);
  console.log(overallMatch);

  const data = {
    labels: ['Skills Match', 'Compensation Score', 'Culture Score'],
    datasets: [
      {
        label: '# of Votes',
        data: [skillsMatch, compensationScore, cultureScore],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return tooltipItem.label + ': ' + tooltipItem.raw + '%';
          },
        },
      },
    },
    cutout: '60%',
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', height: '100vh', paddingRight: '20px' }}>
      <div style={{ width: '300px', height: '300px', position: 'relative' }}>
        <Doughnut data={data} options={options} />
        <div
          style={{
            position: 'absolute',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            top: '58%',
            left: '51%',
            transform: 'translate(-50%, -50%)',
            fontSize: '24px',
            fontWeight: 'bold',
          }}
        >
          {overallMatch}%
        </div>
      </div>
    </div>
  );
};

export default FlexChart;
