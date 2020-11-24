import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import FastImage from 'react-native-fast-image';

import { connect } from 'react-redux';
import { toggleHeaderVisibility } from '../../redux/actions/mediaSlider';

class AutoRotateImageModal extends React.Component {
    render() {
        const { source, style } = this.props;
        return(
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={() => this.props.toggleHeaderVisibility()}>
                    <FastImage
                        source={source}
                        style={style}
                    />
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center'
    },
});

const mapStateToProps = state => {
    return {}
}

const mapDispatchToProps = () => {
    return { toggleHeaderVisibility }
}

export default connect(mapStateToProps, mapDispatchToProps())(AutoRotateImageModal)