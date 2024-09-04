const productos = document.getElementById("productos")
const carrito = document.getElementById("carrito")

const svgBorraItem = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width="24px" fill="#080808"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>'
const svgBorraCarrito = '<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 -960 960 960" width="24px" fill="#080808"><path d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z"/></svg>'

const Carrito = JSON.parse(localStorage.getItem("carrito")) || []

const sumaCarrito = (titulo) => {

    const producto = Carrito.find (element =>{
        return element.titulo === titulo
    })
    producto.cantidad += 1
    
    actualizaCarrito()
}

const restaCarrito = (titulo) => {

    const producto = Carrito.find (element =>{
        return element.titulo === titulo
    })
    if(producto.cantidad<=1){
        let arrayTitulos = Carrito.map(element =>{
            return element.titulo
        })
        console.log(arrayTitulos)
        let index = arrayTitulos.indexOf(titulo)
        Carrito.splice(index,1)
    }else{
        producto.cantidad -= 1
    }
    
    actualizaCarrito()
}

const borraItem = (titulo) =>{
    let arrayTitulos = Carrito.map(element =>{
        return element.titulo
    })
    console.log(arrayTitulos)
    let index = arrayTitulos.indexOf(titulo)
    Carrito.splice(index,1)
    actualizaCarrito()
}

const borraCarrito = ()=> {
    Carrito.length = 0
    actualizaCarrito()
}

const creaCarrito = (titulo, precio, cantidad) => {
    const tarjeta = document.createElement("div")
    const tituloDOM = document.createElement("h3")
    const precioDOM = document.createElement("p")
    const contieneCantidad = document.createElement("div")
    const cantidadDOM = document.createElement("p")
    const botonMasDOM = document.createElement("button")
    const botonMenosDOM = document.createElement("button")
    const botonBorraItemDOM = document.createElement("button")

    tarjeta.classList.add("tarjeta-carrito")
    tituloDOM.classList.add("titulo")
    precioDOM.classList.add("precio")
    cantidadDOM.classList.add("cantidad")
    botonMasDOM.classList.add("boton-mas-menos","hover-botones")
    botonMenosDOM.classList.add("boton-mas-menos","hover-botones")
    contieneCantidad.classList.add("cantidades-productos")
    botonBorraItemDOM.classList.add("boton-borrar","hover-botones")
 
    tituloDOM.innerText = titulo
    precioDOM.innerText = "$" + precio
    cantidadDOM.innerText = "x" + cantidad

    botonMasDOM.innerText = "+"
    botonMenosDOM.innerText = "-"
    botonBorraItemDOM.innerHTML = svgBorraItem
    
    botonMasDOM.addEventListener("click", ()=>{
        sumaCarrito(titulo)
    })
    botonMenosDOM.addEventListener("click", ()=>{
        restaCarrito(titulo)
    })
    botonBorraItemDOM.addEventListener("click", ()=>{
        borraItem(titulo)
    })

    contieneCantidad.appendChild(botonMenosDOM)
    contieneCantidad.appendChild(cantidadDOM)
    contieneCantidad.appendChild(botonMasDOM)
    contieneCantidad.appendChild(botonBorraItemDOM)

    tarjeta.appendChild(tituloDOM)
    tarjeta.appendChild(precioDOM)
    tarjeta.appendChild(contieneCantidad)
    
    return tarjeta
}

const actualizaCarrito =() =>{
    carrito.innerHTML = ""

    const totalDOM = document.createElement("h3")
    const total = Carrito.reduce((acumulador, element)=>{
        return acumulador + element.cantidad * element.precio
    },0)
    console.log(total)

    totalDOM.innerText = "$" + total

    const tarjetaBotonesComprarOBorrar = document.createElement("div")
    const botonComprar = document.createElement ("button")
    const botonBorraCarritoDOM = document.createElement ("button")

    tarjetaBotonesComprarOBorrar.classList.add("botones-compra-borra")
    botonComprar.classList.add("boton-compra","hover-botones")
    botonBorraCarritoDOM.classList.add("boton-borra","hover-botones")
    
    botonComprar.innerText = "Realizar Compra"
    botonBorraCarritoDOM.innerHTML = svgBorraCarrito
    
    tarjetaBotonesComprarOBorrar.appendChild(botonComprar)
    tarjetaBotonesComprarOBorrar.appendChild(botonBorraCarritoDOM)

    botonBorraCarritoDOM.addEventListener("click", ()=>{
        borraCarrito()
    })

    Carrito.forEach(element =>{
        carrito.appendChild(creaCarrito(element.titulo,element.precio, element.cantidad))
        carrito.appendChild(totalDOM)
        carrito.appendChild(tarjetaBotonesComprarOBorrar)
    })

    localStorage.setItem("carrito", JSON.stringify(Carrito))
}

const agregaCarrito = (titulo, precio) => {
    const bool = Carrito.some(element =>{
       return element.titulo === titulo
    })
    if(bool){
        const producto = Carrito.find (element =>{
            return element.titulo === titulo
        })
        producto.cantidad += 1
    }else{
        Carrito.push({
            titulo,
            precio,
            cantidad: 1
        })
    }
    actualizaCarrito()
}

const creaCards = (imagen, titulo, precio) => {
    const tarjeta = document.createElement("div")
    const imagenDOM = document.createElement("img")
    const tituloDOM = document.createElement("h3")
    const precioDOM = document.createElement("p")
    const botonDOM = document.createElement("button")

    botonDOM.classList.add("hover-botones")
    tarjeta.classList.add("tarjeta")
    imagenDOM.classList.add("imagen")
    tituloDOM.classList.add("titulo")
    precioDOM.classList.add("precio")

    tituloDOM.innerText = titulo
    precioDOM.innerText = "$" + precio
    botonDOM.innerText = "comprar"
    imagenDOM.src = imagen

    botonDOM.addEventListener("click", () =>{
        agregaCarrito(titulo, precio)
    })

    tarjeta.appendChild(imagenDOM)
    tarjeta.appendChild(tituloDOM)
    tarjeta.appendChild(precioDOM)
    tarjeta.appendChild(botonDOM)
    
    return tarjeta
}

const llamaProductos = async ()=>{
    let respuesta = await fetch ("./productos.json")
    let data = await respuesta.json()

    data.Productos.forEach(element => {
        const productoDom = creaCards(element.imagen, element.titulo, element.precio)
        productos.appendChild(productoDom)
    });
}

document.addEventListener("DOMContentLoaded",  ()=>{
    actualizaCarrito();
    llamaProductos();
})
