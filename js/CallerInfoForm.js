import React from 'react'

import { reduxForm } 
  from 'redux-form'

class CallerInfoForm extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const {
      fields : { name },
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
            <button onClick={handleSubmit} disabled={!!name.error}>Submit</button>
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
  fields : ['name'],
  validate
})(CallerInfoForm)
