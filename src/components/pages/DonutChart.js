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

  console.log(result)
  console.log(overallMatch)


const data = {
  labels: ['OverallMatch', 'SkillsMatch', 'CompensationScore', 'CultureScore'],
  datasets: [
    {
      label: '# of Votes',
      //data: [61.56, 46.67, 70, 66.67],
      data: [overallMatch, skillsMatch, compensationScore, cultureScore],
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',

      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',

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
  },
};

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr ', gridTemplateRows: '1fr ', height: '100vh' }}>
      <div style={{ gridColumn: '1', gridRow: '1', display: 'flex', justifyContent: 'top', alignItems: 'top' }}>
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default FlexChart;
