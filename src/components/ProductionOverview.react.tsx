import {Col, Row} from "antd";
import * as React from 'react';
import {Factory} from "../types";
import * as DataUtils from '../utils/dataUtils';
import FactoryContainer from './FactoryContainer.react';

class ProductionOverview extends React.Component {
  render() {
    const factoryContainers: any = [];
    DataUtils.selectFactories().forEach(
      (factory: Factory, idx: number): any => {
        factoryContainers.push(
          <Col key={idx} sm={8} xs={12} style={{alignContent: 'middle', padding: '10px'}}>
            <FactoryContainer factory={DataUtils.selectFactoryByGuid(factory.guid)}/>
          </Col>
        );
      }
    );
    return (
      <Row type="flex" justify="space-around" align="middle">
        {factoryContainers}
      </Row>
    );
  }
}

export default ProductionOverview;