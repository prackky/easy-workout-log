const getChartData = (workoutsAnalysis) => {

  const result = {
    rows: [],
    columns: [
      {
        type: 'date',
        label: 'Date'
      },
      {
        type: 'number',
        label: 'Volume'
      }
    ]
  };

  if (workoutsAnalysis.length === 0) {
    result.rows.push([new Date('2017-01-01'), 0]);
  } else {
    for (const item of workoutsAnalysis) {
      item[0] = new Date(item[0]);
      result.rows.push(item);
    }
  }

  return result;
};

export default getChartData;
