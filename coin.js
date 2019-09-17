function Coin () {    

    this.init = () =>{
        this.x = parseInt(getRandom(0,gameBoardCenterDistance))
        this.y = parseInt(getRandom(0,gameBoardCenterDistance))
    }

    this.x;
    this.y;

    this.init()

    this.autoUpdateQnt = coins =>{
        // console.log(coins)
    }

}