import * as RemoteDataStates from '../constants/RemoteDataStates';

export const shouldRender = state =>
  [RemoteDataStates.LOADED || RemoteDataStates.UPDATING].indexOf(state) !== -1;

export { shouldRender as default };
