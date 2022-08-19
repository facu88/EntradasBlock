const templateEvento= document.getElementById('mostrarEvento').content

const fragment = document.createDocumentFragment()



document.addEventListener('DOMContentLoaded', () =>{
  fetchData()
  if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
      // LLAMAR A FUNCIONES  PARA CARGAR DATOS DE JSON
      pintarCard()
    }
})

const fetchData = async () =>{
  try {
    const res = await fetch('baseDatos.json')
    const data = await res.json()
    pintarCard(data)
    // filtro(data)
  } catch (error) {
      console.log(error)
  }
};
const pintarCard = data => {
  data.forEach(evento =>{
    templateEvento.getElementsByClassName("titulo").textContent= evento.title
    templateEvento.getElementsByClassName("precio").textContent = evento.precio
    templateEvento.getElementsByClassName("img").setAttribute('src', evento.imagenUrl)
    templateEvento.getElementsByClassName("btnCompra").dataset.id = evento.id

    const clone = templateCard.cloneNode(true)
    fragment.appendChild(clone)
  })
  eventos.appendChild(fragment)

}
