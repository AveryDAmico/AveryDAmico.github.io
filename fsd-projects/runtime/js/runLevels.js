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
      var obstacleImage = draw.bitmap("img/sawblade.png");
      var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
      sawBladeHitZone.x = x;
      sawBladeHitZone.y = groundY- y;
      game.addGameItem(sawBladeHitZone);
      sawBladeHitZone.addChild(obstacleImage);
      obstacleImage.regX = obstacleImage.image.width / 2;
      obstacleImage.regY = obstacleImage.image.height / 2;
      obstacleImage.x=0;
      obstacleImage.y=0;
      sawBladeHitZone.rotationalVelocity=-1;
    }
    // createSawblade(500,10);
    // createSawblade(600,20);
    // createSawblade(700,100);
    
    function createEnemy(x,y,speed) {
      var enemyImage = draw.bitmap("img/space-invaders-red.jpg");
      enemyImage.regX = enemyImage.image.width / 2;
      enemyImage.regY = enemyImage.image.height / 2;
      enemyImage.x=0;
      enemyImage.y=0;
      enemyImage.scaleX=enemyImage.scaleY=50/enemyImage.image.height;
      var enemy = game.createGameItem("enemy", 25);
      enemy.addChild(enemyImage);
      enemy.x = x;
      enemy.y = groundY - y;
      enemy.velocityX = -speed;
      game.addGameItem(enemy);
      enemy.onPlayerCollision = function () {
        game.changeIntegrity(-10);
      };
      enemy.onProjectileCollision = function () {
        game.increaseScore(100*level.number);
        enemy.fadeOut();
      };
    }
    // createEnemy(500,40,1);
    // createEnemy(400,20,1);
    // createEnemy(600,70,1);

    // all code from TODO 11 and 12
    function createReward(x,y,speed){
      var rewardImage=draw.bitmap("img/malwarebytes-logo.png")
      rewardImage.regX = rewardImage.image.width / 2;
      rewardImage.regY = rewardImage.image.height / 2;
      rewardImage.x=0;
      rewardImage.y=0;
      var reward=game.createGameItem("enemy",25)
      rewardImage.scaleX=rewardImage.scaleY=50/rewardImage.image.height;
      reward.addChild(rewardImage);
      reward.x = x;
      reward.y = groundY - y;
      reward.velocityX = -speed;
      game.addGameItem(reward);
      reward.onPlayerCollision = function () {
        game.changeIntegrity(50)
        reward.shrink();
      };
      reward.onProjectileCollision = function () {
        game.changeIntegrity(50)
        reward.fadeOut();
      };
    };
    // createReward(700,40,1);
    function createMarker(x,y,speed){
      var markerImage=draw.bitmap("img/task-manager.webp")
      markerImage.regX = markerImage.image.width / 2;
      markerImage.regY = markerImage.image.height / 2;
      markerImage.x=0;
      markerImage.y=0;
      var marker=game.createGameItem("enemy",50)
      markerImage.scaleX=markerImage.scaleY=100/markerImage.image.height;
      marker.addChild(markerImage);
      marker.x = x;
      marker.y = groundY - y;
      marker.velocityX = -speed;
      game.addGameItem(marker);
      marker.onPlayerCollision = function () {
        startLevel()
      };
      marker.onProjectileCollision = function () {
        startLevel()
      };
    };
    // createMarker(300,50,1);
    function startLevel() {
      // TODO 13 goes below here
      var level=levelData[currentLevel]
      var levelObjects=level.gameItems
      for (i=0;i<levelObjects.length;i++){
        if (levelObjects[i].type==="sawblade"){
          createSawblade(levelObjects[i].x,levelObjects[i].y,level.speed)
        }
        if (levelObjects[i].type==="enemy"){
          createEnemy(levelObjects[i].x,levelObjects[i].y,level.speed)
        }
        if (levelObjects[i].type==="reward"){
          createReward(levelObjects[i].x,levelObjects[i].y,level.speed)
        }
        if (levelObjects[i].type==="marker"){
          createMarker(levelObjects[i].x,levelObjects[i].y,level.speed)
        }
      }

      //////////////////////////////////////////////
      // DO NOT EDIT CODE BELOW HERE
      //////////////////////////////////////////////
      if (++currentLevel === levelData.length) {
        startLevel = () => {
          console.log("Congratulations!");
        };
      };
    };
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
