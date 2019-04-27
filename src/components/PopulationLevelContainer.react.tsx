import {Card, Col, InputNumber, Row, Tooltip} from 'antd';
import * as React from 'react';
import {connect} from "react-redux";
import {
  POPULATIONLEVELINPUT_ICON_POPULATION_LOCALTEXT,
  POPULATIONLEVELINPUT_ICON_RESIDENCE_LOCALTEXT
} from "../constants";
import {updatePopulation} from "../redux/actions/actions";
import {getPopulationByGuid} from "../redux/selector";
import {PopulationLevel} from '../types';
import * as DataUtils from "../utils/dataUtils";
import LocalizedText from "./LocalizedText.react";


// Accepted by the component
interface ComponentOwnProps {
  populationLevel: PopulationLevel,
}

// Received from mapStateToProps
interface ComponentStateProps {
  population: number,
  houseAmount: number,
}

// Received from mapDispatchToProps
interface ComponentDispatchProps {
  updatePopulation: any,
}

type Props = ComponentOwnProps & ComponentStateProps & ComponentDispatchProps;

class PopulationLevelInput extends React.Component<Props> {

  onPopulationChange = (value: number | undefined) => {
    let newValue: number = 0;
    if (typeof value === 'number') {
      newValue = value;
    }
    this.props.updatePopulation(this.props.populationLevel.guid, newValue);
  };

  onResidenceChange = (value: number | undefined) => {
    let newValue: number = 0;
    if (typeof value === 'number') {
      newValue = value * this.props.populationLevel.fullHouse;
    }
    this.props.updatePopulation(this.props.populationLevel.guid, newValue);
  };

  render() {
    return (
      <Card
        size="small"
        title={
          <Tooltip placement="topLeft" title={<LocalizedText localText={this.props.populationLevel.locaText}/>}>
            <div style={{color: "white"}}>
              <LocalizedText localText={this.props.populationLevel.locaText}/>
            </div>
          </Tooltip>
        }
        headStyle={{color: "white", borderBottom: 'none'}}
        bodyStyle={{padding: 10, textAlign: 'center'}}
        className="Anno1800Helper-FactoryContainer"
      >
        <div>
          <Row justify="center" align="middle">
            <Col span={8}>
              <Tooltip placement="left"
                       title={<LocalizedText localText={POPULATIONLEVELINPUT_ICON_POPULATION_LOCALTEXT}/>}>
                <img src={this.props.populationLevel.icon} width="70%" alt={'Failed to Load'}/>
              </Tooltip>
            </Col>
            <Col span={14}>
              <InputNumber style={{width: '100%'}} defaultValue={0} value={this.props.population} min={0} step={1} precision={0}
                           onChange={this.onPopulationChange}/>
            </Col>
          </Row>
          <Row justify="center" align="middle">
            <Col span={8}>
              <Tooltip placement="left"
                       title={<LocalizedText localText={POPULATIONLEVELINPUT_ICON_RESIDENCE_LOCALTEXT}/>}>
                <img src={DataUtils.selectIconByName('residence')} width="70%" alt={'Failed to Load'}/>
              </Tooltip>
            </Col>
            <Col span={14}>
              <InputNumber style={{width: '100%'}} defaultValue={0} value={this.props.houseAmount} min={0} step={1} precision={0}
                           onChange={this.onResidenceChange}/>
            </Col>
          </Row>
        </div>
      </Card>
    );
  }
}

const mapStateToProps = (state: any, ownProps: ComponentOwnProps) => {
  let population: number = getPopulationByGuid(state, ownProps.populationLevel.guid);
  return {
    population: population,
    houseAmount: Math.ceil(population / ownProps.populationLevel.fullHouse),
  };
};

export default connect(mapStateToProps, {updatePopulation})(PopulationLevelInput);