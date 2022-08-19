  // function confirmarDato(texto, variable) {
  //     let dato = prompt(texto);
  //     while (dato == `` || dato == null) {
  //         alert(`No entendi tu ${variable}, repitelo por favor`);
  //         dato = prompt(texto);
  //     }
  //     return dato;
  // }
const singUp= document.getElementsByClassName('singUp')
let usuarios = [];

class Usuario {
    constructor(nombreUsuario, nombreApellido, contrasenia, email) {
        this.nombreusuario = nombreUsuario;
        this.nombreApellido = nombreApellido;
        this.contrasenia = contrasenia;
        this.email = email;
    }
}

function crearUsuario() {
    let nombreUsuario = document.getElementsByClassName('userName').value;

    let nombreApellido = document.getElementsByClassName('name').value;

    let email = document.getElementsByClassName('email').value;

    let contrasenia = document.getElementsByClassName('password').value;

   return new Usuario(nombreUsuario, nombreApellido, contrasenia, email);

}
singUp.addEventListener('click').usuarios.push(new crearUsuario());
// let cliente = crearUsuario();
console.log(usuarios)
// for(const usuario of crearUsuario()){
// alert(`Bienvenido a tkt\chain ${usuario}`);
// }
