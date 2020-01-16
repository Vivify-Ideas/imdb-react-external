/**
 * This function serves to reduce boilerplate in reducers.
 * It also gives us better overview of actions getting called.
 * Example of usage:
 * // todoReducer.js
 * export default createReducer({
 *  ['DISPATCHED_ACTION_TYPE']: (state, action) => ...rest is normal reducer behavior,
 *  ['ADD_TODO']: addTodo
 * });
 *
 * const addTodo = (state, action) => return state;
 *
 * @param {Object<Function>} handlers Object defining valid reducer actions.
 * @param initialState state given to redux store on init.
 */
export default function createReducer(handlers, initialState) {
  return (state = initialState, action) => {
    const reducer = handlers[action.type];
    if (reducer) {
      return reducer(state, action);
    }

    return state;
  };
}
