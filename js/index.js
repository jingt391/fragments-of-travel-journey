var c=document.getElementById('mycanvas'); 
var $=c.getContext('2d');
var t=0;
var image=document.getElementById('galaxy');
c.height=window.innerHeight*1.5;
c.width=window.innerWidth;
var w=c.width,h=c.height;
var arr=[];
var num=300;
var i=0;
	generate(700);
function generate(q)
{
	for (var i = 0; i <q; i++) {
  arr.push({
    x: (Math.random()*2*w),
    y: (Math.random()*2*h),
    len:Math.max((Math.random()*3),0.5),
    alpha: 0.8
  });
};
}
function regenerate(a)
{
	var n=arr[a];
	n.x=(Math.random()*w);
	n.y=(Math.random()*h);
	n.len=Math.max((Math.random()*2),0.5);
	n.alpha=0.8;
}
function paint(a)
{
	var n=arr[a];
  var radgrad = $.createRadialGradient(n.x,n.y,0,n.x,n.y,n.len*8);
  radgrad.addColorStop(0, `hsla(${a},90%,50%,1)`);
  radgrad.addColorStop(0.25, `hsla(${a},90%,50%,.25)`);
  radgrad.addColorStop(0.5, `hsla(${a},90%,50%,.05)`);
  radgrad.addColorStop(1, `hsla(${a},90%,50%,0)`);
  // radgrad.addColorStop(0, 'rgba(255,0,0,1)');
  // radgrad.addColorStop(0.8, 'rgba(228,0,0,.9)');
  // radgrad.addColorStop(1, 'rgba(228,0,0,0)');

  // draw shape
  $.fillStyle = radgrad;
  // $.filter = "blur(5px)";
	// $.fillStyle="hsla("+a+",90%,60%,0.5)";
	$.beginPath();
	$.arc(n.x,n.y,n.len*8,0,2*Math.PI);
	$.closePath();
	$.fill(); 
  // $.filter = "";
	$.fillStyle="hsla("+a+",90%,60%,0.8)";
	$.beginPath();
	$.arc(n.x,n.y,n.len,0,2*Math.PI);
	$.closePath();
	$.fill();
}
function move(a)
{
	n=arr[a];
	n.x+=Math.sin((n.x/w)*2*Math.PI)*2*Math.max(Math.abs(1.5*Math.sin(t*0.125*Math.PI)),1)*n.len;
	n.y+=Math.sin((n.y/h)*2*Math.PI)*2*Math.max(Math.abs(1.5*Math.sin(t*0.125*Math.PI)),1)*n.len;
	n.alpha=Math.sin((Math.abs(n.x-(w/2)))/(w/2)*Math.PI);
	if(n.alpha<=0.01)
		regenerate(a);
}
function go()
{
	
	$.fillStyle="rgba(0,0,0,0.9)";
	$.fillRect(0,0,w,h);
	for (var i = 0; i < arr.length; i++) {
		paint(i);
		move(i);
	};
};
window.setInterval(function(){
	t+=0.01;
},10);
function init()
{
	window.requestAnimationFrame(init);
	go();
};
init();