let optionsContainer = document.querySelector(".playerContainer .optionsContainer");
let button = document.getElementById("startGame")
let optionsArray = ["piedra","papel","tijera"]
let optionsSelected= {
    "player" : "",
    "ia" : ""
}

class GameResult {
    constructor(){
        this.win="";
        this.block= false;
    }

    play(option1,option2){
        switch(option1){
            case "piedra":
                this.win=option2 == "tijera"? "player": "machine";
            break;
            case "papel":
                this.win=option2 == "piedra"? "player": "machine";
            break;
            case "tijera":
                this.win=option2 == "papel"? "player": "machine";
            break
        }
    }

    desblockGame(){
        document.querySelector(".winCartel h3").textContent = ""
        //ELIMINAR TODOS LOS .selectOption
        document.querySelectorAll(".selectOption").forEach(element=>{
            element.classList.remove("selectOption")
        })
        this.block = false
    }

    selectionIa(){  
        let optionSelected = optionsArray[Math.floor(Math.random() * 3)] 
        document.querySelector(`.machineContainer .optionsContainer #${optionSelected}`).classList.add("selectOption")
        return optionSelected
    }

    tiedGame(option1,option2){
        if(option1 == option2){
            this.win = "empate";
        }
    }
}

let gameResult = new GameResult();

startGame = (option1, option2)=>{
    if(option1 == option2){
        gameResult.tiedGame();
        return;
    }
    gameResult.play(option1,option2)
}


optionsContainer.addEventListener("click", e=>{
    if(gameResult.block) return;
    if(!e.target.classList.contains("optionsContainer")){
        if(e.target.classList.contains("selectOption")){
            e.target.classList.remove("selectOption")
            button.classList.remove("buttonReady")
            return
        }

        if(document.querySelector(".selectOption")){
            document.querySelector(".selectOption").classList.remove("selectOption")
            e.target.classList.add("selectOption")
        }
        else e.target.classList.add("selectOption")
        document.querySelector(".containerButton p").classList.remove("showText")
        button.classList.add("buttonReady")
    }
})

button.addEventListener('click',()=>{
    if(gameResult.block) return;
        if(document.querySelector(".selectOption")){
            optionsSelected["player"] = document.querySelector(".selectOption").getAttribute("alt")
            optionsSelected["ia"] = gameResult.selectionIa()
            startGame(optionsSelected["player"], optionsSelected["ia"])
            document.querySelector(".winCartel h3").textContent = `${gameResult.win.toUpperCase()}`
            gameResult.block = true
            return
        }
        document.querySelector(".containerButton p").classList.add("showText")
})
document.getElementById("restartGame").addEventListener("click",()=>  gameResult.desblockGame())




