import React, {Component} from 'react';
import {View, Text, StyleSheet, Keyboard} from "react-native";
import {Container, Content} from 'native-base';
import SearchHeader from '../SearchHeader';
import axios from 'axios';
import SearchBody from '../SearchBody';

class SearchTab extends Component{

    static navigationOptions = {
        header: null
    }

    state = {
        searchDrink:'',
        drinkData: {},
        drinkFound: null
    }

    drinkSearch = () => {
        // alert("search for beer");
        Keyboard.dismiss()
        const drinkName = this.state.searchDrink.toLowerCase();
        const query = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="+drinkName

        axios.get(query)
            .then((response) => {
                console.log('the response is: ', response.data.drinks);

                var data = response.data.drinks ? response.data.drinks : false

                if(data){
                    this.setState({
                        drinkData: data,
                        drinkFound: true
                    })
                }
            }).catch((err) => {
                this.setState({drinkFound: false})
            })

    }

    render(){

        let searchBody;
        if(this.state.drinkFound === true){
            searchBody = <SearchBody drinkData={this.state.drinkData}/>
        }else if(this.state.drinkFound === false){
            alert("Drink not found");
        }

        return(
            <Container>

                <SearchHeader 
                    value={this.state.searchBeer}
                    onChangeText={(searchDrink) => this.setState({ searchDrink })}
                    drinkSearch={this.drinkSearch}
                    />

                <Content>
                    {searchBody}

                </Content>

            </Container>
        )
    }
}

export default SearchTab