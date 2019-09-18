let express = require("express")
let app = express()

let http = require("http").createServer(app)
let io = require("socket.io")(http)

var sockets = [];

app.use("/",express.static(__dirname))

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})

var players_distribuition_in_room = [{x:1,y:1,color:"red"},{x:500 -2 ,y:1,color:"green"},{x:1,y:500 -2,color:"orange"},{x:500 -2,y:500 -2,color:"pink"}]
var rooms = {1:{}}
var players = {}

io.on("connection", socket=>{  
        
    Join_Room(socket)
    UnJoinRoom(socket)
    Some_Player_Pressed_A_Key(socket)

})

function Some_Player_Pressed_A_Key(socket) {
    socket.on("Some_Player_Pressed_A_Key",data=>{        
        if(players[data.id]){            
            console.log(data)
            console.log("---")
            rooms[players[data.id]["room"]][data.id]['x'] = data.player.x;
            rooms[players[data.id]["room"]][data.id]['y'] = data.player.y;
            rooms[players[data.id]["room"]][data.id]['xSpeed'] = data.player.xSpeed;
            rooms[players[data.id]["room"]][data.id]['ySpeed'] = data.player.ySpeed;
            let room_id = players[data.id]["room"]            
            let GameData = {id:socket.id,room: rooms[players[socket.id]['room']]}
            for(r in rooms[room_id]) {                
                socket.broadcast.to(r).emit("Some_Player_Pressed_A_Key",GameData)
            }   
        }
    })
}

function Join_Room(socket) {       
    socket.on("Join_Room",s=>{        
        let id = socket.id      

        if(Object.size(rooms[Object.size(rooms)]) < RoomPlayersLimit) {                    

        }else{
            rooms[Object.size(rooms)+1] = {}            
        }
                            
        var next_sala = Object.size(rooms)  
        var qnt_sala = 0      
        for(r in rooms) {            
            if(Object.size(rooms[r]) < RoomPlayersLimit) {
                qnt_sala = Object.size(rooms[r])
                next_sala = r
                break;
            }
        }            
        rooms[next_sala][socket.id] = {
            room: next_sala,
            x: players_distribuition_in_room[qnt_sala].x,
            y: players_distribuition_in_room[qnt_sala].y,
            color: players_distribuition_in_room[qnt_sala].color
        }
        players[socket.id] = {
            room: next_sala        
        }

        Generate_And_Send_To_Cliente_Game_Data(socket, qnt_sala)
    })      
}

function Generate_And_Send_To_Cliente_Game_Data(socket, qnt_sala) {

    let room_id = players[socket.id].room        
    let GameData = {id:socket.id,room: rooms[players[socket.id]['room']]}
    socket.emit("Joined_Room",GameData)
    for(r in rooms[room_id]) {
        socket.broadcast.to(r).emit("Joined_Room",GameData)
    }        
}

function UnJoinRoom(socket) {    
    socket.on('disconnect', function(s){     
        if(players[socket.id]) {
            delete rooms[players[socket.id]['room']][socket.id]
            delete players[socket.id]        
        }                 
    }) 
}

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
}

var RoomPlayersLimit = Object.size(players_distribuition_in_room)

http.listen(8000,()=>{console.log("Listening at port 8000...")})