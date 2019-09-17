const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

var cells = 19;
var gameBoardCenterDistance = 40;

var players = []
let player = new Player()  

var playerStartPosition = [
    {x:1,y:1},
    {x:gameBoardCenterDistance - 2,y:1}
]

async function Start_Game(socket){

    await Join_Room(socket);
    // let id = await Receive_From_Server("connected",socket)    

    // let camera = new Camera()      
    // player.id = id   
    // let bullets = []

    // let walls = returnWalls()        

    // camera.draw(walls,"#545451")
    // camera.draw(player,player.color)      
    // camera.draw(coins,"#8c8c02e0")        

    // window.setInterval(()=>{        
                
    //     ctx.clearRect(0,0,canvas.width,canvas.height)                     

    //     camera.draw(coins,"#8c8c02e0")
    //     camera.draw(player,player.color)    
    //     camera.draw(walls,"#545451")        
    //     // drawLines(cells)                             

    //     var isPoint = player.verifyIsEarningCoin(coins)
    //     player.update()
    //     camera.follow(player)
    //     player.verifyColisions()                

    //     // Update All bullets and set color
    //     camera.draw(bullets,"red")                
    //     updateBullets(bullets)

    //     // Auto Add a new coin when the quantity decreases
    //     // updateCoins(coins, ios)  

    //     updateHearts(player) 
    //     updateAmmoQnt(player)        
        
    //     // Socket io send info
    //     if(isPoint) {            
    //         ios.emit("coinComido",coins)
    //     }
                
    //     if(stuffVerifier == false) {
    //         stuff()
    //     }

    //     if(breakLoop) {
    //         return;
    //     }

    // },70)

    // window.addEventListener("keydown",e=>{          
    //     player.onKeyDown(e.key)        
    //     player.onKeyDownShot(e.key, bullets)

    //     ios.emit('someonePressedAKey',player)
    //     // console.log(player)
    // })

}

async function Join_Room(socket) {
    socket.emit("Join_Room")
}