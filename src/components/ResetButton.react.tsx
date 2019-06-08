import {Button} from "antd";
import * as React from 'react';
import ReactGA from "react-ga";
import {connect} from "react-redux";
import {RESET_BUTTON_TEXT_LOCALTEXT} from "../constants";
import {reset} from "../redux/actions/actions";
import LocalizedText from './LocalizedText.react';


interface ComponentDispatchProps {
  reset: any,
}

class ResetButton extends React.Component<ComponentDispatchProps> {

  reset = () => {
    this.props.reset();
    ReactGA.event({
      category: 'Usage',
      action: 'Clicked Reset',
      label: 'Production Calculator'
    });
  };

  render() {
    return (
      <Button type="default" size="large" onClick={this.reset}>
        <LocalizedText localText={RESET_BUTTON_TEXT_LOCALTEXT}/>
      </Button>
    );
  }
}

export default connect<{}, ComponentDispatchProps, {}>(null, {
  reset,
})(ResetButton);