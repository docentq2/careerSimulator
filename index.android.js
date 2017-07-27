/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Button,
    AsyncStorage,
    TouchableHighlight,
    Image,
    ScrollView
} from 'react-native';

import ControlsPanel from './src/ControlsPanel';

const getPrice = (count, curr) => parseInt(0.5 * Math.pow( (3+count), 2) + curr)

export default class CareerSimulator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            money: 0,
            growth: 0,
            powerClick: 1,
            pumping: {
                advertising: {
                    price: getPrice(0, 7),
                    amount: 0,
                    profit: {
                        type: 'powerClick',
                        power: 2
                    }
                },
                qualification: {
                    price: 100,
                    amount: 0,
                    profit: {
                        type: 'powerClick',
                        power: 4
                    }
                },
                assistant: {
                    price: 300,
                    amount: 0,
                    profit: {
                        type: 'growth',
                        power: 2
                    }
                },
                investments: {
                    price: 700,
                    amount: 0,
                    profit: {
                        type: 'growth',
                        power: 4
                    }
                },
            },
            ui: {
                controlsPanel: false
            },
        };

        this.onClickOnWallet = this.onClickOnWallet.bind(this);

        this.onBuyAdvertising = this.onBuyAdvertising.bind(this);
        this.onGoCourse = this.onGoCourse.bind(this);
        this.onGetInvestment = this.onGetInvestment.bind(this);
        this.onHireAssistant = this.onHireAssistant.bind(this);

        this.saveData = this.saveData.bind(this);
    }

    componentDidMount() {
        AsyncStorage.clear();
        // AsyncStorage.getItem('money').then((value) => {
        //     this.setState({ money: value });

        //     this.startWork();
        // }).done();
    }

    render() {
        return (
            <View style={ styles.container }>

                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'stretch',
                    paddingHorizontal: 20,
                }}>
                    <View style={{ flexDirection: 'row', alignSelf: 'stretch', }}>
                        <Text style={{ fontSize: 20, color: '#1f97d2', padding: 5}}>
                                TOTAL
                        </Text>
                        <Text style={{flex: 1, fontSize: 20, paddingVertical: 5, paddingHorizontal: 15, borderRadius: 5, color: '#1f97d2', marginLeft: 15, backgroundColor: '#e7e7e7'}}>
                                $ { this.state.money }
                        </Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignSelf: 'stretch', backgroundColor: '#e7e7e7', marginTop: 10, borderRadius: 5, }}>
                        <Text style={{flex: 1, fontSize: 20, paddingVertical: 5, paddingHorizontal: 15, borderRadius: 5, color: '#1f97d2', marginLeft: 15, backgroundColor: '#e7e7e7'}}>
                                $ { this.state.powerClick }  <Text style={{ fontSize: 14 }}>per/click</Text>
                        </Text>
                        <Text style={{flex: 1, fontSize: 20, paddingVertical: 5, paddingHorizontal: 15, borderRadius: 5, color: '#1f97d2', marginLeft: 15, backgroundColor: '#e7e7e7'}}>
                                $ { this.state.growth } <Text style={{ fontSize: 14 }}>per/sec</Text>
                        </Text>
                    </View>
                </View>

                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <TouchableHighlight
                        onPress={this.onClickOnWallet}
                        style={{borderRadius: 100}}
                        underlayColor='#ccc'>
                        <View style={{
                            width: 200,
                            height: 200,
                            backgroundColor: '#dea447',
                            borderRadius: 100,
                            borderWidth: 25,
                            borderColor: '#ffbb4c',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Text style={{color: '#bc7a33', fontSize: 90, fontWeight: 'bold'}}>$</Text>
                        </View>
                    </TouchableHighlight>
                </View>


                <View style={{alignSelf: 'stretch', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 50}}>
                    <TouchableHighlight
                        onPress={this.onClickOnWallet}
                        style={{width: 100, backgroundColor: '#2298d2',  borderBottomRightRadius: 10, borderTopRightRadius: 10}}
                        underlayColor='#2298ff'>
                            <Text style={{fontSize: 40, textAlign: 'center', color: '#e5f0f8', paddingVertical: 10,}}>i</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                        onPress={ () => this.setState( { ui: { controlsPanel: !this.state.ui.controlsPanel } } ) }
                        style={{width: 100, backgroundColor: '#2298d2',  borderBottomLeftRadius: 10, borderTopLeftRadius: 10, }}
                        underlayColor='#2298ff'>
                            <Text style={{fontSize: 40, textAlign: 'center', color: '#e5f0f8', paddingVertical: 10,}}>{'+'}</Text>
                    </TouchableHighlight>
                </View>

                { this.state.ui.controlsPanel &&
                    <ControlsPanel
                        onBackClick={ () => this.setState( { ui: { controlsPanel: !this.state.ui.controlsPanel } } ) }
                        buyAds={{
                            onClick: this.onBuyAdvertising,
                            cost: this.state.pumping.advertising.price,
                            amount: this.state.pumping.advertising.amount,
                            disabled: this.state.money < this.state.pumping.advertising.price
                        }}
                        goCourse={{
                            onClick: this.onGoCourse,
                            cost: this.state.pumping.qualification.price,
                            amount: this.state.pumping.qualification.amount,
                            disabled: this.state.money < this.state.pumping.qualification.price
                        }}
                        hireAssistant={{
                            onClick: this.onHireAssistant,
                            cost: this.state.pumping.assistant.price,
                            amount: this.state.pumping.assistant.amount,
                            disabled: this.state.money < this.state.pumping.assistant.price
                        }}
                        getInvestment={{
                            onClick: this.onGetInvestment,
                            cost: this.state.pumping.investments.price,
                            amount: this.state.pumping.investments.amount,
                            disabled: this.state.money < this.state.pumping.investments.price
                        }}
                    />
                }
            </View>
        );
    }

    onClickOnWallet() {
        this.saveData(parseInt(this.state.money) + parseInt(this.state.powerClick));
    }

    onBuyAdvertising() {
        const { advertising } = this.state.pumping;

        if (this.state.money < advertising.price) return;

        this.setState({
            money: this.state.money - advertising.price,
            powerClick: this.state.powerClick + advertising.profit.power,
            pumping: {
                ...this.state.pumping,
                advertising: {
                    ...advertising,
                    amount: ++advertising.amount,
                    price: getPrice(++advertising.amount, advertising.price)
                }
            }
        });
    }

    onGoCourse() {
        const { qualification } = this.state.pumping;

        if (this.state.money < qualification.price) return;

        this.setState({
            money: this.state.money - qualification.price,
            powerClick: this.state.powerClick + qualification.profit.power,
            pumping: {
                ...this.state.pumping,
                qualification: {
                    ...qualification,
                    amount: ++qualification.amount,
                    price: getPrice(++qualification.amount, qualification.price)
                }
            }
        });
    }


    onHireAssistant() {
        const { assistant } = this.state.pumping;

        if (this.state.money < assistant.price) return;

        this.setState({
            money: this.state.money - assistant.price,
            powerClick: this.state.powerClick + assistant.profit.power,
            pumping: {
                ...this.state.pumping,
                assistant: {
                    ...assistant,
                    amount: ++assistant.amount,
                    price: getPrice(++assistant.amount, assistant.price)
                }
            }
        });
    }

    onGetInvestment() {
        const { investments } = this.state.pumping;

        if (this.state.money < investments.price) return;

        this.setState({
            money: this.state.money - investments.price,
            powerClick: this.state.powerClick + investments.profit.power,
            pumping: {
                ...this.state.pumping,
                investments: {
                    ...investments,
                    amount: ++investments.amount,
                    price: getPrice(++investments.amount, investments.price)
                }
            }
        });
    }

    startWork() {
        setInterval(() => {
            this.setState({
                money: parseInt(this.state.money) + parseInt(this.state.growth)
            });
        }, 1000);
    }

    saveData(value) {
        // AsyncStorage.setItem('money', value.toString());
        this.setState({ money: parseInt(value) });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    growth: {
        fontSize: 30,
        textAlign: 'center',
        margin: 20,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

AppRegistry.registerComponent('CareerSimulator', () => CareerSimulator);
