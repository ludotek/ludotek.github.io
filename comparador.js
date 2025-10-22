


var imagenes = ["/filminas/chim.png", "/filminas/chim2.png"];

//Imagenes sacadas de este post: 
//http://www.mountainphotographer.com/same-place-different-season/

cargarImagenes(imagenes);
selectores();

function cargarImagenes(imagenes) {

    if (imagenes.length != 2) {
        console.error("Solo puedes comparar dos imagenes");
        return;
    }

    var divComp = document.getElementById("comparador"),
        img1 = new Image(),
        img2 = new Image(),
        contenedorImg2 = document.createElement("div"),
        agarre = document.createElement("div");

    divComp.innerHTML = "";

    contenedorImg2.setAttribute("id", "flotante");

    //Cargamos la primera Imagen
    img1.src = imagenes[0];
    divComp.appendChild(img1);
    img1.onload = function () {
        var resta = divComp.clientWidth / 2;
        moverFlotante(img1, img2, contenedorImg2, divComp, agarre, resta);
    }
    divComp.setAttribute("img1", "Restaurada");

    //Cargamos la segunda imagen
    img2.src = imagenes[1];
    contenedorImg2.appendChild(img2);
    divComp.appendChild(contenedorImg2);
    divComp.setAttribute("img2", "Original");

    //Cargamos el agarre
    agarre.setAttribute("id", "agarre");

    imagenes = [];

    var mover = false;
    var pending = false;
    var lastResta = null;

    function safeMover(resta) {
        // Limitar valores extremos
        if (resta < 0) resta = 0;
        if (resta > divComp.clientWidth) resta = divComp.clientWidth;
        return resta;
    }

    function rafMover(resta) {
        lastResta = safeMover(resta);
        if (!pending) {
            pending = true;
            requestAnimationFrame(function () {
                moverFlotante(img1, img2, contenedorImg2, divComp, agarre, lastResta);
                pending = false;
            });
        }
    }

    agarre.addEventListener("mousedown", function () {
        mover = true;
    });

    divComp.addEventListener("mouseup", function () {
        mover = false;
    });

    divComp.addEventListener("mousemove", function (e) {
        if (mover) {
            var resta = e.clientX - divComp.getBoundingClientRect().left;
            rafMover(divComp.clientWidth - resta);
        }
    });

    divComp.addEventListener("touchstart", function () {
        mover = true;
    });

    divComp.addEventListener("touchend", function () {
        mover = false;
    });

    divComp.addEventListener("touchmove", function (e) {
        if (mover) {
            var resta = divComp.clientWidth - e.touches[0].clientX;
            rafMover(resta);
        }
    });

    divComp.appendChild(agarre);
    window.onresize = function () {
        var resta = agarre.getBoundingClientRect().right;
        moverFlotante(img1, img2, contenedorImg2, divComp, agarre, resta);
    }

}

function moverFlotante(img1, img2, contenedorImg2, divComp, agarre, resta) {

    if (resta - 5 < 0) {
        resta = 0;
    }
    if (resta > divComp.clientWidth) {
        resta = divComp.clientWidth;
    }

    agarre.style.right = (resta - 5) + "px";

    img2.style.minWidth = img1.clientWidth + "px";

    var porcentaje = (resta / divComp.clientWidth) * 100;
    if (porcentaje > 100) {
        porcentaje = 100;
    }
    if (porcentaje < 0) {
        porcentaje = 0;
    }
    contenedorImg2.style.height = img1.clientHeight + "px";
    contenedorImg2.style.width = (100 - porcentaje) + "%";


    var anchoPseudo = parseFloat(window.getComputedStyle(divComp, ':before').width.replace("px", ""));

    if (divComp.clientWidth - resta < anchoPseudo) {
        divComp.setAttribute("class", "ocultarBefore");
    } else {
        divComp.removeAttribute("class");
    }

}

var imagenesFicheros = {
    fich1: "",
    fich2: ""
}

/*Funcion que inicializa los selectores*/
function selectores() {
    var url1 = document.getElementById("imagen1Url"),
        url2 = document.getElementById("imagen2Url"),
        fich1 = document.getElementById("imagen1File"),
        fich2 = document.getElementById("imagen2File"),
        botones = document.querySelectorAll(".fichero");

    for (var i = 0; i < botones.length; i++) {
        botones[i].addEventListener("click", function () {
            this.nextElementSibling.click();
        })
    }

    fich1.addEventListener("change", cargarImagen);
    fich2.addEventListener("change", cargarImagen);

    document.getElementById("procesar").addEventListener("click", function () {
        var urlFinal1 = "",
            urlFinal2 = "";

        if (url1.value != "") {
            urlFinal1 = url1.value;
            imagenesFicheros.fich1 = url1.value;
        }

        if (url2.value != "") {
            urlFinal2 = url2.value;
            imagenesFicheros.fich2 = url2.value;
        }

        console.log(imagenesFicheros)

        if (urlFinal1 != "" && urlFinal2 != "") {
            imagenesFicheros.fich1 = "";
            imagenesFicheros.fich2 = "";
            url1.value = "";
            url2.value = "";
            cargarImagenes([urlFinal1, urlFinal2]);
        } else if (imagenesFicheros.fich1 != "" && imagenesFicheros.fich2 != "") {
            cargarImagenes([imagenesFicheros.fich1, imagenesFicheros.fich2]);
        } else {
            alert("Tienes que seleccionar dos imágenes")
        }


    });
}

function cargarImagen(evt) {


    var tgt = evt.target || window.event.srcElement,
        files = tgt.files,
        botones = document.querySelectorAll(".selector button, #procesar");



    if (FileReader && files && files.length) {
        var fr = new FileReader(),
            that = this;

        for (var i = 0; i < botones.length; i++) {
            botones[i].disabled = "true";
        }

        fr.onload = function () {
            imagenesFicheros[that.title] = fr.result;
            for (var i = 0; i < botones.length; i++) {
                botones[i].removeAttribute("disabled");
            }
        }
        fr.readAsDataURL(files[0]);
    }
}






















