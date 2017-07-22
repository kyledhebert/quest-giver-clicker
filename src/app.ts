
const maxQuestsEle = $("maxQuests")
const activeQuestsEle = $("activeQuests")
const ratTailsEle = $("ratTails")
const goblinEarsEle = $("goblinEars")
const harpyFeathersEle = $("harpyFeathers")

let game = {
    maxQuests: 3,
    activeQuests: [],
    completedQuests: [],
    player: {
        inventory: [
            { id: 1, name: "ratTails", qty: 100},
            { id: 2, name: "goblinEars", qty: 100},
            { id: 3, name: "harpyFeathers", qty: 100}
        ]

    },
    quests: [
        {id: 1, name: "levelOne", rewardId: 1, rewardQty: 5 },
        {id: 2, name: "levelTwo", rewardId: 2, rewardQty: 3 },
        {id: 3, name: "levelThree", rewardId: 3, rewardQty: 2 },
    ],
    crafts: [
        { id: 1, name: "ratTailBelt" ,  cost: 10, qty: 0 },
        { id: 2, name: "goblinEarPouch", cost: 9, qty: 0 },
        { id: 3, name: "harpyFeatherHat", cost: 8, qty: 0 }
    ],
    log : [
        { gaveFirstQuest: false },
        { }
    ] 
}

function $(id: string) {
    return document.getElementById(id)
}

//QUESTS

function showQuests() {
    $("craft").classList.add("hidden");
    $("trade").classList.add("hidden")
    $("quest").classList.remove("hidden")
}

function giveQuest(e) {
    const quest = game.quests.filter(q => q.name == e.target.id.slice(0, -4))[0]
    game.activeQuests.push(quest)
    $(e.target.id).classList.add("disabled")
    activeQuestsEle.innerText = game.activeQuests.length.toString()
    maxQuestsEle.innerText =  game.maxQuests.toString()
}

function rewardQuest(e) {
    // remove "Reward" from id
    const quest = game.quests.filter(q => q.name == e.target.id.slice(0, -6))[0]
    const material = game.player.inventory.filter(m => m.id == quest.rewardId)[0]

    $(quest.name + "Reward").classList.add("disabled")
    $(material.name).innerText = `${material.qty += quest.rewardQty}`
    $(quest.name + "Give").classList.remove("disabled")

    activeQuestsEle.innerText = game.activeQuests.length.toString()
    $(quest.name + "Progress").firstChild.style.width = "0%"

}

function readyQuest() {
    game.completedQuests.forEach(function(quest) {
        $(quest.name + "Reward").classList.remove("disabled")
        game.completedQuests = game.completedQuests.filter(q => q !== quest)
    });
}

function progressQuest() {
    // for each quest in quest array
    game.activeQuests.forEach(function(quest) {
        const progressBar = $(quest.name +"Progress").firstChild
        const progress = progressBar.style.width.split("%")
        const progressValue = Number(progress[0]) +1 * 10
        if (progressValue <= 100) {
            progressBar.style.width = `${progressValue}%`   
        } else {
            game.activeQuests = game.activeQuests.filter(q => q.id !== quest.id)
            activeQuestsEle.innerText = `${game.activeQuests.length}`
            game.completedQuests.push(quest)
        }
    });
}

// CRAFTING
function showCrafting() {
    $("quest").classList.add("hidden");
    $("trade").classList.add("hidden");
    $("craft").classList.remove("hidden");
}

function handleCraftClick(e) {
        const item = game.crafts.filter(i => i.name == e.target.id)[0]
        if (playerCanCraft(item)) {
            craftItem(item)
        } else {
            Materialize.toast(`You don't have enough to make that item!`, 4000)
        }
}

function craftItem(item) {
    const material = game.player.inventory.filter(m => m.id == item.id)[0]
    item.qty += 1
    $(material.name).innerText = (material.qty -= item.cost).toString()

}

function playerCanCraft(item): boolean {
    const material = game.player.inventory.filter(m => m.id == item.id)[0]
    return material.qty >= item.cost
}

// TRADING
function showTrading() {
    $("craft").classList.add("hidden");
    $("quest").classList.add("hidden");
    $("trade").classList.remove("hidden")
}

// UTILITIES
function saveGame() {
    localStorage.setItem("savedGame", JSON.stringify(game))
    console.log("saving game")
}

function displayStats() {
    activeQuestsEle.innerText = game.activeQuests.length.toString()
    maxQuestsEle.innerText = game.maxQuests.toString()
    ratTailsEle.innerText = game.player.inventory[0].qty.toString()
    goblinEarsEle.innerText = game.player.inventory[1].qty.toString()
    harpyFeathersEle.innerText = game.player.inventory[2].qty.toString()
}

window.onload = () => {
    if(localStorage) {
        if(localStorage.getItem("savedGame")) {
            game = JSON.parse(localStorage.getItem("savedGame"))
            displayStats()
        } else {
            displayStats()
        }

    } else {
        alert("You\'re browser does not support localStorage. Please try using Chrome instead!")
    }
}

window.setInterval(function() {
    progressQuest()
    readyQuest()
    saveGame()
}, 1000)