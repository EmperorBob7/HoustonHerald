const data = [
    {
        name: "The Houston Museum of Natural Science",
        location: "SW",
        price: "$", //10.70
        physical: "No",
        rating: 4.5,
        type: ["Indoor", "Shows", "Educational"],
        category: ["Museum"],
        membership: "X",
        address: "5555 Hermann Park Dr, Houston, TX 77030"
    },
    {
        name: "Cypress Ranch Computer Science Club",
        location: "NW",
        price: "0",
        physical: "No",
        rating: 5,
        type: ["Indoor", "Events", "Educational"],
        category: ["School", "Fun & Games"],
        membership: "✓",
        address: "10700 Fry Rd, Cypress, TX 77433"
    }
];
let table;
//✓X
window.onload = () => {
    table = document.getElementById("attractionsTable");
    loadData();
    new Tablesort(table);

    document.getElementById("closeFloater").addEventListener("click", closeFloater);
};

function loadData() {
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
            span.classList.add("checked");
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

        });
        document.getElementById("tBody").appendChild(tr);
    }
}

function closeFloater() {
    document.getElementById("addressFloater").style.display = "none";
}