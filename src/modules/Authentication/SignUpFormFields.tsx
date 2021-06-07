import React from 'react';
import { Field } from 'redux-form';

import eduLogo from 'images/edu-logo.svg';

const phoneRegex = () => new RegExp('^(0|[1-9][0-9]{9})$');
function normalizePhone(value, previousValue) {
  return !value.includes('-') && value.length <= 10 ? value : previousValue;
}
const validatePhoneNumber = (value) => value && !phoneRegex().test(value);
const required = (value) => !value;

export function SignUpFormFields(props: {
  emailCheck: any,
}) {
  return (
    <>
      <h2 className="mb-4 mt-2">
        Sign Up to
        {' '}
        <a href="/">
          <img
            className="h-40p w-40p mr-2"
            src={eduLogo}
            alt="logo"
          />
          <span className="turq_color">CMS</span>
        </a>
      </h2>

      <div className="form-row">
        <div className="col-lg-6 col-md-12 col-sm-12">
          <div className="form-group">
            <label
              className="text-a-d-3 h6 font-weight-600"
              htmlFor="nameLogin"
            >
              Name
            </label>
            <Field
              name="name"
              className="form-control"
              id="nameLogin"
              component="input"
              validate={[required]}
            />
          </div>
        </div>
        <div className="col-lg-6 col-md-12 col-sm-12">
          <div className="form-group">
            <label
              className="text-a-d-3 h6 font-weight-600"
              htmlFor="emailLogin"
            >
              Email
            </label>
            <Field
              name="email"
              className="form-control"
              id="emailLogin"
              component="input"
              type="email"
              validate={[
                props.emailCheck,
                required,
              ]}
            />
          </div>
        </div>
      </div>

      <div className="form-group">
        <label
          htmlFor="phoneLogin"
          className="text-a-d-3 h6 font-weight-600"
        >
          Phone
        </label>
        <div className="input-group position-relative h-40p">
          <div className="input-group-prepend">
            <div className="input-group-text bg-a-3">+91</div>
          </div>
          <Field
            component="input"
            type="number"
            name="phone"
            validate={[
              validatePhoneNumber,
              required,
            ]}
            className="form-control h-40p"
            id="phoneLogin"
            normalize={normalizePhone}
          />
        </div>
      </div>
    </>
  );
}
