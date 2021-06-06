import { PureComponent } from 'react';

import './List.scss';

import { Card } from './Card';

import { Campaign } from 'API/interfaces';

type Props = {
  campaigns: Campaign[] | null
};

class List extends PureComponent<Props, any> {
  render() {
    return (
      <section className="campaigns-list-wrap">
        <div className="campaigns-row">
          {
            this.props.campaigns?.map((campaign) => (
              <Card key={campaign.id} campaign={campaign} />
            ))
          }
        </div>
      </section>
    );
  }
}

export { List };
