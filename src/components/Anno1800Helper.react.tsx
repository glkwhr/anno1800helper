import {Button, Col, Layout, PageHeader, Row} from 'antd';
import * as React from 'react';
import '../css/anno1800Helper.css';
import {LANG_MAP, PopulationLevel} from '../types';
import LanguageSelector from './LanguageSelector.react';
import LocalizedText from "./LocalizedText.react";
import PopulationLevelInput from './PopulationLevelInput.react';

const {
  Content,
} = Layout;

type Props = {
  data: any,
};

class Anno1800Helper extends React.Component<Props> {

  populationLevels: [PopulationLevel];

  constructor(props: Props) {
    super(props);
    this.populationLevels = props.data.populationLevels;
  }

  createPopulationLevelInputs(): [React.Component] {
    const elements: any = [];
    this.populationLevels.forEach((populationLevel: PopulationLevel, idx: number) => {
      elements.push(
        <Col key={idx} sm={8} xs={12}>
          <PopulationLevelInput populationLevel={populationLevel}/>
        </Col>
      );
    });
    return elements;
  }

  render() {
    return (
      <Layout className="Anno1800Helper">
        <PageHeader className="Anno1800Helper-PageHeader"
                    title={
                      <div style={{color: 'white'}}>
                        <LocalizedText
                          localText={{'english': 'Anno 1800 Helper', 'chinese': '纪元1800助手'}}/>
                      </div>}
                    extra={
                      <div>
                        <LanguageSelector languages={this.props.data.languages}
                                          defaultValue={LANG_MAP[navigator.language] || "english"}/>
                      </div>
                    }>
        </PageHeader>
        <Content
          className="Anno1800Helper-content">
          <Row type="flex" justify="center" align="middle">
            {this.createPopulationLevelInputs()}
          </Row>
          <Button type="primary">Primary</Button>
        </Content>
      </Layout>
    )
  }
}

export default Anno1800Helper;
