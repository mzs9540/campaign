import moment from 'moment';

const TIME_FORMAT = 'hh:mm A';
const DATE_FORMAT_WITHOUT_TIME = 'YYYY-MM-DD';
const DATE_TIME = 'Do MMM YY, hh:mm A';
const DATE = 'Do MMM';
const DATE_FORMAT_INPUT_TAG = 'YYYY-MM-DDTHH:mm';

export function utcToLocalDateTime(
  date: moment.Moment | string | undefined,
  defaultValue = 'N/A',
): string {
  return moment(date).isValid()
    ? moment(date).local().format(DATE_TIME)
    : defaultValue;
}

export function utcToLocalOnlyDate(
  date: moment.Moment | string | null,
  defaultValue = 'N/A',
): string {
  return moment(date).isValid()
    ? moment(date).local().format(DATE)
    : defaultValue;
}

export function utcToLocalWithoutTime(
  date: string | null,
  defaultValue = 'N/A',
): string {
  return moment(date).isValid()
    ? moment(date).local().format(DATE_FORMAT_WITHOUT_TIME)
    : defaultValue;
}

export function utcToLocalOnlyTime(
  date: string | null,
  defaultValue = 'N/A',
): string {
  return moment(date).isValid()
    ? moment(date).local().format(TIME_FORMAT)
    : defaultValue;
}

export function getDurationInSeconds(
  startTime: moment.Moment | null,
): number | never {
  if (!moment(startTime).isValid()) throw new Error('DURATION_ERR');
  const difference = moment().local().diff(moment(startTime).local());
  return moment.duration(difference).asSeconds();
}

export function inputFormat(
  date: moment.Moment | null,
  defaultValue: any = 'N/A',
) {
  return moment(date).isValid()
    ? moment(date).format(DATE_FORMAT_INPUT_TAG)
    : defaultValue;
}
