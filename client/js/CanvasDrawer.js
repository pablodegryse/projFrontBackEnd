var CanvasDrawer=(function () {
    var canDraw=false;
    //member vars
    var canvas;
    var ctx;
    var canvasRect;
    var currentColor='Red';
    var isHeldDown=false;
    var previousMousePos={ x:0, y:0 };
    var currentMousePos={ x:0, y:0 };
    var drawSocket;

    var previousMs;
    var currentMs;
    var drawTime;
    //public functies
    return {
        init:function (canvas,buttonList,socket) {
            setupVars(canvas,socket);
            addListeners(buttonList);
            ctx.lineWidth='4';
            ctx.lineCap='round';
            ctx.lineJoin='miter';
        },
        drawToCanvas:function (obj) {
            setPositions(obj);
            drawFromServer();
        },
        setmouseDown:function () {
            isHeldDown=true;
            ctx.beginPath();
        },
        setMouseUp:function () {
            isHeldDown=false;
        },
        changeColor:function (color) {
            changeMyColor(color);
        },
        clearCanvas:function () {
          clearMyCanvas();
        },
        changeDrawPermission:function(ableTo){
            canDraw=ableTo;
            ctx.beginPath();
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    };

    //private functies
    function setPositions(obj) {
        previousMousePos.x=obj.oldPos.x;
        previousMousePos.y=obj.oldPos.y;
        currentMousePos.x=obj.currentPos.x;
        currentMousePos.y=obj.currentPos.y;
    }
    function changeMyColor(color) {
        currentColor=color;
        ctx.strokeStyle=currentColor;
    }
    function clearMyCanvas() {
        ctx.beginPath();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    function draw() {
        if(canDraw && currentMousePos.x>0 && currentMousePos.y>0 &&isHeldDown){
            var ms=new Date().getTime();
            currentMs=ms;
            drawTime=currentMs-previousMs;
            if(drawTime>25){
                drawSocket.emit('drawUpdate',{
                    'oldPos':previousMousePos,
                    'currentPos':currentMousePos
                });
                ctx.lineTo(currentMousePos.x,currentMousePos.y);
                ctx.moveTo(currentMousePos.x,currentMousePos.y);
                ctx.stroke();
                previousMs=currentMs;
            }
        }
    }
    function drawFromServer() {
        ctx.lineTo(currentMousePos.x,currentMousePos.y);
        ctx.moveTo(currentMousePos.x,currentMousePos.y);
        ctx.stroke();
    }
    function setMousePos(x,y) {
        currentMousePos.x=x;
        currentMousePos.y=y;
    }

    function setPrevMousePos(x,y) {
        previousMousePos.x=x;
        previousMousePos.y=y;
    }
    function setupVars(myCanvas,socket) {
        drawSocket=socket;
        canvas=myCanvas;
        ctx=canvas.getContext('2d');
        canvasRect=canvas.getBoundingClientRect();
    }

    //listeners will only do stuff when canDraw is true , otherwise just listen to the server
    function addListeners(buttonList) {
        document.addEventListener('mousemove',function (event) {
            if(canDraw){
                setMousePos(event.clientX-canvasRect.left-4,event.clientY-canvasRect.top-4);
                draw();
                setPrevMousePos(currentMousePos.x,currentMousePos.y);
            }
        });

        canvas.addEventListener('mousedown',function () {
            if(canDraw){
                var ms=new Date().getTime();
                previousMs=ms;
                isHeldDown=true;
                ctx.beginPath();
                drawSocket.emit('drawBegin','true');
            }
        });
        canvas.addEventListener('mouseup',function () {
            if(canDraw){
                isHeldDown=false;
                drawSocket.emit('drawEnd','true');
            }
        });

        var colors = buttonList.getElementsByClassName("canvasColor");
        for(var i=0,len=colors.length;i<len;i++){
            colors[i].addEventListener('click',function (event) {
                if(canDraw){
                    changeMyColor(event.target.name);
                    drawSocket.emit('changedColor',currentColor);
                }
            });
        }
        var resetButton = buttonList.getElementsByClassName("canvasClearBtn")[0];
        resetButton.addEventListener('click',function () {
            if(canDraw){
                clearMyCanvas();
                drawSocket.emit('canvasClear');
            }
        });
    }
})();



