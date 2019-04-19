import * as React from "react";
import './Anno1800Helper.css';
import { Button } from 'antd';

type Props = {
    data: any;
};

class Anno1800Helper extends React.Component<Props> {
  render() {
    return (
      <div className="Anno1800Helper">
        <header className="Anno1800Helper-header">
          {this.props.data.factories[0].name}
          <Button type="primary">Primary</Button>
        </header>
      </div>
    )
  }
}

export default Anno1800Helper;
