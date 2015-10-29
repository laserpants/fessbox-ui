import React from 'react'

import { reduxForm } 
  from 'redux-form'

class CallerInfoForm extends React.Component {
  constructor(props) {
    super(props)
  }
  hasErrors() {
    const { errors } = this.props
    return errors && Object.keys(errors).length
  }
  render() {
    const {
      fields : { name, place },
      handleSubmit,
      resetForm,
      onHide
    } = this.props
    return (
      <div style={{border: '1px solid #ddd', width: '300px', padding: '1em', position: 'absolute', marginLeft: '300px'}}>
        <form onSubmit={handleSubmit}>
          <a style={{float: 'right'}} href='#' onClick={e => { e.preventDefault(); onHide() }}>[ X ] Hide</a>
          <div>
            <label>Name</label>
          </div>
          <div>
            <input type='text' {...name} />
            {name.touched && name.error && <div>{name.error}</div>}
          </div>
          <div>
            <label>Location</label>
          </div>
          <div>
            <input type='text' {...place} />
            {place.touched && place.error && <div>{place.error}</div>}
          </div>
          <div>
            <button onClick={handleSubmit} disabled={this.hasErrors()}>Submit</button>
          </div>
        </form>
      </div>
    )
  }
}

function validate(data) {
  const errors = {}
  if (!data.name) {
    errors.name = 'Please enter the caller\'s name'
  }
  return errors
}

export default reduxForm({
  form   : 'caller',
  fields : ['name', 'place'],
  validate
})(CallerInfoForm)
