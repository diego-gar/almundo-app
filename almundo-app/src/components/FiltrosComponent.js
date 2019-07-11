import React, { Component } from "react";

class FiltrosComponent extends Component {
    constructor(props){
        super(props);

        this.state = {
            showFilterName: false,
            showFilterStars: false,
            nameToFilter: "",
            starsToFilter: []
        }
    }

    mostrarFiltroNombre = () => {
        this.setState({
            showFilterName: !this.state.showFilterName,
        });
    };

    mostrarFiltroStars = () => {
        this.setState({
            showFilterStars: !this.state.showFilterStars,
        });
    };

    handleInputName = event => {
        this.setState({
            nameToFilter : event.target.value,
        });
    };
    
    searchHotelsByName = () => {
        this.props.onSearchName(this.state.nameToFilter);
    };

    handelInputStars = event => {
        if(event.target.checked) {
            this.setState({
              starsToFilter: [ ...this.state.starsToFilter, event.target.value],
            }, () => {
                this.props.onSearchStars(this.getFormattedStars());
            });
        } else {
            let remove = this.state.starsToFilter.indexOf(event.target.value);
            this.setState({
                starsToFilter: this.state.starsToFilter.filter((_, i) => i !== remove)
            }, () => {
                this.props.onSearchStars(this.getFormattedStars());
            });
        }
    };

    getFormattedStars = () => {
        let formattedStarsToFilter = "";
        
        this.state.starsToFilter.forEach((element,index) => {
            if(index === 0) {
                formattedStarsToFilter += `${element}`;
            } else {
                formattedStarsToFilter += `,${element}`;
            }
        });

        return formattedStarsToFilter;
    }

    render() {
        const { showFilterName, showFilterStars } = this.state;
               
        return (
            <div className="filtros">
                <span><span>Filtros</span></span>
                <span onClick={this.mostrarFiltroNombre}><img alt="" className="search"/><label>Nombre de hotel</label></span>
                {showFilterName ? <div><input onChange={this.handleInputName} placeholder="Ingrese nombre del hotel"/><button onClick={this.searchHotelsByName}>Aceptar</button></div> : ""}
                <span onClick={this.mostrarFiltroStars}><img alt="" className="star principal"/><label>Estrellas</label></span>
                {showFilterStars ? 
                <div>
                    <label className="all-stars"><input onClick={this.handelInputStars} type="checkbox" value="0"/>Todas las estrellas</label>
                    <label><input onClick={this.handelInputStars} type="checkbox" value="5"/><img alt="" className="star"/><img alt="" className="star"/><img alt="" className="star"/><img alt="" className="star"/><img alt="" className="star"/></label>
                    <label><input onClick={this.handelInputStars} type="checkbox" value="4"/><img alt="" className="star"/><img alt="" className="star"/><img alt="" className="star"/><img alt="" className="star"/></label>
                    <label><input onClick={this.handelInputStars} type="checkbox" value="3"/><img alt="" className="star"/><img alt="" className="star"/><img alt="" className="star"/></label>
                    <label><input onClick={this.handelInputStars} type="checkbox" value="2"/><img alt="" className="star"/><img alt="" className="star"/></label>
                    <label><input onClick={this.handelInputStars} type="checkbox" value="1"/><img alt="" className="star"/></label>
                </div> : ""}
            </div>
        )
    }
}

export default FiltrosComponent;