/**
* xml.ts
*
* Handles all about XML
*/

import { DOMAIN } from "./const";
import { makeLineString, makePOI } from "./map";
import { initSearch } from "./search";
import { makePopUp, makeText, makePat } from "./ui";

export function getPoiXml(): void
{
    var request = new XMLHttpRequest();
    var args: string = "init=FALSE" + "&line=FALSE" + "&info=TRUE" + "&pat=FALSE" + "&changelang=FALSE" + "&dosearch=FALSE";

    request.open("POST", `http://${DOMAIN}/php/action.php`, true);
    request.setRequestHeader("content-type", "application/x-www-form-urlencoded")
    request.onreadystatechange = function (): void {
        if (this.readyState == 4 && this.status == 200)
        {
            var xml: Document = this.responseXML!;
            console.log("responseXML -> getPoiXML()");
            console.log(xml);
            console.log(this.response);
            
            if (xml != null)
            {
                var infos: HTMLCollectionOf<Element> = xml.getElementsByTagName("info");
            
                for (var i: number = 0; i < infos.length; i++)
                {
                    var location: Element = infos[i].firstElementChild! as Element;
                    var infoDescription: string = infos[i].getAttribute("description")!;
                    var keywords: string = infos[i].getAttribute("keywords")!;

                    if (location.tagName == "location")
                    {
                        var tlat: string = location.getAttribute("lat")!;
                        var tlon: string = location.getAttribute("lon")!;
                        var description: string = location.getAttribute("description")!;
                        
                        var lat: number = parseFloat(tlat);
                        var lon: number = parseFloat(tlon);

                        // in map.ts
                        makePOI([lon, lat], description);

                        // in ui.ts
                        makePopUp(infos[i].innerHTML, infoDescription, description);

                        initSearch(keywords, description);
                        console.log("initSearch called");
                    }

                    else
                    {
                        makeText(infos[i].innerHTML, infoDescription);

                        initSearch(keywords, infoDescription);
                        console.log("initSearch called");
                    }
                }
            }

            else
            {
                window.alert("ERROR:\nCould not load <info>.xml!\nPlease reload the site");
            }
        }
    }
    request.send(args);
}

export function getLineXML(): void
{
    var request = new XMLHttpRequest();
    var args: string = "line=TRUE" + "&init=FALSE" + "&info=FALSE" + "&pat=FALSE" + "&changelang=FALSE" + "&dosearch=FALSE";

    request.open("POST", `http://${DOMAIN}/php/action.php`, true);
    request.setRequestHeader("content-type", "application/x-www-form-urlencoded")
    request.onreadystatechange = function (): void {
        if (this.readyState == 4 && this.status == 200)
        {
            var xml = this.responseXML!;
            console.log("responseXML -> getLineXML()");
            console.log(xml);
            
            if (xml != null)
            {
                var line: HTMLCollectionOf<Element> = xml.getElementsByTagName("coordinate");

                var linecoordinates: Array<Array<number>> = Array<Array<number>>();
                for (var i: number = 0; i < line.length; i++)
                {   
                    var tlon = line[i].firstElementChild?.innerHTML;
                    var tlat = line[i].lastElementChild?.innerHTML;

                    var lon = (tlon != null) ? parseFloat(tlon) : 0;
                    var lat = (tlat != null) ? parseFloat(tlat) : 0;

                    if (lon != 0 && lat != 0)
                    {
                        linecoordinates.push([lon, lat]);
                    }
                }

                makeLineString(linecoordinates);
            }

            else
            {
                window.alert("ERROR:\nCould not load line.xml!\nPlease reload the site");
            }
        }
    }
    request.send(args);
}

function getPatXML(): void
{
    var request = new XMLHttpRequest();
    var args: string = "line=FALSE" + "&init=FALSE" + "&info=FALSE" + "&pat=TRUE" + "&changelang=FALSE" + "&dosearch=FALSE";

    request.open("POST", `http://${DOMAIN}/php/action.php`, true);
    request.setRequestHeader("content-type", "application/x-www-form-urlencoded")
    request.onreadystatechange = function (): void {
        if (this.readyState == 4 && this.status == 200)
        {
            var xml: Document = this.responseXML!;
            console.log("responseXML -> getPatXML()");
            console.log(xml);
            
            if (xml != null)
            {
                var pat: HTMLCollectionOf<Element> = xml.getElementsByTagName("pat");

                for (var i: number = 0; i < pat.length; i++)
                {
                    var location: string = pat[i].getAttribute("location")!;
                    var past: Element = (pat[i].firstElementChild!.tagName == "past") ? pat[i].firstElementChild! : pat[i].lastElementChild!;
                    var today: Element = (pat[i].firstElementChild!.tagName == "today") ? pat[i].firstElementChild! : pat[i].lastElementChild!;
                    var pastImg: string = past.getAttribute("img")!;
                    var pastYear: string = past.getAttribute("year")!;
                    var todayImg: string = today.getAttribute("img")!;
                    var todayYear: string = today.getAttribute("year")!;
                    
                    makePat([pastImg, pastYear], [todayImg, todayYear], location);
                }
            }

            else
            {
                window.alert("ERROR:\nCould not load past_and_today.xml!\nPlease reload the site");
            }
        }
    }
    request.send(args);
}

export function initXml(): void
{
    getLineXML();
    getPoiXml();
    getPatXML();
}