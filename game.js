const px = (px) => px+"px"
const removePx = text => {
    const indexOfP = text.indexOf('p')
    const noPx = text.slice(0, indexOfP)
 
    return Number(noPx)
}
function initCanvas(){

    var character = document.getElementById('character')
    const charwidth = 120
    const characterwidth = px(charwidth)
    character.style.bottom = 0
    character.style.height = "130px"

    const application = document.getElementById('scen')
    const width = 1400
    application.style.width = px(width)


    document.addEventListener("keydown", function(event) {
        if (event.keyCode == 32)
            {
                if (character.style.bottom == '0px') {
                    character.animation ([
                        { bottom: "0px"},
                        { bottom: "170px"},
                        { bottom: "0px"}
                    ], 
                    { 
                        duration: 500
                    });
                    character.style.bottom = "170px"

                    setTimeout(() => {
                        character.style.bottom = "0px"
                        setTimeout(() => {
                            //character.style.transitionDuration = "0s"
                        }, 100 )
                    }, 200 )
                }
              
                
        }
        // setInterval(Dead, 100)
    });

    function Launcher(){
        // bullet location (ubicación de balas)
        this.y = 500, 
        this.x = 600, 
        this.w = 100, 
        this.h = 100,   
        this.direction,
        this.bg="white", // bullet color (color de bala)
        this.misiles = [];
        this.limit,
        this.charstop

        this.render = function () {
            this.limit = application.getBoundingClientRect();
            this.charstop = character.getBoundingClientRect();

        
            if(this.direction === 'left'){
                this.x-=5;
                character.classList.add('faceleft');
            } else if(this.direction === 'right'){
                this.x+=5;
                character.classList.remove('faceleft');
            }else if(this.direction === "downArrow"){
                this.y+=5;
            }else if(this.direction === "upArrow"){
                this.y-=5;
            }
            character.style.left = px(this.x)
        }

        this.shoot = async() => {
            const bullet = document.createElement("div")
            bullet.classList.add('bullet');
            const bulletHeight = removePx(character.style.bottom) + (removePx(character.style.height) / 2 + 15)

            const characterPos = character.style.left
            var 
                bulletStartPoint = removePx(characterPos),
                bulletEndPoint;
                console.log(character.classList)
            if (character.classList.contains('faceleft')){
                bulletStartPoint -= 10
                bulletEndPoint = this.limit.left
            } else {
                bulletStartPoint += 115
                bulletEndPoint = this.limit.right
            }

            bullet.style.left = px(bulletStartPoint)
            bullet.style.bottom = px(bulletHeight)
            application.appendChild(bullet)
            var bulletExpiresAt
            
            
                if (character.classList.contains('faceleft')){

                    bulletExpiresAt = calcBulletExpiry(bullet)

                    for (var i=bulletStartPoint; i > 0; i--){
                        setTimeout(()=>{
                            bullet.style.left = px(i)
                            console.log(i)
                        }, 50)
                    }
                    
                }
            

            
            setTimeout(() => {
                application.removeChild(bullet)
            }, bulletExpiresAt);
            
            
                
        }

    }

    var launcher = new Launcher();
    function animate(){
        launcher.render();
    }
    var animateInterval = setInterval(animate, 10);

    document.addEventListener('keydown', function(event) {
        // console.log(launcher.limit.left)
        // console.log(launcher.charstop.left)

        if(event.keyCode == 37) // left arrow
            {
            if(launcher.charstop.left <= launcher.limit.left){
                launcher.x = 0;
                launcher.direction = '';
                character.classList.add('faceleft')
             } else {
                launcher.direction = 'left'
             }
        }    
    });

    document.addEventListener('keyup', function(event) {
        if(event.keyCode == 37)
        {
         launcher.x+=0;
         launcher.direction = '';
        }
    }); 


    document.addEventListener('keydown', function(event) {
        
        if(event.keyCode == 39) // right arrow
            {
            if(launcher.charstop.right >= launcher.limit.right){
                launcher.x = width - charwidth;
                launcher.direction = '';
             } else {
                launcher.direction = 'right'
             }
        }    
    });

    document.addEventListener('keyup', function(event) {
        if(event.keyCode == 39)
        {
         launcher.x+=0;
         launcher.direction = '';
        }
    });

    // This fires when clicking on space button from keyboard
    document.addEventListener('keydown', function(event) {
        if(event.keyCode == 88) {
            console.log('fire')
            launcher.shoot();
        } else {
            launcher.removeBullet();
        }
    });
}

window.addEventListener('load', function(event) {
    initCanvas();
    console.log("App is ON");
});