import React, { PureComponent } from 'react';
import { Doughnut } from 'react-chartjs-2';

type Props = {
  values: number[],
  backgroundColors: string[],
};

export class DoughnutChart extends PureComponent<Props, any> {
  getChartData() {
    return {
      labels: false,
      datasets: [
        {
          label: 'Reports Summary',
          backgroundColor: this.props.backgroundColors,
          borderColor: 'rgba(0,0,0,0.5)',
          borderWidth: 1,
          data: this.props.values,
        },
      ],
    };
  }

  render() {
    return (
      <div>
        <Doughnut
          data={this.getChartData()}
          options={{
            title: {
              display: false,
            },
            legend: {
              display: false,
            },
          }}
          type="doughnut"
        />
      </div>
    );
  }
}
