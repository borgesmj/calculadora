let num1 = 0
let num2 = 0
let operador = ""
let resultado = ''
let a = ''
let dot = false
const pantalla =  document.querySelector('#pantalla')



const cuerpoDelDocumento = document.body;
cuerpoDelDocumento.onload = miFuncion;

function miFuncion() {
    console.log(`visita mi pagina web https://borgesmj.github.io/`)
}


const loadPage =()=>{
pantalla.innerHTML = ''
}
loadPage()


    function clear(){
        num1 = '';
        num2 = '';
        operador = '';
        resultado = ''
        dot = false
        loadPage();

    }

    function resolver(){
     
        let resultado = 0;
        // console.log(operador)
        switch (operador){
            case '+' : 
            resultado = parseFloat(num1) + parseFloat(num2);

            break;
            case '-' : 
            resultado = parseFloat(num1) - parseFloat(num2);
            break;
            case '*' : 
            resultado = parseFloat(num1) * parseFloat(num2);
            break;
            case '/' : 
            resultado = parseFloat(num1) / parseFloat(num2);
            break;
        }
        loadPage()
        pantalla.textContent = resultado
    }

    
    const escribirEnPantalla = (e) => {
        const numero = e.target.innerHTML;

        if (numero === '.' && dot){
            return
        } else if (numero === '.'){
            dot = true
        }
            pantalla.textContent = pantalla.textContent + numero
        }

    
    
    const establecerOperador = (e) =>{
        operador = e.target.innerHTML;
        num1 = pantalla.textContent
        // console.log(operador)
        loadPage()
    }


    const igual  = document.querySelector('#igual').addEventListener('click', function(){
        num2 = pantalla.textContent
        resolver()
    })


    const teclas = document.querySelectorAll('.numero')
    teclas.forEach(element => {
        element.addEventListener('click', escribirEnPantalla)})


    const operacion = document.querySelectorAll('.operador')
    operacion.forEach(element =>{
        element.addEventListener('click', establecerOperador)
    })


    document.querySelector("#borrar").addEventListener('click', clear)

    document.querySelector('#punto').addEventListener('click', escribirEnPantalla)


