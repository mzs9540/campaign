import React, { Component } from 'react';

import { Show } from './Show';
import { SnackBar } from './SnackBar';

const HIDE_IN_MS = 120 * 1000;
const CRITICAL_VALUE_PER = 20;

export class BatteryDetector extends Component<any, any> {
  notifier: () => void;

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      message: '',
    };
    this.notifier = () => this.chargeLevelUnderCriticalValue();
  }

  chargeLevelUnderCriticalValue(): void {
    const nav = navigator as any;
    const battery = nav.battery || nav.webkitBattery || nav.mozBattery;
    if (!battery.charging && battery.level <= (CRITICAL_VALUE_PER / 100)) {
      this.notify('The batter level is low');
    }
  }

  componentDidMount() {
    window.addEventListener('levelchange', this.notifier);
  }

  componentWillUnmount() {
    window.removeEventListener('levelchange', this.notifier);
  }

  notify(message) {
    this.setState({ show: true, message });
    setTimeout(() => this.setState({ show: false }), HIDE_IN_MS);
  }

  render() {
    return (
      <Show when={this.state.show}>
        <SnackBar message={this.state.message} />
      </Show>
    );
  }
}
