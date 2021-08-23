function showNumberWithAnimation(i,j,randNumber){
    var numberCell = document.querySelector('#number-cell-'+i+'-'+j);
    numberCell.style.backgroundColor=getNumberBackgroundColor(board[i][j]);
    numberCell.style.Color=getNumberColor(board[i][j]);
    numberCell.style.lineHeight = cellSideLength + 'px';
    if(board[i][j]>100&&board[i][j]<1000){
        numberCell.style.fontSize=0.5*cellSideLength+'px';
    }else if(board[i][j]>1000){
        numberCell.style.fontSize=0.4*cellSideLength+'px';
    }else{
        numberCell.style.fontSize = 0.6 * cellSideLength + 'px';
    }

    numberCell.innerText=randNumber;
   
    var myAnimation = anime({
        targets: numberCell,
        width:cellSideLength+'px',
        height:cellSideLength+'px',
        top:getPosTop(i,j)+'px',
        left:getPosLeft(i,j)+'px',
        duration: 300,
        easing: 'easeOutElastic(1, .8)'
    });

}
function showMoveAnimation(fromx,fromy,tox,toy){
    var numberCell = document.querySelector('#number-cell-'+fromx+'-'+fromy);
    
    var myAnimation = anime({
        targets: numberCell,
        top:getPosTop(tox,toy)+'px',
        left:getPosLeft(tox,toy)+'px',
        duration: 300,
        easing: 'easeInOutExpo'
    });
}
function updateScore(score){
    document.querySelector('#score').innerText=score;
}