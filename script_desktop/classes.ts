/**
 * classes.ts
 * 
 * defines all neccessary classes
*/

export class PopupContainer
{
    container: HTMLDivElement;
    closebutton: HTMLButtonElement;
    headline: HTMLElement;
    info: HTMLDivElement;

    desciption: string;

    constructor (infoText: string, headlineText: string, description: string)
    {
        var c: HTMLDivElement = document.createElement("div") as HTMLDivElement;
        c.setAttribute("class", "div-popup-container");
        c.setAttribute("id", description);

        var cb: HTMLButtonElement = document.createElement("button") as HTMLButtonElement;
        cb.setAttribute("class", "btn-close-popup");
        cb.innerHTML = "&times;";

        var h: HTMLElement = document.createElement("h1");
        h.innerText = headlineText;

        var i: HTMLDivElement = document.createElement("div") as HTMLDivElement;
        i.innerHTML = infoText;

        c.appendChild(cb);
        c.appendChild(h);
        c.appendChild(i);

        var he: HTMLDivElement = document.getElementById("div-hidden-overlay-elements") as HTMLDivElement;
        he.appendChild(c);

        this.closebutton = cb;
        this.headline = h;
        this.info = i;
        this.container = c;

        this.desciption = headlineText;
    }

    public openPopup()
    {
        this.container.style.display = "block";
        var popup: HTMLElement = document.getElementById(this.desciption) as HTMLElement;
        popup.style.display = "block";
        //var he: HTMLElement = document.getElementById("div-hidden-overlay-elments") as HTMLElement;
        //he.appendChild(popup);
    }

    public closePopup()
    {
        this.container.style.display = "none";
        var popup: HTMLElement = document.getElementById(this.desciption) as HTMLElement;
        popup.style.display = "none";
        //var he = document.getElementById("div-hidden-overlay-elements") as HTMLDivElement;
        //he.removeChild(popup);
    }
}

export class InfoConatiner
{
    container: HTMLDivElement;
    button: HTMLButtonElement;
    private buttonImg: HTMLImageElement;
    headline: HTMLElement;
    private id: string;
    info: HTMLDivElement;
    
    private state: boolean;

    constructor (infoText: string, headlineText: string)
    {
        var c: HTMLDivElement = document.createElement("div") as HTMLDivElement;
        c.setAttribute("class", "div-text-container");
        c.setAttribute("id", headlineText);
        
        var bi: HTMLImageElement = document.createElement("img") as HTMLImageElement;
        bi.setAttribute("class", "img-details");
        bi.src = "/images/details_triangle.svg";

        var b: HTMLButtonElement = document.createElement("button") as HTMLButtonElement;
        b.setAttribute("class", "btn-details");
        b.appendChild(bi);

        var h: HTMLElement = document.createElement("h1");
        h.innerText = headlineText;
        
        var i: HTMLDivElement = document.createElement("div") as HTMLDivElement;
        i.setAttribute("class", "div-info")
        i.style.height = "0px";
        i.innerHTML = infoText;

        c.appendChild(b);
        c.appendChild(h);
        c.appendChild(i);

        this.container = c;
        this.button = b;
        this.buttonImg = bi;
        this.headline = h;
        this.info = i;

        this.id = headlineText;
        this.state = false;
    }

    public showContainerContent(): void
    {
        console.log("In showContent()");
        if (this.state == false)
        {
            var e: HTMLElement = document.getElementById(this.id) as HTMLElement;

            var bi: HTMLElement = e.firstChild?.firstChild as HTMLElement
            bi.style.transform = "rotate(0deg)";
            bi.style.transition = "0.5s";

            var i: HTMLElement = e?.lastChild as HTMLElement;
            i.style.height = "auto";
            i.style.display = "block";
            i.style.transition = "0.5s";

            this.state = true;

            this.buttonImg.style.transform = "rotate(0deg)";
            this.buttonImg.style.transition = "0.5s";

            this.info.style.height = "auto";
            this.info.style.display = "inline-block";
            this.info.style.transition = "0.5s";
        }

        else
        {
            var e: HTMLElement = document.getElementById(this.id) as HTMLElement;

            var bi: HTMLElement = e.firstChild?.firstChild as HTMLElement
            bi.style.transform = "rotate(-90deg)";
            bi.style.transition = "0.5s";

            var i: HTMLElement = e?.lastChild as HTMLElement;
            i.style.height = "0px";
            i.style.display = "none";
            i.style.transition = "0.5s";

            this.state = false;

            this.buttonImg.style.transform = "rotate(-90deg)";
            this.buttonImg.style.transition = "0.5s";

            this.info.style.height = "0px";
            this.info.style.display = "none";
            this.info.style.transition = "0.5s";
        }
    }
}

export class Search
{
    readonly searchText: Array<string>;

    constructor (text: string)
    {
        var sst: Array<string> = text.split(" ");

        for (var i: number = 0; i < sst.length; i++)
        {
            if (sst[i] != null && sst[i] != "")
            {
                this.searchText.push(sst[i]);
            }
        }
    }
}

export class Settings
{
    readonly language: string;
    readonly screenWidth: number;
    readonly screenHeight: number;
    readonly platform: string;

    constructor()
    {
        this.language = navigator.language;
        this.screenWidth = window.innerWidth;
        this.screenHeight = window.innerHeight;
        this.platform = navigator.platform;
    }
}