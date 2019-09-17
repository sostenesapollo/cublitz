function print(msg) {
    console.log(msg)
}

drawLines = function(c) {
    for(let i = 0; i<=canvas.clientWidth; i+=(canvas.width/c)) {
        ctx.strokeStyle = "#d2d2ce"
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.height, i);
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke(); 
    }
}

returnWalls = () =>{            
    walls = []
    for(let i = 0; i < gameBoardCenterDistance; i++){
        walls.push({x:i,y:-1})
        walls.push({x:gameBoardCenterDistance,y:i})
        walls.push({x:-1,y:i})
        walls.push({x:i,y:gameBoardCenterDistance})
    }            
    return walls
}

getRandom = (min, max) =>{
    return Math.random() * (max - min) + min;
}

function generate (objName, qnt){
    let arr = []            
    for(let i=0; i<qnt; i++) {                                
        let obj = new window[objName]
        arr.push(obj)
    }
    return arr
}

updateBullets = (bullets) =>{
    for(let i=0; i<bullets.length; i++) {
        bullets[i].update()
    }
}

let verificator = false

updateCoins = (coins, sock) =>{
    if(coins.length < coinsQnt) {                    
        if(!verificator) {                    
            verificator = true
            window.setTimeout(()=>{                                                    
                coins.push(generate("Coin",1)[0])
                verificator = false
                sock.emit("coinComido",coins)
            },4000)
        }
    }             
    
}

function drawLife (x, sc, color) {
    ctx.fillStyle = color            
    ctx.fillRect(x+15,15,20+sc,20+sc)            
    ctx.fillRect(x+18,15,20+sc,20+sc)            
    ctx.fillRect(x+20,31,10+sc,10+sc)        
    ctx.fillRect(x+10,10,20+sc,20+sc)
    ctx.fillRect(x+25,15,20+sc,30+sc)            
    ctx.fillRect(x+38,10,20+sc,20+sc)            
    ctx.fillRect(x+32,20,20+sc,20+sc)
    ctx.fillRect(x+35,15,20+sc,20+sc)            
    ctx.fillRect(x+15,5,13+sc,13+sc)            
    ctx.fillRect(x+42,5,13+sc,13+sc)
    ctx.fillRect(x+30,12,8+sc,8+sc)
    ctx.fillRect(x+30,40,8+sc,8+sc)            
}

updateHearts = player =>{            
    drawLife(0,-4, "red")    
    drawLife(60,-4, "red")
    drawLife(120,-4, "red")
}

updateAmmoQnt = player =>{
    ctx.fillStyle = "black"
    ctx.font = "20px Verdana";
    ctx.fillText("Ammo:"+player.score,canvas.width - 100,35,80,100)            
}                               

printMessageOnContext = (msg) =>{
    ctx.fillStyle = "black"
    ctx.font = "20px Verdana";
    ctx.fillText(msg,60,400)
}

resetPlayerPos = () =>{ 
    player.x = player.xInicial
    player.y = player.yInicial
}


var stuffVerifier = true         
var text = ""

function stuffs(msg) {       
    text = msg                 
    window.setTimeout(()=>{
        stuffVerifier = true
    },3000)                        
}        

function stuff() {                      
    printMessageOnContext(text)            
}