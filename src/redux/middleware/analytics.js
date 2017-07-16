import ReactGA from 'react-ga';

import { c as logWorkoutActionNames } from '../../modules/log-workout/logWorkoutActions';
import { c as signupActionNames } from '../../modules/signup/signupActions';
import { c as loginActionNames } from '../../modules/login/loginActions';
import { c as userDataActionNames } from '../../modules/user-data/userDataActions';
import { c as userWorkoutsActionNames } from '../../modules/user-workouts/userWorkoutsActions';

const analytics = store => next => action => {
  switch (action.type) {

    case '@@router/LOCATION_CHANGE':
      // console.log(action.payload.pathname);
      // ReactGA.pageview(action.payload.pathname);
      ReactGA.event({
        category: 'LOCATION-CHANGE',
        action: action.payload.pathname
      });
      break;

    case logWorkoutActionNames.LOG_WORKOUT_EXERCISE:
    case logWorkoutActionNames.LOG_WORKOUT_EXERCISE_DELETE:
    case logWorkoutActionNames.LOG_WORKOUT_SET_DATA:
    case logWorkoutActionNames.LOG_WORKOUT_SET_SHOW_REST_HELP:
    case logWorkoutActionNames.LOG_WORKOUT_SET_SHOW_TEMPO_HELP:
    case logWorkoutActionNames.LOG_WORKOUT_SET_SHOW_WEIGHT_HELP:
    case logWorkoutActionNames.LOG_WORKOUT_SAVE_SUCCESS:
      ReactGA.event({
        category: 'LOG-WORKOUT',
        action: action.type
      });
      break;

    case signupActionNames.SIGNUP_SET_DATA:
    case loginActionNames.LOGIN_SET_DATA:
    case userDataActionNames.USER_DATA_AUTH_SUCCESS:
      ReactGA.event({
        category: 'AUTH',
        action: action.type
      });

      if (action.type === userDataActionNames.USER_DATA_AUTH_SUCCESS) {
        ReactGA.set({ userId: action.id });
      } 

      break;
    case userWorkoutsActionNames.USER_WORKOUTS_FETCH_SUCCESS:
    case userWorkoutsActionNames.USER_WORKOUTS_SET_VIEW_DETAILS:
      ReactGA.event({
        category: 'VIEW-WORKOUTS',
        action: action.type
      });
      break;
    default:
      break;
  }

  return next(action);
};

export default analytics;
