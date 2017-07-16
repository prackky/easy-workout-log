// TODO: refactor this to exercisesService

const calculateSuperSetIndexes = (exercises) => {
  let isCircuit = false;

  for (let i = 0; i < exercises.length; ++i) {
    const current = exercises[i];

    if (i === 0) {
      if (parseInt(current.rest, 10) === 0) {
        isCircuit = true;
        current.superSetIndex = 1;
      }
    }

    if (i > 0) {
      const previous = exercises[i - 1];

      if (parseInt(current.rest, 10) === 0) {
        if (isCircuit) {
          current.superSetIndex = previous.superSetIndex + 1;
        } else {
          isCircuit = true;
          current.superSetIndex = 1;
        }
      } else {
        if (isCircuit) {
          isCircuit = false;
          current.superSetIndex = previous.superSetIndex + 1;
        }
      }
    }
  }

  return exercises;
}

export default calculateSuperSetIndexes;
