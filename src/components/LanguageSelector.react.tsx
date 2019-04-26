import {Select} from "antd";
import * as React from 'react';
import {connect} from "react-redux";
import {updateLanguage} from "../redux/actions/actions";
import {LANG_MAP} from "../types";

const Option = Select.Option;

type Props = {
  defaultValue: string,
  languages: [string],
  updateLanguage: any,  // from Redux store
};

class LanguageSelector extends React.Component<Props> {

  options: any = [];
  defaultLanguage: string = "english";

  constructor(props: Props) {
    super(props);
    props.languages.forEach((language: string, idx: number) => {
      this.options.push(<Option key={idx} value={language}>{language.charAt(0).toUpperCase() + language.slice(1)}</Option>);
    });
    let browserLang: string = navigator.language;
    if (browserLang in LANG_MAP) {
      this.defaultLanguage = LANG_MAP[browserLang];
    } else if (browserLang.startsWith("zh")) {
      this.defaultLanguage = "chinese";
    }
    this.props.updateLanguage(this.defaultLanguage);
  }

  onChange = (value: string) => {
    this.props.updateLanguage(value);
  };

  render() {
    return (
      <Select style={{width: 100}} defaultValue={this.defaultLanguage} onChange={this.onChange}>
        {this.options}
      </Select>
    );
  }
}

export default connect(
  null,
  {updateLanguage}
)(LanguageSelector);