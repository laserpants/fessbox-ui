import React from 'react'

import { updateLine, acceptCall, rejectCall, mute, unMute }
  from './actions'

class CallDuration extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      now   : new Date().getTime(),
      timer : null
    }
  }
  componentDidMount() {
    this.setState({
      timer : setInterval(() => {
        this.setState({
          now : new Date().getTime()
        })
      }, 1000)
    })
  }
  componentWillUnmount() {
    const { timer } = this.state
    if (timer) {
      clearInterval(timer)
    }
  }
  render() {
    const { now } = this.state
    const { startTime } = this.props
    return (
      <span>
        {now - startTime}
      </span>
    )
  }
}

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
      const { caller, startTime } = this.props
      return (
        <div>
          <h2>On Air</h2>
          <h3>{caller}</h3>
          <p>Call duration: <CallDuration startTime={startTime}/></p>
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
          <button onClick={() => { dispatch(acceptCall(index)) }}>Answer</button>
          <button>Whisper mode</button>
          <button onClick={() => {
            dispatch(updateLine(index, { callState: 'free' })) 
          }}>Voicemail</button>
          {/*
            Later, this will become something like
            dispatch(forwardCall())
          */}
          <button onClick={() => { dispatch(rejectCall(index)) }}>Reject</button>
        </div>
      )
    } else if ('live' === state) {
      return (
        <div>
          {true === muted && (
            <div style={{float: 'right'}}>
              Muted
            </div>
          )}
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
