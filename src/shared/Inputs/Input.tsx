import { Field } from 'redux-form';

const renderInput = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
}) => {
  const error$ = !!error
    ? <span className="form-text text-danger text-13">{error}</span>
    : null;
  const warning$ = !!warning
    ? <span className="form-text text-warning">{warning}</span>
    : null;
  return (
    <>
      <input
        className="form-control"
        {...input}
        placeholder={label}
        type={type}
      />
      {touched && (error$ || warning$)}
    </>
  );
};

function Input(props: {
  label: string,
  name: string,
  required?: boolean,
}) {
  return (
    <div className="form-group">
      <label
        className="text-a-d-3 h6 font-weight-600"
        htmlFor="title"
      >
        {props.label}
      </label>
      <Field
        id={props.name}
        name={props.name}
        type="text"
        className="form-control"
        component={renderInput}
        required={!!props.required}
      />
    </div>
  );
}

Input.defaultProps = {
  required: true,
};

export { Input };
