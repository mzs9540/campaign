import React from 'react';

import './BodyLayout.scss';

import { Show } from '../shared';

import { Sidebar } from './Sidebar';
import { Header } from './Header';

import { Footer } from 'layouts';

type Props = {
  navbarItems?: any,
  isFullScreen?: boolean,
  children: React.ReactNode,
};

type State = {
  stickyHeaderClassName: string,
  isCollapsed: boolean,
};

export class BodyLayout extends React.Component<Props, State> {
  static defaultProps = {
    navbarItems: null,
    isFullScreen: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      stickyHeaderClassName: 'unsticky',
      isCollapsed: true,
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    const offset = window.scrollY;
    if (offset > 10) {
      this.setState({ stickyHeaderClassName: 'header-sticky' });
    } else {
      this.setState({ stickyHeaderClassName: 'unsticky' });
    }
  }

  toggleSidebar() {
    this.setState((state) => {
      return {
        isCollapsed: !state.isCollapsed,
      };
    });
  }

  sidebarClasses() {
    return this.state.isCollapsed ? 'sidebar-collapsed' : '';
  }

  parentClasses() {
    return this.props.isFullScreen
      ? 'dashboard-wrapper full-width-layout'
      : 'dashboard-wrapper';
  }

  render() {
    return (
      <div className={this.parentClasses()}>
        <Sidebar sideBarClassName={this.sidebarClasses()} />

        <div className="dashboard-body">
          <Header
            stickyHeaderClassName={this.state.stickyHeaderClassName}
            handleSidebar={() => this.toggleSidebar()}
            navbarItems={this.props.navbarItems}
          />

          <div className="content">
            <Show when={!this.props.isFullScreen}>
              <div className="container">
                {this.props.children}
              </div>
            </Show>

            <Show when={!!this.props.isFullScreen}>
              {this.props.children}
            </Show>
          </div>

          <Show when={!this.props.isFullScreen}>
            <Footer />
          </Show>
        </div>
      </div>
    );
  }
}
