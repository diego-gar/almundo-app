import React, { Component } from "react";
import HotelBoxComponent from "./HotelBoxComponent";

class ListadoComponent extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            hotels: []
        }
    }

    render() {
        const { hotels } = this.props;
        
        return (
            <div className="hoteles">
                {hotels.map((hotel,index) => <HotelBoxComponent key={index} hotel={hotel} />)}
                {hotels.length === 0 ? <div><span className="sin-resultados">Uy, no encontramos resultados. Podes cambiar o borrar los filtros</span></div> : ""}
            </div>
        );
    }
}

export default ListadoComponent;