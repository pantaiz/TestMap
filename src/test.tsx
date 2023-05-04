import {
    createElementObject,
    createPathComponent,
    extendContext,
} from '@react-leaflet/core'
import L, {LatLngExpression} from 'leaflet'
import {MapContainer, Popup, TileLayer} from "react-leaflet";

function getBounds(props:any) {
    return L.latLng(props.center).toBounds(props.size)
}

function createSquare(props:any, context:any) {
    const square = new L.Rectangle(getBounds(props))
    return createElementObject(
        square,
        extendContext(context, { overlayContainer: square }),
    )
}

function updateSquare(instance:any, props:any, prevProps:any) {
    if (props.center !== prevProps.center || props.size !== prevProps.size) {
        instance.setBounds(getBounds(props))
    }
}

const Square = createPathComponent(createSquare, updateSquare)

const center:LatLngExpression  = [51.505, -0.09]

export function MyMap() {
    return (
        <MapContainer center={center} zoom={13}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Square center={center} size={1000}>
                <Popup>Hello Popup</Popup>
            </Square>
        </MapContainer>
    )
}