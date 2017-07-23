const eventEle = $$("event");
const maxQuestsEle = $$("maxQuests");
const activeQuestsEle = $$("activeQuests");
const ratTailsEle = $$("ratTails");
const goblinEarsEle = $$("goblinEars");
const harpyFeathersEle = $$("harpyFeathers");
let game = {
    maxQuests: 3,
    activeQuests: [],
    completedQuests: [],
    player: {
        inventory: [
            { id: 1, name: "ratTails", displayName: "Rat Tails", qty: 0, price: 1 },
            { id: 2, name: "goblinEars", displayName: "Goblin Ears", qty: 0, price: 2 },
            { id: 3, name: "harpyFeathers", displayName: "Harpy Feathers", qty: 0, price: 3 }
        ]
    },
    quests: [
        { id: 1, name: "levelOne", rewardId: 1, rewardQty: 5 },
        { id: 2, name: "levelTwo", rewardId: 2, rewardQty: 3 },
        { id: 3, name: "levelThree", rewardId: 3, rewardQty: 2 },
    ],
    crafts: [
        { id: 1, name: "ratTailBelt", cost: 10, qty: 0 },
        { id: 2, name: "goblinEarPouch", cost: 9, qty: 0 },
        { id: 3, name: "harpyFeatherHat", cost: 8, qty: 0 }
    ],
    log: [
        {
            id: 1,
            name: "gaveFirstQuest",
            done: false,
            text: "Another day in the starting zone . . . Here comes the first noob, better give 'em a quest."
        },
        {
            id: 2,
            name: "rewardFirstQuest",
            done: false,
            text: "They shouldn't be gone too long, it's only five rats."
        },
        {
            id: 3,
            name: "craftingAvailable",
            done: false,
            text: "If you had a few more rat tails, you could make something--er--nice. Yeah, let's just go with nice."
        },
        {
            id: 4,
            name: "craftedFirstItem",
            done: false,
            text: "Take those over to the craft bench and see what you can make."
        },
        {
            id: 5,
            name: "tradingAvailable",
            done: false,
            text: "You might be able to sell that at the market."
        },
        {
            id: 6,
            name: "",
            done: false,
            text: ""
        }
    ]
};
function $$(id) {
    return document.getElementById(id);
}
//QUESTS
function showQuests() {
    $$("craft").classList.add("hidden");
    $$("trade").classList.add("hidden");
    $$("quest").classList.remove("hidden");
}
function giveQuest(e) {
    if (game.log.find(getFirstIncompleteLogItem).name === "gaveFirstQuest") {
        console.log("starting first quest");
        completeFirstIncompleteLogItem();
    }
    const quest = game.quests.filter(q => q.name == e.target.id.slice(0, -4))[0];
    game.activeQuests.push(quest);
    $$(e.target.id).classList.add("disabled");
    activeQuestsEle.innerText = game.activeQuests.length.toString();
    maxQuestsEle.innerText = game.maxQuests.toString();
}
function rewardQuest(e) {
    if (game.log.find(getFirstIncompleteLogItem).name === "rewardFirstQuest") {
        console.log("rewarding first adventurer");
        completeFirstIncompleteLogItem();
    }
    // remove "Reward" from id
    const quest = game.quests.filter(q => q.name == e.target.id.slice(0, -6))[0];
    const material = game.player.inventory.filter(m => m.id == quest.rewardId)[0];
    $$(quest.name + "Reward").classList.add("disabled");
    $$(material.name).innerText = `${material.qty += quest.rewardQty}`;
    $$(quest.name + "Give").classList.remove("disabled");
    const progressBar = $$(quest.name + "Progress").firstChild;
    activeQuestsEle.innerText = game.activeQuests.length.toString();
    progressBar.style.width = "0%";
}
function readyQuest() {
    game.completedQuests.forEach(function (quest) {
        $$(quest.name + "Reward").classList.remove("disabled");
        game.completedQuests = game.completedQuests.filter(q => q !== quest);
    });
}
function progressQuest() {
    // for each quest in quest array
    game.activeQuests.forEach(function (quest) {
        const progressBar = $$(quest.name + "Progress").firstChild;
        const progress = progressBar.style.width.split("%");
        const progressValue = Number(progress[0]) + 1 * 10;
        if (progressValue <= 100) {
            progressBar.style.width = `${progressValue}%`;
        }
        else {
            game.activeQuests = game.activeQuests.filter(q => q.id !== quest.id);
            activeQuestsEle.innerText = `${game.activeQuests.length}`;
            game.completedQuests.push(quest);
        }
    });
}
// CRAFTING
function showCraftingButton() {
    $$("showQuests").classList.remove("hidden");
    $$("showCrafting").classList.remove("hidden");
}
function showCrafting() {
    $$("quest").classList.add("hidden");
    $$("trade").classList.add("hidden");
    $$("craft").classList.remove("hidden");
}
function handleCraftClick(e) {
    const item = game.crafts.filter(i => i.name == e.target.id)[0];
    if (playerCanCraft(item)) {
        craftItem(item);
    }
    else {
        Materialize.toast(`You don't have enough to make that item!`, 4000);
    }
}
function craftItem(item) {
    const material = game.player.inventory.filter(m => m.id == item.id)[0];
    item.qty += 1;
    $$(material.name).innerText = (material.qty -= item.cost).toString();
}
function playerCanCraft(item) {
    const material = game.player.inventory.filter(m => m.id == item.id)[0];
    return material.qty >= item.cost;
}
// TRADING
function showTradingButton() {
    $$("showTrading").classList.remove("hidden");
}
function showTrading() {
    $$("craft").classList.add("hidden");
    $$("quest").classList.add("hidden");
    $$("trade").classList.remove("hidden");
    renderInventoryToSell();
}
function renderInventoryToSell() {
    const listOfItemsToSell = $$("sell-inventory");
    listOfItemsToSell.innerHTML = "";
    const headerli = document.createElement("li");
    headerli.classList.add("collection-header");
    const header = document.createElement("h4");
    const headerText = document.createTextNode("Items to Sale");
    header.appendChild(headerText);
    headerli.appendChild(header);
    listOfItemsToSell.appendChild(headerli);
    game.player.inventory.forEach(function (item) {
        if (item.qty > 0) {
            const li = document.createElement("li");
            li.classList.add("collection-item");
            const span = document.createElement("span");
            span.classList.add("title");
            const spanContent = document.createTextNode(`${item.displayName}`);
            span.appendChild(spanContent);
            const button = document.createElement("a");
            button.classList.add("waves-effect", "waves-light", "btn", "secondary-content", "sell-btn");
            button.id = item.name;
            button.onclick = function handleSellClick(event) { };
            const total = item.price * item.qty;
            const buttonText = document.createTextNode(`Sell${item.qty} for ${total}`);
            button.appendChild(buttonText);
            li.appendChild(span);
            li.appendChild(button);
            listOfItemsToSell.appendChild(li);
        }
    });
}
// LOG
function gaveFirstQuest() {
    return game.log.find(findLogItemGaveFirstQuest).done;
}
function findLogItemGaveFirstQuest(item) {
    return item.name === "gaveFirstQuest";
}
function getFirstIncompleteLogItem(item) {
    return item.done === false;
}
function completeFirstIncompleteLogItem() {
    const item = game.log.find(getFirstIncompleteLogItem);
    item.done = true;
}
function setEventLogText() {
    const item = game.log.find(getFirstIncompleteLogItem);
    console.log("Setting text to " + item.text);
    eventEle.innerText = item.text;
}
function updateEventLog() {
    const event = game.log.find(getFirstIncompleteLogItem);
    switch (event.name) {
        case "craftingAvailable":
            if (game.player.inventory.find(findRatTails).qty >= 10) {
                event.done = true;
                showCraftingButton();
            }
            break;
        case "craftedFirstItem":
            if (game.crafts.find(findRatTailBelt).qty >= 1) {
                event.done = true;
                showTradingButton();
            }
            break;
        case "tradingAvailable":
            break;
        case "soldFirstItem":
            break;
        default:
            break;
    }
}
// UTILITIES
function saveGame() {
    localStorage.setItem("savedGame", JSON.stringify(game));
    console.log("saving game");
}
function findRatTails(item) {
    return item.name === "ratTails";
}
function findGoblinEars(item) {
    return item.name === "goblinEars";
}
function findHarpyFeathers(item) {
    return item.name === "harpyFeathers";
}
function findRatTailBelt(item) {
    return item.name === "ratTailBelt";
}
function findGoblinEarPouch(item) {
    return item.name === "goblinEarPouch";
}
function findHarpyFeatherHap(item) {
    return item.name === "harpyFeatherHat";
}
function displayStats() {
    activeQuestsEle.innerText = game.activeQuests.length.toString();
    maxQuestsEle.innerText = game.maxQuests.toString();
    ratTailsEle.innerText = game.player.inventory[0].qty.toString();
    goblinEarsEle.innerText = game.player.inventory[1].qty.toString();
    harpyFeathersEle.innerText = game.player.inventory[2].qty.toString();
}
window.onload = () => {
    if (localStorage) {
        if (localStorage.getItem("savedGame")) {
            game = JSON.parse(localStorage.getItem("savedGame"));
        }
    }
    else {
        alert("You\'re browser does not support localStorage. Please try using Chrome instead!");
    }
    displayStats();
    setEventLogText();
};
window.setInterval(function () {
    progressQuest();
    readyQuest();
    updateEventLog();
    setEventLogText();
    // saveGame()
}, 1000);
//# sourceMappingURL=app.js.map