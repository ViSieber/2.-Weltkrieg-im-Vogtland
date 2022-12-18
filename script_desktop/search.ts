/**
 * search.ts
 * 
 * Handels the search-procedure
 */

import { makeSearchOutput } from "./ui";

export var SEARCHHELPER: Array<Array<string>> = new Array<Array<string>>();
export var SEARCHWORDS: Array<string> = new Array<string>();

export function search(searchArray: Array<string>): Array<string>
{   
    var foundText: Array<string> = new Array<string>();
    
    for (var i = 0; i < searchArray.length; i++)
    {
        var found: string | null = searchWord(searchArray[i]);
        if (found != null)
        {
            foundText.push(found);
        }
    }

    return foundText;
}

export function displaySearchResult(resultList: Array<string>): void
{
    var holder: HTMLDivElement = document.getElementById("div-search-result") as HTMLDivElement;
    for (var i: number = 0; i < holder.children.length; i++)
    {
        holder.children[i].remove();
    }

    for (var i: number = 0; i < resultList.length; i++)
    {
        var c: HTMLDivElement = document.createElement("div") as HTMLDivElement;
        c.setAttribute("class", "div-search-result-container");
        var content: string = "";

        if (document.getElementById(resultList[i])!.firstElementChild!.tagName == "button")
        {
            var tmp: HTMLDivElement = document.getElementById(resultList[i]) as HTMLDivElement;
            tmp.firstElementChild!.remove();
            content = tmp.innerHTML;
        }
        
        else
        {
            content = document.getElementById(resultList[i])!.innerHTML;
        }

        c.innerHTML = content;
        c.getElementsByTagName("button")[0]?.remove()

        holder.appendChild(c);
    }

    var contentElements: HTMLCollectionOf<HTMLDivElement> = document.getElementsByClassName("div-main-content") as HTMLCollectionOf<HTMLDivElement>;

    for (var i: number = 0; i < contentElements.length; i++)
    {
        contentElements[i].style.display = "none";
    }

    holder.style.display = "block";
}

export function initSearch(keywords: string, id: string): void
{
    var kw: Array<string> = keywords.split(",");
    for (var i: number = 0; i < kw.length; i++)
    {
        var elem: Array<string> = [kw[i], id];
        SEARCHWORDS.push(kw[i]);
        SEARCHHELPER.push(elem)
    }

    console.log("SEARCHHELPER");
    console.log(SEARCHHELPER);

    SEARCHHELPER = SEARCHHELPER.sort();

    SEARCHWORDS = sortUnique(SEARCHWORDS);
}

function sortUnique(array: Array<string>): Array<string>
{
    if (array.length == 0)
    {
        return array;
    }

    array = array.sort();
    var ret: Array<string> = [array[0]];
    for (var i: number = 1; i < array.length; i++)
    {
        if (array[i] != array[i - 1])
        {
            ret.push(array[i])
        }
    }

    return ret
}

function searchWord(word: string): string | null
{
    for (var i: number = 0; i < SEARCHHELPER.length; i++)
    {
        if (SEARCHHELPER[i][0] == word)
        {
            return SEARCHHELPER[i][1];
        }
    }

    return null
}

function targetInResultArray(resultArray: Array<string>, word: String): boolean
{
    for (var i: number = 0; i < resultArray.length; i++)
    {

    }

    return false;
}