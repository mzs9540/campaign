import React from 'react';

import './Spinner.scss';

type Props = {
  size?: 'sm' | 'lg',
};

export function Spinner(props: Props) {
  return (
    <div className={`ispinner ${props.size}`}>
      <div className="ispinner-blade" />
      <div className="ispinner-blade" />
      <div className="ispinner-blade" />
      <div className="ispinner-blade" />
      <div className="ispinner-blade" />
      <div className="ispinner-blade" />
      <div className="ispinner-blade" />
      <div className="ispinner-blade" />
      <div className="ispinner-blade" />
      <div className="ispinner-blade" />
      <div className="ispinner-blade" />
      <div className="ispinner-blade" />
    </div>
  );
}

Spinner.defaultProps = {
  size: 'sm',
};
