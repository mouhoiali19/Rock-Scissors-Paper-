let score = JSON.parse(localStorage.getItem('score'))||{
  wins:0,
  loses:0,
  tie:0
};
/* or using this way 
if(score=== null){  //or if(!score)
score = {
  wins:0,
  loses:0,
  tie:0
}
}
*/
updatescore();
let computermove='';
function pickchoosingmove(){
const a = Math.random();
if(a >= 0 && a< 1/3) {
  computermove='rock';
}else if(a>= 1/3 && a< 2/3) {
  computermove ='paper';
} else if(a>= 2/3 && a<1){
  computermove ='scissors' ;
}
console.log(computermove);
return computermove;
}
let isAutoplaying=false;
let intervalid;

function autoplay(){
  if(isAutoplaying===false){
     intervalid= setInterval( () => {
      const playermove=pickchoosingmove();  
      playgame(playermove);
      document.querySelector('.js-auto').innerHTML='Stop Play';
    },1000);
    isAutoplaying=true;
  } else {
    clearInterval(intervalid); 
    isAutoplaying=false;
    document.querySelector('.js-auto').innerHTML='Auto Play';
  }
}
document.querySelector('.js-rock').addEventListener('click' , () =>{
   playgame('rock');
})
document.querySelector('.js-paper').addEventListener('click' , () =>{
  playgame('paper');
})

document.querySelector('.js-scissors').addEventListener('click' , () =>{
  playgame('scissors');
})

document.body.addEventListener('keydown' , (event)=>{
  console.log(event.key);
  if(event.key==='r'){
    playgame('rock');
  }else if(event.key === 'p'){
    playgame('paper');

  }else if(event.key=== 's'){
    playgame('scissors');
  }
})
function playgame(playermove){
  const choosingmove = pickchoosingmove();
  let result= '';
  if(playermove==='rock'){
    if(computermove==='rock'){
    result='tie';
    score.tie+=1;
    }else if(computermove==='paper'){
    result='you lose';
    score.loses+=1;
    }else if(computermove==='scissors'){
    result='you win';
    score.wins+=1;
    }
  }
  if(playermove === 'paper'){
    if(computermove==='rock'){
    result='you win';
    score.wins+=1;
    }else if(computermove==='paper'){
    result='tie';
    score.tie+=1;
    }else if(computermove==='scissors'){
     result='you lose';
     score.loses=score.loses+1;
    }
  }
   if(playermove === 'scissors'){
    if(computermove==='rock'){
     result='you loses';
     score.loses+=1;
    }else if(computermove==='paper'){
     result='you win';
     score.wins+=1;
    }else if(computermove==='scissors'){
     result='tie';
     score.tie+=1;
    }
   }

    localStorage.setItem('score' , JSON.stringify(score) );
    updatescore();
    document.querySelector('.js-result').innerHTML= result ;
    document.querySelector('.js-move').innerHTML=`you 
    <img src="../Rock Paper Scissors_files/${playermove}-emoji.png"  class="move-icon">
    <img src="../Rock Paper Scissors_files/${computermove}-emoji.png" class="move-icon">
    computer` ; 
  }
 function  updatescore(){
  document.querySelector('.js-score').innerHTML=`wins : ${score.wins}  tie: ${score.tie} loses : ${score.loses}`;
 }
 