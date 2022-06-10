import { Wrapper } from "@googlemaps/react-wrapper";
import { GoogleMap, Marker } from "@react-google-maps/api";
import React, { useState } from "react";
import { User } from "../interfaces/DataInterface";
import "./Person.css";



export const Person: React.FC<User> = (props) => {
    
    const [page, setPage] = useState<number>(0);
    const nextPage = () => {
        page < 2 ?
            setPage(page + 1)
            :
            setPage(0);
    }

    return (
        <div className="userCard">
            <img src={props.picture.large} alt="" className="image" onClick={nextPage} />
            <h3>{props.name.title} {props.name.first} {props.name.last}</h3>
            {page === 0 && 
                <div className="infoBlock">
                    <h4>Contact information</h4>
                    <p>E-mail: {props.email}</p>
                    <p>Phone: {props.cell}</p>
                
                <h4>Address</h4> 
                <p>{props.location.street.number} {props.location.street.name}, {props.location.postcode} {props.location.city} {props.location.state}</p>
                <Wrapper apiKey="AIzaSyDfaVl8slhHIEBhCTkLcjkxCASRQWBTMtI">
                    <GoogleMap
                        center={{
                            lat: Number(props.location.coordinates.latitude),
                            lng: Number(props.location.coordinates.longitude),
                        }}
                        zoom={17}
                        mapContainerStyle={{ width: "100%", height: "200px" }}
                    >
                        <Marker
                            position={{
                                lat: Number(props.location.coordinates.latitude),
                                lng: Number(props.location.coordinates.longitude),
                            }}
                            title={`${props.location.street.number} ${props.location.street.name}`}
                        />
                    </GoogleMap>
                </Wrapper>
            </div> 
        }
        {page === 1 && 
            <div className="infoBlock">
                <h4>Login information</h4>
                <p>UUID: {props.login.uuid}</p>
                <p>Username: {props.login.username}</p>
                <p>Password: {props.login.password}</p>
                <h4>Registered:</h4>
                <p>Date: {props.registered.date}</p>
                <p>Age: {props.registered.age}</p>
            </div>
        }
        {page === 2 && 
            <div className="infoBlock">
                <h4>Date of birth:</h4>
                <p>Date: {props.dob.date}</p>
                <p>Age: {props.dob.age}</p>
                <h4>ID:</h4>
                <p>Name: {props.id.name}</p>
                <p>Age: {props.id.value}</p>
            </div>
        }
        </div>
    )
}