import React from 'react';

import searchIcon from 'images/search.svg';

type Props = {
  placeholder: string,
};

export function SearchBar(props: Props) {
  return (
    <form className="d-flex align-items-center w-100">
      <input
        className={
          'w-100 grey_bg border-right-0 border-bottom border-top'
          + ' border-left bg-light rounded-left pl-3 h-40p'
        }
        type="search"
        placeholder={props.placeholder}
        aria-label="Search"
      />
      <button
        type="submit"
        className={
          'h-40p w-50p grey_bg rounded-right border-left-0'
          + ' border-right border-top border-bottom'
        }
      >
        <img src={searchIcon} className="h-15p w-15p" alt="Search" />
      </button>
    </form>
  );
}
