import React, { useReducer } from 'react';
import io from 'socket.io-client';

export const StoreContext = React.createContext();

const initState = {
  'general': [
    { from: 'Marek', msg: 'Hello'},
    { from: 'Eva', msg: 'Hello'}
  ],
  'topic2': [
    { from: 'Eva', msg: 'Hello'},
    { from: 'John', msg: 'New Hello'},
    { from: 'Marek', msg: 'Hello'}
  ]
}

function reducer(state, action) {
  const {from, msg, topic} = action.payload;

  switch(action.type) {
    case 'RECEIVE_MESSAGE': 
      return {
        ...state,
        [topic]: [
          ...state[topic],
          {from, msg}
        ]
      }
    default:
      return state;
  }
} 

let socket;

function sendChatAction(value) {
  socket.emit('chat message', value);
}

export default function Store(props) {
  const [allChats, dispatch]= useReducer(reducer, initState);

  if (!socket) {
    socket = io(':4000');
    socket.on('chat message', (msg) => {
      dispatch({type: 'RECEIVE_MESSAGE', payload: msg})
    });
  }

  const user = `marek${Math.round(Math.random() * 100)}`;

  return (
    <StoreContext.Provider value={{allChats, sendChatAction, user}}>
      {props.children}
    </StoreContext.Provider>
  )
}
