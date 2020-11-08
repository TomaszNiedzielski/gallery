import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Text } from 'react-native';
import PropTypes from 'prop-types';

export default class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuList: props.menuList
        }
    }

    render() {
        const { menuList } = this.state;
        return (
            <>
            <TouchableWithoutFeedback onPress={() => this.props.onRequestClose()}>
                <View style={styles.wrapper}/>
            </TouchableWithoutFeedback>
            <View style={[styles.container, this.props.style]}>
                {menuList.length > 0 ?
                    menuList.map((menuItem, index) => {
                        return (
                            <TouchableWithoutFeedback key={index} onPress={() => {menuItem.onPressHandler(); this.props.onRequestClose()}}>
                                <Text style={styles.menuItem}>{ menuItem.name }</Text>
                            </TouchableWithoutFeedback>
                        )
                    })
                : null}
            </View>
            </>
        );
    }

}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        position: 'absolute',
        right: 0,
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: 10
    },
    container: {
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: 'white',
        width: 200,
        position: 'absolute',
        right: 10,
        top: 10,
        zIndex: 10
    },
    menuItem: {
        fontSize: 18,
        padding: 10
    }
});

Menu.propTypes = {
    menuList: PropTypes.array,
}