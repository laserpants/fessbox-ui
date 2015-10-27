export function updateLine(line, state) {
  return {
    type: 'update-line', line, state
  }
}

export function addLine() {
  return {
    type: 'add-line'
  }
}

export function acceptCall(line) {
  return {
    type: 'accept-call', line
  }
}

export function rejectCall(line) {
  return {
    type: 'reject-call', line
  }
}

export function mute(line) {
  return {
    type : 'mute-call', line
  }
}

export function unMute(line) {
  return {
    type : 'unmute-call', line
  }
}

export function updateCallerInfo(line, caller) {
  return {
    type : 'update-caller-info', line, caller
  }
}
