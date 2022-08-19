const eventos = document.getElementById('eventos');
const items = document.getElementById('items');
const footer = document.getElementById('footer');
const carNAV = document.getElementById('carritoHTML');

const templateCard = document.getElementById('template-card').content;
const templateFooter = document.getElementById('template-footer').content;
const templateCarrito = document.getElementById('template-carrito').content;
const templateMenuCarrito = document.getElementById('templateMenuCarrito').content;

const fragment = document.createDocumentFragment()

let carrito = {}

document.addEventListener('DOMContentLoaded', () =>{
  fetchData()
  if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        impCarrito()
        impMenuCarrito()
    }
})
eventos.addEventListener('click', e =>{
  addCarrito(e)
})
items.addEventListener('click',e =>{
  botonMM(e)
})
carNAV.addEventListener('click',e =>{
  botonMM(e)
})

const fetchData = async () =>{
  try {
    const res = await fetch('baseDatos.json')
    const data = await res.json()
    pintarCards(data)
    // filtro(data)
  } catch (error) {
      console.log(error)
  }
};
//imprimir base de datos
const pintarCards = data => {
  data.forEach(eventos =>{
    templateCard.querySelector('h5').textContent = eventos.title
    templateCard.querySelector('p').textContent = eventos.precio
    templateCard.querySelector('img').setAttribute('src', eventos.imagenUrl)
    templateCard.querySelector('.btn-dark').dataset.id = eventos.id

    const clone = templateCard.cloneNode(true)
    fragment.appendChild(clone)
  })
  eventos.appendChild(fragment)

}



const addCarrito = e =>{
  if(e.target.classList.contains('btn-dark')){
    setCarrito(e.target.parentElement)
    Toastify({
      text: "\uD83D\uDE80 Tiket al carrito\u2728",
      duration: 900,
      style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
      margintop:100
    },

    }).showToast();
  }
  e.stopPropagation()
}

const setCarrito = objeto =>{
  const evento ={
    id:objeto.querySelector('.btn-dark').dataset.id,
    title: objeto.querySelector('h5').textContent,
    precio: objeto.querySelector('p').textContent,
    cantidad: 1
  }
  // TODO: cambiar el if por &&///////////////////////////////////////////
  if(carrito.hasOwnProperty(evento.id)){
    evento.cantidad = carrito[evento.id].cantidad + 1
  }
  carrito[evento.id] = {...evento}
   impCarrito()
   impMenuCarrito()

}


const impCarrito = ()=>{

  items.innerHTML=""
  Object.values(carrito).forEach(evento => {
    templateCarrito.querySelector('th').textContent = evento.id
    templateCarrito.querySelectorAll('td')[0].textContent = evento.title
    templateCarrito.querySelectorAll('td')[1].textContent = evento.cantidad
    templateCarrito.querySelector('span').textContent = evento.precio * evento.cantidad
    templateCarrito.querySelector('.btn-info').dataset.id = evento.id
    templateCarrito.querySelector('.btn-danger').dataset.id = evento.id
const clone = templateCarrito.cloneNode(true)
fragment.appendChild(clone)
  });
  items.appendChild(fragment)
 impfooter()
 localStorage.setItem('carrito', JSON.stringify(carrito))
}

const impfooter=()=>{
  footer.innerHTML = ''
    if (Object.keys(carrito).length === 0) {
        footer.innerHTML = `<th scope="row" colspan="5">Carrito vacío.</th>`
        return
    }

  const nCantidad = Object.values(carrito).reduce((acc, { cantidad }) =>  acc + cantidad,0)
  const nPrecio = Object.values(carrito).reduce((acc, { cantidad, precio }) =>  acc + cantidad*precio,0)


  templateFooter.querySelectorAll("td")[0].textContent = nCantidad
  templateFooter.querySelector("span").textContent = nPrecio
  const clone = templateFooter.cloneNode(true)
  fragment.appendChild(clone)
  footer.appendChild(fragment)
  const boton = document.querySelectorAll('.vaciar-carrito')
  boton.forEach(boton => {
    boton.addEventListener('click',()=>{
      carrito={}
      impCarrito()
      impMenuCarrito()
    })
})

}


const botonMM = e =>{
  if (e.target.classList.contains('btn-info')) {
    const evento = carrito[e.target.dataset.id]
        evento.cantidad++
        carrito[e.target.dataset.id] = { ...evento }
        impCarrito()
        impMenuCarrito()
    }
    if (e.target.classList.contains('btn-danger')) {
        const evento = carrito[e.target.dataset.id]
        evento.cantidad--
        if (evento.cantidad === 0) {
            delete carrito[e.target.dataset.id]
        } else {
            carrito[e.target.dataset.id] = {...evento}
        }
        impCarrito()
        impMenuCarrito()
    }
    e.stopPropagation()

  }

const impMenuCarrito = () =>{
   carNAV.innerHTML = ''
   if (Object.keys(carrito).length === 0) {
       carNAV.innerHTML = `<div> <span> Carrito vacio.</span>
       </div>`
       return
   }

    Object.values(carrito).forEach(evento => {
      templateMenuCarrito.querySelector('h3').textContent = evento.title
      templateMenuCarrito.querySelector('h4').textContent = evento.cantidad
      templateMenuCarrito.querySelector('h2').textContent = evento.precio * evento.cantidad
      templateMenuCarrito.querySelector('.btn-info').dataset.id = evento.id
      templateMenuCarrito.querySelector('.btn-danger').dataset.id = evento.id
  const clone = templateMenuCarrito.cloneNode(true)
  fragment.appendChild(clone)
})
    carNAV.appendChild(fragment)
localStorage.setItem('carrito', JSON.stringify(carrito))
  }

  function redirect()
    {

    window.location.href="cardEvento.html";
    }

// Busqueda por indexOf//////////////////77
// const busqueda =document.getElementById('buscador')
// const boton = document.getElementById('botonB')
// const resultado = document.querySelector('result')
//
//
//  const filtro = ()=>{
//      console.log(busqueda.value)
//      const texto = busqueda.value.toLowerCase()
//      for(let eventos of fetch('baseDatos.json') ){
//        let nombre = eventos.title.toLowerCase()
//        if (nombre.indexOf(texto)!== -1){
//          texto.forEach(eventos =>{
//            templateCard.querySelector('h5').textContent = eventos.title
//            templateCard.querySelector('p').textContent = eventos.precio
//            templateCard.querySelector('img').setAttribute('src', eventos.imagenUrl)
//            templateCard.querySelector('.btn-dark').dataset.id = eventos.id
//
//            const clone = templateCard.cloneNode(true)
//            fragment.appendChild(clone)
//          })
//          eventos.appendChild(fragment)
//        }
//       }
//      }
//
//
//  boton.addEventListener('click',filtro())
