function shuffleArray(array) {
    array.sort(()=> Math.random() - 0.5);
}

playerHand = [];
aiHand = [];
playerPairs = 0;
aiPairs = 0;

let deck = ["Ace","2","3","4","5","6","7","8","9","10","Queen","Jack","King",
"Ace","2","3","4","5","6","7","8","9","10","Queen","Jack","King",
"Ace","2","3","4","5","6","7","8","9","10","Queen","Jack","King"];

shuffleArray(deck);

for (let i = 0; i < 7; i++) {
    let cards = deck.pop();
    playerHand.push(cards);
}

for (let i = 0; i < 7; i++) {
    let cards = deck.pop();
    aiHand.push(cards);
}

console.log("Welcome to Go Fish!");

console.log("\n")

console.log("Initial Hand:", playerHand);

console.log("\n")

function aiPairChecker () {
    
    const counts2 = {};
    const counts4 = {};

    aiHand.forEach(function (x) { counts2[x] = (counts2[x] || 0) + 1; });

    let pairCounter2 = (Object.values(counts2));

    pairCounter2.forEach(function (x) { counts4[x] = (counts4[x] || 0) + 1; });


    let pC2arr = (Object.keys(counts4));
    let pC2key = pC2arr.includes('2') || pC2arr.includes('3');
    let pC2vals = (Object.values(counts4));

    if (pC2key == true) {
        if (pC2vals.includes(2) == true) {
            aiPairs += 2;
            let removePair = Object.values(counts2);
            const searchTerm = 2;
            const firstIndex = removePair.indexOf(searchTerm);
            const secondIndex = removePair.indexOf(searchTerm, firstIndex + 1);
            let cardValO1 = Object.keys(counts2);
            let cardVal1 = cardValO1[firstIndex];
            let cardValO2 = Object.keys(counts2);
            let cardVal2 = cardValO2[secondIndex]
            aiHand = aiHand.filter(e => e !== cardVal1);
            aiHand = aiHand.filter(e => e !== cardVal2);
            console.log("\n")
            console.log("CPU got 2 new pairs!")
        } else if (pC2vals.includes(1) == true) {
            aiPairs += 1
            let removePair = Object.values(counts2);
            if (removePair.includes(3) == true) {
                const searchTerm = 3;
                const firstIndex = removePair.indexOf(searchTerm);
                let cardValO1 = Object.keys(counts2);
                let cardVal1 = cardValO1[firstIndex];
                let filter1 = aiHand.indexOf(cardVal1);
                let filter2 = aiHand.indexOf(cardVal1, filter1+1);
                aiHand.splice(filter1, 1);
                aiHand.splice(filter2-1, 1);
                console.log("\n")
                console.log("CPU got 1 new pair!")
            } else {
                const searchTerm = 2;
                const firstIndex = removePair.indexOf(searchTerm);
                let cardValO = Object.keys(counts2);
                let cardVal = cardValO[firstIndex];
                aiHand = aiHand.filter(e => e !== cardVal);
                console.log("\n")
                console.log("CPU got 1 new pair!")
            }
        }
        else {
            console.log("\n")
            console.log("No pairs for CPU!");
            }
        }
}

function playerPairChecker() {
    
    const counts1 = {};
    const counts3 = {};

    playerHand.forEach(function (x) { counts1[x] = (counts1[x] || 0) + 1; }); 

    let pairCounter1 = (Object.values(counts1));

    pairCounter1.forEach(function (x) { counts3[x] = (counts3[x] || 0) + 1; });

    let pC1arr = (Object.keys(counts3));
    let pC1key = pC1arr.includes('2') || pC1arr.includes('3');
    let pC1vals = (Object.values(counts3));

    if (pC1key == true) {
        if (pC1vals.includes(2) == true) {
            console.log("Nice! You got 2 new pairs")
            playerPairs += 2;
            let removePair = Object.values(counts1);
            const searchTerm = 2;
            const firstIndex = removePair.indexOf(searchTerm);
            const secondIndex = removePair.indexOf(searchTerm, firstIndex + 1);
            let cardValO1 = Object.keys(counts1);
            let cardVal1 = cardValO1[firstIndex];
            let cardValO2 = Object.keys(counts1);
            let cardVal2 = cardValO2[secondIndex]
            playerHand = playerHand.filter(e => e !== cardVal1);
            playerHand = playerHand.filter(e => e !== cardVal2);
            console.log("\n")
            console.log("New Hand:", playerHand);
        } else if (pC1vals.includes(1) == true) {
            console.log("Nice! You got 1 new pair");
            playerPairs += 1;
            let removePair = Object.values(counts1);
            if (removePair.includes(3) == true) {
                const searchTerm = 3;
                const firstIndex = removePair.indexOf(searchTerm);
                let cardValO1 = Object.keys(counts1);
                let cardVal1 = cardValO1[firstIndex];
                let filter1 = playerHand.indexOf(cardVal1);
                let filter2 = playerHand.indexOf(cardVal1, filter1+1);
                playerHand.splice(filter1, 1);
                playerHand.splice(filter2-1, 1);
                console.log("New Hand:", playerHand);
            } else {
                const searchTerm = 2;
                const firstIndex = removePair.indexOf(searchTerm);
                let cardValO = Object.keys(counts1);
                let cardVal = cardValO[firstIndex];
                playerHand = playerHand.filter(e => e !== cardVal);
                console.log("New Hand:", playerHand);
            }
            
        }
    } else {
        console.log("\n")
        console.log("No pairs!")
    }
}


function nextRound() {
    
    console.log("\n");
    let selectCard = prompt("What card would you like?");
        if (selectCard in aiHand) {
            let removeCard = aiHand.indexOf(selectCard);
            aiHand.splice(selectCard, 1);
            playerHand.push(selectCard);
            console.log("Good Job! You recieved a", selectCard, "from CPU");
            console.log("\n")
            console.log("New Hand:", playerHand);
        } else {
            console.log("CPU tells you to Go Fish!");
            let newCard = deck.pop();
            playerHand.push(newCard);
            console.log("You recieved a", newCard, "from your fishing!");
            console.log("\n")
            console.log("New Hand:", playerHand);
            console.log("\n")
        }
    let randomCard = deck[Math.floor(Math.random() * deck.length)];
    let selectCard2 = prompt("CPU asks your for", randomCard ,". Do you have this card? (Y/N)")
    if (selectCard2 == "Y") {
        console.log("\n");
        console.log("Darn! CPU took", randomCard, "from you");
        let removeCard = playerHand.indexOf(randomCard);
        playerHand.splice(removeCard, 1);
        aiHand.push(randomCard);
        console.log("\n");
        console.log("New Hand:", playerHand);
        console.log("\n")
    } else {
        if (selectCard2 == "N") {
            console.log("\n")
            console.log("You told CPU to Go Fish!")
            let newCard = deck.pop()
            aiHand.push(newCard)
        }
    }
}


function checkScore() {
    console.log("\n");
    console.log("Current score:")
    console.log("\n")
    console.log("Player pairs:", playerPairs)
    console.log("CPU pairs", aiPairs)
    }

function done() {
    console.log("\n");
    console.log("Thanks for playing!:")
    console.log("\n")
    console.log("Final scores:")
    console.log("Player pairs:", playerPairs)
    console.log("CPU pairs", aiPairs)
}