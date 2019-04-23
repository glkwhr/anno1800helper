import {Button} from "antd";
import * as React from 'react';
import {connect} from "react-redux";
import {updateFactoryStates, updateFactoryCount} from "../redux/actions/actions";
import {getFactoryStates, getPopulations} from "../redux/selector";
import {FactoryState} from "../types";
import {calculateNextFactoryStates} from "../utils/logicUtils";
import LocalizedText from "./LocalizedText.react";

// Received from mapStateToProps
interface ComponentStateProps {
  populations: { [guid: number]: number },
  factoryStates: { [guid: number]: FactoryState },
}

// Received from mapDispatchToProps
interface ComponentDispatchProps {
  updateFactoryCount: any,
  updateFactoryStates: any,
}

type Props = ComponentStateProps & ComponentDispatchProps;

class CalculateButton extends React.Component<Props> {

  onClick = () => {
    this.props.updateFactoryStates(calculateNextFactoryStates(this.props.populations, this.props.factoryStates));
  };

  render() {
    return (
      <Button type="primary" size="large" onClick={this.onClick} >
        <LocalizedText
          localText={{'english': 'Calculate', 'chinese': '计算'}}/>
      </Button>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    populations: getPopulations(state),
    factoryStates: getFactoryStates(state),
  };
};

export default connect<ComponentStateProps, ComponentDispatchProps, {}>(mapStateToProps, {
  updateFactoryStates,
  updateFactoryCount
})(CalculateButton);