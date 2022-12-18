/**
 * ui.ts
 * 
 * Handles all about the UI
*/

import { FeatureLike } from "ol/Feature";
import { LOCATIONVIEWER, POPUPS } from "./const";
import { MAP } from "./map";
import { Popup, RequestData } from "./types";
import { InfoConatiner, PopupContainer } from "./classes";
import { MapBrowserEvent } from "ol";
import { Geometry, LineString, Point } from "ol/geom";
import { Coordinate } from "ol/coordinate";
import { Type } from "ol/geom/Geometry";
import { displaySearchResult, search, SEARCHHELPER, SEARCHWORDS } from "./search";

var targets: Array<string> = new Array<string>();


// begin of section sidenav
// open sidenav
export function openNav(): void
{
    document.getElementById("sidenav")!.style.width = "300px";
}

// close sidenav
export function closeNav(): void
{
    document.getElementById("sidenav")!.style.width = "0";
}
// end of section sidenav

// begin of section popup
// create element for information with location
export function makePopUp(content: string, headlineText: string, description: string)
{
    var popup = new PopupContainer(content, headlineText, description);
    popup.closebutton.addEventListener("click", function (event: MouseEvent): void {
        popup.closePopup();
    });

    //var he: HTMLDivElement = document.getElementById("div-hidden-overlay-elements") as HTMLDivElement;
    //he.appendChild(popup.container)
    console.log("popup");
    console.log(popup);
    POPUPS.push(popup);
}

// open this element as popup
export function openPopUpContainer(description: string): void
{
    var popup: HTMLElement = document.getElementById(description) as HTMLElement;
    console.log("popup element");
    console.log(popup);
    popup.style.display = "block";
}
// end of section popup

// begin of section information
// create element for information without location 
export function makeText(content: string, description: string): void
{
    var ic: InfoConatiner = new InfoConatiner(content, description);
    ic.button.addEventListener("click", function (event: MouseEvent): void {
        ic.showContainerContent();
    });
    
    document.getElementById("div-infos")!.appendChild(ic.container);
}
// end of section information

// show the element in 'div-main-content' container (make selected element visible, all others invisible)
export function showContent(id: string): void
{
    var mainitems: HTMLCollectionOf<HTMLElement> = document.getElementsByClassName("div-main-content")! as HTMLCollectionOf<HTMLElement>;

    for (var i: number = 0; i < mainitems.length; i++)
    {
        if (mainitems[i].getAttribute("id") != id)
        {
            mainitems[i].style.display = "none";
        }

        else
        {
            mainitems[i].style.display = "block";
        }
    }
}

export function createLangSelect()
{
    var container: HTMLDivElement = document.getElementById("div-langs-container") as HTMLDivElement;
    var selectElement: HTMLSelectElement = document.getElementById("select-langs") as HTMLSelectElement;
    var langSelector: HTMLDivElement = document.getElementById("div-lang-select") as HTMLDivElement;
    var optionContainer: HTMLDivElement = document.getElementById("div-select-items") as HTMLDivElement;

    langSelector.innerHTML = selectElement.options[selectElement.selectedIndex].innerHTML;

    for (var i: number = 0; i < selectElement.length; i++)
    {
        var optionElement: HTMLElement = document.createElement("div") as HTMLElement;
        optionElement.innerHTML = selectElement.options[i].innerHTML;
        optionElement.addEventListener("click", function (ev: MouseEvent): void {
            var langSelector: HTMLDivElement = document.getElementById("div-lang-select") as HTMLDivElement;
            var originalOption: HTMLElement = document.getElementById("div-lang-select") as HTMLElement;

            for (var i: number = 0; i < selectElement.length; i++)
            {
                if (selectElement.options[i].innerHTML == this.innerHTML)
                {
                    selectElement.selectedIndex = i;
                    originalOption.innerHTML = this.innerHTML;

                    var selectedDivOptions: HTMLCollectionOf<HTMLElement> = document.getElementsByClassName("same-as-selected") as HTMLCollectionOf<HTMLElement>;

                    for (var j: number = 0; j < selectedDivOptions.length; j++)
                    {
                        selectedDivOptions[j].removeAttribute("class");
                    }

                    this.setAttribute("class", "same-as-selected");
                    //var optionContainer: HTMLDivElement = document.getElementById("div-select-items") as HTMLDivElement;
                    //optionContainer.classList.add("select-hide");
                    break;
                }
            }

            langSelector.click();
        });

        optionContainer.appendChild(optionElement);
    }

    langSelector.addEventListener("click", function (ev: MouseEvent): void {
        ev.stopPropagation();
        closeAllSelect(this);
        var si: HTMLDivElement = document.getElementById("div-select-items") as HTMLDivElement
        si.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
    });
}

