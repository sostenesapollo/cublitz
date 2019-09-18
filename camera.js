function Camera () {

    this.defaults = {
        "camSqrQnt":2,
        "movSqrtQnt":2
    }

    this.x = -5;
    this.y = -5;

    this.draw = (obj, isObjects,c) =>{              
        if( isObjects && obj && Object.size(obj) >= 1) {
            for(i in obj) {          
                ctx.fillStyle = "#92927d"
                if(c) {                    
                    ctx.fillStyle = c
                }
                if(obj[i].c) {                    
                    ctx.fillStyle = obj[i].c
                }
                ctx.fillRect(
                    (obj[i].x*(canvas.width/cells)) - this.x*(canvas.width/cells),
                    obj[i].y*(canvas.width/cells) - this.y*(canvas.width/cells),
                    (canvas.width/cells),
                    (canvas.width/cells))
            };    
        }else{
            ctx.fillStyle = "#92927d"
            if(c) { ctx.fillStyle = c }            
            obj.forEach(i=>{                
                ctx.fillRect(
                (i.x*(canvas.width/cells)) - this.x*(canvas.width/cells),
                i.y*(canvas.width/cells) - this.y*(canvas.width/cells),
                (canvas.width/cells),
                (canvas.width/cells))
            })                    
        }
    }

    this.follow = (player) =>{
        // If player cross camera.movSqrtQnt.x the camera increments + 1
        if((player.x - this.x) > Math.trunc(cells/2) + this.defaults.movSqrtQnt * 2.5) {                        
            this.x ++
        } 

        // If player cross camera.movSqrtQnt.x the camera decreases 1
        if((player.x - this.x) < this.defaults.movSqrtQnt) {            
            this.x --
        }

        // If player cross camera.movSqrtQnt.y the camera increments 1
        if((player.y - this.y) < this.defaults.movSqrtQnt) {            
            this.y --
        }

        // If player cross camera.movSqrtQnt.y the camera increments + 1
        if((player.y - this.y) > Math.trunc(cells/2) + this.defaults.movSqrtQnt*2.5) {            
            this.y ++
        } 
    }

    this.onKeyDown = e =>{        
        switch (e.key) {            
            case 'w':
                this.y --
                break;
            case 'd':
                this.x ++
                break;
            case 'a':
                this.x --
                break;
            case 's':
                this.y ++   
                break;            
        }
    }
}