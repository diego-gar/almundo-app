import React, { Component } from "react";
import HeaderComponent from "./HeaderComponent";
import ListadoComponent from "./ListadoComponent";
import FiltrosComponent from "./FiltrosComponent";
import '../css/style.css';
import { getFilteredHotels } from "../services/hotels";

class HomeComponent extends Component {
    constructor(props){
        super(props);

        this.state = {
            enableSinResultados: false,
            hotels: [],
            filteredHotelsByName: null,
            filteredHotelsByPrice: 99999,
            filteredHotelsByStars: null
        }
    }

    componentDidMount(){
        this.searchHotels();
    }

    getParams = () => {
        const params = {
            name: this.state.filteredHotelsByName,
            price: this.state.filteredHotelsByPrice,
            stars: this.state.filteredHotelsByStars
        };

        return params;
    };

    searchHotels = () => {
        getFilteredHotels(this.getParams()).then(res => {
            this.setState({
                hotels: res.data,
                enableSinResultados: res.data.length === 0
            });
        });
    };

    handleInputName = name => {
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
        const { hotels, enableSinResultados } = this.state;

        return (
            <body id="contenedor-principal">
                <HeaderComponent/>
                <FiltrosComponent onSearchName={this.handleInputName} onSearchStars={this.handleInputStars}/>
                <ListadoComponent hotels={hotels} enableSinResultados={enableSinResultados}/>
                <footer>
                </footer>
            </body>
        );
    }
}

export default HomeComponent;
