import * as React from 'react';
import {connect} from "react-redux";
import {State} from "../types";
import {getLanguage} from "../redux/selector";

type Props = {
  localText: { [key: string]: string },
  language: string,  // from Redux store
};

class LocalizedText extends React.Component<Props> {
  render() {
    return this.props.localText[this.props.language] || this.props.localText['english'];
  }
}

const mapStateToProps = (state: State) => {
  return {
    language: getLanguage(state),
  };
};

export default connect(mapStateToProps)(LocalizedText);