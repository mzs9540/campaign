import React, { PureComponent } from 'react';
import { Dropdown, Nav } from 'react-bootstrap';

import { SearchBar } from './SearchBar';

import searchIcon from 'images/search.svg';

export class SearchBarMobile extends PureComponent {
  render() {
    return (
      <Dropdown
        as={Nav.Item}
        className="search-icon mr-1 mr-lg-3"
      >
        <Dropdown.Toggle
          aria-expanded={false}
          aria-haspopup
          as={Nav.Link}
          data-toggle="dropdown"
          id="search"
          variant="default"
          className="m-0"
        >
          <span>
            <img src={searchIcon} className="h-20p w-20p" alt="Search" />
          </span>
        </Dropdown.Toggle>

        <Dropdown.Menu
          className="w-100 mobile-search"
          aria-labelledby="search"
        >
          <SearchBar placeholder="Search..." />
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}
