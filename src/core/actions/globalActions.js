import { push } from 'react-router-redux';

const globalActions = {
  taskStart: () => {
    return {
      type: 'TASK-START'
    };
  },
  taskEnd: () => {
    return {
      type: 'TASK-END'
    };
  }
};

export default globalActions;
