/**
 * main.ts
 * 
 * Main-module
*/

import { SETTINGS, DOMAIN } from "./const";
import { initMap, MAP } from "./map";
import { initSearch } from "./search";
import { openNav, closeNav, showContent, initUi, createLangSelect } from "./ui";
import { initXml } from "./xml";

window.onload = function (event: Event)
{
    initAll();
}

export function initConnection(): void
{
    var platform: string = SETTINGS.platform;
    var request = new XMLHttpRequest();
    var args: string = "init=TRUE" + "&line=FALSE" + "&info=FALSE" + "&pat=FALSE" + "&changelang=FALSE" + "&dosearch=FALSE" + "&platform=" + platform;

    request.open("POST", `http://${DOMAIN}/php/action.php`, true);
    request.setRequestHeader("content-type", "application/x-www-form-urlencoded")
    request.onreadystatechange = function (): void {
        if (this.readyState == 4 && this.status == 200)
        {
            var result: string = this.response;
            var selectLang: HTMLSelectElement = document.getElementById("select-langs") as HTMLSelectElement;
            
            var resultArray: Array<string> = result.split("+");
            
            for (var i: number = 0; i < resultArray.length; i++)
            {
                var option: HTMLOptionElement = document.createElement("option") as HTMLOptionElement;
                option.value = resultArray[i];

                var img: HTMLImageElement = document.createElement("img") as HTMLImageElement;
                img.src = "/images/flag_" + resultArray[i] + ".svg";

                var span: HTMLSpanElement = document.createElement("span") as HTMLSpanElement;
                span.innerHTML = resultArray[i];

                option.appendChild(img);
                option.appendChild(span);

                selectLang.appendChild(option);
            }

            console.log("result -> initConnection")
            console.log(result);

            createLangSelect();
        }
    }
    request.send(args);
}

export default function initAll(): void
{
    initConnection();

    initXml();
    initMap();
    initUi();
}
