var Game_Type = 1;

(async function main(){            

  var socket = io();
  
  await Game_Draw_Main_Screen()      
  await Start_Game(socket);

}())                       

async function Game_Draw_Main_Screen() {    

  Draw_Logo()
  Draw_Button("Start")
  await Verify_Button_Hover(canvas.width/3,canvas.width/3,canvas.width/3, canvas.height/6,"Start")  
  await Draw_Game_Type_Screen()   

}

async function Draw_Game_Type_Screen() {  
  ctx.clearRect(0,0,canvas.width, canvas.height)
  ctx.fillStyle = "gray"
  ctx.fillRect(0,0,canvas.width, canvas.height)
  ctx.fillStyle = "black"
  ctx.font = "20px Tahoma";
  ctx.fillText("Escolha o modo de jogo:",canvas.height/4,canvas.height/4)

  Current_Button_Color = "pink"
  ctx.fillStyle = Current_Button_Color
  ctx.fillRect(canvas.width/3,canvas.height/3,canvas.width/3, canvas.height/6)

  ctx.fillStyle = "black"
  ctx.font = "30px Tahoma";
  ctx.fillText("Padrão",canvas.width/3+30,(canvas.height/3)+50)

  await Verify_Button_Hover(canvas.width/3,canvas.width/3,canvas.width/3, canvas.height/6, "Padrão")  
  
  Game_Type = 1;

  ctx.clearRect(0,0,canvas.width, canvas.height)
  ctx.fillStyle = "beige"
  ctx.fillRect(0,0,canvas.width, canvas.height)
}

var Current_Button_Color = "green"

function Verify_Button_Hover(beginx,beginy,scalex,scaley, text) {    
  var Start_Button_Clicked = false
  return new Promise((resolve, reject)=>{
    var clicked = false
    canvas.onclick = e => {
      clicked = true
      if(Start_Button_Clicked) {
        resolve (true);
        return;
      }
    }  
    canvas.onmousemove = function(e) {  
      if(Start_Button_Clicked) {
        resolve (true);
        return;
      }
      if(beginy < e.clientY && beginy+scaley >e.clientY ) {
        if(beginx < e.clientX && e.clientX < beginx+scalex) {
          if(clicked == true){
            Start_Button_Clicked = true            
          }
          Current_Button_Color = "red"
        }else{
          Current_Button_Color = "green"
        }      
      }else{
          Current_Button_Color = "green"
      }
      Draw_Button(text)
      clicked = false
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

function Draw_Button (text) {
  ctx.fillStyle = Current_Button_Color
  ctx.fillRect(canvas.width/3,canvas.height/3,canvas.width/3, canvas.height/6)

  ctx.fillStyle = "white"
  ctx.fillText(text,canvas.width/3+37,(canvas.height/3)+50)
}

function Draw_Logo() {
  ctx.fillStyle = "gray"
  ctx.font = "40px Tahoma";
  ctx.fillText("cublitz",1.25*canvas.height/3,canvas.height/3-2)
}

function Receive_From_Server(variable, socket) {
  return new Promise((re,rej)=>{
    socket.on(variable,ret=>{
      re(ret)
    })
  })    
}
