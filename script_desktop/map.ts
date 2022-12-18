/**
 * map.ts
 * 
 * Handles all about the map
*/

import Feature from "ol/Feature";
import Map from "ol/Map";
import View from "ol/View";
import { OSM, Vector as VectorSource } from "ol/source";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { fromLonLat } from "ol/proj"
import { LineString, Point } from "ol/geom";

import { LOCATIONVIEWER, VECTORLAYER, VECTORSOURCE } from "./const";
import { Coordinate } from "ol/coordinate";

export var MAP: Map | null = null;

export function makePOI(coordinates:Array<number>, description: string): void
{
    var pointgeometry: Point = new Point(fromLonLat(coordinates));

    VECTORSOURCE.addFeature(new Feature({
        geometry: pointgeometry,
        description: description
    }));
}

export function makeLineString(coordinates: Array<Array<number>>): void
{
    var lonlat: Array<Coordinate> = Array<Coordinate>();
    for (var i: number = 0; i < coordinates.length; i++)
    {
        var c: Coordinate = fromLonLat(coordinates[i]);
        lonlat.push(c);
    }

    var linestringgeometry: LineString = new LineString(lonlat);

    VECTORSOURCE.addFeature(new Feature({
        geometry: linestringgeometry,
        description: "Vogtland"
    }));
}

export function initMap(): void
{
    MAP = new Map({
        layers: [
            new TileLayer({
                source: new OSM()
            }),
            VECTORLAYER
        ],

        overlays: [
            LOCATIONVIEWER
        ],

        target: document.getElementById("div-map")!,

        view: new View({
            center: fromLonLat([12.0, 50.55]),
            zoom: 9.75
        })
    })

    // debug los
    //console.log("Map created");
    //console.log(MAP);
    //console.log(document.getElementById("div-map")!);
    //console.log("VECTORLAYER");
    //console.log(VECTORLAYER);

    //console.log("VECTORSOURCE");
    //console.log(VECTORSOURCE);
}
