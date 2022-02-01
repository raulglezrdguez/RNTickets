import {
  LOGIN,
  LOGOUT,
  SET_TICKETS,
  NEW_TICKET,
  DELETE_TICKET,
  SET_DARKMODE,
  SWITCH_DARKMODE,
  SET_USERS,
  UPDATE_USERS,
} from './types';

const AppReducer = (state, action) => {
  const {type, payload} = action;

  let darkMode = null;
  let user = null;
  let users = null;
  let tickets = null;

  switch (type) {
    // dark/light mode
    case SET_DARKMODE:
      return {...state, darkMode: payload};
    case SWITCH_DARKMODE:
      darkMode = !state.darkMode;
      return {...state, darkMode};

    // user authentication
    case LOGIN:
      user = {...state.user, ...payload};
      return {
        ...state,
        user,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
      };

    // users: not implemented
    case SET_USERS:
      return {...state, users: payload};
    case UPDATE_USERS:
      users = state.users.filter(u => u.id !== payload.id);
      return {...state, users};

    // tickets
    case NEW_TICKET:
      tickets = [...state.tickets, payload];
      return {...state, tickets};
    case SET_TICKETS:
      tickets = [...payload];
      return {...state, tickets};
    case DELETE_TICKET:
      tickets = [...state.tickets];
      tickets = tickets.filter(t => t.id !== payload);
      return {...state, tickets};

    default:
      return state;
  }
};

export default AppReducer;
