
var numbers = [];
var deck = [];
var dealer = '';
var player = '';
var hiddenCard = "";
var hiddenCardRevealed = '';
var initializationStatus = false;
var deal = document.getElementById("deal");
var hit = document.getElementById("hit");
var stand = document.getElementById("stand");


function Card(suit, rank) {
	this.rank = rank;
	this.suit = suit;

}

function Player(playerType) {

	this.playerType = playerType;
	this.cardsStack = [];
	this.currentScore = 0;
	
}

Card.prototype.getCardImage = function() {

	var cardSuits = {
		'hearts' : 'H',
		'diamonds' : 'D',
		'clubs' : 'C',
		'spades' : 'S'
	}
	var cardImage = `<img  style='height:80%;margin:10px;' src='PNG/`
			+ this.rank + cardSuits[this.suit] + `.png'/>`;
	return cardImage;

}

Player.prototype.showHand = function() {

	var hand = "";
	for (var i = 0; i < this.cardsStack.length; i++) {
		hand += this.cardsStack[i].getCardImage();
	}
	return hand;
}

Player.prototype.hit = function(card) {

	if (card.rank == 'A') {
		
		this.currentScore = (this.currentScore + 11 > 21) ? (this.currentScore + 1) : (this.currentScore + 11);
	
	} else if (card.rank == 'J' || card.rank == 'K' || card.rank == 'Q') {
		
		this.currentScore = this.currentScore + 10;
		
	} else {
		this.currentScore = this.currentScore + parseInt(card.rank);
	}
	this.cardsStack.push(card);

	document.getElementById(this.playerType).innerHTML += card.getCardImage();

	document.getElementById(this.playerType + "Score").innerHTML = this.playerType
			+ "Score" + " " + this.currentScore;

};

Player.prototype.displayScore = function() {

	document.getElementById(this.playerType + "Score").innerHTML = this.playerType
			+ "Score" + " " + this.currentScore;

};

function resetBlackJackGame() {

	player.currentScore = 0;
	dealer.currentScore = 0;
	document.getElementById("playerScore").innerHTML = "0";
	document.getElementById("dealerScore").innerHTML = "0";

}

function hitCard() {

	player.hit(deck.pop());
	if (player.currentScore > 21) {
		document.getElementById("status").innerHTML = 'bust!! You lost!!';
		disablePlayStatus();
	}
}

function checkBlackJack() {

	return !!(player.currentScore == 21)

}

function enablePlayStatus() {

	hit.disabled = false;
	stand.disabled = false;
	deal.disabled = true;
}

function disablePlayStatus() {

	hit.disabled = true;
	stand.disabled = true;
	deal.disabled = false;
}

function displayHiddenImage(){
	
	var image_x = document.getElementById('hiddenImage');
	image_x.parentNode.removeChild(image_x);
	dealer.hit(hiddenCard);

}

function dealCards() {

	//if the game is already initialized, skip initializing
	if( !initializationStatus ){
		initalizeGame();
	}
	
	loadCardsDock();
	
	hiddenCard = deck.pop();
	
	dealer.hit(deck.pop());

	player.hit(deck.pop());
	
	player.hit(deck.pop());
	

	document.getElementById("player").innerHTML = player.showHand();

	document.getElementById("dealer").innerHTML = `<img id="hiddenImage" style='height:80%;margin:10px;' src='PNG/blue_back.png'/>`
			+ dealer.showHand();

	document.getElementById("status").innerHTML = 'Press Hit (Or) Stand';

	// checking if it is a perfect blackjack i.e., when the client total reaches
	// 21 with first two cards served
	if (!checkBlackJack()) {

		enablePlayStatus();

	} else {

		displayHiddenImage();

		if (dealer.currentScore == 21) {

			document.getElementById("status").innerHTML = "Both BlackJack. Tie";

		} else {
			document.getElementById("status").innerHTML = 'BlackJack !! You win!!';
		}
		disablePlayStatus();
	}

}

function standDeck(){

	if (hiddenCardRevealed){
		dealer.hit(deck.pop());
	}else{
		displayHiddenImage();		
		hiddenCardRevealed = true;
	}

	if (dealer.currentScore > 21) {
		document.getElementById("status").innerHTML = "Dealer-bust!! You win!!";
		disablePlayStatus();
	} else if (dealer.currentScore > player.currentScore) {
		document.getElementById("status").innerHTML = "Dealer-wins!! You lost!!";
		disablePlayStatus();
	} else if (dealer.currentScore == player.currentScore
			&& dealer.currentScore == 21) {
		document.getElementById("status").innerHTML = "BlackJack. Tie";
		disablePlayStatus();
	} else if (dealer.currentScore >= 17
			&& dealer.currentScore < player.currentScore) {
		document.getElementById("status").innerHTML = "You win!!";
		disablePlayStatus();
	} else if (dealer.currentScore >= 17
			&& dealer.currentScore == player.currentScore) {
		document.getElementById("status").innerHTML = "Same Scores!!Tie";
		disablePlayStatus();
	} else if (dealer.currentScore >= 17
			&& dealer.currentScore > player.currentScore) {
		document.getElementById("status").innerHTML = "You lost!!Dealer wins";
		disablePlayStatus();
	} else {
		setTimeout(standDeck, 1000);
	}


}

function initalizeGame() {

	dealer = new Player('dealer');
	
	player = new Player('player');
	
	player.displayScore();
	
	dealer.displayScore();

	deal.disabled = false;

	hiddenCardRevealed = false;
	
	document.getElementById("player").innerHTML = '';
	
	document.getElementById("dealer").innerHTML = '';

	isGameStarted = true;
}

function loadCardsDock() {
	
	deck = [];
	
	numbers = [];
	
	var cardsSuits = [ 'hearts', 'spades', 'diamonds', 'clubs' ];

	var cardsList = [ 'A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J',
			'Q', 'K' ];

	var numberOfDecks = 4;
	
	var totalCards = parseInt(numberOfDecks) * parseInt(52);

	while (numbers.length < totalCards) {

		var randomNumber = Math.floor(Math.random() * totalCards);
		if (numbers.indexOf(randomNumber) == -1) {
			var cardNumber = randomNumber % 52;
			numbers.push(randomNumber);
			var card = new Card(cardsSuits[Math.floor(cardNumber / 13)],
					cardsList[(cardNumber % 13)]);
			deck.push(card);
		}
	}
}
