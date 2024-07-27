import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { Formik, Field, Form as FormikForm } from 'formik';
import * as yup from 'yup';

export default function AppForm() {
  const [submittedData, setSubmittedData] = useState([]);

  const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    phoneNumber: yup.string().required(),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    schema.isValid(values).then((valid) => {
      if (valid) {
        setSubmittedData([...submittedData, values]);
        resetForm();
      } else {
        alert('Invalid form');
      }
      setSubmitting(false);
    });
  };

  const initialValues = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
  };

  return (
    <div>
      <div className='text-center'>Exercice how to use Controlled Form</div>

      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ handleChange, handleBlur, values }) => (
          <FormikForm className='m-5'>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>First Name</Form.Label>
              <Field
                as={Form.Control}
                type="text"
                name="firstName"
                placeholder="Enter your First Name Please"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.firstName}
              />
              <Form.Label>Last Name</Form.Label>
              <Field
                as={Form.Control}
                type="text"
                name="lastName"
                placeholder="Enter your Last Name Please"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lastName}
              />
              <Form.Label>Phone Number</Form.Label>
              <Field
                as={Form.Control}
                type="text"
                name="phoneNumber"
                placeholder="Enter your Phone Number Please"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phoneNumber}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </FormikForm>
        )}
      </Formik>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone number</th>
          </tr>
        </thead>
        <tbody>
          {[...submittedData].sort((a,b)=> a.lastName.localeCompare(b.lastName) ).map((data, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{data.firstName}</td>
              <td>{data.lastName}</td>
              <td>{data.phoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}