import {Col, InputNumber, Row} from 'antd';
import * as React from 'react';
import {connect} from "react-redux";
import {updatePopulation} from "../redux/actions/actions";
import {getPopulationByGuid} from "../redux/selector";
import {PopulationLevel} from '../types';
import LocalizedText from "./LocalizedText.react";

// Accepted by the component
interface ComponentOwnProps {
  populationLevel: PopulationLevel,
}

// Received from mapStateToProps
interface ComponentStateProps {
  population: number,
}

// Received from mapDispatchToProps
interface ComponentDispatchProps {
  updatePopulation: any,
}

type Props = ComponentOwnProps & ComponentStateProps & ComponentDispatchProps;

class PopulationLevelInput extends React.Component<Props> {

  onChange = (value: number | undefined) => {
    let newValue: number = 0;
    if (typeof value === 'number') {
      newValue = value;
    }
    this.props.updatePopulation(this.props.populationLevel.guid, newValue);
  };

  render() {
    return (
      <Row className="Anno1800Helper-PopulationLevelInput" type="flex" justify="center" align="middle">
        <Col span={8}>
          <img src={this.props.populationLevel.icon} alt={'Failed to Load'}/>
          <p>
            <LocalizedText localText={this.props.populationLevel.locaText}/>
          </p>
        </Col>
        <Col span={12}>
          <InputNumber style={{width: '100%'}} defaultValue={0} min={0} step={1} precision={0}
                       onChange={this.onChange}/>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state: any, ownProps: ComponentOwnProps) => {
  return {
    population: getPopulationByGuid(state, ownProps.populationLevel.guid),
  };
};

export default connect(mapStateToProps, {updatePopulation})(PopulationLevelInput);