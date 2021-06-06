import { RouteComponentProps } from 'react-router';
import * as _ from 'lodash';

export function secondsToTimeAsString(secs: number | undefined): string {
  if (!secs) return '0s';
  const hours = Math.floor(secs / (60 * 60))
    ? `${Math.floor(secs / (60 * 60))}h`
    : '';

  const divisorForMinutes = secs % (60 * 60);
  const minutes = Math.floor(divisorForMinutes / 60)
    ? `${Math.floor(divisorForMinutes / 60)}m`
    : '';

  const divisorForSeconds = divisorForMinutes % 60;
  const seconds = Math.floor(divisorForSeconds)
    ? `${Math.floor(divisorForSeconds)}s`
    : '';

  return `${hours} ${minutes} ${seconds}`;
}

export function getParam<K = string>(
  obj: { props: RouteComponentProps },
  name: string,
  defaultValue: any = null,
): K | null {
  return _.get(obj.props, ['match', 'params', name], defaultValue);
}
