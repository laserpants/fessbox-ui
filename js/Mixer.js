import React      from 'react'
import LineWidget from './LineWidget'

export default class Mixer extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { lines, dispatch } = this.props
    return (
      <div>
        {lines.map((line, i) => {
          return (
            <LineWidget {...line} 
              key      = {i}
              index    = {i}
              dispatch = {dispatch} />
          )
        })}
      </div>
    )
  }
}
