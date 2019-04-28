import {Card, Statistic, Tooltip} from "antd";
import * as React from 'react';
import {Workforce} from "../types";
import LocalizedText from "./LocalizedText.react";

type Props = {
  workforce: Workforce,
  amount: number,
}

class WorkforceContainer extends React.Component<Props> {
  render() {
    return (
      <Card
        size="small"
        headStyle={{color: "white", borderBottom: 'none'}}
        className="Anno1800Helper-WorkforceContainer"
      >

        <div style={{textAlign: 'center'}}>
          <Tooltip placement="top"
                   title={<LocalizedText localText={this.props.workforce.locaText}/>}>
            <img src={this.props.workforce.icon} alt={'Failed to Load'}/>
          </Tooltip>
        </div>
        <div style={{paddingTop: 5, textAlign: 'center'}}>
          <Statistic style={{color: 'white'}}
                     value={this.props.amount}
                     valueStyle={{fontSize: 20}}
          />
        </div>
      </Card>
    )
  }
}

export default WorkforceContainer;