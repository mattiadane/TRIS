//variabili visibili nella pagina html
var celle = Array.from(document.getElementsByClassName("celle")); // seleziona tutti gli elementi con classe celle(div)
var button = document.querySelector("button"); //seleziona il bottone
var testo = document.querySelector("h1"); //seleziona il titolo
var testo2 = document.getElementById("turno"); //seleziona il titolo con id turno
var testo3 = document.getElementById("testo3"); //seleziona il titolo con id testo3
var testo4 = document.getElementById("testo4"); //seleziona il titolo con id testo4
//variabili contatore  
var contatore_x = 0; //conta vittorie di x 
var contatore_o = 0;  //conta vittorie di o
var contatore_round = 1; //conta i round

const x_testo = "X";
const o_testo = "O";
var giocatore_attuale = x_testo;
var turno = o_testo;
var spazi = Array(9).fill(null); //array di 9 nove elementi , tutti i nove sono inizilizzati a  null
// combinazioni vincenti 
const combinazioni_vincenti = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
 // assegno ad ogni cella l'evento click richiamando la funzione click
function gioca(){
    celle.forEach(function(celle) {
        aggiungi_click(celle);
    });
}
function click(celle) {
    var id = celle.target.id // prendo gli id dei div dalla pagina html 
    if (spazi[id] == null) { 
        spazi[id] = giocatore_attuale;  
        celle.target.innerText = giocatore_attuale; 
        testo.innerText = "round " + contatore_round;
        testo2.innerText = "turno di " + turno;

        if (vincitore()) {
            testo.innerText = giocatore_attuale + " ha vinto";
            testo2.innerText = "per avviare un altro round premere ricomincia";
            contatore_round++;
            contatore_vittorie();

        } else if (pareggio()){
            testo.innerText = "pareggio";
            testo2.innerText = "per avviare un altro round premere ricomincia";
            contatore_round++;
            
        }

        scambia_giocatore();
    
    } else {
        rimuovi_click(celle.target);
    }
}
//aggiunge evento click
function aggiungi_click(celle) {
    celle.addEventListener("click",click);
}
//rimuove evento click 
function rimuovi_click(celle){
    celle.removeEventListener("click",click,false);
}
// scambia il giocatore e il turno in base al click precedente
function scambia_giocatore(){
    if (giocatore_attuale == x_testo) {
        giocatore_attuale = o_testo;
        turno = x_testo;
    } else {
        giocatore_attuale = x_testo;
        turno = o_testo;
    }
}
//funzione per decreatare un vincitore in base alle combinazioni vincenti 
function vincitore() {
    var trovato = false;
    for (let i = 0; i < combinazioni_vincenti.length && trovato==false; i++) {
        var [a, b, c] = combinazioni_vincenti[i];
        if (spazi[a] != null && spazi[a] == spazi[b] && spazi[a] == spazi[c]) {
            trovato = true;
            colora([a,b,c]);         
            celle.forEach(function (celle) {
                rimuovi_click(celle);  
            });
            return [a, b, c];
        }
    }
}
//controlla che tutte le caselle siano  scritte con x oppure o 
function pareggio(){
    return spazi.every(function(spazi){
        if(spazi==x_testo || spazi==o_testo) {
            return true;
        }
    });
}
//colora le celle vincenti prendendo la classe vincitore dal style.css
function colora(combinazioni) {
    combinazioni.forEach(function(i){
        celle[i].classList.add("vincitore");
    });
}
// conta le vittorie di x oppure o e il primo che arriva a 3 vittorie vince il torneo 
function contatore_vittorie(){
    if(giocatore_attuale==x_testo){
        contatore_x++;
    }else{
        contatore_o++;
         
    }
    testo4.innerHTML = "o " + contatore_o;
    testo3.innerHTML = "x " + contatore_x; 
    if(contatore_x==3 || contatore_o==3){
        ricomincia_torneo();
    }
}
//decreta il vincitore del torneo resetta alcuni campi 
function ricomincia_torneo(){
    testo.innerText = "torneo vinto da  " + giocatore_attuale;
    testo2.innerText = "Per ricominciare un nuovo torneo ricarica la pagina";
    testo3.innerText = "";
    testo4.innerText = "";
    pagina_precedente();
    rimuovi_tris();
    grafico_torta();    
    
}
// trasformo il bottone in modo tale che non ricominici più la partita ma che ricarichi la pagina quindi torna alla pagina home
function pagina_precedente(){
    button.innerText = "Ricarica la Pagina";
    button.addEventListener("click",function(){
        window.open("../index.html","_self");
        window.close("../html/index.html");
    });
}
// rimuove tutti gli elementi in questo caso sono div  al interno del div con id tris
function rimuovi_tris(){
    var div = document.getElementById("tris");
    while(div.firstChild){
        div.removeChild(div.firstChild);
    }
}
//crea un grafico a torta 
function grafico_torta(){
    var oggetto = {
        giocatori : [x_testo,o_testo],
        partiteVinte : [contatore_x,contatore_o],
        colori : ["white", "black",]
    };
    new Chart("canvas", {
        type: "pie",
        data: {
        labels: oggetto.giocatori,
        datasets: [{
            backgroundColor : oggetto.colori,
            data : oggetto.partiteVinte
        }]
        },
    options: {
            title: {
            display: true,
            text: "Grafico vittorie"
            }
        }
    });
}
// resetta tutti i campi e le variabili vengono portate come all'inizio
button.addEventListener("click", function(){
    spazi.fill(null);
    celle.forEach(function (celle) {
        aggiungi_click(celle);
        celle.innerHTML = "";
        celle.classList.remove("vincitore");
    });
    testo.innerText = "tris";
    testo2.innerText = "";
    turno = o_testo;
    giocatore_attuale = x_testo;
});
// richiamo la funzione per giocare
gioca();