import React, { Component } from "react";
import HeaderComponent from "./HeaderComponent";
import ListadoComponent from "./ListadoComponent";
import FiltrosComponent from "./FiltrosComponent";
import '../css/style.css';
import { getAllHotels, getFilteredHotels } from "../services/hotels";

class HomeComponent extends Component {
    constructor(props){
        super(props);

        this.state = {
            hotels: [],
            filteredHotelsByName: null,
            filteredHotelsByPrice: 99999,
            filteredHotelsByStars: null
        }
    }

    componentDidMount(){
        this.getData();
    }

    getData = () => {
        getAllHotels().then(res => {
            this.setState({
                hotels: res.data.hotels,
            });
        });
    }

    searchHotels = () => {
        const params = {
            name: this.state.filteredHotelsByName,
            price: this.state.filteredHotelsByPrice,
            stars: this.state.filteredHotelsByStars
        };

        getFilteredHotels(params).then(res => {
            this.setState({
                hotels: res.data,
            });
        });
    };

    handleInputName = name => {
        console.log(name);
        this.setState({
            filteredHotelsByName: name,
        }, () => {
            this.searchHotels();
        });
    };

    handleInputStars = stars => {
        this.setState({
            filteredHotelsByStars: stars,
        }, () => {
            this.searchHotels();
        });
    };

    render() {
        const { hotels } = this.state;

        return (
            <body>
                <HeaderComponent/>
                <FiltrosComponent onSearchName={this.handleInputName} onSearchStars={this.handleInputStars}/>
                <ListadoComponent hotels={hotels}/>
                <footer>
                </footer>
            </body>
        );
    }
}

export default HomeComponent;
