import {Button} from "antd";
import * as React from 'react';
import ReactGA from 'react-ga';
import {connect} from "react-redux";
import {CALCULATE_BUTTON_TEXT_LOCALTEXT} from "../constants";
import {updateFactoryStates} from "../redux/actions/actions";
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
  updateFactoryStates: any,
}

type Props = ComponentStateProps & ComponentDispatchProps;

class CalculateButton extends React.Component<Props> {

  onClick = () => {
    this.props.updateFactoryStates(calculateNextFactoryStates(this.props.populations, this.props.factoryStates));
    ReactGA.event({
      category: 'Usage',
      action: 'Clicked Calculate',
      label: 'Production Calculator'
    });
  };

  render() {
    return (
      <Button type="primary" size="large" onClick={this.onClick}>
        <LocalizedText localText={CALCULATE_BUTTON_TEXT_LOCALTEXT}/>
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
})(CalculateButton);