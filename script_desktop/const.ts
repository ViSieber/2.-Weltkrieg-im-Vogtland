/**
 * const.ts
 * 
 * Defines all constants
*/

import { Feature, Overlay } from "ol";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";
import { PopupContainer, Settings } from "./classes";

export const DOMAIN: string = "www.w2imvogtland.site";

// const IMAGE defines the specific style of circle objects (features)
const IMAGE: CircleStyle = new CircleStyle({
    radius: 7,
    fill: new Fill({
        color: "rgba(255, 255, 255, 0.8)"
    }),
    stroke: new Stroke({
        color: "black",
        width: 1
    })
});

// const STYLE defines all available styles for features (shown objects on map)
const STYLES = {
    "Point": new Style({
        image: IMAGE
    }),
    
    "LineString": new Style({
        stroke: new Stroke({
            color: "#B33206",
            width: 3
        })
    }),
};

// const styleFunction defines the function to select the right style for feature (shown object on map)
const styleFunction = function (feature)
{
    feature!.get
    return STYLES[feature!.getGeometry()!.getType()];
};

// constVECTORSOURCE defines the source for the layer (both type of vector)
export const VECTORSOURCE: VectorSource = new VectorSource();

// const VECTORLAYER
export const VECTORLAYER: VectorLayer<VectorSource> = new VectorLayer({
    source: VECTORSOURCE,
    style: styleFunction!
});

// const POPUPS is an array of all popups available to show
export const POPUPS: Array<PopupContainer> = Array<PopupContainer>();

export const LOCATIONVIEWER = new Overlay({
    element: document.getElementById("div-location-viewer")!,
    autoPan: {
        animation: {
            duration: 250
        }
    }
});

export const SETTINGS: Settings = new Settings();