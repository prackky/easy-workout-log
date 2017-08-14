import moment from 'moment';

export const getAnalyticsExerciseChartistSeriesData = (apiResponse) => {
  const result = [];

  for (const series of apiResponse) {
    const seriesData = [];
    for (const dataPoint of series.data) {
      seriesData.push({
        x: moment(dataPoint.date).toDate(),
        y: dataPoint.weight
      });
    }

    result.push({
      name: series.name,
      data: seriesData
    });

  }

  return result;
}
