import React from 'react';

export function Show(props: {
  when: boolean,
  children: React.ReactNode,
}) {
  if (!props.when) {
    return null;
  }
  return (
    <>
      {props.children}
    </>
  );
}
