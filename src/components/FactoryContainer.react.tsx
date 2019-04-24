import {Card, InputNumber, Tooltip, Typography} from "antd";
import * as React from 'react';
import {connect} from "react-redux";
import {updateFactoryBoost, updateFactoryCount} from "../redux/actions/actions";
import {getFactoryStateByGuid} from "../redux/selector";
import {Factory, FactoryState} from "../types";
import {calculateFactoryBoostFromFactoryCount, calculateFactoryCountFromFactoryBoost} from "../utils/logicUtils";
import LocalizedText from "./LocalizedText.react";

const {Text} = Typography;

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
    if (typeof value === 'number' && value > 0) {
      newValue = value;
    } else {
      // undefined, very likely to be that new value hasn't been input yet. Just wait a bit
      return;
    }
    this.props.updateFactoryBoost(this.props.factory.guid, newValue);
    // update factory count based on boost change
    this.props.updateFactoryCount(
      this.props.factory.guid,
      calculateFactoryCountFromFactoryBoost(
        newValue,
        this.props.factory.tpmin,
        this.props.factoryState.neededTpmin
      )
    );
  };

  onCountChange = (value: number | undefined) => {
    let newValue: number = 0;
    if (typeof value === 'number' && value > 0) {
      newValue = value;
    } else {
      return;
    }
    this.props.updateFactoryCount(this.props.factory.guid, newValue);
    // update factory count based on boost change
    this.props.updateFactoryBoost(
      this.props.factory.guid,
      calculateFactoryBoostFromFactoryCount(
        newValue,
        this.props.factory.tpmin,
        this.props.factoryState.neededTpmin
      )
    );
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
        headStyle={{color: "white", borderBottom: 'none'}}
        className="Anno1800Helper-FactoryContainer"
      >

        <div style={{textAlign: 'center'}}>
          <img src={this.props.factory.icon} alt={'Failed to Load'}/>
        </div>
        <div style={{paddingTop: 15}}>
          <InputNumber
            style={{width: '100%'}}
            size={'small'}
            defaultValue={1}
            value={this.props.factoryState.count}
            min={1}
            step={1}
            precision={0}
            onChange={this.onCountChange}/>
        </div>
        <div style={{paddingTop: 5}}>
          <InputNumber
            style={{width: '100%'}}
            size={'small'}
            defaultValue={100}
            value={+this.props.factoryState.boost.toFixed(0)}
            min={1}
            step={1}
            precision={0}
            formatter={(value: any) => `${value}%`}
            parser={(value: any) => value.replace('%', '')}
            onChange={this.onBoostChange}
          />
        </div>
        <Tooltip placement="right"
                 title={<LocalizedText localText={{english: 'Needed production rate', chinese: '所需生产速率'}}/>}>
          <div style={{paddingTop: 5, textAlign: 'center'}}>
            <Text style={{color: 'white', fontSize: 12}}>
              {this.props.factoryState.neededTpmin.toFixed(2)}
              <LocalizedText localText={{english: ' Unit/min', chinese: ' 单位/分钟'}}/></Text>
          </div>
        </Tooltip>
      </Card>
    );
  }
}

const mapStateToProps = (state: any, ownProps: ComponentOwnProps) => {
  return {
    factoryState: {...getFactoryStateByGuid(state, ownProps.factory.guid)},
  };
};

export default connect(mapStateToProps, {updateFactoryBoost, updateFactoryCount})(FactoryContainer);