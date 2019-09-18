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
    animateSquares()
    await Join_Room(socket);
    await Join_Room_Response(socket);    
    console.log("begin")
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

async function Join_Room(socket) {socket.emit("Join_Room")}
async function Join_Room_Response(socket) { 
    return new Promise(async (resolve, reject)=>{
        ctx.fillStyle = "black"
        ctx.font = "20px Tahoma";
        ctx.fillText("Aguardando os outros jogadores...",canvas.height/4-30,canvas.height/4)

        ctx.fillStyle = "red"    
        showed = false
        socket.on("Joined_Room",Game_Data=>{                        
            if(!showed) {
                ctx.fillText(Game_Data.id,canvas.height/4,canvas.height/4+100)
                showed = true
            }
                    
            let qnt = drawRects(Object.size(Game_Data.room))
            
            console.log("A player joined to this room.")
            console.log(Object.size(Game_Data.room)+" ° player.")
            console.log(Game_Data)
            if(qnt == 4) {
                resolve(true)
            }            
        }) 
    })   
} 

async function drawRects (qnt) {
    return new Promise(async (resolve, reject)=>{
        if(qnt == 1) {
            ctx.fillRect(canvas.width/4,canvas.width/1.75,50,50)
        }
        if(qnt == 2) {
            ctx.fillRect(canvas.width/4,canvas.width/1.75,50,50)
            ctx.fillRect(canvas.width/2,canvas.width/1.75,50,50)
        }
        if(qnt == 3) {
            ctx.fillRect(canvas.width/4,canvas.width/1.75,50,50)
            ctx.fillRect(canvas.width/2,canvas.width/1.75,50,50)
            ctx.fillRect(canvas.width/4,canvas.width/1.25,50,50)
        }
        if(qnt == 4) {
            ctx.fillRect(canvas.width/4,canvas.width/1.75,50,50)
            ctx.fillRect(canvas.width/2,canvas.width/1.75,50,50)
            ctx.fillRect(canvas.width/4,canvas.width/1.25,50,50)
            ctx.fillRect(canvas.width/2,canvas.width/1.25,50,50)
            await animateSquares()
            ctx.fillStyle = "beige"            
            console.log("Animated")
        }
    })
}

async function animateSquares (qnt) {
    return new Promise((resolve, reject)=>{                
        window.setTimeout(()=>{
            ctx.clearRect(10,10,canvas.width,canvas.height)
            resolve(true)        
        },1000)        
    })
}