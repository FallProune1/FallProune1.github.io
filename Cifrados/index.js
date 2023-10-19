const desplazamiento =  document.getElementById("desplazamiento");
const texto = document.getElementById("texto");
const textoCifrado = document.getElementById("cifrado");
const desplazamientod =  document.getElementById("desplazamientod");
const textod = document.getElementById("textod");
const textoDecifrado = document.getElementById("decifrado");

function cifrado(){
    const textoIngresado = texto.value;
    textoCifrado.value = textoIngresado.split('').map(c  => {
        let mayus = (c === c.toUpperCase()) ?  true :
        false;
        // ? valor ternario un if pero chiquito */
        let valorEntero = c.toLowerCase().charCodeAt(0);
        if(valorEntero >= 97 && valorEntero <= 122){
            const valorDesplazamieno = parseInt(desplazamiento.value);
            /*if(valorEntero + valorDesplazamieno > 122){
                valorEntero = 96+ (valorEntero - 122) + valorDesplazamieno ;
            }else{
                valorEntero = valorEntero + valorDesplazamieno;
            }*/  
            valorEntero -= 97;
            valorEntero = ((valorEntero + valorDesplazamieno) % 26) + 97;
            
        }
        let cifrado = String.fromCharCode(valorEntero);
        return mayus ? cifrado.toUpperCase() : cifrado;
    }).join(' ');
}

function decifrado(){
    const textoIngresado = textod.value;
    textoDecifrado.value = textoIngresado.split('').map(c =>{
        let mayus = (c === c.toUpperCase()) ? true :false;
        let valorEntero = c.toLowerCase().charCodeAt(0);
        if(valorEntero  >= 97 && valorEntero <= 122){
            
            /*if(valorEntero - valorDesplazamiento < 97){
                valorEntero = 123 - (97 - (valorEntero-valorDesplazamiento));
            }else{
                valorEntero = valorEntero - valorDesplazamiento;
            }*/
            const valorDesplazamietod = parseInt(desplazamientod.value);

            valorEntero -= 97;
            valorEntero = ((valorEntero - valorDesplazamietod) % 26);

            if(valorEntero<0){
                valorEntero = valorEntero +123
            }else{
                valorEntero= valorEntero+97
            }
        }
        let decifrado = String.fromCharCode(valorEntero);
        return mayus ? decifrado.toUpperCase() : decifrado;
    }).join(' ');
}

texto.addEventListener("keyup", cifrado);
desplazamiento.addEventListener("change", cifrado);

textod.addEventListener("keyup", decifrado);
desplazamientod.addEventListener("change", decifrado);


var viggenere = viggenere || (function(){

    var doStaff = function(txt, desp, action){
        var replace = (function(){
            //ABC   
            var abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 
        'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q',
    'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
            var l = abc.length;

            return function(c){
                var i = abc.indexOf(c.toLowerCase());
                if(i != -1){
                    var pos = i;
                    if(action){
                        //cifrar
                        pos += desp;
                        pos = (pos >= l )?pos-l:pos;
                    }else{
                        //descifrar
                        pos -= desp;
                        pos = (pos < 0 )?l+pos:pos;
                    }
                    return abc[pos];
                }
                return c;
            };
        })();

        //validar
        var re = (/([a-z])/ig);

        return String(txt).replace(re, function(match){
            return replace(match);
        });
    };
    return{
        //si vamos a codificar o decodificar
        encode : function(txt, desp){
            return doStaff(txt, desp, true);
        },
        decode : function(txt, desp){
            return  doStaff(txt, desp, false);
        }
    }; 
})();

function longitudCifrar(){
    camposVacios();
    var texto = document.getElementById("texto").value;
    var clave = document.getElementById("txtClave").value;

    if(clave.length > texto.length){
        alert("La clave no puede ser mas larga que el texto a cifrar");
    }else{
        codificar(texto, clave);
    }
}


function longitudDescifrar(){
    camposVacios();
    var texto = document.getElementById("texto").value;
    var clave = document.getElementById("txtClave").value;

    if(clave.length > texto.length){
        alert("La clave no puede ser mas larga que el texto a cifrar");
    }else{
        decodificar(texto, clave);
    }
}

function codificar(texto, clave){

    var resultado = "";
    var indiceClave = 0;
    var charArTexto = texto.split('');

    for(var i = 0; i < charArTexto.length; i++){

        var des = obindiceClave(clave.charAt(indiceClave));
        var charTexto = charArTexto[i];

        resultado += viggenere.encode(charTexto, (des >= 26)? des%26 : des);
        indiceClave++;

        if(indiceClave >= clave.length){
            indiceClave = 0;
        }

        document.getElementById("res").value = resultado; 
    }
}


function decodificar(texto, clave){

    var resultado = "";
    var indiceClave = 0;
    var charArTexto = texto.split('');

    for(var i = 0; i < charArTexto.length; i++){

        var des = obindiceClave(clave.charAt(indiceClave));
        var charTexto = charArTexto[i];

        resultado += viggenere.decode(charTexto, (des >= 26)? des%26 : des);
        indiceClave++;

        if(indiceClave >= clave.length){
            indiceClave = 0;
        }

        document.getElementById("res").value = resultado; 
    }
}

function obindiceClave(reco){
    var abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 
        'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q',
    'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    return abc.indexOf(reco.toLowerCase());
}

function camposVacios(){
    var texto = document.getElementById("texto").value;
    var clave = document.getElementById("txtClave").value;

    if(texto == ""){
        alert("El texto a cifrar no puede estar vacio");
    }if(clave == ""){
        alert("La clave no puede estar vacia");
    }
}

function colocar(){
    var copiado = document.getElementById("res").value;
    document.getElementById("texto").value = copiado;   
}

function reiniciar(){
    document.getElementById("texto").value = "";
    document.getElementById("txtClave").value = "";
    document.getElementById("res").value = "";
}