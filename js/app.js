//Record the score.
var score = 0;

//Charcater, superclass of Enemy and Player.
var Character = function() {
    this.x;
    this.y;
    this.sprite;
};

//Draw method on the screen
Character.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Enemies our player must avoid, subclass of Charcater
var Enemy = function() {
    Character.call(this);
    this.x = -101;
    this.y = Math.ceil(Math.random()*3)*83 - 25;
    this.speed = Math.ceil(Math.random()*400 + 100);
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
// Inherit method from Character
Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.update = function(dt) {
    this.x = this.x + dt*this.speed;
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
// Enemy.prototype.render = function() {
//     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
// };

//Check the collision and update the score.
Enemy.prototype.collision = function(player) {
    var distance = Math.abs(this.x  - player.x);
    if (this.y === player.y && distance < 60) {
        player.reset();
        score--;
    };
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
    Character.call(this);
    this.x = 202;
    this.y = 390;
    this.sprite = 'images/char-boy.png';

};

// Inherit method from Character
Player.prototype = Object.create(Character.prototype);
//Update the player's position and the score
Player.prototype.update = function(xd=0,yd=0) {
    var xc = this.x + xd;
    var yc = this.y + yd;
    if (xc >= 0 && xc <= 404) {
        this.x = xc;
    };
    if (yc > 0 && yc <= 415) {
        this.y = yc;
    };
    if (yc === -25) {
        this.reset();
        score++;
    };

};

//Make the character back to the original position.
Player.prototype.reset = function(){
    this.x = 202;
    this.y = 390;
};

// Player.prototype.render = function() {
//     ctx.drawImage(Resources.get(this.sprite),this.x, this.y);
// };

//handle the key presses event.
Player.prototype.handleInput = function(direction) {
    switch(direction)
    {
    case 'left':
        this.update(-101,0);
        break;
    case 'up':
        this.update(0,-83);
        break;
    case 'right':
        this.update(101,0);
        break;
    case 'down':
        this.update(0,83);
        break;
    }
};

//When you click on the button, this function will change the
//character and reset the game(include the score).
Player.prototype.change = function() {
    score = 0;
    this.reset();
    if (this.sprite === 'images/char-boy.png') {
        this.sprite = 'images/char-cat-girl.png';
    }
    else if (this.sprite ==='images/char-cat-girl.png') {
        this.sprite = 'images/char-horn-girl.png';
    }
    else {
        this.sprite = 'images/char-boy.png';
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
//var enemy = new Enemy();
var allEnemies = [new Enemy(),new Enemy(),new Enemy()];
var player = new Player();

//Update the allenemies array. Add new enemy on the canvas and
//delete old enemies when their position are away from the canvas.
allEnemies.setNewEnemy = function() {
    allEnemies.forEach(function(enemy) {
        if (enemy.x > 505) {
            var index = allEnemies.indexOf(enemy);
            allEnemies.splice(index,1);
        };
        if (allEnemies.length<3) {
        allEnemies.push(new Enemy());
        };
    });
};



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

