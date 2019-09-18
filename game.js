const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

var cells = 19;
var gameBoardCenterDistance = 40;

var players = []
let player = new Player()  

async function Start_Game(socket){    

                    await Join_Room(socket);
    let Game_Data = await Join_Room_Response(socket);    

    // console.log(Game_Data)
        

    let camera = new Camera()          
    let players = {}
    // let bullets = []

    let walls = returnWalls()        
    
        
    for(p in Game_Data['room']) {        
        let player = new Player                
        player.x = Game_Data['room'][p]['x']
        player.y = Game_Data['room'][p]['y']
        player.c = Game_Data['room'][p]['color']        
        if(p == socket.id) {
            player.id = p                        
        }        
        players[p] = player        
    }    
    
    camera.draw(walls,false,"#545451")    
    camera.draw(players, true)      
    // camera.draw(coins,"#8c8c02e0")
    let ativado = false
    window.setInterval(()=>{                        
        ctx.clearRect(0,0,canvas.width,canvas.height)   
        ctx.fillText(socket.id,10,20)                  
    //     camera.draw(coins,"#8c8c02e0")
        camera.draw(players, true)

        // console.log(players[socket.id])

        camera.draw(walls, false, "#545451")        
        drawLines(cells)                             

    //     var isPoint = player.verifyIsEarningCoin(coins)        
        camera.follow(players[socket.id])
        // console.log(players)
        if(!ativado) {
            socket.on("Some_Player_Pressed_A_Key",data=>{                
                for(p in data['room']) {
                    if(p!=socket.id) {                           
                        
                        let xSpeedFromServer = data['room'][data.id]['xSpeed']                        
                        let ySpeedFromServer = data['room'][data.id]['ySpeed']         
                        let xFromServer = data['room'][data.id]['x']         
                        let yFromServer = data['room'][data.id]['y']         
                        
                        players[data.id].ySpeed = ySpeedFromServer
                        players[data.id].xSpeed =  xSpeedFromServer
                        players[data.id].x = xFromServer
                        players[data.id].y = yFromServer
                        
                    }                    
                    console.log('here')
                }                                     
            })                            
            console.log("Ativado.")
            ativado = true
        }
        
        player.update(players)

        player.verifyColisions(players)                

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

    },70)

    window.addEventListener("keydown",e=>{                
        players[socket.id].onKeyDown(e.key)                
        // players[0].onKeyDownShot(e.key, bullets)
        socket.emit('Some_Player_Pressed_A_Key',{id:socket.id, player: players[socket.id]})
        // console.log(player)
    })

}

async function Join_Room(socket) {socket.emit("Join_Room")}
async function Join_Room_Response(socket) { 
    return new Promise(async (resolve, reject)=>{
        ctx.fillStyle = "black"
        ctx.font = "20px Tahoma";
        ctx.fillText("Aguardando os outros jogadores...",canvas.height/4-30,canvas.height/4)

        ctx.fillStyle = "red"    
        showed = false
        socket.on("Joined_Room", async Game_Data=>{                        
            if(!showed) {
                ctx.fillText(Game_Data.id,canvas.height/4,canvas.height/4+100)
                showed = true
            }
                    
            await drawRects(Object.size(Game_Data.room))            
            if(Game_Data.room) {
                resolve(Game_Data)
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
            resolve(qnt)
        }
    })
}

async function animateSquares (qnt) {
    return new Promise((resolve, reject)=>{                
        window.setTimeout(()=>{
            ctx.clearRect(10,10,canvas.width,canvas.height)
            resolve(true)        
        },500)        
    })
}