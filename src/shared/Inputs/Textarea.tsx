import { Field } from 'redux-form';

const renderTextarea = ({
  input,
  label,
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
      <textarea
        className="form-control"
        {...input}
        placeholder={label}
      />
      {touched && (error$ || warning$)}
    </>
  );
};

function Textarea(props: {
  name: string,
  label: string,
  required?: boolean,
}) {
  return (
    <div className="form-group">
      <label
        className="text-a-d-3 h6 font-weight-600"
        htmlFor="description"
      >
        {props.label}
      </label>
      <Field
        id={props.name}
        type="text"
        name={props.name}
        className="form-control"
        component={renderTextarea}
        required={!!props.required}
      />
    </div>
  );
}

Textarea.defaultProps = {
  required: true,
};

export { Textarea };
