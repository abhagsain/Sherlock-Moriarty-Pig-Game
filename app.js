/*
GAME RULES:

- The game has 2 players Sherlock and Moriarty (My favorite characters), playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores  = [0,0]; // Score array of SHERLOCK and MORIARTY initially 0
var activePlayer = 0; // 0 is the player 1 and 1 is the player 2
var playerScore = 0; // Initial score of the player
var diceImage = document.querySelector('.dice'); // Getting reference to the dice image 
var rollButton = document.querySelector('.btn-roll'); // Reference to the roll button 
var holdButton = document.querySelector('.btn-hold'); // Reference to the hold button 
var newGameButton = document.querySelector('.btn-new'); // Reference to the New Game button 
function resetEverything(){
    resetCurrentScore();
    document.querySelector('#score-' + 0).textContent = 0;
    document.querySelector('#score-' + 1).textContent = 0;
   
    playerScore = 0;
    activePlayer === 0 ? activePlayer = 0 : activePlayer = 1;
    scores = [0,0];
    diceImage.style.display = 'none';
}
resetEverything();

function resetCurrentScore(){
    document.querySelector('#current-' + 0).textContent = 0;
    document.querySelector('#current-' + 1).textContent = 0;
}

function changeCurrentPlayerLook(){
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

// Onclick method
rollButton.addEventListener('click',function(){
    /*

    This method computes a random number
    Changes image on the page corresponding to the random value.
    Updates the score of the player if the dice isn't === 1. Resets the score otherwise.

    */
    var randomNumber = Math.floor(Math.random() * 6 + 1);
    diceImage.style.display = 'block'; // Making the dice image visible
    diceImage.src = 'dice-' + randomNumber + '.png';
    if(randomNumber !==1){
        // If dice isn't equal to one then add the score of the player and show it as score
        playerScore += randomNumber;
        document.querySelector('#current-' + activePlayer).textContent = playerScore;
    }else{
        playerScore = 0;
        document.querySelector('#current-' + activePlayer).textContent = 0; 
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        diceImage.style.display = 'none';
        changeCurrentPlayerLook();
    }

});

function showButtons(){
    /*
        This method is being called when the app starts initially
    */
    rollButton.style.display = 'block';
    hideButtons.style.display = 'block';
}

function hideButtons(){
    /*
        This method is being called when one of the player wins the game
    */
    rollButton.style.display = 'none';
    holdButton.style.display = 'none';

}

/*
    ON NEW GAME BUTTON CLICK

*/
newGameButton.addEventListener('click',function(){
    location.reload();
});

//      Hold Button 
holdButton.addEventListener('click',function(){
    // If the player clicks the hold button the current score of the player should be reflected to the main scoreboard  
    scores[activePlayer] += playerScore;
    if(scores[activePlayer]>=100){
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        resetCurrentScore();
        var name = activePlayer === 0 ? 'Sherlock ' : 'Moriarty'
        document.querySelector('#name-' + activePlayer).textContent = name + ' has won!';
        hideButtons();
        diceImage.style.display = 'none';
    }else{
        resetCurrentScore();
        changeCurrentPlayerLook();
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]; 
        playerScore = 0;
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    }
        
});