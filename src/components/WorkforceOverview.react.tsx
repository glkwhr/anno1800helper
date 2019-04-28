import {Col, Collapse, Icon, Row} from "antd";
import * as React from "react";
import {connect} from "react-redux";
import {WORKFORCE_PANEL_TITLE_LOCALTEXT} from "../constants";
import {getFactoryStates} from "../redux/selector";
import {FactoryState, Workforce} from "../types";
import {selectWorkforces} from "../utils/dataUtils";
import {calculateWorkforceNeedsFromFactoryStates} from "../utils/logicUtils";
import LocalizedText from "./LocalizedText.react";
import WorkforceContainer from './WorkforceContainer.react';


const Panel = Collapse.Panel;

interface Props {
  workforceNeeds: { [guid: number]: number },
}

class WorkforceOverview extends React.Component<Props> {

  workforces: Workforce[];

  constructor(props: Props) {
    super(props);
    this.workforces = selectWorkforces();
  }

  createWorkforceContainers = (): React.Component[] => {
    let containers: any = [];
    this.workforces.forEach(
      (workforce: Workforce, idx: number) => {
        containers.push(
          <Col key={String(idx)} sm={3} xs={6} style={{alignContent: 'middle', padding: '5px'}}>
            <WorkforceContainer workforce={workforce}
                                amount={this.props.workforceNeeds[workforce.guid] || 0}/>
          </Col>
        );
      }
    );
    return containers;
  };

  render() {
    return (
      <Collapse bordered={false}
                defaultActiveKey={['0']}
      >
        <Panel style={{backgroundColor: '#282c34', border: 0,}}
               key={'0'}
               header={
                 <div style={{color: 'white'}}>
                   <Icon type="shopping" theme="filled" style={{ fontSize: '18px' }}/>
                   {'   '}
                   <LocalizedText localText={WORKFORCE_PANEL_TITLE_LOCALTEXT}/>
                 </div>
               }
               showArrow={false}
        >
          <Row type="flex" justify="center" align="middle">
            {this.createWorkforceContainers()}
          </Row>
        </Panel>
      </Collapse>
    );
  }
}

const mapStateToProps = (state: any) => {
  let factoryStates: { [guid: number]: FactoryState } = getFactoryStates(state);
  return {
    workforceNeeds: calculateWorkforceNeedsFromFactoryStates(factoryStates),
  };
};

export default connect<Props, {}, {}>(mapStateToProps)(WorkforceOverview);