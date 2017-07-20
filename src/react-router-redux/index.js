import _ConnectedRouter from './ConnectedRouter';
import _routerMiddleware from './middleware';

export { _ConnectedRouter as ConnectedRouter };

export { LOCATION_CHANGE, routerReducer } from './reducer';
export { CALL_HISTORY_METHOD, push, replace, go, goBack, goForward, routerActions } from './actions';
export { _routerMiddleware as routerMiddleware };
