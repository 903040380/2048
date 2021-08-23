var board = new Array();
var score = 0;
var hasConflicted = new Array();

var startx = 0;
var starty = 0;
var endx = 0;
var endy = 0;

if (document.readyState !== 'loading') {
    ready();
} else {
    document.addEventListener('DOMContentLoaded', ready)
}
function ready() {
    prepareForMobile();
    newgame();
}
function prepareForMobile() {
    var device=0;
    if (documentWidth > 500){
        device=1;
    }
    if (device==1) {
        gridContainerWidth = 500;
        cellSpace = 20;
        cellSideLength = 100;
    }else{
        wx.miniProgram.getEnv(function(res) {
            if(res.miniprogram){
                documentWidth=wx.getSystemInfoSync().windowWidth;
            }
            else{

            }
        })
    }
    var gridContainer = document.querySelector('#grid-container');

    gridContainer.style.width = (gridContainerWidth - 2 * cellSpace) + 'px';
    gridContainer.style.height = (gridContainerWidth - 2 * cellSpace) + 'px';
    gridContainer.style.padding = cellSpace + 'px';
    gridContainer.style.borderRadius = 0.02 * gridContainerWidth + 'px';
    document.querySelectorAll('.grid-cell').forEach(index => {
        index.style.width = cellSideLength + 'px';
        index.style.height = cellSideLength + 'px';
        index.style.borderRadius = 0.02 * cellSideLength + 'px';
    });

}

function newgame() {
    //初始化
    init();
    //随机两个格子生成
    generateOneNumber();
    generateOneNumber();
}

function init() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var gridCell = document.querySelector('#grid-cell-' + i + '-' + j);
            gridCell.style.top = getPosTop(i, j) + 'px';
            gridCell.style.left = getPosLeft(i, j) + 'px';
        }
    }

    for (var i = 0; i < 4; i++) {
        board[i] = new Array();
        hasConflicted[i] = new Array();
        for (var j = 0; j < 4; j++) {
            board[i][j] = 0;
            hasConflicted[i][j] = false;
        }
    }

    updateBoardView();
    score = 0;
    document.querySelector('#score').innerText = score;
}
function updateBoardView() {

    var numberCell = document.querySelectorAll('.number-cell');
    for (var i = 0; i < numberCell.length; i++) {
        numberCell[i].remove();
    }

    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            document.querySelector('#grid-container').insertAdjacentHTML('beforeend', '<div class="number-cell" id="number-cell-' + i + '-' + j + '"></div>');
            var theNumberCell = document.querySelector('#number-cell-' + i + '-' + j);
            if (board[i][j] == 0) {
                theNumberCell.style.width = 0;
                theNumberCell.style.height = 0;
                theNumberCell.style.top = (getPosTop(i, j) + cellSideLength / 2) + 'px';
                theNumberCell.style.left = (getPosLeft(i, j) + cellSideLength / 2) + 'px';
            } else {
                theNumberCell.style.width = cellSideLength + 'px';
                theNumberCell.style.height = cellSideLength + 'px';
                theNumberCell.style.top = getPosTop(i, j) + 'px';
                theNumberCell.style.left = getPosLeft(i, j) + 'px';
                theNumberCell.style.backgroundColor = getNumberBackgroundColor(board[i][j]);
                theNumberCell.style.Color = getNumberColor(board[i][j]);
                theNumberCell.innerText = board[i][j];
                theNumberCell.style.lineHeight = cellSideLength + 'px';
                if(board[i][j]>100&&board[i][j]<1000){
                    document.querySelector('#number-cell-'+i+'-'+j).style.fontSize=0.5*cellSideLength+'px';
                }else if(board[i][j]>1000){
                    document.querySelector('#number-cell-'+i+'-'+j).style.fontSize=0.4*cellSideLength+'px';
                }else{
                    theNumberCell.style.fontSize = 0.6 * cellSideLength + 'px';
                }
                
            }

            hasConflicted[i][j] = false;
        }
    }
}

function generateOneNumber() {
    if (nospace(board)) {
        return false;
    }

    //随机位置
    var randx = parseInt(Math.floor(Math.random() * 4));
    var randy = parseInt(Math.floor(Math.random() * 4));
    var times = 0;
    while (times < 50) {
        if (board[randx][randy] == 0) {
            break;
        }

        randx = parseInt(Math.floor(Math.random() * 4));
        randy = parseInt(Math.floor(Math.random() * 4));

        times++;
    }
    if (times == 50) {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (board[i][j] == 0) {
                    randx = i;
                    randy = j;
                }
            }
        }
    }

    //随机数字
    var randNumber = Math.random() < 0.5 ? 2 : 4;

    //显示
    board[randx][randy] = randNumber;
    showNumberWithAnimation(randx, randy, randNumber);

    return true;
}

document.addEventListener('keydown', (event) => {

    switch (event.code) {
        case 'KeyW':
        case 'ArrowUp': {
            event.preventDefault();
            if (moveUp()) {
                setTimeout('generateOneNumber()', 300);
                setTimeout('isgameover()', 600);
            }
            break;
        }
        case 'KeyA':
        case "ArrowLeft": {
            event.preventDefault();
            if (moveLeft()) {
                setTimeout('generateOneNumber()', 300);
                setTimeout('isgameover()', 600);
            }
            break;
        }
        case 'KeyS':
        case 'ArrowDown': {
            event.preventDefault();
            if (moveDown()) {
                setTimeout('generateOneNumber()', 300);
                setTimeout('isgameover()', 600);
            }
            break;
        }
        case 'KeyD':
        case 'ArrowRight': {
            event.preventDefault();
            if (moveRight()) {
                setTimeout('generateOneNumber()', 300);
                setTimeout('isgameover()', 600);
            }
            break;
        }
        default:
            break;
    }
})
document.addEventListener('touchstart', function (event) {
    startx = event.touches[0].pageX;
    starty = event.touches[0].pageY;
})
document.addEventListener('touchmove', function (event) {
    event.preventDefault();
}, { passive: false });
document.addEventListener('touchend', function (event) {
    endx = event.changedTouches[0].pageX;
    endy = event.changedTouches[0].pageY;
    var deltax = endx - startx;
    var deltay = endy - starty;

    if (Math.abs(deltax) < 0.1 * documentWidth && Math.abs(deltay) < 0.1 * documentWidth) {
        return;
    }

    if (Math.abs(deltax) >= Math.abs(deltay)) {
        //x
        if (deltax > 0) {
            //→
            if (moveRight()) {
                setTimeout('generateOneNumber()', 300);
                setTimeout('isgameover()', 600);
            }

        } else {
            //←
            if (moveLeft()) {
                setTimeout('generateOneNumber()', 300);
                setTimeout('isgameover()', 600);
            }

        }
    } else {
        //y
        if (deltay > 0) {
            //↓
            if (moveDown()) {
                setTimeout('generateOneNumber()', 300);
                setTimeout('isgameover()', 600);
            }

        } else {
            //↑
            if (moveUp()) {
                setTimeout('generateOneNumber()', 300);
                setTimeout('isgameover()', 600);
            }

        }
    }
})
function isgameover() {
    if (nospace(board) && nomove(board)) {
        gameover();
    }
}
function gameover() {
    alert('Game Over');
}