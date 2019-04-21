import {Card, Col, InputNumber, Row, Tooltip} from "antd";
import * as React from 'react';
import {connect} from "react-redux";
import {updateFactoryBoost, updateFactoryCount} from "../redux/actions/actions";
import {getFactoryStateByGuid} from "../redux/selector";
import {Factory, FactoryState} from "../types";
import LocalizedText from "./LocalizedText.react";


type ComponentOwnProps = {
  factory: Factory,
};

// Received from mapStateToProps
interface ComponentStateProps {
  factoryState: FactoryState,
}

// Received from mapDispatchToProps
interface ComponentDispatchProps {
  updateFactoryCount: any,
  updateFactoryBoost: any,
}

type Props = ComponentOwnProps & ComponentStateProps & ComponentDispatchProps;

class FactoryContainer extends React.Component<Props> {

  onBoostChange = (value: number | undefined) => {
    let newValue: number = 0;
    if (typeof value === 'number') {
      newValue = value;
    }
    this.props.updateFactoryBoost(this.props.factory.guid, newValue);
  };

  onCountChange = (value: number | undefined) => {
    let newValue: number = 0;
    if (typeof value === 'number') {
      newValue = value;
    }
    this.props.updateFactoryCount(this.props.factory.guid, newValue);
  };

  render() {
    return (
      <Card
        size="small"
        title={
          <Tooltip placement="topLeft" title={<LocalizedText localText={this.props.factory.locaText}/>}>
            <div style={{color: "white"}}>
              <LocalizedText localText={this.props.factory.locaText}/>
            </div>
          </Tooltip>
        }
        className="Anno1800Helper-FactoryContainer"
      >
        <Row type="flex" justify="space-around" align="middle">
          <Col span={8}>
            <img src={this.props.factory.icon} alt={'Failed to Load'}/>
          </Col>
          <Col span={12}>
            <div>
              <InputNumber
                style={{width: '100%'}}
                size={'small'}
                defaultValue={this.props.factoryState.count}
                min={0}
                step={1}
                precision={0}
                onChange={this.onCountChange}/>
            </div>
            <div style={{paddingTop: 5}}>
              <InputNumber
                style={{width: '100%'}}
                size={'small'}
                defaultValue={100}
                min={0}
                step={1}
                precision={0}
                formatter={(value: any) => `${value}%`}
                parser={(value: any) => value.replace('%', '')}
                onChange={this.onBoostChange}
              />
            </div>
          </Col>
        </Row>
      </Card>
    );
  }
}

const mapStateToProps = (state: any, ownProps: ComponentOwnProps) => {
  return {
    factoryState: getFactoryStateByGuid(state, ownProps.factory.guid),
  };
};

export default connect(mapStateToProps, {updateFactoryBoost, updateFactoryCount})(FactoryContainer);