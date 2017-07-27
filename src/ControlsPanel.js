import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    AsyncStorage,
    TouchableHighlight,
    Image,
    ScrollView,
    Modal,
} from 'react-native';

const CloseButton = (onBackClick) => (
    <View style={{ flex: 1, alignItems: 'flex-end', flexDirection: 'row', justifyContent: 'center' }}>
        <TouchableHighlight
            onPress={ onBackClick }
            style={{ width: 100, height: 40, backgroundColor: '#d0c1a7', borderTopLeftRadius: 5, borderTopRightRadius: 5, zIndex: 1}}
            underlayColor='#2298ff'>
                <Text style={{fontSize: 30, textAlign: 'center', color: '#fff', }}>▼</Text>
        </TouchableHighlight>
    </View>
);

const Item = (onClick, disabled, cost, amount) => (
    <TouchableHighlight
        onPress={ onClick }
        style={ styles.button }
        underlayColor='#2298ff'>
        <View style={ disabled ? styles.buttonLayoutDisabled : styles.buttonLayout }>
            <View style={{ flex: 1 }}>
                <Text style={ disabled ? styles.buttonNameDisabled : styles.buttonName }>BUY ADVERTISING</Text>
                <Text style={ disabled ? styles.buttonDescriptionDisabled : styles.buttonDescription }>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis, corporis, magnam. Tempora voluptas, molestias. Reiciendis commodi culpa illo a aspernatur maiores.</Text>
            </View>
            <View>
                <Text style={ disabled ? styles.buttonSidebarDisabled : styles.buttonSidebar }>Cost: ${ cost }</Text>
                <Text style={ disabled ? styles.buttonSidebarDisabled : styles.buttonSidebar }>Count: { amount }</Text>
            </View>
        </View>
    </TouchableHighlight>
);

export default class ControlsPanel extends Component {
    render() {

        const { onBackClick, buyAds, goCourse, hireAssistant, getInvestment } = this.props;

        return(
            <View style={{ position: 'absolute', bottom: 15, left: 15, right: 15, top: 0 }}>
                { CloseButton(onBackClick) }

                <View style={{ flex: 2, backgroundColor: '#d0c1a7', borderRadius: 10, paddingVertical: 10 }}>

                    <ScrollView>
                        { Item(buyAds.onClick, buyAds.disabled, buyAds.cost, buyAds.amount) }
                        { Item(goCourse.onClick, goCourse.disabled, goCourse.cost, goCourse.amount) }
                        { Item(hireAssistant.onClick, hireAssistant.disabled, hireAssistant.cost, hireAssistant.amount) }
                        { Item(getInvestment.onClick, getInvestment.disabled, getInvestment.cost, getInvestment.amount) }
                    </ScrollView>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    button: {
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 5
    },
    buttonLayout: {
        borderRadius: 5,
        backgroundColor: '#fff',
        padding: 10,
        flexDirection: 'row',
    },
    buttonLayoutDisabled: {
        borderRadius: 5,
        backgroundColor: '#dcdcdc',
        padding: 10,
        flexDirection: 'row',
    },
    buttonName: {
        color: '#1f97d2',
        fontSize: 20
    },
    buttonNameDisabled: {
        color: '#a4a4a4',
        fontSize: 20
    },
    buttonDescription: {
        fontSize: 12,
        marginRight: 10,
        marginTop: 5,
    },
    buttonDescriptionDisabled: {
        fontSize: 12,
        marginRight: 10,
        marginTop: 5,
        color: '#a4a4a4',
    },
    buttonSidebar: {
        textAlign: 'right',
        fontSize: 18,
    },
    buttonSidebarDisabled: {
        textAlign: 'right',
        fontSize: 18,
        color: '#a4a4a4',
    }
});
