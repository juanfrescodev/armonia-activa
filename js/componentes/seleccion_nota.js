COMPONENTES.seleccion_nota=function(
paso,
cont,
motor,
render
){


cont.innerHTML="";


const card=document.createElement("div");


card.className=
"bg-slate-800 p-6 rounded-2xl space-y-6";



card.innerHTML=`

<h2 class="text-2xl font-bold text-indigo-400">
${paso.pregunta}
</h2>


<button
id="escuchar"
class="w-full p-4 rounded-xl bg-indigo-600 hover:bg-indigo-500">
🔊 Escuchar
</button>


<div id="opciones"
class="space-y-3">
</div>


<div id="mensaje"
class="text-center font-bold">
</div>

`;


cont.appendChild(card);



let respondido=false;



const opciones=
document.getElementById("opciones");


const mensaje=
document.getElementById("mensaje");




document.getElementById("escuchar")
.onclick=()=>{


reproducirNotas(
[
paso.nota
]
);


};




paso.opciones.forEach((opcion,index)=>{


const boton=document.createElement("button");


boton.className=
"w-full p-4 rounded-xl bg-slate-700 hover:bg-slate-600 transition";



boton.innerText=
opcion;



boton.onclick=()=>{


if(respondido) return;



// marcar visualmente selección

boton.classList.remove(
"bg-slate-700"
);


boton.classList.add(
"bg-indigo-500"
);



respondido=true;



if(index===paso.correcta){



boton.classList.remove(
"bg-indigo-500"
);


boton.classList.add(
"bg-emerald-600"
);



mensaje.innerText=
"✓ Correcto";


mensaje.className=
"text-emerald-400 font-bold text-center";



setTimeout(()=>{


motor.siguientePaso();


if(motor.termino()){


terminarMision();


}else{


render();


}


},1000);



}else{



boton.classList.remove(
"bg-indigo-500"
);


boton.classList.add(
"bg-red-600"
);



mensaje.innerText=
"✗ Esa no es. Escuchá otra vez.";


mensaje.className=
"text-red-400 font-bold text-center";



setTimeout(()=>{


respondido=false;


boton.classList.remove(
"bg-red-600"
);


boton.classList.add(
"bg-slate-700"
);


mensaje.innerText="";


},1200);



}



};



opciones.appendChild(boton);



});



};