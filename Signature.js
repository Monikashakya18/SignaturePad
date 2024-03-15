let  canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let clearbtn=document.getElementById('clear');
let save=document.getElementById('download');
let Isdrawing = false;
let brushcolor='black';

 const getposition=(evalue)=>{
  let x, y;
  if (evalue.touches) {
    x = evalue.touches[0].clientX - canvas.getBoundingClientRect().left;
    y = evalue.touches[0].clientY - canvas.getBoundingClientRect().top;
  } else {
    x = evalue.offsetX;
    y = evalue.offsetY;
  }
  return { x, y };
 }

const setbgcolor=()=>{
  ctx.fillStyle='white';
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle=brushcolor;
}

window.addEventListener('load',()=>{
  canvas.width=canvas.offsetWidth;
  canvas.height=canvas.offsetHeight;
  setbgcolor();
});

const drawing = (e) => {
  e.preventDefault();
  if (Isdrawing == false){
    return false;
  }
  else {
    const position=getposition(e);
    ctx.lineTo(position.x, position.y);//
    ctx.lineWidth = 2;
    ctx.lineCap="round";
    ctx.stroke();
  }

}
const startdrawing = () => {
  Isdrawing = true;
  ctx.beginPath();
}

const clearcanvas=(e)=>{
  ctx.clearRect(0,0,canvas.width,canvas.height);
  setbgcolor();
}

const saveAsImg=(e)=>{ 
 let link=document.createElement('a');
 link.download=`${Date.now()}.jpg`;
 link.href=canvas.toDataURL();
 link.click();
}

canvas.addEventListener('mousedown', startdrawing);
canvas.addEventListener('mousemove', drawing);
canvas.addEventListener('mouseup', () => Isdrawing = false);
canvas.addEventListener('touchstart', startdrawing);
canvas.addEventListener('touchmove', drawing);
canvas.addEventListener('touchend', () => Isdrawing = false);
clearbtn.addEventListener('click',clearcanvas);
save.addEventListener('click',saveAsImg);
