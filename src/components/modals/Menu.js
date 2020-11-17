import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Text, Switch } from 'react-native';
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
                                    <View style={styles.menuItem}>
                                        <Text style={styles.menuTitle}>{ menuItem.name }</Text>
                                        {menuItem.switch && <Switch
                                            // trackColor={{ false: "#767577", true: "#81b0ff" }}
                                            // thumbColor={menuItem.switchValue ? "#f5dd4b" : "#f4f3f4"}
                                            ios_backgroundColor="#3e3e3e"
                                            onValueChange={() => {menuItem.onPressHandler(); this.props.onRequestClose()}}
                                            value={menuItem.switchValue}
                                        />}
                                    </View>
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
        borderColor: '#e6e6e6',
        borderRadius: 3,
        backgroundColor: 'white',
        width: 230,
        position: 'absolute',
        right: 10,
        top: 10,
        zIndex: 10
    },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    menuTitle: {
        fontSize: 18,
        padding: 15
    },
});

Menu.propTypes = {
    menuList: PropTypes.array,
}