function Player () {
    this.x;
    this.y; 
    
    this.xInicial; 
    this.yInicial;

    this.xSpeed = 0;
    this.ySpeed = 0;

    this.score = 2
    this.life = 3 
    
    this.color = "red"
    this.c;

    this.id;

    this.changeColor = (color, time, callback) => {
        window.setTimeout(()=>{
            this.color = color
            if(callback) {
                callback()
            }            
        },time) 
    }
    
    // Blink player to start game....
    this.changeColor("pink",100,()=>{
        this.changeColor("red",100,()=>{
            this.changeColor("pink",100,()=>{
                this.changeColor("red",40,()=>{
                    this.changeColor("pink",100,()=>{
                        this.changeColor("#f58a42",200,()=>{
                        })
                    })
                })
            })
        })
    })    

    this.update = (obj, id) =>{
        for(i in obj) {            
            obj[i]['x'] += obj[i]['xSpeed']
            obj[i]['y'] += obj[i]['ySpeed']                
        }        
    }    

    this.verifyColisions = (obj, id) =>{   
        for(i in obj) {          
            if(obj[i]['x']  > gameBoardCenterDistance - 1) {
                obj[i]['x'] = obj[i]['x'] - 1
            }
            if(obj[i]['x'] < 0) {
                obj[i]['x'] = 0
            }
            if(obj[i]['y'] < 0) {
                obj[i]['y'] = 0
            }
            if(obj[i]['y'] > gameBoardCenterDistance - 1) {
                obj[i]['y'] = gameBoardCenterDistance - 1
            }
        }
    }

    this.verifyIsEarningCoin = (coins) =>{
        var qnt = 0
        coins.forEach((coin,index)=>{
            if(this.x == coin.x && this.y == coin.y) {
                if(coins[index].x == this.x && coins[index].y == this.y) {                    
                    coins.splice(index,1)
                }
                this.changeColor("red",100)
                this.changeColor("#f58a42",300)
                this.score ++                                
                qnt ++
            }
        })
        return qnt
    }

    this.shot = (bullets) =>{
        if(this.score > 0 && (this.xSpeed != 0 || this.ySpeed != 0)) {
            this.score --            

            if(this.xSpeed == 1) {
                let bullet = new Bullet()
                bullet.x = this.x+1;
                bullet.y = this.y;
                bullet.xSpeed = bullet.defaultShotSpeed;       
                bullet.ySpeed = 0;    
                
                bullets.push(bullet)
            }

            if(this.xSpeed == -1) {
                let bullet = new Bullet()
                bullet.x = this.x-1;
                bullet.y = this.y;
                bullet.xSpeed = -bullet.defaultShotSpeed;       
                bullet.ySpeed = 0;    
                
                bullets.push(bullet)
            }

            if(this.ySpeed == -1) {
                let bullet = new Bullet()
                bullet.x = this.x;
                bullet.y = this.y-1;
                bullet.xSpeed = 0;       
                bullet.ySpeed = -bullet.defaultShotSpeed;    
                
                bullets.push(bullet)
            }

            if(this.ySpeed == 1) {
                let bullet = new Bullet()
                bullet.x = this.x;
                bullet.y = this.y+1;
                bullet.xSpeed = 0;       
                bullet.ySpeed = bullet.defaultShotSpeed;    
                
                bullets.push(bullet)
            }

        }else{
            if(this.score == 0) {
                print("Without bullets remaing.")
            } else {
                print("You're stoped.")
            }
        }
    }

    this.onKeyDown = (e) =>{   
        switch (e) {
            case 'w':
                this.ySpeed = -1
                this.xSpeed = 0
                break;
            case 'd':
                this.xSpeed = 1
                this.ySpeed = 0
                break;
            case 'a':
                this.xSpeed = -1
                this.ySpeed = 0
                break;
            case 's':
                this.ySpeed = 1
                this.xSpeed = 0
                break;   
            case ' ':
                this.xSpeed = 0                    
                this.ySpeed = 0                                    
                break;            
        }        
    }

    this.onKeyDownShot = (e, bullets) =>{
        switch (e) {
            case 'p':
                this.shot(bullets)
                break;          
        } 
    }
}