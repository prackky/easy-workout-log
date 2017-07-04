const getChartData = (workoutsProgress) => {

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

  if (workoutsProgress.length === 0) {
    result.rows.push([new Date('2017-01-01'), 0]);
    result.rows.push([new Date('2017-01-02'), 1]);
  } else {
    for (const item of workoutsProgress) {
      item[0] = new Date(item[0]);
      result.rows.push(item);
    }
  }

  return result;
};

export default getChartData;
