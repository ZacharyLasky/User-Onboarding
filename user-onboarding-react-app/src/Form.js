import React, { useState, useEffect } from 'react';
import { Form, Field, withFormik } from 'formik';
import './Form.scss';
import * as Yup from 'yup';
import axios from 'axios';

function UserForm({ errors, touched, status }) {
  const [users, setUsers] = useState([])

  useEffect(() => {
    if (status) {
      setUsers([...users, status])
    }
  }, [status])
  
  return (
    <div className="user-form">
      <h1>USER FORM</h1>
      <Form>
        {touched.name && errors.name && <p>{errors.name}</p> }
        <Field type="text" name="name" placeholder="Name"/>
        {touched.email && errors.email && <p>{errors.email}</p>}
        <Field type="text" name="email" placeholder="Email"/>
        {touched.password && errors.password && <p>{errors.password}</p>}
        <Field type="password" name="password" placeholder="Password"/>
        <label className="terms">
          <h6>Terms Of Service</h6>
          <Field type="checkbox" name="terms"/>
        </label>
        <button type="submit">Submit</button>
      </Form>

      {users.map(user => {
        return (
          <div className="cards">
            <p>NAME: {user.name}</p>
            <p>EMAIL: {user.email}</p>
          </div>
        )
      })}

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

  validationSchema: Yup.object().shape({
    name: Yup.string()
      .min(2)
      .required("Name is required"),
    email: Yup.string()
      .email("Email not valid")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be 6 characters or longer")
      .required("Password is required")
  }),
  
  handleSubmit(values, { setStatus }) {
    // console.log(values);
    axios
      .post("https://reqres.in/api/users", values)
      .then(response => {
        // console.log("RESPONSE", response.data)
        setStatus(response.data)
      })
      .catch(error => {
        console.log("ERROR:", error)
      })
  }
})(UserForm)

export default FormikUserForm;