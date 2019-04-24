import {Col, Collapse, Row} from "antd";
import * as React from 'react';
import {connect} from "react-redux";
import {getFactoryStates} from "../redux/selector";
import {Factory, FactoryState, ProductFilter} from "../types";
import * as DataUtils from '../utils/dataUtils';
import FactoryContainer from './FactoryContainer.react';
import LocalizedText from "./LocalizedText.react";

const Panel = Collapse.Panel;

interface Props {
  factoryStates: { [guid: number]: FactoryState },
}

class ProductionOverview extends React.Component<Props> {

  createFactoryContainers = (productFilter: ProductFilter): React.Component[] => {
    let containers: any = [];
    productFilter.products.forEach(
      (productGuid: number, idx: number) => {
        let factory: Factory | undefined = DataUtils.selectFactoryByProductGuid(productGuid);
        if (factory && this.props.factoryStates[factory.guid] && this.props.factoryStates[factory.guid].count > 0) {
          containers.push(
            <Col key={idx} sm={4} xs={8} style={{alignContent: 'middle', padding: '10px'}}>
              <FactoryContainer factory={factory}/>
            </Col>
          );
        }
      }
    );
    return containers;
  };

  render() {
    const factoryCategoryContainers: any[] = [];
    let defaultActiveKey: string[] = [];
    DataUtils.selectProductFilters().forEach(
      (productFilter: ProductFilter, idx: number) => {
        let factoryContainers: any[] = this.createFactoryContainers(productFilter);
        if (factoryContainers.length > 0) {
          defaultActiveKey.push(String(idx));
          factoryCategoryContainers.push(
            <Panel style={{backgroundColor: '#282c34', border: 0,}}
                   header={
                     <div style={{color: 'white'}}>
                       <img style={{width: 25}} src={productFilter.icon} alt={'Failed to Load'}/>
                       {'  '}
                       <LocalizedText localText={productFilter.locaText}/>
                     </div>
                   }
                   key={String(idx)}
                   showArrow={false}
            >
              <Row key={idx} type="flex" justify="start" align="middle">
                {this.createFactoryContainers(productFilter)}
              </Row>
            </Panel>
          );
        }
      }
    );
    if (factoryCategoryContainers.length === 0) {
      return (<></>);
    }
    return (
      <Collapse bordered={false}
                defaultActiveKey={defaultActiveKey}
      >
        {factoryCategoryContainers}
      </Collapse>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    factoryStates: getFactoryStates(state),
  };
};

export default connect<Props, {}, {}>(mapStateToProps)(ProductionOverview);