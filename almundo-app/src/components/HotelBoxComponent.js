import React, { Component } from "react";

class HotelBoxComponent extends Component {
    
    getImageUrl = image => {
        if(!image) {
            return `images/hotels/image-not-found.png`
        }
        return `/images/hotels/${image}`
    }
    
    render() {
        const { name, stars, price, image, amenities } = this.props.hotel;

        const starsToShow = []
        const amenitiesToShow = []

        for (var i = 0; i < stars; i++) {
            starsToShow.push(
                <img key={i} alt="" className="star"/>
                )
        }

        amenities.forEach(amenitie => {
            let amenitieUrl = `/icons/amenities/${amenitie}.svg`
            amenitiesToShow.push(
                <img key={amenitie} alt="" src={amenitieUrl} />
            )    
        });

        return (

            <div className="contenedor">
                <div>
                    <div className="contenedor-imagen">
                        <img alt={name} src={this.getImageUrl(image)} />
                    </div>
                </div>
                <div>
                    <span className="nombre-hotel">{name}</span>
                    <span>
                        {starsToShow}
                    </span>
                    <span className="iconos">
                        {amenitiesToShow}
                    </span>               
                </div>
                <div>
                    <span className="texto-simple">Precio por noche por habitación</span>
                    <span className="precio"> <span className="moneda">ARS</span> <strong>{price}</strong></span>
                    <span><button>Ver hotel</button></span>
                </div>
            </div>
        );
    }
}

export default HotelBoxComponent;
