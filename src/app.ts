
const maxQuestsEle = $("maxQuests")
const activeQuestsEle = $("activeQuests")
const ratTailsEle = $("ratTails")
const goblinEarsEle = $("goblinEars")
const harpyFeathersEle = $("harpyFeathers")

const game = {
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
    ] 
}

const inventory = game.player.inventory
const quests = game.quests
const crafts = game.crafts

activeQuestsEle.innerText = game.activeQuests.length.toString()
maxQuestsEle.innerText = game.maxQuests.toString()
ratTailsEle.innerText = inventory[0].qty.toString()
goblinEarsEle.innerText = game.player.inventory[1].qty.toString()
harpyFeathersEle.innerText = game.player.inventory[2].qty.toString()

function $(id: string) {
    return document.getElementById(id)
}

//QUESTS

function showQuests() {
    $("craft").classList.add("hidden");
    $("trade").classList.add("hidden")
    $("quest").classList.remove("hidden");
}

function giveQuest(e) {
    const quest = quests.filter(q => q.name == e.target.id.slice(0, -4))[0]
    game.activeQuests.push(quest)
    $(e.target.id).classList.add("disabled")  // TODO: FIX THIS
    activeQuestsEle.innerText = game.activeQuests.length.toString()
    maxQuestsEle.innerText =  game.maxQuests.toString()
}

function rewardQuest(e) {
    // remove "Reward" from id
    const quest = quests.filter(q => q.name == e.target.id.slice(0, -6))[0]
    const material = inventory.filter(m => m.id == quest.rewardId)[0]

    $(quest.name + "Reward").classList.add("disabled")
    $(material.name).innerText = (material.qty += quest.rewardQty).toString()
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
    const material = inventory.filter(m => m.id == item.id)[0]
    $(material.name).innerText = (material.qty -= item.cost).toString()
    item.qty += 1
    console.log(inventory)
    console.log(game.crafts)
}

function playerCanCraft(item): boolean {
    const material = inventory.filter(m => m.id == item.id)[0]
    return material.qty >= item.cost
}

// TRADING
function showTrading() {
    $("craft").classList.add("hidden");
    $("quest").classList.add("hidden");
    $("trade").classList.remove("hidden")
}

window.setInterval(function() {
    progressQuest()
    readyQuest()
}, 1000)