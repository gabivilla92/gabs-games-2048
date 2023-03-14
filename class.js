const newGameButton = document.querySelector("a.new-game");

const rowOne = document.querySelectorAll("#row-one .empty-cell");
const rowTwo = document.querySelectorAll("#row-two .empty-cell");
const rowThree = document.querySelectorAll("#row-three .empty-cell");
const rowFour = document.querySelectorAll("#row-four .empty-cell");

const allRows = [rowOne,rowTwo,rowThree,rowFour];

const colOne = document.querySelectorAll(".col-one .empty-cell");
const colTwo = document.querySelectorAll(".col-two .empty-cell");
const colThree = document.querySelectorAll(".col-three .empty-cell");
const colFour = document.querySelectorAll(".col-four .empty-cell");

const allCols = [colOne,colTwo,colThree,colFour];

const cellAOne = rowOne[0];
const cellATwo = rowTwo[0];
const cellAThree = rowThree[0];
const cellAFour = rowFour[0];

const cellBOne = rowOne[1];
const cellBTwo = rowTwo[1];
const cellBThree = rowThree[1];
const cellBFour = rowFour[1];

const cellCOne = rowOne[2];
const cellCTwo = rowTwo[2];
const cellCThree = rowThree[2];
const cellCFour = rowFour[2];

const cellDOne = rowOne[3];
const cellDTwo = rowTwo[3];
const cellDThree = rowThree[3];
const cellDFour = rowFour[3];

const cells = [cellAOne,cellATwo,cellAThree,cellAFour,
               cellBOne,cellBTwo,cellBThree,cellBFour,
               cellCOne,cellCTwo,cellCThree,cellCFour,
               cellDOne,cellDTwo,cellDThree,cellDFour];

const cellValues = [];

const ultimaPosicao = [];

const score = document.querySelector("#actual-score");
const best = document.querySelector("#best-score");

score.value = 0;
best.value = 0;

let emptyCells = [];

let isWinGame = false;

const returnPlay = document.querySelector("#return");

const classes = [
    {valor: 2, classeAdicional: "dois", classeARemover: ""},
    {valor: 4, classeAdicional: "quatro", classeARemover: "dois"},
    {valor: 8, classeAdicional: "oito", classeARemover: "quatro"},
    {valor: 16, classeAdicional: "dezesseis", classeARemover: "oito"},
    {valor: 32, classeAdicional: "trintaEDois", classeARemover: "dezesseis"},
    {valor: 64, classeAdicional: "sessentaEQuatro", classeARemover: "trintaEDois"},
    {valor: 128, classeAdicional: "centoEVinteEOito", classeARemover: "sessentaEQuatro"},
    {valor: 256, classeAdicional: "duzentosECinquentaESeis", classeARemover: "centoEVinteEOito"},
    {valor: 512, classeAdicional: "quinhentosEDoze", classeARemover: "duzentosECinquentaESeis"},
    {valor: 1024, classeAdicional: "milEVinteEQuatro", classeARemover: "quinhentosEDoze"},
    {valor: 2048, classeAdicional: "doisMilEQuarentaEOito", classeARemover: "milEVinteEQuatro"},
    {valor: 4096, classeAdicional: "ganhosExtras", classeARemover: "doisMilEQuarentaEOito"},
    {valor: 8192, classeAdicional: "ganhosExtras", classeARemover: "ganhosExtras"},
    {valor: 16384, classeAdicional: "ganhosExtras", classeARemover: "ganhosExtras"}
]

function achaQuantidadeCelulaVazia(){
    emptyCells = cells.filter(cell => cell.value === 0)
    return emptyCells.length;
}

function preencheCelulaVaziaAleatoria(){
    const chosenCell = Math.floor(Math.random() * achaQuantidadeCelulaVazia());

    let doisOuQuatro = Math.round(Math.random() - 0.3);

    emptyCells[chosenCell].textContent = classes[doisOuQuatro].valor;
    emptyCells[chosenCell].value = classes[doisOuQuatro].valor;
    emptyCells[chosenCell].classList.toggle(classes[doisOuQuatro].classeAdicional);
}

function gravaUltimaPosicao(){
    ultimaPosicao.length = 0;
    for (let value of cellValues){
        ultimaPosicao.push(value);
    }

}

function atualizaCellValues(){
    cellValues.length = 0;
    for (let cell of cells){
        cellValues.push(cell.value);
    }
}



function validaMudancaEmCellValues(){
    for (let i = 0; i < 16; i++){
        if (cellValues[i] !== cells[i].value){
            return true;
        }
    }
    return false;
}

function verificaPossibilidadesDeMovimento(){
    if (achaQuantidadeCelulaVazia()>0){
        return true;
    }
    for (let r of allRows){
        for (let i = 0; i< 3; i++){
            if(r[i].value === r[i+1].value){
                return true;
            }
        }
    }
    for (let col of allCols){
        for (let i = 0; i< 3; i++){
            if(col[i].value === col[i+1].value){
                return true;
            }
        }
    }
    return false;
}

