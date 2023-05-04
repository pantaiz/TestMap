import React, {useState, useEffect} from 'react'
import {MapContainer, TileLayer} from "react-leaflet";
import "./App.css";
import "leaflet/dist/leaflet.css";

import citiesData from './data.json';
import Routing from "./Routing";

import {makeStyles} from "@material-ui/core/styles";
import {Autocomplete, Paper, TextField} from "@mui/material";

const useStyles = makeStyles(theme => ({
    inputRoot: {
        color: "yellow",
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "white"
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "white"
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "white"
        }
    },
}));

export default function App() {
    const classes = useStyles();
    const position = [20.593683, 78.962883];

    const [cities, setCities] = useState([]);
    const [sourceCity, setSourceCity] = useState({});
    const [destinationCity, setDestinationCity] = useState({});


    useEffect(() => {
        citiesData.map((eachCity) =>
            setCities(cities => [...cities, eachCity])
        )
    }, []);

    return (<div>
            <div className="container">
                <Autocomplete
                    id="combo-box-demo"
                    options={cities}
                    onChange={(event, value) => setSourceCity(value)}
                    classes={classes}
                    size='small'
                    PaperComponent={({children}) => (
                        <Paper style={{background: "yellow"}} elevation={10}>{children}</Paper>
                    )}
                    getOptionLabel={(option) => `${option.city}, ${option.country}`}
                    inputRoot={{borderColor: "white"}}
                    style={{width: 300, paddingBottom: '5%'}}
                    renderInput={(params) => <TextField
                        {...params}
                        color="secondary"
                        label="Source"
                        variant="outlined"
                        InputLabelProps={{
                            style: {color: 'white'},
                        }}
                    />
                    }
                />
                <Autocomplete
                    id="combo-box-demo1"
                    classes={classes}
                    onChange={(event, value) => setDestinationCity(value)}
                    options={cities}
                    size='small'
                    PaperComponent={({children}) => (
                        <Paper style={{background: "yellow"}} elevation={10}>{children}</Paper>
                    )}
                    getOptionLabel={(option) => `${option.city}, ${option.country}`}
                    style={{width: 300, paddingBottom: '5%'}}
                    renderInput={(params) => <TextField
                        {...params}
                        color="secondary"
                        label="Destination"
                        variant="outlined"
                        InputLabelProps={{
                            style: {color: 'white'},
                        }}
                    />
                    }
                />
            </div>
            <div className="leaflet-container">

                <MapContainer center={position} zoom={6} style={{height: '100%', width: '100%'}}>
                    <TileLayer
                        attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
                        url='https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
                    />
                    <Routing sourceCity={sourceCity} destinationCity={destinationCity}/>
                </MapContainer>
            </div>
        </div>
    );
}
