var game = {
    maxQuests: 3,
    activeQuests: [],
    completedQuests: [],
    player: {
        inventory: {
            ratTails: 0,
            goblinEars: 0,
            harpyFeathers: 0
        }
    },
    rewards: {
        levelOneReward: 5,
        levelTwoReward: 3,
        levelThreeReward: 2,
    }
};
function $(id) {
    return document.getElementById(id);
}
//QUESTS
function showQuests() {
    $("craft").classList.add("hidden");
    $("trade").classList.add("hidden");
    $("quest").classList.remove("hidden");
}
function giveQuest(e) {
    game.activeQuests.push(e.srcElement.id);
    $(e.target.id).classList.add("disabled");
    $("activeQuests").innerText = game.activeQuests.length;
    $("maxQuests").innerText = game.maxQuests;
}
function rewardQuest(e) {
    var reward = e.target.id;
    $(reward).classList.add("disabled");
    switch (reward) {
        case "levelOneReward":
            game.player.inventory.ratTails += game.rewards[e.target.id];
            $("ratTails").innerHTML = "Rat Tails: " + game.player.inventory.ratTails;
            $("levelOne").classList.remove("disabled");
            $("levelOneProgress").firstChild.style.width = "0%";
            break;
        case "levelTwoReward":
            game.player.inventory.goblinEars += game.rewards[e.target.id];
            $("goblinEars").innerHTML = "Goblin Ears: " + game.player.inventory.goblinEars;
            $("levelTwo").classList.remove("disabled");
            $("levelTwoProgress").firstChild.style.width = "0%";
            break;
        default:
            game.player.inventory.harpyFeathers += game.rewards[e.target.id];
            $("harpyFeathers").innerHTML = "Harpy Feathers: " + game.player.inventory.harpyFeathers;
            $("levelThree").classList.remove("disabled");
            $("levelThreeProgress").firstChild.style.width = "0%";
    }
}
function readyQuest() {
    game.completedQuests.forEach(function (quest) {
        $(quest + "Reward").classList.remove("disabled");
        game.completedQuests = game.completedQuests.filter(function (q) { return q !== quest; });
    });
}
function progressQuest() {
    // for each quest in quest array
    game.activeQuests.forEach(function (quest) {
        progressBar = $(quest + "Progress").firstChild;
        progress = progressBar.style.width.split("%");
        progressValue = Number(progress[0]) + 1 * 10;
        if (progressValue <= 100) {
            progressBar.style.width = progressValue.toString() + "%";
        }
        else {
            game.activeQuests = game.activeQuests.filter(function (q) { return q !== quest; });
            game.completedQuests.push(quest);
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
    $("trade").classList.remove("hidden");
}
window.setInterval(function () {
    progressQuest();
    readyQuest();
}, 1000);
//# sourceMappingURL=app.js.map