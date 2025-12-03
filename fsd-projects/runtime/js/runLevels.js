var runLevels = function (window) {
  window.opspark = window.opspark || {};

  var draw = window.opspark.draw;
  var createjs = window.createjs;
  let currentLevel = 0;

  window.opspark.runLevelInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game
    var levelData = window.opspark.levelData;

    // set this to true or false depending on if you want to see hitzones
    game.setDebugMode(true);

    // TODOs 5 through 11 go here
    // BEGIN EDITING YOUR CODE HERE
    
    function createSawblade(x,y){
      var hitZoneSize = 25;
      var damageFromObstacle = 10;
      var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
      sawBladeHitZone.x = x;
      sawBladeHitZone.y = y;
      game.addGameItem(sawBladeHitZone);
      var obstacleImage = draw.bitmap("img/sawblade.png");
      sawBladeHitZone.addChild(obstacleImage);
      obstacleImage.regX = obstacleImage.image.width / 2;
      obstacleImage.regY = obstacleImage.image.height / 2;
      obstacleImage.x=0
      obstacleImage.y=0
      sawBladeHitZone.rotationalVelocity=-1
    }
    createSawblade(500,250);
    createSawblade(600,300);
    createSawblade(700,225);
    
    function createEnemy(x,y) {
      var enemy = game.createGameItem("enemy", 25);
      var enemyImage = draw.bitmap("img/space-invaders-red.jpg");
      enemyImage.regX = enemyImage.image.width / 2;
      enemyImage.regY = enemyImage.image.height / 2;
      enemyImage.x=0
      enemyImage.y=0
      enemyImage.scaleX=enemyImage.scaleY=50/enemyImage.image.height;
      enemy.addChild(enemyImage);
      enemy.x = x;
      enemy.y = groundY - y;
      enemy.velocityX = -1
      game.addGameItem(enemy);
      enemy.onPlayerCollision = function () {};
      enemy.onProjectileCollision = function () {
        game.increaseScore(100);
        enemy.shrink();
      };
    }
    createEnemy(500,40)
    createEnemy(400,20)
    createEnemy(600,70)

    // all code from TODO 11 and 12
    function createReward(x,y){
      var reward=game.createGameItem("enemy",25)
      var rewardImage=draw.bitmap("img/malwarebytes-logo.png")
      rewardImage.regX = rewardImage.image.width / 2;
      rewardImage.regY = rewardImage.image.height / 2;
      rewardImage.x=0
      rewardImage.y=0
      rewardImage.scaleX=rewardImage.scaleY=50/rewardImage.image.height;
      reward.addChild(rewardImage);
      reward.x = x;
      reward.y = groundY - y;
      reward.velocityX = -1
      game.addGameItem(reward);
      reward.onPlayerCollision = function () {
        game.increaseScore(100)
        reward.shrink();
      };
      reward.onProjectileCollision = function () {
        game.increaseScore(100);
        reward.fadeOut();
      };
    }
    createReward(700,30)

    function startLevel() {
      // TODO 13 goes below here



      //////////////////////////////////////////////
      // DO NOT EDIT CODE BELOW HERE
      //////////////////////////////////////////////
      if (++currentLevel === levelData.length) {
        startLevel = () => {
          console.log("Congratulations!");
        };
      }
    }
    startLevel();
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = runLevels;
}
