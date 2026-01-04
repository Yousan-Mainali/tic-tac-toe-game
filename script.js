let boxes=document.querySelectorAll(".box");
let reset=document.querySelector("#reset");
let msgContaineer=document.querySelector(".msg_containeer");
let newbtn=document.querySelector("#new_btn");
let winnerMsg= document.querySelector("#winnerMsg");
let undoButton=document.querySelector("#undo");

let moveHistory=[];
let gameOver=false;


let Turn=true;

const winPattern=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const resetGame=()=>{
    Turn=true;
    enablebtns();
    moveHistory=[];
    msgContaineer.classList.add("hide");
    gameOver=false
}

 boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if (gameOver) return;
        let player;


        if(Turn){
            player="X";
            box.innerText="X";
            Turn=false;
        }
        else{
            player="O";
            box.innerText="O"
            Turn=true;
        }
         box.disabled=true;

         moveHistory.push({
            index:Array.from(boxes).indexOf(box),
            player:player
         });

         checkWinner();
    });
}) ;

const disablebtns=()=>{
    for(let btns of boxes){
          btns.disabled=true;
    }
}

const enablebtns=()=>{
    for(let btns of boxes){
          btns.disabled=false;
          btns.innerText= "";
    }
}

const showWinner=(winner)=>{
       winnerMsg.innerText=(`Congratulation, Winner is player "${winner}"`);
       msgContaineer.classList.remove("hide");
       disablebtns();
       gameOver=true;
}

const Undo=()=>{
     if (moveHistory.length===0 || gameOver) return;

    let lastMove=moveHistory.pop();

    let box=boxes[lastMove.index];
    box.innerText="";
    box.disabled=false;


    if (lastMove.player==="X"){
        Turn =true;
    }
    else{
        Turn = false;
    }

    gameOver=false;
    msgContaineer.classList.add("hide");
}
const checkWinner=()=>{

    let isdraw=true;
    for(let patterns of winPattern){

    let pos1Value=boxes[patterns[0]].innerText;
    let pos2Value=boxes[patterns[1]].innerText;
    let pos3Value=boxes[patterns[2]].innerText;


    if(pos1Value!="" && pos2Value!="" && pos3Value!=""){
        if(pos1Value===pos2Value && pos2Value === pos3Value){
            console.log("Winner",pos1Value );
            showWinner(pos1Value);
            return;
        }
      }
   }  

   for(let box of boxes){
    if(box.innerText===""){
        isdraw=false;
        break;
    }
   }

   if(isdraw){
    winnerMsg.innerText=("Match Drawn");
    msgContaineer.classList.remove("hide"); 
    gameOver=true;
   }
}

undoButton.addEventListener("click",Undo);
reset.addEventListener("click",resetGame);
newbtn.addEventListener("click",resetGame);