const productos = document.getElementById("productos")
const carrito = document.getElementById("carrito")

const Carrito = []

const Productos = [
    {
        titulo: "Across the spiderverse",
        imagen: "./img/across_the_spiderverse.jpg",
        precio: "9000"
    },
    {
        titulo:"Happier than ever",
        imagen:"./img/happier_than_ever.jpg",
        precio: "9500"
    },
    {
        titulo:"Hit me hard and soft",
        imagen:"./img/hit_me_hard_and_soft.jpg",
        precio: "9500"
    },
    {
        titulo:"Currents",
        imagen:"./img/Currents.jpg",
        precio: "9500"
    }
]

const creaCards = (imagen, titulo, precio) => {
    const tarjeta = document.createElement("div")
    const imagenDOM = document.createElement("img")
    const tituloDOM = document.createElement("h3")
    const precioDOM = document.createElement("p")
    
    tarjeta.classList.add("tarjeta")
    imagenDOM.classList.add("imagen")
    tituloDOM.classList.add("titulo")
    precioDOM.classList.add("precio")

    tituloDOM.innerText = titulo
    precioDOM.innerText = "$" + precio
    imagenDOM.src = imagen
    
    tarjeta.appendChild(imagenDOM)
    tarjeta.appendChild(tituloDOM)
    tarjeta.appendChild(precioDOM)
    
    return tarjeta
}

Productos.forEach(element => {
    const productoDom = creaCards(element.imagen, element.titulo,element.precio)

    productos.appendChild(productoDom)
});