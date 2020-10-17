import React from 'react';
import { Modal, View, StyleSheet, TouchableWithoutFeedback} from 'react-native';

import TextInputManager from './TextInputManager';

import { connect } from 'react-redux';
import { changeFolderName } from '../../redux/actions/folders';

class ChangeFolderNameManager extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isModalVisible: true,
            folderName: props.folderName
        }
    }

    render() {
        const { isModalVisible, folderName } = this.state;
        return(
            <Modal
                transparent={true}
                onRequestClose={() => this.props.onRequestClose()}
                visible={isModalVisible}
            >
                <TouchableWithoutFeedback onPress={() => this.props.onRequestClose()}>
                    <View style={styles.modal}>
                        <TextInputManager
                            title="Change folder name"
                            placeholder="Type something..."
                            value={folderName}
                            onConfirmHandler={this.onConfirmHandler}
                        />
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        );
    }

    onConfirmHandler = newValue => {
        const oldFolderName = this.state.folderName;
        this.props.changeFolderName(oldFolderName, newValue);
        this.props.onRequestClose(newValue);
    }

}

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToprops = () => {
    return {changeFolderName}
}

export default connect(mapStateToProps, mapDispatchToprops())(ChangeFolderNameManager);