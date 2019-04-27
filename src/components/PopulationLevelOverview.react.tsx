import {Col, Row} from "antd";
import * as React from "react";
import {connect} from "react-redux";
import {getPopulations} from "../redux/selector";
import {PopulationLevel} from "../types";
import * as DataUtils from "../utils/dataUtils";
import PopulationLevelInput from "./PopulationLevelContainer.react";

interface Props {
  populations: { [guid: number]: number },
}

class PopulationLevelOverview extends React.Component<Props> {

  populationLevels: [PopulationLevel];

  constructor(props: any) {
    super(props);
    this.populationLevels = DataUtils.selectPopulationLevels();
  }

  createPopulationLevelInputs(): [React.Component] {
    const elements: any = [];
    this.populationLevels.forEach((populationLevel: PopulationLevel, idx: number) => {
      elements.push(
        <Col key={idx} sm={6} xs={12} style={{alignContent: 'middle', padding: '10px'}}>
          <PopulationLevelInput populationLevel={populationLevel}/>
        </Col>
      );
    });
    return elements;
  }

  render() {
    return (
      <Row type="flex" justify="center" align="middle">
        {this.createPopulationLevelInputs()}
      </Row>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    populations: getPopulations(state),
  };
};

export default connect<Props, {}, {}>(mapStateToProps)(PopulationLevelOverview);