function habilitaProximoPasso(){
    if (validaMudancaEmCellValues()){
        gravaUltimaPosicao();
        preencheCelulaVaziaAleatoria();
        if (!verificaPossibilidadesDeMovimento()){
            alert(`Game Over! Seu score foi de ${score.value}!`);
        }
        atualizaCellValues();
    }

}

function iniciaNovoJogo(){
    for (let cell of cells ){
       cell.textContent = "";
       cell.value = 0;
       cell.classList = ["empty-cell"];
    }
    preencheCelulaVaziaAleatoria();
    preencheCelulaVaziaAleatoria();
    score.value = 0;
    score.textContent = "0";
    atualizaCellValues();
    gravaUltimaPosicao();
    isWinGame = false;
}

function zeraCelula(celula){
    celula.value = 0;
    celula.textContent = "";
    celula.classList = ["empty-cell"];
}

function dobraValorCelula(celulaDobrada, celulaZerada) {
    celulaDobrada.value *=2;
    celulaDobrada.textContent = celulaDobrada.value;
    celulaDobrada.classList.toggle(classes.filter(c => c.valor === celulaDobrada.value)[0].classeARemover);
    celulaDobrada.classList.toggle(classes.filter(c => c.valor === celulaDobrada.value)[0].classeAdicional);
    zeraCelula(celulaZerada);  
    score.value += celulaDobrada.value;
    score.textContent = score.value;
    if(score.value > best.value){
        best.value = score.value;
        best.textContent = best.value;
    }
    if (isWinGame === false && celulaDobrada.value === 2048){
        alert("Você ganhou! Parabéns! Pode continuar a jogar");
        isWinGame = true;
    }
}

function moveCelula(posicaoInicial,posicaoFinal){
    posicaoFinal.value = posicaoInicial.value;
    posicaoFinal.textContent = posicaoInicial.textContent;
    posicaoFinal.classList = posicaoInicial.classList;
    zeraCelula(posicaoInicial);
}

function voltaJogada(){
    let i = 0;
    for (let cell of cells){
        cell.value = ultimaPosicao[i];
        cell.classList = ["empty-cell"];
        cell.textContent = "";
        if(cell.value > 0){
            cell.textContent = cell.value;
            cell.classList.toggle(classes.filter(c => c.valor === cell.value)[0].classeAdicional);
        }
        i++;
    }
    atualizaCellValues();
}

function moveDireita(){
    for (let r of allRows){
        let soma = 0;
        for(let c of r){
            if(c.value !== 0){
                soma += 1
            }
        }
        if(soma > 0 && soma < 4){
            while (r[3].value === 0){
                moveCelula(r[2],r[3]);
                moveCelula(r[1],r[2]);
                moveCelula(r[0],r[1]);
            }
            if (soma > 1){
                while (r[2].value === 0){
                    moveCelula(r[1],r[2]);
                    moveCelula(r[0],r[1]);
                }
                if (soma === 3 && r[1].value === 0){
                    moveCelula(r[0],r[1]);
                }
            }
        }
    }
}

function somaDireita(){
    for (let r of allRows){
        if(r[3].value === r[2].value && r[3].value > 0){
            dobraValorCelula(r[3],r[2]);
            if(r[1].value === r[0].value && r[1].value > 0){
                dobraValorCelula(r[1],r[0]);
                moveCelula(r[1],r[2]);
            }
            else if (r[0].value === 0 && r[1].value > 0) {
                moveCelula(r[1],r[2]);
            }
            else if (r[0].value > 0 && r[1].value === 0) {
                moveCelula(r[0],r[2]);
            }else {
                moveCelula(r[1],r[2]);
                moveCelula(r[0],r[1]);   
            }
        }
        else if (r[2].value === r[1].value && r[2].value > 0){
            dobraValorCelula(r[2],r[1]);
            moveCelula(r[0],r[1]);
        }
        else if (r[1].value === r[0].value && r[1].value > 0){
            dobraValorCelula(r[1],r[0]);
        }
    }
}

function paraDireita(){
    moveDireita();
    somaDireita();
    habilitaProximoPasso();
}

function moveEsquerda(){
    for (let r of allRows){
        let soma = 0;
        for(let c of r){
            if(c.value !== 0){
                soma += 1
            }
        }
        if(soma > 0 && soma < 4){
            while (r[0].value === 0){
                moveCelula(r[1],r[0]);
                moveCelula(r[2],r[1]);
                moveCelula(r[3],r[2]);
            }
            if (soma > 1){
                while (r[1].value === 0){
                    moveCelula(r[2],r[1]);
                    moveCelula(r[3],r[2]);
                }
                if (soma === 3 && r[2].value === 0){
                    moveCelula(r[3],r[2]);
                }
            }
        }
    }
}

