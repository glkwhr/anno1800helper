import {Select} from "antd";
import * as React from 'react';
import {connect} from "react-redux";
import {updateLanguage} from "../redux/actions/actions";

const Option = Select.Option;

type Props = {
  defaultValue: string,
  languages: [string],
  updateLanguage: any,  // from Redux store
};

class LanguageSelector extends React.Component<Props> {

  options: any = [];

  constructor(props: Props) {
    super(props);
    props.languages.forEach((language: string, idx: number) => {
      this.options.push(<Option key={idx} value={language}>{language.charAt(0).toUpperCase() + language.slice(1)}</Option>);
    });
  }

  onChange = (value: string) => {
    this.props.updateLanguage(value);
  };

  render() {
    const defaultValue = this.props.defaultValue;
    return (
      <Select style={{width: 100}} defaultValue={defaultValue} onChange={this.onChange}>
        {this.options}
      </Select>
    );
  }
}

export default connect(
  null,
  {updateLanguage}
)(LanguageSelector);