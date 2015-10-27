import React from 'react'

import { updateLine, mute, unMute }
  from './actions'

class LineWidget extends React.Component {
  constructor(props) {
    super(props)
  }
  renderNotification(state) {
    const { dispatch, index } = this.props
    if ('incoming' === state) {
      const { phoneNumber } = this.props
      return (
        <div>
          <h2>Incoming Call</h2>
          <h3>{phoneNumber}</h3>
        </div>
      )
    } else if ('live' === state) {
      const { caller } = this.props
      return (
        <div>
          <h2>On Air</h2>
          <h3>{caller}</h3>
          <p>Call duration: XX:XX:XXX</p>
        </div>
      )
    } else if ('free' === state) {
      return (
        <div>
          <h2>Free Line</h2>
        </div>
      )
    } else {
      throw `Invalid call state : ${state}`
    }
  }
  renderActions(state) {
    const { dispatch, index, muted } = this.props
    if ('incoming' === state) {
      return (
        <div>
          <button onClick={() => {
            dispatch(updateLine(index, { 
              callState  : 'live',
              caller     : 'Justin Trudeau - Berlin',
              muted      : false
            })) 
          }}>Answer</button>
          {/*
            Later, this will become something like
            dispatch(acceptCall())
          */}
          <button>Whisper mode</button>
          <button onClick={() => {
            dispatch(updateLine(index, { callState: 'free' })) 
          }}>Voicemail</button>
          {/*
            Later, this will become something like
            dispatch(forwardCall())
          */}
          <button onClick={() => {
            dispatch(updateLine(index, { callState: 'free' })) 
          }}>Reject</button>
          {/*
            Later, this will become something like
            dispatch(rejectCall())
          */}
        </div>
      )
    } else if ('live' === state) {
      return (
        <div>
          <button onClick={() => { 
            dispatch(updateLine(index, { callState: 'free' })) 
          }}>Hang up</button>
          {/*
            Later, this will become something like
            dispatch(hangUp())
          */}
          {true === muted ? (
            <button onClick={() => { dispatch(unMute(index)) }}>Unmute</button> 
          ) : (
            <button onClick={() => { dispatch(mute(index)) }}>Mute</button>
          )}
          <button>Edit contact</button>
        </div>
      )
    } else if ('free' === state) {
      return (
        <div>
          <button>Dial number</button>
          <button>Call contact</button>
        </div>
      )
    } else {
      throw `Invalid call state : ${state}`
    }
  }
  render() {
    const { index, callState, isHost, dispatch } = this.props
    return (
      <div style={{border: '1px solid #ddd'}}>
        <div>
          Line #{index+1}
          {true === isHost && (
            <span> (Host)</span>
          )}
        </div>
        <div>
          {this.renderNotification(callState)}
          {this.renderActions(callState)}
        </div>
        <input type='range' />
      </div>
    )
  }
}

export default LineWidget