function somaEsquerda(){
    for (let r of allRows){
        if(r[0].value === r[1].value && r[0].value > 0){
            dobraValorCelula(r[0],r[1]);
            if(r[2].value === r[3].value && r[2].value > 0){
                dobraValorCelula(r[2],r[3]);
                moveCelula(r[2],r[1]);
            }
            else if (r[3].value === 0 && r[2].value > 0) {
                moveCelula(r[2],r[1]);
            }
            else if (r[3].value > 0 && r[2].value === 0) {
                moveCelula(r[3],r[1]);
            }else {
                moveCelula(r[2],r[1]);
                moveCelula(r[3],r[2]);   
            }
        }
        else if (r[2].value === r[1].value && r[2].value > 0){
            dobraValorCelula(r[1],r[2]);
            moveCelula(r[3],r[2]);
        }
        else if (r[2].value === r[3].value && r[2].value > 0){
            dobraValorCelula(r[2],r[3]);
        }
    }
}

function paraEsquerda(){
    moveEsquerda();
    somaEsquerda();
    habilitaProximoPasso();
}

function moveBaixo(){
    for (let col of allCols){
        let soma = 0;
        for(let c of col){
            if(c.value !== 0){
                soma += 1
            }
        }
        if(soma > 0 && soma < 4){
            while (col[3].value === 0){
                moveCelula(col[2],col[3]);
                moveCelula(col[1],col[2]);
                moveCelula(col[0],col[1]);
            }
            if (soma > 1){
                while (col[2].value === 0){
                    moveCelula(col[1],col[2]);
                    moveCelula(col[0],col[1]);
                }
                if (soma === 3 && col[1].value === 0){
                    moveCelula(col[0],col[1]);
                }
            }
        }
    }
}

function somaBaixo(){
    for (let col of allCols){
        if(col[3].value === col[2].value && col[3].value > 0){
            dobraValorCelula(col[3],col[2]);
            if(col[1].value === col[0].value && col[1].value > 0){
                dobraValorCelula(col[1],col[0]);
                moveCelula(col[1],col[2]);
            }
            else if (col[0].value === 0 && col[1].value > 0) {
                moveCelula(col[1],col[2]);
            }
            else if (col[0].value > 0 && col[1].value === 0) {
                moveCelula(col[0],col[2]);
            }else {
                moveCelula(col[1],col[2]);
                moveCelula(col[0],col[1]);   
            }
        }
        else if (col[2].value === col[1].value && col[2].value > 0){
            dobraValorCelula(col[2],col[1]);
            moveCelula(col[0],col[1]);
        }
        else if (col[1].value === col[0].value && col[1].value > 0){
            dobraValorCelula(col[1],col[0]);
        }
    }
}

function paraBaixo(){
    moveBaixo();
    somaBaixo();
    habilitaProximoPasso();
}

function moveCima(){
    for (let col of allCols){
        let soma = 0;
        for(let c of col){
            if(c.value !== 0){
                soma += 1
            }
        }
        if(soma > 0 && soma < 4){
            while (col[0].value === 0){
                moveCelula(col[1],col[0]);
                moveCelula(col[2],col[1]);
                moveCelula(col[3],col[2]);
            }
            if (soma > 1){
                while (col[1].value === 0){
                    moveCelula(col[2],col[1]);
                    moveCelula(col[3],col[2]);
                }
                if (soma === 3 && col[2].value === 0){
                    moveCelula(col[3],col[2]);
                }
            }
        }
    }
}

function somaCima(){
    for (let col of allCols){
        if(col[0].value === col[1].value && col[0].value > 0){
            dobraValorCelula(col[0],col[1]);
            if(col[2].value === col[3].value && col[2].value > 0){
                dobraValorCelula(col[2],col[3]);
                moveCelula(col[2],col[1]);
            }
            else if (col[3].value === 0 && col[2].value > 0) {
                moveCelula(col[2],col[1]);
            }
            else if (col[3].value > 0 && col[2].value === 0) {
                moveCelula(col[3],col[1]);
            }else {
                moveCelula(col[2],col[1]);
                moveCelula(col[3],col[2]);   
            }
        }
        else if (col[2].value === col[1].value && col[2].value > 0){
            dobraValorCelula(col[1],col[2]);
            moveCelula(col[3],col[2]);
        }
        else if (col[2].value === col[3].value && col[2].value > 0){
            dobraValorCelula(col[2],col[3]);
        }
    }
}

function paraCima(){
    moveCima();
    somaCima();
    habilitaProximoPasso();
}


iniciaNovoJogo();

newGameButton.addEventListener("click",iniciaNovoJogo);
returnPlay.addEventListener("click",voltaJogada);

window.addEventListener('keydown', function(e) {
    switch (e.code) {
        case "ArrowLeft":
            paraEsquerda();
            break;
        case "ArrowUp":
           paraCima();
            break;
        case "ArrowRight":
            paraDireita();
            break;
        case "ArrowDown":
            paraBaixo();
            break;
    }
});

window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);

