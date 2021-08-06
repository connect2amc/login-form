import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ErrorMessage from './components/ErrorMessage'
import { useState } from 'react';



const SignupForm = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      password: '',
      email: '',
      type: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('please enter a valid email address'),
      type: Yup.string().required('Required'),
      password: Yup.string()
        .max(8, 'Minimum 8 characters')
        .required('Required'),
    }),
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });


  const [focusedField, setFocusedField] = useState([])
  const [passwordFieldType, setPasswordFieldType] = useState(false)

  const handleFocusedField = (name, value) => {
    let _focusedField = Object.assign([], focusedField);
    if (value.length) {
      _focusedField.push(name)
    } else {
      _focusedField.splice(_focusedField.indexOf(name), 1)
    }
    _focusedField = [...new Set(_focusedField)]
    setFocusedField(_focusedField)

  }

  const getClass = (name) => {
    return focusedField.indexOf(name) >= 0 ? "label-animate" : ""
  }

  const getInvalidClassName = (name) => {
    return formik.errors[name] && formik.touched[name] && "error-group"
  }

  return (
    <section className="login-page">
      <div className="fullpage-wrapper">
        <div className="left-part">
          <div className="form-content">
            <div className="step-showing">
              <h6>Step 1 of 3</h6>
              <div className="indicator">
                <span className="active"></span>
                <span></span>
                <span></span>
              </div>
            </div>
            <h2>Let's set up your account</h2>
            <p>Already have an account?  <a>Sign in</a></p>
            <div className="form-wrapper">
              <form onSubmit={formik.handleSubmit}>

                <div className={`form-group ${getInvalidClassName("name")} ${getClass("name")}`}>
                  <label for="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    onChange={formik.handleChange}
                    onBlur={(e) => { formik.handleBlur(e); handleFocusedField("name", formik.values.name) }}
                    onFocus={() => handleFocusedField("name", " ")}
                  />
                  <ErrorMessage formik={formik} name="name" />
                </div>

                <div className={`form-group ${getInvalidClassName("email")} ${getClass("email")}`}>
                  <label for="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    onChange={formik.handleChange}
                    onBlur={(e) => { formik.handleBlur(e); handleFocusedField("email", formik.values.email) }}
                    onFocus={() => handleFocusedField("email", " ")} />
                  <ErrorMessage formik={formik} name="email" />
                </div>

                <div className="form-group">
                  <select className="form-control"
                    name="type"
                    value={formik.values.type}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option disabled value="">I would describe my user type as</option>
                    <option>Developer</option>
                    <option>Designer</option>
                    <option>Tester</option>
                  </select>
                  <ErrorMessage formik={formik} name="type" />
                </div>


                <div className={`form-group ${getInvalidClassName("password")} ${getClass("password")}`}>
                  <label for="password">Password</label>
                  <input
                    type={passwordFieldType ? "text" : "password"}
                    className="form-control"
                    id="password"
                    onChange={formik.handleChange}
                    onBlur={(e) => { formik.handleBlur(e); handleFocusedField("password", formik.values.password) }}
                    onFocus={() => handleFocusedField("password", " ")}
                  />
                  <span className="view-password" onClick={() => setPasswordFieldType(!passwordFieldType)} > <i className="fa fa-eye" aria-hidden="true"></i></span>
                  <ErrorMessage formik={formik} name="password" />
                </div>

                <div className="button-group">
                  <button type="submit" className={`btn-primary ${!(formik.isValid && formik.dirty) && `btn-disabled`}`}>Next</button>
                </div>
                <p>By clicking the 'Next' button, you agree to creating a free account, and  to <a>Terms of Service</a> and <a>Privacy Policy</a></p>
              </form>

            </div>
          </div>
        </div>
        <div className="right-part">
          <div className="text-content-wrapper">
            <div className="text-content">
              <h1>Dummy Heading</h1>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard. </p>
            </div>
          </div>
        </div>
      </div>

    </section >
  );
};

export default SignupForm;