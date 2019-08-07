import React from 'react';
import { Form, Field, withFormik } from 'formik';

function UserForm() {

  return (
    <div className="user-form">
      <h1>USER FORM</h1>
      <Form>
        <Field type="text" name="name" placeholder="Name"/>
        <Field type="text" name="email" placeholder="Email"/>
        <Field type="password" name="password" placeholder="Password"/>
        <label className="terms">
          <h6>Terms Of Service</h6>
          <Field type="checkbox" name="terms"/>
        </label>
        <button type="submit">Submit</button>
      </Form>
    </div>
  )
}

const FormikUserForm = withFormik({
  mapPropsToValues(values) {
    return {
      name: values.name || '',
      email: values.email || '',
      password: values.password || ''
    }
  },
  handleSubmit(values) {
    console.log(values);
  }
})(UserForm)

export default FormikUserForm;