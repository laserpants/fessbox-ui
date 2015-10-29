import React from 'react'

import { reduxForm } 
  from 'redux-form'

class RejectCallForm extends React.Component {
  constructor(props) {
    super(props)
  }
  hasErrors() {
    const { errors } = this.props
    return errors && Object.keys(errors).length
  }
  render() {
    const {
      fields : { reason },
      handleSubmit,
      resetForm,
      onHide
    } = this.props
    return (
      <div style={{border: '1px solid #ddd', width: '300px', padding: '1em', position: 'absolute', marginLeft: '300px'}}>
      <form onSubmit={handleSubmit}>
      <div>
          <label>Reason for rejecting the call</label>
          </div>
          <div>
            <textarea {...reason} />
            {reason.touched && reason.error && <div>{reason.error}</div>}
          </div>
          <div>
            <button onClick={handleSubmit} disabled={this.hasErrors()}>Submit</button>
            <button onClick={e => { e.preventDefault(); onHide() }}>Cancel</button>
          </div>
        </form>
      </div>
    )
  }
}

function validate(data) {
  const errors = {}
  return errors
}

export default reduxForm({
  form   : 'reject-call',
  fields : ['reason'],
  validate
})(RejectCallForm)
