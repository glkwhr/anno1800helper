import {Button, Modal} from "antd";
import * as React from 'react';
import {HELP_MODAL_CONTENT_LOCALTEXT, HELP_MODAL_TITLE_LOCALTEXT} from "../constants";
import LocalizedText from './LocalizedText.react';

type State = {
  modalVisible: boolean,
};

class HelperModalButton extends React.Component<{}, State> {

  constructor(props: {}) {
    super(props);
    this.state = {modalVisible: false};
  }

  setModalVisible(modalVisible: boolean) {
    this.setState({ modalVisible: modalVisible });
  }

  render() {
    return (
      <div>
        <Button shape="circle" icon="question" onClick={() => this.setModalVisible(true)} />
        <Modal
          title={<LocalizedText localText={HELP_MODAL_TITLE_LOCALTEXT}/>}
          centered
          visible={this.state.modalVisible}
          onOk={() => this.setModalVisible(false)}
          onCancel={() => this.setModalVisible(false)}
        >
          <LocalizedText localText={HELP_MODAL_CONTENT_LOCALTEXT} />
        </Modal>
      </div>
    );
  }
}

export default HelperModalButton;