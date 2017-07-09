
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
        inventory: {
            ratTails: 0,
            goblinEars: 0,
            harpyFeathers:0
        }
    },
    rewards: {
        levelOneReward: 5,
        levelTwoReward: 3,
        levelThreeReward: 2, 
    }
}

activeQuestsEle.innerText = game.activeQuests.length.toString()
maxQuestsEle.innerText = game.maxQuests.toString()
ratTailsEle.innerText = game.player.inventory.goblinEars.toString()
goblinEarsEle.innerText = game.player.inventory.goblinEars.toString()
harpyFeathersEle.innerText = game.player.inventory.harpyFeathers.toString()

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
    game.activeQuests.push(e.srcElement.id)
    $(e.target.id).classList.add("disabled")
    activeQuestsEle.innerText = game.activeQuests.length.toString()
    maxQuestsEle.innerText =  game.maxQuests.toString()
}

function rewardQuest(e) {
    const reward = e.target.id
    $(reward).classList.add("disabled")
    switch(reward) {
        case "levelOneReward":
            game.player.inventory.ratTails += game.rewards[e.target.id]
            ratTailsEle.innerText = `${game.player.inventory.ratTails}`
            $("levelOne").classList.remove("disabled")
            $("levelOneProgress").firstChild.style.width = "0%"
            break
        case "levelTwoReward":
            game.player.inventory.goblinEars += game.rewards[e.target.id]
            goblinEarsEle.innerText = game.player.inventory.goblinEars.toString()
            $("levelTwo").classList.remove("disabled")
            $("levelTwoProgress").firstChild.style.width = "0%"
            break
        default:
            game.player.inventory.harpyFeathers += game.rewards[e.target.id]
            harpyFeathersEle.innerText = game.player.inventory.harpyFeathers.toString()
            $("levelThree").classList.remove("disabled")
            $("levelThreeProgress").firstChild.style.width = "0%"
    }
}

function readyQuest() {
    game.completedQuests.forEach(function(quest) {
        $(quest + "Reward").classList.remove("disabled")
        game.completedQuests = game.completedQuests.filter(q => q !== quest)
    });
}

function progressQuest() {
    // for each quest in quest array
    game.activeQuests.forEach(function(quest) {
        const progressBar = $(quest +"Progress").firstChild
        const progress = progressBar.style.width.split("%")
        const progressValue = Number(progress[0]) +1 * 10
        if (progressValue <= 100) {
            progressBar.style.width = `${progressValue}%`   
        } else {
            game.activeQuests = game.activeQuests.filter(q => q !== quest)
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