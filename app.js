let express = require("express")
let app = express()

let http = require("http").createServer(app)
let io = require("socket.io")(http)

var sockets = [];

app.use("/",express.static(__dirname))

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})

var players_distribuition_in_room = [{x:10,y:10},{x:20,y:20},{x:30,y:30},{x:40,y:40}]
var rooms = {1:{}}
var players = {}

io.on("connection", socket=>{  
        
    Join_Room(socket)
    UnJoinRoom(socket)

})

function Join_Room(socket) {       
    socket.on("Join_Room",s=>{        
        let id = socket.id      

        if(Object.size(rooms[Object.size(rooms)]) < RoomPlayersLimit) {                    

        }else{
            rooms[Object.size(rooms)+1] = {}            
        }
                            
        var next_sala = Object.size(rooms)        
        for(r in rooms) {            
            if(Object.size(rooms[r]) < RoomPlayersLimit) {
                next_sala = r
                break;
            }
        }            
        rooms[next_sala][socket.id] = {room: next_sala}
        players[socket.id] = {room: next_sala}            

        Generate_And_Send_To_Cliente_Game_Data(socket)
    })      
}

function Generate_And_Send_To_Cliente_Game_Data(socket) {

    let room_id = players[socket.id].room    
    let GameData = {
        x: 10,
        y: 20,
        room: rooms[players[socket.id]['room']],
        id: socket.id
    }
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