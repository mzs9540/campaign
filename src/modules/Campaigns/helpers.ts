import moment from 'moment';

import { FormData } from './interfaces';

export function validateForm(values: FormData) {
  const errors: any = {};
  const isAfter = moment().isAfter(values.startsAt, 'minutes');
  const isValidEndsAt = moment(values.endsAt).isAfter(
    values.startsAt,
    'minutes',
  );
  if (!values.title) {
    errors.title = 'Required';
  } else if (values.title.length > 150) {
    errors.title = 'Must be less than 150 characters';
  } else if (values.title.length < 10) {
    errors.title = 'Must be greater than 10 characters';
  }
  if (!values.type) {
    errors.type = 'Required';
  }
  if (!!values.description && values.description.length > 500) {
    errors.description = 'Must be less than 500 characters';
  } else if (!!values.description && values.description.length < 50) {
    errors.description = 'Must be greater than 50 characters';
  }
  if (!values.startsAt) {
    errors.startsAt = 'Required';
  } else if (isAfter) {
    errors.startsAt = "Starts at must be after today's date time";
  }
  if (!values.endsAt) {
    errors.endsAt = 'Required';
  } else if (!isValidEndsAt) {
    errors.endsAt = 'Ends at must be after start date time';
  }

  return errors;
}
