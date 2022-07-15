//Variables para barajas de jugadores
var playerHand;
var croupierHand;

//Monto a apostar 
var amountBet  = 0;

//Dinero para jugar
var money = 10;

//Función para crear posición de numeros random para el juego
function randomCard() {
    var randomIndex = Math.floor(deck.length * Math.random())
    return deck[randomIndex]
};

//Función para crear la baraja del croupier y del player
function startGame() {
    document.getElementById("money").innerHTML = money;
    playerHand = [randomCard(), randomCard()];
    croupierHand = [randomCard(), randomCard()];
};

//Mostrar cartas del jugador
function PrintCards() {
    playerHandImg1 = playerHand[0].img;
    playerHandImg2 = playerHand[1].img;
    croupierHandImg1 = croupierHand[0].img;
    croupierHandImg2 = croupierHand[1].img;
    document.getElementById("player-cards1").setAttribute("src", playerHandImg1);
    document.getElementById("player-cards2").setAttribute("src", playerHandImg2);
    document.getElementById("croupier-cards1").setAttribute("src", croupierHandImg1);
    document.getElementById("croupier-cards2").setAttribute("src", croupierHandImg2);
};


//Función para calcular la suma de los valores de las cartas
function getHandValue() {
    playerHandValue1 = playerHand[0].value;
    playerHandValue2 = playerHand[1].value;
    croupierHandValue1 = croupierHand[0].value;
    croupierHandValue2 = croupierHand[1].value;
    totalPlayer = parseInt(playerHandValue1 + playerHandValue2);

    if (totalPlayer <= 21) {
        document.getElementById("total-player").innerHTML = `Total: ${totalPlayer}`;

        //Simulación de operación asincrona para saber si iniciando tengo BlacK Jack
        setTimeout(function () {
            if (totalPlayer === 21) alert('BLACK JACK')
        }, 500)

        totalCroupier = parseInt(croupierHandValue1 + croupierHandValue2);
        document.getElementById("total-croupier").innerHTML = `${totalCroupier}`;
    }

    //Simulación de operación asincrona para saber si iniciando obtengo más de 21 debido a que As = 11 
    else {
        money -= 1;
        document.getElementById("money").innerHTML = money;
        amountBet = 0;
        setTimeout(function () {
            alert(`Perdiste. Tú puntaje ${totalPlayer} es mayor a 21`)
        }, 1000)
    }
};

//Función para agregar cartas a la baraja
function hit() {
    let keepgoing = true;
    let newCard;
    let divParent;

    if (totalPlayer <= 21) {
        while (keepgoing) {
            playerHand.push(randomCard(deck));
            newCard = document.createElement("img");
            divParent = document.getElementById("player-hand");
            newCard.className = "player-new-cards";
            newCard.src = playerHand[playerHand.length - 1].img;
            divParent.appendChild(newCard);
            keepgoing = false;
        }

        totalPlayer += parseInt(playerHand[playerHand.length - 1].value);
        document.getElementById("total-player").innerHTML = `Total: ${totalPlayer}`;
        
        if(totalPlayer > 21) {
            setTimeout(function () {
                alert(`Perdiste. Tú puntaje ${totalPlayer} es mayor a 21 y perdiste $1`)
            }, 1000)
        }
    }
};

//Función para plantarse
function stand() {
    let keepgoing = true;
    let newCard;
    let divParent;

    document.getElementById("croupier-cards2").classList.remove("show-card");
    document.getElementById("total-croupier").classList.remove("show-value");

    while (totalCroupier < 17) {
        croupierHand.push(randomCard(deck));
        newCard = document.createElement("img");
        divParent = document.getElementById("croupier-hand");
        newCard.className = "croupier-new-cards";
        newCard.src = croupierHand[croupierHand.length - 1].img;
        divParent.appendChild(newCard);
        totalCroupier += parseInt(croupierHand[croupierHand.length - 1].value);
        document.getElementById("total-croupier").innerHTML = totalCroupier;
    };

    setTimeout(function () {
        if(totalPlayer && totalCroupier <= 21) {
            if(totalPlayer == totalCroupier) {
                money += amountBet;
                document.getElementById("money").innerHTML = money;
                alert('Upsss... EMPATE');
            }

            else if(totalPlayer > totalCroupier) {
                money += amountBet * 2;
                document.getElementById("money").innerHTML = money;
                alert('El jugador 1 GANO');
            }

            else {
                alert('El croupier ha GANADO')
            }
        }
        else if(totalCroupier > 21) {
            money += amountBet * 2;
            document.getElementById("money").innerHTML = money;
            alert('El jugador 1 GANO');
        }
    },2000)
};
//Función para llevar el monto apostado y sumarlo o restarlo al dinero del jugador
function bet() {
    if(money > 0) {
        amountBet += 1;
        money -= 1;
    document.getElementById("money").innerHTML = money;
    }

    else {
        alert('Te quedaste sin dinero')
    }
};

//Función donde se programa el botón para doblar
function double() {
    amountBet = amountBet * 2;
    money -= 1;
    document.getElementById("money").innerHTML = money;
};

function removeCards() {
    remove = document.getElementsByClassName("class2");
    remove.forEach(Element => {
        document.getElementById("croupier-hand").removeChild("class2")
    });
    

};

function removeCards() {
    playerCardsToRemove = document.getElementsByClassName("player-new-cards");
    divHandPlayer = document.getElementById("player-hand");
    for(var i = 0; i < playerCardsToRemove.length; i++) {
        if(i < playerCardsToRemove.length){
            divHandPlayer.removeChild(playerCardsToRemove[i])
        }
        i = -1
    }

    croupierCardsToRemove = document.getElementsByClassName("croupier-new-cards");
    divCroupierHand = document.getElementById("croupier-hand");
    for(var i = 0; i < croupierCardsToRemove.length; i++) {
        if(i < croupierCardsToRemove.length){
            divCroupierHand.removeChild(croupierCardsToRemove[i])
        }
        i = -1
    }

};

function refresh() {
    playerHand = [];
    croupierHand = [];
    totalPlayer = 0;
    totalCroupier = 0;
    amountBet = 0;
    removeCards();
    startGame();
    PrintCards();
    getHandValue();
};


startGame();
PrintCards();
getHandValue();

