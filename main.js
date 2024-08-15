const productos = document.getElementById("productos")
const carrito = document.getElementById("carrito")

const Carrito = []

const Productos = [
    {
        titulo: "Across the spiderverse",
        imagen: "./img/across_the_spiderverse.jpg",
        precio: 9000
    },
    {
        titulo:"Happier than ever",
        imagen:"./img/happier_than_ever.jpg",
        precio: 9500
    },
    {
        titulo:"Hit me hard and soft",
        imagen:"./img/hit_me_hard_and_soft.jpg",
        precio: 11000
    },
    {
        titulo:"Currents",
        imagen:"./img/Currents.jpg",
        precio: 10500
    }
]

const creaCarrito = (titulo, precio, cantidad) => {
    const tarjeta = document.createElement("div")
    const tituloDOM = document.createElement("h3")
    const precioDOM = document.createElement("p")
    const cantidadDOM = document.createElement("p")

    tarjeta.classList.add("tarjeta-carrito")
    tituloDOM.classList.add("titulo")
    precioDOM.classList.add("precio")
    cantidadDOM.classList.add("cantidad")
    
    tituloDOM.innerText = titulo
    precioDOM.innerText = "$" + precio
    cantidadDOM.innerText = "x" + cantidad

    tarjeta.appendChild(tituloDOM)
    tarjeta.appendChild(precioDOM)
    tarjeta.appendChild(cantidadDOM)
    
    return tarjeta
}

const actualizaCarrito =() =>{
    carrito.innerHTML = ""
    Carrito.forEach(element =>{
        carrito.appendChild(creaCarrito(element.titulo,element.precio, element.cantidad))
    })
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



Productos.forEach(element => {
    const productoDom = creaCards(element.imagen, element.titulo,element.precio)

    productos.appendChild(productoDom)
});

