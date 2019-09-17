function Camera () {

    this.defaults = {
        "camSqrQnt":2,
        "movSqrtQnt":2
    }

    this.x = -5;
    this.y = -5;

    this.draw = (obj, c) =>{  
        if( obj && obj.length >= 1) {
            obj.forEach(i => {                   
                ctx.fillStyle = "#92927d"
                if(c) {                    
                    ctx.fillStyle = c
                }
                ctx.fillRect(
                    (i.x*(canvas.width/cells)) - this.x*(canvas.width/cells),
                    i.y*(canvas.width/cells) - this.y*(canvas.width/cells),
                    (canvas.width/cells),
                    (canvas.width/cells))
            });    
        }
        ctx.fillStyle = "#92927d"
        if(c) {                    
            ctx.fillStyle = c
        }
        ctx.fillRect(
            (obj.x*(canvas.width/cells)) - this.x*(canvas.width/cells),
            obj.y*(canvas.width/cells) - this.y*(canvas.width/cells),
            (canvas.width/cells),
            (canvas.width/cells))
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