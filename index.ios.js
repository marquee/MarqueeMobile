/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
    AppRegistry,
    Image,
    ListView,
    StyleSheet,
    Text,
    View,
} = React;

var REQUEST_URL = 'http://api.marquee.by/releases/?token=r0_1b35a8f473d3cad96a0f4707954b8788ee4413fb'

var MarqueeMobile = React.createClass({
    getInitialState: function() {
        return {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            loaded: false
        }
    },
    componentDidMount: function() {
        this.fetchData();
    },
    fetchData: function(){
        fetch(REQUEST_URL)
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseData),
                    loaded: true,
                });
            })
            .done();
    },
    _touchEntry: function() {
        console.log('ping');
    },
    _onResponderGrant: function(e){
        e.target.style=
    }
    render: function() {
        if(!this.state.dataSource){
            return this.renderLoadingView();
        }

        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRelease}
            />
        );
    },
    renderLoadingView: function() {
        return (
            <View style={styles.container}>
                <Text>Loading Releases</Text>
            </View>
        );
    },
    renderRelease: function(release) {
        return (
            <View
                style={styles.container}
                onStartShouldSetResponder={this._touchEntryResponder}
            >
                <Image
                    source={{uri: release.cover_image.content['640'].url}}
                    style={styles.thumbnail}
                />
                <View style={styles.rightContainer}>
                    <Text style={styles.title}>{release.title}</Text>
                </View>
            </View>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    touchingContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EAEAEA',
    }
    rightContainer: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        marginBottom: 8,
        textAlign: 'center',
    },
    year: {
        textAlign: 'center',
    },
    thumbnail: {
        width: 53,
        height: 81,
    },
    listView: {
        paddingTop: 20,
        backgroundColor: '#F5FCFF',
    },
});

AppRegistry.registerComponent('MarqueeMobile', () => MarqueeMobile);
