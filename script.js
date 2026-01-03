let boxes=document.querySelectorAll(".box");
let reset=document.querySelector("#reset");
let msgContaineer=document.querySelector(".msg_containeer");
let newbtn=document.querySelector("#new_btn");
let winnerMsg= document.querySelector("#winnerMsg");


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
    msgContaineer.classList.add("hide");
}

 boxes.forEach((box)=>{
    box.addEventListener("click",()=>{

        if(Turn){
            box.innerText="X";
            Turn=false;
        }
        else{
            box.innerText="O"
            Turn=true;
        }
         box.disabled=true;

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
       winnerMsg.innerText=(`Congratulation, Winner is player ${winner}`);
       msgContaineer.classList.remove("hide");
       disablebtns();
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
   }
}

reset.addEventListener("click",resetGame);
newbtn.addEventListener("click",resetGame);