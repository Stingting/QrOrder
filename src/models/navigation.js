export default {

  namespace: 'navigation',

  state: {
    current:'portal'
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {

  },

  reducers: {
    setCurrentKey(state, payload) {
      state.current = payload.current;
      return { ...state, ...payload };
    }
  },

};
