import {Col, Layout, PageHeader, Row} from 'antd';
import * as React from 'react';
import ReactGA from 'react-ga';
import {PAGE_HEADER_TITLE_LOCALTEXT} from "../constants";
import '../css/anno1800Helper.css';
import * as DataUtils from '../utils/dataUtils';
import CalculateButton from './CalculateButton.react';
import HelperModalButton from "./HelperModalButton.react";
import LanguageSelector from './LanguageSelector.react';
import LocalizedText from "./LocalizedText.react";
import PopulationLevelOverview from './PopulationLevelOverview.react';
import ProductionOverview from './ProductionOverview.react';
import WorkforceOverview from './WorkforceOverview.react';

const {
  Header, Content, Footer,
} = Layout;

ReactGA.initialize('UA-138969876-1');

class Anno1800Helper extends React.Component {

  constructor(props: any) {
    super(props);
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  render() {
    let defaultValue: string = "english";
    if (navigator.language.startsWith("zh")) {
      defaultValue = "chinese";
    }
    return (
      <Layout className="Anno1800Helper">
        <Header className="Anno1800Helper-Header">
          <PageHeader className="Anno1800Helper-PageHeader"
                      title={
                        <div className="Anno1800Helper-PageHeader-title">
                          <LocalizedText
                            localText={PAGE_HEADER_TITLE_LOCALTEXT}/>
                        </div>}
                      extra={
                        <div className="Anno1800Helper-LanguageSelector">
                          <LanguageSelector languages={DataUtils.selectLanguages()}
                                            defaultValue={defaultValue}/>
                        </div>
                      }>
          </PageHeader>
        </Header>
        <Content
          className="Anno1800Helper-content">
          <div>
            <PopulationLevelOverview/>
          </div>
          <Row align="middle">
            <Col xs={{span: 4, offset: 10}} sm={{span: 4, offset: 10}} className="Anno1800Helper-CalculateButton">
              <CalculateButton/>
            </Col>
            <Col xs={{span: 4, offset: 3}} sm={{span: 1, offset: 1}} className="Anno1800Helper-HelpButton">
              <HelperModalButton/>
            </Col>
          </Row>
          <div className="Anno1800Helper-WorkforceOverview">
            <WorkforceOverview/>
          </div>
          <div className="Anno1800Helper-ProductionOverview">
            <ProductionOverview/>
          </div>
        </Content>
        <Footer className="Anno1800Helper-footer">
          <Row type="flex" justify="center" align="middle">
            <a href="https://github.com/glkwhr/anno1800helper"
               target="_blank"
               rel="noreferrer noopener"
               style={{paddingRight: 5}}>Anno 1800 Helper</a>
            {' | '}
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
