import {Col, Layout, PageHeader, Row} from 'antd';
import * as React from 'react';
import '../css/anno1800Helper.css';
import {LANG_MAP, PopulationLevel} from '../types';
import * as DataUtils from '../utils/dataUtils';
import CalculateButton from './CalculateButton.react';
import LanguageSelector from './LanguageSelector.react';
import LocalizedText from "./LocalizedText.react";
import PopulationLevelInput from './PopulationLevelInput.react';
import ProductionOverview from './ProductionOverview.react';

const {
  Header, Content, Footer,
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
            <div className="Anno1800Helper-CalculateButton">
              <CalculateButton/>
            </div>
          </Row>
          <div className="Anno1800Helper-ProductionOverview">
            <ProductionOverview/>
          </div>
        </Content>
        <Footer className="Anno1800Helper-footer">
          <Row type="flex" justify="center" align="middle">
            {'Anno 1800 Helper |'}
            <iframe
              style={{paddingLeft: 5}}
              src="https://ghbtns.com/github-btn.html?user=glkwhr&repo=Anno1800Helper&type=star&count=true"
              frameBorder="0"
              scrolling="0" width="120px" height="20px"/>
          </Row>
        </Footer>
      </Layout>
    )
  }
}

export default Anno1800Helper;
