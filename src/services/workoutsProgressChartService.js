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

  for (const item of workoutsProgress) {
    item[0] = new Date(item[0]);
    result.rows.push(item);
  }

  return result;
};

export default getChartData;