export function closeAllSelect(element: HTMLElement): void
{
    var selectItems: HTMLElement = document.getElementById("div-select-items") as HTMLElement;
    var selectElement: HTMLCollectionOf<HTMLElement> = document.getElementsByClassName("select-selected") as HTMLCollectionOf<HTMLElement>;
    var arrayNumer: Array<number> = [];

    console.log("element");
    console.log(element);
    console.log("selectElement");
    console.log(selectElement);
    console.log("selectItems");
    console.log(selectItems);

    for (var i: number = 0; i < selectElement.length; i++)
    {
        if (element == selectElement[i])
        {
            arrayNumer.push(i);
            //selectElement[i].classList.remove("select-arrow-active");
        }

        else
        {
            selectElement[i].classList.remove("select-arrow-active");
        }
    }

    console.log("arrayNumber.indexOf()");
    console.log(arrayNumer.indexOf(0));
    console.log(arrayNumer.indexOf(1));
    
    if (arrayNumer.indexOf(0))
    {
        selectItems.classList.add("select-hide");
    }
}

export function makeSearchOutput(text: string, pos: number): void
{
    var c: HTMLDivElement = document.createElement("div") as HTMLDivElement;
    c.setAttribute("id", pos.toString());

    c.innerHTML = text;

    document.getElementById("div-search-output")!.appendChild(c);
}

export function makePat(past: Array<string>, today: Array<string>, location: string): void
{
    var container: HTMLDivElement = document.createElement("div") as HTMLDivElement;
    container.setAttribute("class", "div-pat-viewer");

    var headLine: HTMLDivElement = document.createElement("div") as HTMLDivElement;
    headLine.innerHTML = "<h2>" + location + "</h2>";
    
    var imgPast: HTMLImageElement = document.createElement("img") as HTMLImageElement;
    imgPast.src = past[0];
    imgPast.setAttribute("class", "img-past-today-past");
    
    var textPast: HTMLDivElement = document.createElement("div") as HTMLDivElement;
    textPast.setAttribute("class", "div-img-text-past");
    textPast.innerHTML = past[1];
    
    var imgToday: HTMLImageElement = document.createElement("img") as HTMLImageElement;
    imgToday.src = today[0];
    imgToday.setAttribute("class", "img-past-today-today");

    var textToday: HTMLDivElement = document.createElement("div") as HTMLDivElement;
    textToday.setAttribute("class", "div-img-text-today");
    textToday.innerHTML = today[1];    

    container.appendChild(headLine);
    container.appendChild(imgPast);
    container.appendChild(textPast)
    container.appendChild(imgToday);
    container.appendChild(textToday);
    document.getElementById("div-frueher-heute")?.appendChild(container);
}

