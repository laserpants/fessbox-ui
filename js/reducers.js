import { combineReducers } 
  from 'redux'

const initialMixerState = {
  lines : [
    {
      callState : 'free',
      isHost    : true
    }
  ]
}

function lineState(lines, index, state) {
  return lines.map((line, i) => {
    if (i === index) {
      return Object.assign({}, line, state)
    } else {
      return line
    }
  })
}

function mixer(state = initialMixerState, action) {
  switch (action.type) {
    case 'add-line':
      return {
        ...state,
        lines : [ ...state.lines, { callState : 'free' } ]
      }
    case 'update-line':
      return {
        ...state,
        lines : lineState(state.lines, action.line, action.state)
      }
    case 'accept-call':
      return {
        ...state,
        lines : lineState(state.lines, action.line, {
          callState : 'live',
          caller    : null,
          muted     : false,
          startTime : new Date().getTime()
        })
      }
    case 'reject-call':
      // @todo
    case 'forward-call':
      // @todo
    case 'hang-up':
      // @todo
    case 'mute-call':
      return {
        ...state,
        lines : lineState(state.lines, action.line, { muted : true })
      }
    case 'unmute-call':
      return {
        ...state,
        lines : lineState(state.lines, action.line, { muted : false })
      }
    default:
      return state
  }
}

const reducers = {
  mixer
}

export default combineReducers(reducers)
