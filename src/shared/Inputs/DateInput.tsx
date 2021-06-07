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

function DateInput(props: {
  name: string,
  label: string,
  required?: boolean,
}) {
  return (
    <div className="form-group">
      <label
        className="text-a-d-3 h6 font-weight-600"
        htmlFor={props.name}
      >
        {props.label}
      </label>
      <Field
        id={props.name}
        name={props.name}
        type="datetime-local"
        className="form-control"
        component={renderInput}
        required={!!props.required}
      />
    </div>
  );
}

DateInput.defaultProps = {
  required: true,
};

export { DateInput };