// init UI
export function initUi(): void
{
    var menubuttons: HTMLCollectionOf<HTMLElement> = document.getElementsByClassName("sidenav-button")! as HTMLCollectionOf<HTMLElement>;
    var impressum = document.getElementById("end-link-button")!;
    var searchInput: HTMLInputElement = document.getElementById("inp-search") as HTMLInputElement;
    var searchOutput: HTMLDivElement = document.getElementById("div-search-out") as HTMLDivElement;
    var searchButton: HTMLButtonElement = document.getElementById("btn-search") as HTMLButtonElement;
    var btnSettings: HTMLButtonElement = document.getElementById("btn-settings") as HTMLButtonElement;

    // begin of map interactivity
    // open popup belonging to the feature
    MAP?.on("click", function (event: MapBrowserEvent<any>): void {
        MAP?.forEachFeatureAtPixel(event.pixel, function (feature: FeatureLike, layer): void {
            var description: string = feature.get("description");
            console.log("popup description: " + description)
            openPopUpContainer(description);
        });
    });
    
    // show location description and set curser style
    MAP?.on("pointermove", function (event: MapBrowserEvent<any>) {
        var pointerType: string = "inherit";
        var coordinate: Coordinate | undefined = undefined;
        var location: string = "";

        if (MAP?.hasFeatureAtPixel(event.pixel))
        {
            pointerType = "pointer";
            //coordinate = event.coordinate;
            MAP?.forEachFeatureAtPixel(event.pixel, function(feature: FeatureLike, layer): void {
                location = feature.get("description");
                
                var geometry: Geometry = feature.getGeometry() as Geometry;
                var geometryType: string = geometry.getType().toString();
                console.log("geometryType: " + geometryType + ", " + typeof geometryType);

                if (geometryType == "Point")
                {
                    var point: Point = geometry as Point;
                    coordinate = point.getCoordinates();
                }

                else if (geometryType == "LineString")
                {
                    coordinate = event.coordinate;
                }
            });
             
        }
        
        MAP!.getViewport().style.cursor = pointerType;

        LOCATIONVIEWER.setPosition(coordinate);
        var lv: HTMLElement = document.getElementById("div-location-viewer") as HTMLElement;
        lv.innerHTML = location;
    });
    // end of map interactivity
    

    // set eventlistener to all elements in static html
    document.getElementById("btn-open-menu")!.addEventListener("click", function (ev: MouseEvent): void {
        openNav();
    });
    
    document.getElementById("close-menu")!.addEventListener("click", function (ev: MouseEvent): void {
        closeNav();
    });

    document.getElementById("btn-search")!.addEventListener("click", function (ev: MouseEvent): void {
        //console.log("Button was clicked");
        //var searchelement: HTMLInputElement = document.getElementById("inp-search")! as HTMLInputElement;
        var searchtext: string = searchInput.value;

        // call here request
        //window.alert(searchtext);

        search(searchtext.split(" "));
    });

    btnSettings.addEventListener("click", function (ev: MouseEvent): void {
        var settingsOpen: string = btnSettings.value
        var divSettings: HTMLDivElement = document.getElementById("div-settings") as HTMLDivElement;

        if (settingsOpen == "false")
        {
            btnSettings.parentElement!.style.marginBottom = "150px";
            btnSettings.parentElement!.style.transition = "0.5s";

            divSettings.style.display = "block";

            btnSettings.setAttribute("value", "true");
        }

        else
        {
            btnSettings.parentElement!.style.marginBottom = "40px";
            btnSettings.parentElement!.style.transition = "0.5s";

            divSettings.style.display = "none";

            btnSettings.setAttribute("value", "false");
        }
    });

    // set eventlistener to every menubutton
    for (var i: number = 0; i < menubuttons.length; i++)
    {
        menubuttons[i].addEventListener("mousedown", function (ev: Event): void
        {
            var container: HTMLCollectionOf<HTMLElement> = document.getElementsByClassName("div-sidenav-item")! as HTMLCollectionOf<HTMLElement>;

            for (var j: number = 0; j < container.length; j++)
            {
                container[j].style.border = "none";
            }

            this.style.fontSize = "20px";
            this.parentElement!.style.borderBottomWidth = "3px";
            this.parentElement!.style.borderBottomColor = "#A9A9A9";
            this.parentElement!.style.borderBottomStyle = "solid";

            var name: string = this.getAttribute("value")!;

            showContent(name);
        });

        menubuttons[i].addEventListener("mouseup", function (ev: Event): void
        {
            this.style.fontSize = "25px";
        });
    }

    // add eventlistener to menubutton 'impressum'
    impressum.addEventListener("click", function (ev: Event): void {
        var id: string = this.getAttribute("value")!;
        var sidnaveitems: HTMLCollectionOf<HTMLElement> = document.getElementsByClassName("div-sidenav-item")! as HTMLCollectionOf<HTMLElement>;

        for (var i: number = 0; i < sidnaveitems.length; i++)
        {
            sidnaveitems[i].style.border = "none";
        }

        showContent(id);
    });

    // set the interactivity of the input-field
    searchInput.addEventListener("focusin", function (ev: Event): void {
        searchOutput.style.display = "block";
    });

    searchInput.onkeyup = function (ev): void
    {
        var text: string = searchInput.value;
        var filterArray: Array<Array<string>> = new Array<Array<string>>();
        var outputArray: Array<string> = Array<string>();

        if (text != null)
        {
            filterArray = SEARCHHELPER;

            filterArray = SEARCHHELPER.filter(function (data: Array<string>): boolean {
                return data[0].toLocaleLowerCase().startsWith(text.toLocaleLowerCase());
            });

            outputArray = filterArray.map(function (data: Array<string>): string {
                return `<li value="${data[1]}">${data[0]}<span class="span-target"> -> ${data[1]}</span></li>`;
            });

            searchOutput.innerHTML = outputArray.join("");
            searchOutput.style.display = "block";

            var allSuggestions: HTMLCollectionOf<HTMLLIElement> = searchOutput.getElementsByTagName("li") as HTMLCollectionOf<HTMLLIElement>;

            for (var i: number = 0; i < allSuggestions.length; i++)
            {
                allSuggestions[i].addEventListener("click", function (ev: Event): void {
                    var text: Array<string> = this.innerHTML.split("<");
                    var location: string = this.getAttribute("value")!;
                    targets.push(location);
                    
                    searchInput.value = text[0];
                });
            }
        }

        else
        {
            searchOutput.style.display = "none";
        }

    }

    searchOutput.addEventListener("mouseout", function (ev: Event): void {
        searchOutput.style.display = "none";
    })

    searchOutput.addEventListener("mouseover", function (ev: Event): void {
        searchOutput.style.display = "block";
    });

    searchButton.addEventListener("click", function (ev: Event): void {
        var result = search(searchInput.value.split(" "));
        var resultCompleat: Array<string> = targets;
        
        for (var i: number = 0; i < result.length; i++)
        {
            if (resultCompleat.indexOf(result[i]) == -1)
            {
                resultCompleat.push(result[i])
            }
        }

        displaySearchResult(resultCompleat);
    });
}