import {Button, Col, Layout, Row} from 'antd';
import * as React from 'react';
import '../css/Anno1800Helper.css';
import {LANG_MAP, PopulationLevel} from './Anno1800HelperTypes.react';
import PopulationLevelInput from "./PopulationLevelInput.react";

const {
  Header, Footer, Sider, Content,
} = Layout;

type Props = {
  data: any,
};

class Anno1800Helper extends React.Component<Props> {

  language: string;
  populationLevels: [PopulationLevel];

  constructor(props: Props) {
    super(props);
    this.language = LANG_MAP[navigator.language] || 'english';
    this.populationLevels = props.data.populationLevels;
  }

  onChange = (value: number) => {
    console.log(value);
  }

  render() {
    return (
      <Layout className="Anno1800Helper">
        <Header>
          <header>Anno 1800 Helper</header>
        </Header>
        <Content className="Anno1800Helper-content">
          <Row type="flex" justify="center" align="middle">
            <Col>
              <PopulationLevelInput populationLevel={this.populationLevels[0]} language={this.language}
                                    onChange={this.onChange}/>
            </Col>
            <Col>
              <PopulationLevelInput populationLevel={this.populationLevels[0]} language={this.language}
                                    onChange={this.onChange}/>
            </Col>
            <Col>
              <PopulationLevelInput populationLevel={this.populationLevels[0]} language={this.language}
                                    onChange={this.onChange}/>
            </Col>
          </Row>
          <Button type="primary">Primary</Button>
        </Content>
      </Layout>
    )
  }
}

export default Anno1800Helper;
