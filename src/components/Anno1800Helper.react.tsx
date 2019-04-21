import {Button, Col, Layout, PageHeader, Row} from 'antd';
import * as React from 'react';
import '../css/anno1800Helper.css';
import {LANG_MAP, PopulationLevel} from '../types';
import * as DataUtils from '../utils/dataUtils';
import LanguageSelector from './LanguageSelector.react';
import LocalizedText from "./LocalizedText.react";
import PopulationLevelInput from './PopulationLevelInput.react';
import ProductionOverview from "./ProductionOverview.react";

const {
  Header, Content,
} = Layout;

class Anno1800Helper extends React.Component {

  populationLevels: [PopulationLevel];

  constructor(props: any) {
    super(props);
    this.populationLevels = DataUtils.selectPopulationLevels();
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
        <Header className="Anno1800Helper-Header">
          <PageHeader className="Anno1800Helper-PageHeader"
                      title={
                        <div className="Anno1800Helper-PageHeader-title">
                          <LocalizedText
                            localText={{'english': 'Anno 1800 Helper', 'chinese': '纪元1800助手'}}/>
                        </div>}
                      extra={
                        <div className="Anno1800Helper-LanguageSelector">
                          <LanguageSelector languages={DataUtils.selectLanguages()}
                                            defaultValue={LANG_MAP[navigator.language] || "english"}/>
                        </div>
                      }>
          </PageHeader>
        </Header>
        <Content
          className="Anno1800Helper-content">
          <Row type="flex" justify="start" align="middle">
            {this.createPopulationLevelInputs()}
          </Row>
          <Row type="flex" justify="center" align="middle">
            <Button type="primary" size="large">
              <LocalizedText
                localText={{'english': 'Calculate', 'chinese': '计算'}}/>
            </Button>
          </Row>
          <div className="Anno1800Helper-ProductionOverview">
            <ProductionOverview/>
          </div>
        </Content>
      </Layout>
    )
  }
}

export default Anno1800Helper;
