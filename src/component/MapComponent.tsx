import * as L from 'leaflet';
import * as React from 'react';
import '../styles/map.css';
import {MyPosition} from 'src/types/Position';

interface IMap {
    positions: MyPosition[];
    mounted: boolean;
}


export class MapComponent extends React.Component<IMap> {
    map: L.Map;
    markers: L.LayerGroup;
    routing: L.Routing.Control[];
    state: { positions: MyPosition[] };
    attribution = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';

    constructor(props: IMap) {
        super(props);

    }

    componentDidMount() {
        this.map = new L.Map('map', {
            zoom: 7,
            layers: [
                L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
                    attribution: this.attribution
                })]
        });
        this.markers = new L.LayerGroup();
        this.markers.addTo(this.map);
        this.routing = [];
            this.setUpMap();
        
    }

    setUpMap() {

        var positions: MyPosition[] = this.props.positions;
        if(positions.length==0 || positions==undefined)
            return;
        this.map.setView(new L.LatLng(positions[0].lat, positions[0].lon), 7);

        let iconMarker;
        let color;
        let icon;
        positions.map(position => {

            let state = (position.state != null && position.state!="" ) ? JSON.parse(position.state) : {};
            if(state=={}){
                icon = "/map-marker-green.png";
                color = "#2ac406";
            }
            switch (state.color) {
                default:
                case 'red':
                    icon = "/map-marker-red.png";
                    color = "#ba1212";
                    break;
                case 'yellow':
                    icon = "/map-marker-yellow.png";
                    color = "#ffbc2b";
                    break;
                case 'green':
                    icon = "/map-marker-green.png";
                    color = "#2ac406";
                    break;
            }

            iconMarker = L.icon({
                iconUrl: icon,
                iconSize: [20, 20],
                iconAnchor: [10, 10]
            });

            let popup = L
                .popup()
                .setContent("<p style=\"font-weight:bold\">" + new Date(position.timestamp)
                    .toLocaleString() + "</p>" + "<p style=\"color:" + color + "; font-weight:bold\">" + state.description + "</p>");
            new L
                .Marker(new L.LatLng(position.lat, position.lon), {icon: iconMarker})
                .addTo(this.markers)
                .bindPopup(popup);
        });

    }

    componentDidUpdate(prevProps: IMap) {
        
        if (prevProps.positions != this.props.positions) {
            this.setUpMap();
        } else {
            this.markers.clearLayers();
            this.map.setView(new L.LatLng(41.881868, 12.503603), 4);
        }
    }

    render() {
        var style: React.CSSProperties = {
            height: "500px"
        };
        return (
            <div style={style} id="map"></div>
        );
    }

}