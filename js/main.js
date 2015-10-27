import React       from 'react'
import ReactDOM    from 'react-dom'
import app         from './reducers'
import Mixer       from './Mixer'

import { createStore } 
  from 'redux'
import { Provider, connect } 
  from 'react-redux'
import { updateLine, addLine }
  from './actions'

const store = createStore(app)

class App extends React.Component {
  constructor(props) {
    super(props)
  }
  addLine() {
    store.dispatch(addLine())
  }
  startCall() {
    const lines = store.getState().mixer.lines
    const free = lines.filter(line => {
      return 'free' === line.callState
    })
    if (free.length) {
      store.dispatch(updateLine(lines.indexOf(free[0]), {
        callState   : 'incoming',
        phoneNumber : '+255 713 123 123'
      }))
    }
  }
  render() {
    const MixerComponent = connect(state => state.mixer)(Mixer)
    return (
      <div>
        <MixerComponent />
        <hr />
        <button onClick={this.addLine}>
          add line
        </button>
        <button onClick={this.startCall}>
          incoming call
        </button>
      </div>
    )
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('main')
)
