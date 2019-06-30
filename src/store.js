import React from 'react'
import io from 'socket.io-client'

export const CTX = React.createContext();

const initialState = {
    general: [
        
    ],
    topic2: [
        {from:'shulk', msg : 'hello'},
        {from:'melia', msg : 'hello'},
        {from:'fiora', msg : 'hello'},
    ]
}

function reducer(state, action){
    const {from, msg, topic} = action.payload
    switch(action.type){
        case 'RECEIVE_MESSAGE':
            return {
                ...state,
                [topic]: [
                    ...state[topic],
                    {from,msg}
                ]
                
            }
        default:
            return state
    }
}

let socket

function sendChatAction(value){
    socket.emit('chat message', value);
}


export default function Store(props) {

    
    const [allChats,dispatch] = React.useReducer(reducer, initialState)
    
    if(!socket){
        socket = io(':3001');
        socket.on('chat message', function(msg){
            dispatch({ type : 'RECEIVE_MESSAGE' ,payload: msg})
          });
    }

    return (
        <CTX.Provider value={{allChats, sendChatAction}}>
            {props.children}
        </CTX.Provider>
    )
}
