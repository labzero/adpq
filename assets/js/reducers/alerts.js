import * as ActionTypes from '../constants/ActionTypes';

const initialState = [];

const alerts = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ALERT: {
      if (state.find(alert => alert.type === action.alert.type)) {
        return state.map((alert) => {
          if (alert.type === action.alert.type) {
            return {
              ...alert,
              willExpire: !!action.willExpire
            };
          }
          return alert;
        });
      }
      return [
        ...state,
        {
          ...action.alert,
          willExpire: !!action.willExpire
        }
      ];
    }
    case ActionTypes.EXPIRE_ALERTS:
      return state
        .filter(alert => !alert.willExpire)
        .map(alert => ({ ...alert, willExpire: true }));
    default:
      return state;
  }
};

export default alerts;
