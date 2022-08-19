 const masOpciones = document.getElementById("bmore");
 const mostrarLinks = document.querySelector("#bmenu");
 const menuMobil = document.querySelector("links");
 const masMenu = document.querySelector(".more .menu");


 mostrarLinks.addEventListener("click",(e)=>{
   e.preventDefault(e);
   menuMobil.classList.toggle("show");
 });

 masOpciones.addEventListener("click",(e)=>{
   e.preventDefault(e);
   masMenu.classList.toggle("show");
 });



const carNAVMain = document.getElementById('carritoHTML');
const templateMenuCarritoMain = document.getElementById('templateMenuCarrito').content;

const fragmentMain = document.createDocumentFragment()


document.addEventListener('DOMContentLoaded', () =>{
  fetchDataMain()
  if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        // impCarrito()
        impMenuCarritoNav()
    }
})

const fetchDataMain = async () =>{
  try {
    const res = await fetch('baseDatos.json')
    const data = await res.json()
    // pintarCards(data)
  } catch (error) {
      console.log(error)
  }
};

carNAVMain.addEventListener('click',e =>{
  botonMMNav(e)
})

const impMenuCarritoNav = () =>{
   carNAVMain.innerHTML = ''
   if (Object.keys(carrito).length === 0) {
       carNAVMain.innerHTML = `<div> <span> Carrito vacio.</span>
       </div>`
       return
   }

    Object.values(carrito).forEach(evento => {
      templateMenuCarritoMain.querySelector('h3').textContent = evento.title
      templateMenuCarritoMain.querySelector('h4').textContent = evento.cantidad
      templateMenuCarritoMain.querySelector('h2').textContent = evento.precio * evento.cantidad
      templateMenuCarritoMain.querySelector('.btn-info').dataset.id = evento.id
      templateMenuCarritoMain.querySelector('.btn-danger').dataset.id = evento.id
  const clone = templateMenuCarritoMain.cloneNode(true)
  fragmentMain.appendChild(clone)
})
    carNAVMain.appendChild(fragmentMain)
    const boton = document.querySelector('.vaciar-carrito')
    boton.addEventListener('click', ()=>{
      carrito={}
      impMenuCarritoNav()
    }

   )
localStorage.setItem('carrito', JSON.stringify(carrito))
  }
  const botonMMNav = e =>{
    if (e.target.classList.contains('btn-info')) {
      const evento = carrito[e.target.dataset.id]
          evento.cantidad++
          carrito[e.target.dataset.id] = { ...evento }

          impMenuCarritoNav()
      }
      if (e.target.classList.contains('btn-danger')) {
          const evento = carrito[e.target.dataset.id]
          evento.cantidad--
          if (evento.cantidad === 0) {
              delete carrito[e.target.dataset.id]
          } else {
              carrito[e.target.dataset.id] = {...evento}
          }

          impMenuCarritoNav()
      }
      e.stopPropagation()

    }
