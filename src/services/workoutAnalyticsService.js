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

export const getExerciseName = (exerciseFilterData, userExerciseNames) => {

  if (exerciseFilterData.exerciseName) {
    return exerciseFilterData.exerciseName;
  }

  if (userExerciseNames.length) {
    // try to pick squats
    for (let i = 0; i < userExerciseNames.length; ++i) {
      if ('squats' === userExerciseNames[i].trim().toLowerCase()) {
        return userExerciseNames[i];
      }
    }

    return userExerciseNames[0];
  }

  return '';

}
