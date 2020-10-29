import React from 'react';
import { Modal, View, StyleSheet, TouchableWithoutFeedback} from 'react-native';

import TextInputManager from './TextInputManager';

import { connect } from 'react-redux';
import { changeFolderName } from '../../redux/actions/folders';
import { ApiUrl } from '../../constans/ApiUrl';

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

        // and api request
        this.sendChangeFolderNameRequest(oldFolderName, newValue);

        // and close modal
        this.props.onRequestClose(newValue);
    }

    sendChangeFolderNameRequest(oldFolderName, newFolderName) {
        fetch(ApiUrl+'folder/rename', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                api_token: this.props.user.token,
                oldFolderName: oldFolderName,
                newFolderName: newFolderName
            })
        })
        .then(response => response.json())
        .then((responseJson) => {
            console.log(responseJson);
        })
        .catch(error => {
            console.log(error);
        });
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
    return {
        user: state.user
    }
}

const mapDispatchToprops = () => {
    return {changeFolderName}
}

export default connect(mapStateToProps, mapDispatchToprops())(ChangeFolderNameManager);