import React from 'react'

export default function ErrorMessage({ formik, name }) {
    return formik && formik.errors[name] && formik.touched[name] ? <p>{formik.errors[name]}</p> : ""
}
