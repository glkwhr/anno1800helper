import {Col, InputNumber, Row} from 'antd';
import * as React from 'react';
import {PopulationLevel} from './Anno1800HelperTypes.react';

type Props = {
  populationLevel: PopulationLevel,
  language: string,
  onChange: (value: number) => void,
}

type State = {
  count: number,
}

class PopulationLevelInput extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
  }

  getName(language: string): string {
    return this.props.populationLevel.locaText[language];
  }

  onChange = (value: number | undefined) => {
    let newValue: number = 0;
    if (typeof value === 'number') {
      newValue = value;
    }
    this.setState({count: newValue});
    this.props.onChange(newValue);
  }

  render() {
    return (
      <Row className="Anno1800Helper-PopulationLevelInput" type="flex" justify="space-around" align="middle">
        <Col span={12}>
          <Row>
            <img src={this.props.populationLevel.icon}/>
          </Row>
          <Row>
            <p>
              {this.getName(this.props.language)}
            </p>
          </Row>
        </Col>
        <Col span={12}>
          <InputNumber defaultValue={0} min={0} step={1} precision={0} onChange={this.onChange}/>
        </Col>
      </Row>
    );
  }
}

export default PopulationLevelInput;