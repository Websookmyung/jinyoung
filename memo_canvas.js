var device;
var drawing=false;
var canvas;
var context;
var rect;

dom=document.getElementById("myCanvas");
context=dom.getContext("2d");
dom.onmousedown=startDrawing;
dom.onmousemove=keepDrawing;
dom.onmouseup=stopDrawing;

function initialize(){
    context.clearRect(0,0,50,450);
    context.beginPath();
    context.rect(0,0,580,450);
    context.strokeStyle="silver";
    context.fillStyle="LightGoldenrodYellow";
    context.fill();

    context.lineWidth=0.5;
    for (i=1;i<=8;i++) {
        context.moveTo(5,i*50);
        context.lineTo(575,i*50);
    }
    context.stroke();
}

function startDrawing(){
    if (device=="mobileDevice") event.preventDefault();
    drawing=true;
    context.beginPath();
    context.strokeStyle="dimgray";
    context.lineWidth=1;
    context.arc(event.clientX-rect.left, event.clientY-rect.top,3,0,2*Math.PI);
    context.stroke();
    context.fillStyle="dimgray";
    context.fill();
    context.closePath();

    context.beginPath();
    context.moveTo(event.clientX-rect.left, event.clientY-rect.top);
    context.lineCap="round";
    context.lineWidth=6;
}

function keepDrawing(){
    if (drawing){
        var x,y;
        if (device=="mobileDevice"){
            x=event.targetTouches[0].pageX;
            y=event.targetTouches[0].pageY;
        }else{
            x=event.clientX;
            y=event.clientY;
        }
        context.lineTo(x-rect.left, y-rect.top);
        context.stroke();
    }
}

function stopDrawing(){
    if (drawing){
        context.stroke();
        drawing=false;
    }
}

function save(){
    var localStorage=window.localStorage;

    if (!localStorage){
        //local storage is not supported by this browser.
        //do nothing
    }
    else{
        var imgData = context.getImageData(0, 0, context.width, context.height);
        var strData = '';
        for (var i=0; i<imgData.length; i+=4) {
            strData += imgData[i]+'|'+imgData[i+1]+'|'+imgData[i+2]+'|';
        }
        localStorage.setItem('imgData', strData);
    }
}

function restore(){
    var localStorage=window.localStorage;
    if (!localStorage){
        //local storage is not supported by this browser.
        //do nothing
    }
    else{
        var img=new Image();
        img.src=localStorage.canvas;
        img.onload=function(){
            context.drawImage(img,0,0);
        }
    }
}