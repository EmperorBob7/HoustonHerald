/**
 * @typedef  {Object}   AttractionData An Object used for attraction data
 * @property {String}   name The name of the attraction
 * @property {String}   location The location of the attraction relative to the center of Houston
 * @property {String}   price The price of an attraction (0, $, $$, $$$)
 * @property {String}   physical Whether an activity requires a significant amount of physical extertion
 * @property {Number}   rating The rating of an attraction numerically
 * @property {String[]} type The generic types the attraction fulfills
 * @property {String[]} category The specific types of categories the attraction fulfills
 * @property {String}   membership Whether an attraction requires a membership or not
 * @property {String}   address The Address of the attraction (not a URL)
 */
let table, data;
//✓X

window.onload = async () => {
    data = await (await fetch("/data")).json();
    table = document.getElementById("attractionsTable");

    loadData(data);
    filterEvents();
    new Tablesort(table);

    document.getElementById("closeFloater").addEventListener("click", closeFloater);
    document.getElementById("bg").addEventListener("click", closeFloater);
    const content = document.getElementById("contentEvent");
    content.addEventListener("mouseover", () => {
        let c = document.getElementById("content");
        c.select();
        navigator.clipboard.writeText(c.value);
        console.log("I'm stuff");
    });
};

/**
 * Loads data to the DOM given an array of Attractions
 * @param {AttractionData[]} data
 */
function loadData(data) {
    const body = document.getElementById("tBody");
    while (body.firstChild) {
        body.firstChild.remove()
    }

    for (const i of data) {
        let tr = document.createElement("tr");
        let name = document.createElement("td");
        name.innerText = i.name;

        let loc = document.createElement("td");
        loc.innerText = i.location;

        let price = document.createElement("td");
        price.innerText = i.price;

        let phys = document.createElement("td");
        phys.innerText = i.physical;

        let rating = document.createElement("td");
        let bool = true;
        for (let j = 1; j <= 5; j++) {
            let span = document.createElement("span");
            span.classList.add("fa");
            if (i.rating >= j) {
                span.classList.add("fa-star");
            } else if (bool && i.rating * 10 % 10 != 0) {
                bool = false;
                span.classList.add("fa-star-half-empty");
            } else {
                span.classList.add("fa-star-o");
            }
            rating.appendChild(span);
        }
        rating.appendChild(document.createElement("br"));
        let p = document.createElement("p");
        p.innerText = i.rating;
        rating.appendChild(p);
        rating.setAttribute("data-sort", i.rating);

        let type = document.createElement("td");
        let typeList = document.createElement("ul");
        for (const types of i.type) {
            let li = document.createElement("li");
            li.innerText = types;
            typeList.appendChild(li);
        }
        type.appendChild(typeList);

        let cat = document.createElement("td");
        let catList = document.createElement("ul");
        for (const cats of i.category) {
            let li = document.createElement("li");
            li.innerText = cats;
            catList.appendChild(li);
        }
        cat.appendChild(catList);

        let memb = document.createElement("td");
        memb.innerText = i.membership;

        tr.appendChild(name);
        tr.appendChild(loc);
        tr.appendChild(price);
        tr.appendChild(phys);
        tr.appendChild(rating);
        tr.appendChild(type);
        tr.appendChild(cat);
        tr.appendChild(memb);

        tr.addEventListener("click", () => {
            document.getElementById("content").value = i.address;
            document.getElementById("addressFloater").style.display = "flex";
        });
        body.appendChild(tr);
    }
}

/**
 * Closes the floater for the Address.
 * @param {Event} e 
 */
function closeFloater(e) {
    e = window.event || e;
    if (this === e.target) {
        document.getElementById("addressFloater").style.display = "none";
    }
}

/**
 * Adds EventListeners to all Filter inputs.
 */
function filterEvents() {
    document.getElementById("name").addEventListener("change", updateFilters);
    document.getElementById("location").addEventListener("change", updateFilters);
    document.getElementById("price").addEventListener("change", updateFilters);
    document.getElementById("physical").addEventListener("change", updateFilters);
    document.getElementById("rating").addEventListener("change", updateFilters);
    document.getElementById("type").addEventListener("change", updateFilters);
    document.getElementById("category").addEventListener("change", updateFilters);
    document.getElementById("membership").addEventListener("change", updateFilters);
}

/**
 * Updates Data displayed every time a Filter is updated.
 */
function updateFilters() {
    let d = data;
    let name = document.getElementById("name").value;
    let loc = document.getElementById("location").value;
    let price = document.getElementById("price").value;
    let phys = document.getElementById("physical").value;
    let rat = document.getElementById("rating").value;
    let type = document.getElementById("type").value;
    let cat = document.getElementById("category").value;
    let member = document.getElementById("membership").value;
    if (name !== "")
        d = d.filter(x => x.name.toLowerCase().includes(name.toLowerCase()));
    if (loc !== "None")
        d = d.filter(x => x.location.includes(loc));
    if (price !== "None")
        d = d.filter(x => x.price === price);
    if (phys !== "None")
        d = d.filter(x => x.physical === phys);
    if (rat !== "None")
        d = d.filter(x => x.rating >= rat);
    if (type !== "None")
        d = d.filter(x => x.type.includes(type));
    if (cat !== "None")
        d = d.filter(x => x.category.includes(cat));
    if (member !== "None")
        d = d.filter(x => x.membership === member);
    loadData(d);
}