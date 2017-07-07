 var game = {
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






function $(id) {
    return document.getElementById(id)
}

function giveQuest(e) {
    game.activeQuests.push(e.srcElement.id)
    $(e.target.id).classList.add("disabled")
    $("activeQuests").innerHTML = "Active Quests: " + game.activeQuests.length + "/" + game.maxQuests
}

function rewardQuest(e) {
    const reward = e.target.id
    $(reward).classList.add("disabled")
    switch(reward) {
        case "levelOneReward":
            game.player.inventory.ratTails += game.rewards[e.target.id]
            $("ratTails").innerHTML = "Rat Tails: " +  game.player.inventory.ratTails
            $("levelOne").classList.remove("disabled")
            $("levelOneProgress").firstChild.style.width = "0%"
            break
        case "levelTwoReward":
            game.player.inventory.goblinEars += game.rewards[e.target.id]
            $("goblinEars").innerHTML = "Goblin Ears: " + game.player.inventory.goblinEars
            $("levelTwo").classList.remove("disabled")
            $("levelTwoProgress").firstChild.style.width = "0%"
            break
        default:
            game.player.inventory.harpyFeathers += game.rewards[e.target.id]
            $("harpyFeathers").innerHTML = "Harpy Feathers: " + game.player.inventory.harpyFeathers
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
        progressBar = $(quest +"Progress").firstChild
        progress = progressBar.style.width.split("%")
        progressValue = Number(progress[0]) +1 * 10
        if (progressValue <= 100) {
            progressBar.style.width = progressValue.toString() + "%"
        } else {
            game.activeQuests = game.activeQuests.filter(q => q !== quest)
            game.completedQuests.push(quest)
        }
    });
}

window.setInterval(function() {
    progressQuest()
    readyQuest()
}, 1000)

