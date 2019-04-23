import {Col, Row} from "antd";
import * as React from 'react';
import {connect} from "react-redux";
import {getFactoryStates} from "../redux/selector";
import {Factory, FactoryState} from "../types";
import * as DataUtils from '../utils/dataUtils';
import FactoryContainer from './FactoryContainer.react';

interface Props {
  factoryStates: { [guid: number]: FactoryState },
}

class ProductionOverview extends React.Component<Props> {
  render() {
    const factoryContainers: any = [];
    DataUtils.selectFactories().forEach(
      (factory: Factory, idx: number): any => {
        if (this.props.factoryStates[factory.guid] && this.props.factoryStates[factory.guid].count > 0) {
          factoryContainers.push(
            <Col key={idx} sm={8} xs={12} style={{alignContent: 'middle', padding: '10px'}}>
              <FactoryContainer factory={DataUtils.selectFactoryByGuid(factory.guid)}/>
            </Col>
          );
        }
      }
    );
    return (
      <Row type="flex" justify="start" align="middle">
        {factoryContainers}
      </Row>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    factoryStates: getFactoryStates(state),
  };
};

export default connect<Props, {}, {}>(mapStateToProps)(ProductionOverview);