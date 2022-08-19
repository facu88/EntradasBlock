/////////////slider//////////////////

const slider = document.querySelector(".sliderContenedor")
const imgSlider = document.querySelectorAll(".contenidoSlider")

let contador = 1;
let width = imgSlider[0].clientWidth;
let intervalo = 3000;

document.addEventListener('DOMContentLoaded',()=>{
  slides()
})
window.addEventListener("resize", ()=>{
    width = imgSlider[0].clientWidth;
})

setInterval(()=>{
    slides();
},intervalo);


const slides=()=>{

    slider.style.transform = "translate("+(-width*contador)+"px)";
    slider.style.transition = "transform 1s";
    contador++;

    if(contador == imgSlider.length){
        setTimeout(function(){
            slider.style.transform = "translate(0px)";
            slider.style.transition = "transform 0s";
            contador=1;
        },1500)
    }
}




//formulario/////////////////////////////////////////////////

  $("#formEventos").validate({
    rules: {
      nombre: {
        required: true,
        maxlength: 25,
        minlength:4
      },
      email: {
         email: true,
         required: true,
         maxlength: 75,
         minlength:4
      },
      Direccion:{
        required: true,
        maxlength: 40,
        minlength:4
      },
      FechaHorarios:{
        required: true,
        date: true
      },
      aforo:{
        required: true,
      },
      imagen:{

      },
      select:{
        required:true
      },
      consulta:{
        required:true
      },
      valor:{
        required:true
      }

    },
    messages:{
      nombre:{
        required:'Porfavor ingrese un nombre',
        minlength:'El nombre es demaciado corto'
      },
      email:{
        required:'Porfavor ingrese un email',
        email:'Ingrese un email valido',
      },
      Direccion:{
        required:'Porfavor ingrese una direccion'
      },
      FechaHorarios:{
        required:'Porfavor ingrese una fecha valida',
        date:'Porfavor ingrese una fecha valida',
      },
      //falta agregale mas mensages
    }
  });

  // function enviar_formulario(){
  //    document.formEventos.submit()
  // }
