import React  from 'react'

export default class PhoneBook extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div style={{border: '1px solid #ddd', width: '300px', padding: '1em', position: 'absolute', marginLeft: '300px'}}>
        <p>
          Dial
        </p>
        <a style={{float: 'right'}} href='#' onClick={e => { e.preventDefault(); this.props.onHide() }}>[ X ] Hide</a>
      </div>
    )
  }
}
