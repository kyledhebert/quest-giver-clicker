
var activeQuests = []
var completedQuests = []

function $(id) {
    return document.getElementById(id)
}

function giveQuest(e) {
    activeQuests.push(e.srcElement.id)
    $(e.target.id).classList.add("disabled")
    $("activeQuests").innerHTML = "Active Quests: " + activeQuests.length + "/3"
}

function rewardQuest(e) {

}

function readyQuest() {
    completedQuests.forEach(function(quest) {
        $(quest + "Reward").classList.remove("disabled")
        completedQuests = completedQuests.filter(q => q !== quest)
    });
}

function progressQuest() {
    // for each quest in quest array
    activeQuests.forEach(function(quest) {
        progressBar = $(quest +"Progress").firstChild
        progress = progressBar.style.width.split("%")
        progressValue = Number(progress[0]) +1 * 10
        if (progressValue <= 100) {
            progressBar.style.width = progressValue.toString() + "%"
        } else {
            activeQuests = activeQuests.filter(q => q !== quest)
            completedQuests.push(quest)
        }
    });
}

window.setInterval(function() {
    progressQuest()
    readyQuest()
}, 1000)

