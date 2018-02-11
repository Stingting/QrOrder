
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
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
  },

  reducers: {
    setCurrentKey(state, payload) {
      state.current = payload.current;
      return { ...state, ...payload };
    },
  },

};
