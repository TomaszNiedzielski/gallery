import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MediaList from '../components/lists/MediaList';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../constans/Colors';

export default class FolderScreen extends React.Component {

    render() {
        console.log('co to za params: ', this.props.route.params);
        return (
            <View style={styles.container}>
                <MediaList
                    params={this.props.route.params}
                />
            </View>
        );
    }

    componentDidMount() {
        const iconColor = 'white';
        this.props.navigation.setOptions({
            title: this.props.route.params.folderName,
            headerTitleStyle: {
                color: iconColor
            },
            headerTintColor: iconColor,
            headerBackground: () => (
                <LinearGradient
                    colors={Colors.gradient}
                    style={{ flex: 1 }}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                />
            ),
        });
    }
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});