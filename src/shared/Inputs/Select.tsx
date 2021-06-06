import { Field } from 'redux-form';
import { ReactNode } from 'react';

function Select(props: {
  label: string,
  name: string,
  required?: boolean,
  children: ReactNode,
}) {
  return (
    <div className="form-group">
      <label
        className="text-a-d-3 h6 font-weight-600"
        htmlFor="type"
      >
        {props.label}
      </label>
      <Field
        id={props.name}
        className="form-control"
        name={props.name}
        component="select"
        required={!props.required}
      >
        {props.children}
      </Field>
    </div>
  );
}

Select.defaultProps = {
  required: true,
};

export { Select };
