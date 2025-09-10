$(function () {
  // initialize canvas and context when able to
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  window.addEventListener("load", loadJson);

  function setup() {
    if (firstTimeSetup) {
      halleImage = document.getElementById("player");
      projectileImage = document.getElementById("projectile");
      cannonImage = document.getElementById("cannon");
      $(document).on("keydown", handleKeyDown);
      $(document).on("keyup", handleKeyUp);
      firstTimeSetup = false;
      //start game
      setInterval(main, 1000 / frameRate);
    }

    // Create walls - do not delete or modify this code
    createPlatform(-50, -50, canvas.width + 100, 50); // top wall
    createPlatform(-50, canvas.height - 10, canvas.width + 100, 200, "SaddleBrown"); // bottom wall
    createPlatform(-50, -50, 50, canvas.height + 500); // left wall
    createPlatform(canvas.width, -50, 50, canvas.height + 100); // right wall

    //////////////////////////////////
    // ONLY CHANGE BELOW THIS POINT //
    //////////////////////////////////

    // TODO 1 - Enable the Grid
    toggleGrid();

    // TODO 2 - Create Platforms (createPlatform(x,y,width,height,'color',minX,maxX,speed,))
    createPlatform(200,600,300,50,'white')
    createPlatform(400,475,100,50,'yellow')
    createPlatform(150,375,150,50,'grey')
    createPlatform(400,300,100,50,'white')



    // TODO 3 - Create Collectables createCollectable('type',x,y,gravity,bounce,minX,maxX,speed);
    createCollectable('boltsnuts',200,100);



    
    // TODO 4 - Create Cannons createCannon('side',position along wall,delay,projectile width,projectile height);
    //createCannon('top',1000,5000);

    
    
    //////////////////////////////////
    // ONLY CHANGE ABOVE THIS POINT //
    //////////////////////////////////
  }

  registerSetup(setup);
});
