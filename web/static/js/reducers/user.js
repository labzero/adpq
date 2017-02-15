import * as ActionTypes from "../constants/ActionTypes"

const initialState = {  
  id: null
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN_USER:
      return { id : 999 }
    default:
      return state
  }
}

export default user
