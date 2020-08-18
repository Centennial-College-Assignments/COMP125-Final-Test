"use strict";
let Game = (function () {
    // variable declarations
    let canvas = document.getElementsByTagName('canvas')[0];
    let stage;
    let assets;
    let diceLabel1;
    let diceLabel2;
    let rollButton;
    let startOverButton;
    let dice1;
    let dice2;
    let assetManifest = [
        { id: "1", src: "./Assets/images/1.png" },
        { id: "2", src: "./Assets/images/2.png" },
        { id: "3", src: "./Assets/images/3.png" },
        { id: "4", src: "./Assets/images/4.png" },
        { id: "5", src: "./Assets/images/5.png" },
        { id: "6", src: "./Assets/images/6.png" },
        { id: "startRolling", src: "./Assets/images/startRolling.png" },
        { id: "background", src: "./Assets/images/background.png" },
        { id: "placeholder", src: "./Assets/images/placeholder.png" },
        { id: "rollButton", src: "./Assets/images/rollButton.png" },
        { id: "startOverButton", src: "./Assets/images/startOverButton.png" }
    ];
    function Preload() {
        assets = new createjs.LoadQueue(); // asset container 
        assets.installPlugin(createjs.Sound); // supports sound preloading
        assets.loadManifest(assetManifest);
        assets.on("complete", Start);
    }
    /*   This method initializes the CreateJS (EaselJS) Library
        It sets the framerate to 60 FPS and sets up the main Game Loop (Update) */
    function Start() {
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = Config.Game.FPS;
        createjs.Ticker.on('tick', Update);
        stage.enableMouseOver(20);
        Config.Game.ASSETS = assets; // make a reference to the assets in the global config
        Main();
    }
    /* This function is triggered every frame (16ms)
     * The stage is then erased and redrawn */
    function Update() {
        stage.update();
    }
    /* This is the main function of the Game (where all the fun happens)*/
    function Main() {
        rollButton = new UIObjects.Button("rollButton", Config.Game.CENTER_X, Config.Game.CENTER_Y + 100, true);
        stage.addChild(rollButton);
        startOverButton = new UIObjects.Button("startOverButton", Config.Game.CENTER_X, Config.Game.CENTER_Y + 200, true);
        stage.addChild(startOverButton);
        //startOverButton addeventlistener to remove the objects and add default gameobject to stage
        startOverButton.on("click", () => {
            stage.removeChild(dice1, diceLabel2, diceLabel1, diceLabel2);
            dice1 = new Core.GameObject("startRolling", Config.Game.CENTER_X - 200, Config.Game.CENTER_Y - 120, true);
            stage.addChild(dice1);
            dice2 = new Core.GameObject("startRolling", Config.Game.CENTER_X + 200, Config.Game.CENTER_Y - 120, true);
            stage.addChild(dice2);
        });
        //rollButton addeventlistener to remove the objects and add default gameobject to stage
        rollButton.on("click", () => {
            let randomNumber1 = getRandomNumberForDice();
            let randomNumber2 = getRandomNumberForDice();
            console.log(randomNumber1 + " " + randomNumber2);
            stage.removeChild(dice1, diceLabel2, diceLabel1, diceLabel2);
            dice1 = new Core.GameObject(randomNumber1.toString(), Config.Game.CENTER_X - 200, Config.Game.CENTER_Y - 120, true);
            stage.addChild(dice1);
            dice2 = new Core.GameObject(randomNumber2.toString(), Config.Game.CENTER_X + 200, Config.Game.CENTER_Y - 120, true);
            stage.addChild(dice2);
            diceLabel1 = new UIObjects.Label(randomNumber1.toString(), "40px", "Consolas", "#000000", Config.Game.CENTER_X - 200, Config.Game.CENTER_Y, true);
            stage.addChild(diceLabel1);
            diceLabel2 = new UIObjects.Label(randomNumber2.toString(), "40px", "Consolas", "#000000", Config.Game.CENTER_X + 200, Config.Game.CENTER_Y, true);
            stage.addChild(diceLabel2);
        });
        // function to generate random number 
        function getRandomNumberForDice() {
            return Math.floor(Math.random() * (6) + 1);
        }
        //default gameobject added to stage when app is started
        dice1 = new Core.GameObject("startRolling", Config.Game.CENTER_X - 200, Config.Game.CENTER_Y - 120, true);
        stage.addChild(dice1);
        dice2 = new Core.GameObject("startRolling", Config.Game.CENTER_X + 200, Config.Game.CENTER_Y - 120, true);
        stage.addChild(dice2);
    }
    window.addEventListener('load', Preload);
})();
//# sourceMappingURL=game.js.map