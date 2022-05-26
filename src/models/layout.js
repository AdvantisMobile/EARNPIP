import initialState from '../store/layout';
import {blueTheme,darkTheme} from '../core/theme';
export default {
  namespace: 'auth',

  /**
   *  Initial state
   */
  state:initialState,
  /**
   * Reducers
   */
  reducers: {
    changeTheme(state, payload) {
      let desiredTheme=null; 
      if(payload="blue")
      {
          desiredTheme=blueTheme;
      }
      else is(payload=="dark")
      {
       desiredTheme=darkTheme;
      }
      console.log("Login State",state);
      console.log("Payload",payload);
      return {
        ...state,
        ...desiredTheme,
      };
    },
  },
  /**
   * Effects/Actions
   */
  effects: (dispatch) => ({
  })
};
