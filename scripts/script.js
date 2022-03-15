

//                                     ############   Clases   ################

class Registro {
    constructor(codigo, fecha, monto, descripcion) {
        this.fecha = fecha
        this.monto = monto
        this.descripcion = descripcion
        this.codigo = codigo
    }
}

class Cuenta {
    constructor(codigo, nombre) {
        this.codigo = codigo
        this.nombre = nombre
        this.naturaleza = naturatezaCuenta(codigo)
        this.debito = []
        this.saldoDebito = 0
        this.credito = []
        this.saldoCredito = 0
        this.saldoTotal = null
    }
    debitar(registro) {
        this.debito.push(registro)
        this.saldoDebito += Number(registro.monto)
    }
    acreditar(registro) {
        this.credito.push(registro)
        this.saldoCredito += Number(registro.monto)
    }
    saldarCuenta() {
        if (this.naturaleza == "DEBITO") {//-- si la naturaleza es debito
            this.saldoTotal = this.saldoDebito - this.saldoCredito
        } else if(this.naturaleza == "CREDITO"){// Si la naturaleza es credito
            this.saldoTotal = this.saldoCredito - this.saldoDebito
        }else{
            alert("Error al saldar cuenta")
        }
    }
}

//                                     ############ Funciones ################

function naturatezaCuenta(codigo) {// Me pide codigo de cuenta y me retorna su naturaleza
    const caracter=codigo.charAt(0)//me trael el primer caracter de la cadena

    switch (caracter) {
        case "1":
            return "DEBITO"
        case "2":
            return "CREDITO"
        case "3":
            return "CREDITO"
        case "4":
            return "CREDITO"
        case "5":
            return "DEBITO"
        case "6":
            return "DEBITO"
        default:
            return "INDEFINIDO"
    }
}

function generarCodigo(){ //genera un nuevo codigo, lo retorna y actualiza la secuencia
    secuenciaCodigo++
    return secuenciaCodigo
}

function buscarCodigo(codigo, lista){//me devuelve un boolean si encuentra o no un objeto con el codigo en la lista
    for(elemento of lista){
        if(elemento.codigo == codigo){
            return true
        }
    }
    return false
}

function obtenerCuenta(codigo){// me devuelve el objeto de las listas de grupos
    let grupoCuenta = codigo.charAt(0)
    switch (grupoCuenta) {
        case "1":
            for(elemento of activos){
                if(elemento.codigo == codigo){
                    return elemento
                }
            }
        case "2":
            for(elemento of pasivos){
                if(elemento.codigo == codigo){
                    return elemento
                }
            }
        case "3":
            for(elemento of patrimonio){
                if(elemento.codigo == codigo){
                    return elemento
                }
            }
        case "4":
            for(elemento of ingresos){
                if(elemento.codigo == codigo){
                    return elemento
                }
            }
        case "5":
            for(elemento of gastos){
                if(elemento.codigo == codigo){
                    return elemento
                }
            }
        case "6":
            for(elemento of costos){
                if(elemento.codigo == codigo){
                    return elemento
                }
            }
        }
        return null
}

function validarCuenta(codigo){ // me devuelve un boolean si la cuenta existe o no 
    let grupoCuenta = naturatezaCuenta(codigo)
    switch (grupoCuenta) {
        case "1":
            return buscarCodigo(codigo, activos)
        case "2":
            return buscarCodigo(codigo, pasivos)
        case "3":
            return buscarCodigo(codigo, patrimonio)
        case "4":
            return buscarCodigo(codigo, ingresos)
        case "5":
            return buscarCodigo(codigo, gastos)
        case "6":
            return buscarCodigo(codigo, costos)
        }
}

function crearCuenta(codigo, nombre){ // se crea una nueva cuenta
    if(naturatezaCuenta(codigo)=="INDEFINIDO"){//valido si el codigo pertenece a un grupo de cuentas
        alert("Digite un codigo de cuenta entre los grupos de 1 y 6")
    }else{
        if(obtenerCuenta(codigo) != null){// valido si la cuenta existe
            alert("La cuenta ya ha sido registrada anteriormente.")
        }else{
            return nuevaCuenta = new Cuenta(codigo, nombre)
        }
    }
}

function registrarCuenta(cuenta){// recive una nueva cuenta y la registra en su respectivo grupo
    let codigo = cuenta.codigo //obtengo el codigo de la cuenta
    const caracter=codigo.charAt(0)//me trael el primer caracter de la cadena del codigo
    switch (caracter) {
        case "1":
            activos.unshift(cuenta)
            alert("Registro exitoso, como tu! ;)")
            break
        case "2":
            pasivos.unshift(cuenta)
            alert("Registro exitoso, como tu! ;)")
            break
        case "3":
            patrimonio.unshift(cuenta)
            alert("Registro exitoso, como tu! ;)")
            break
        case "4":
            ingresos.unshift(cuenta)
            alert("Registro exitoso, como tu! ;)")
            break
        case "5":
            gastos.unshift(cuenta)
            alert("Registro exitoso, como tu! ;)")
            break
        case "6":
            costos.unshift(cuenta)
            alert("Registro exitoso, como tu! ;)")
            break
        default:
            alert("Error inesperado. No se pudo registrar la cuenta") 
    }

}

function generarFecha(){//genera una cadena con la fecha y lo retorna
    let date = new Date()
    let output = String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear()
    return(output)
}

function crearRegistro(monto, descripcion, codigo){  //  crea y retorna un nuevo registro
    let fecha=generarFecha()
    nuevoRegistro = new Registro(codigo, fecha, monto, descripcion)
    return nuevoRegistro
}

function validarOperacion(valor, opcionA, opcionB){//valida que el valor tenga como resultado uno de las dos opciones y lo retorna
    while(valor != opcionA && valor != opcionB){
        valor=prompt(`XX opcion invalida Xx. digite el numero de la opcion que desea seleccionar:
        - ${opcionA}
        - ${opcionB}`)
    }
    return valor
}

function cuentasConMovim(){ //Devuelve una lista de todas las cuentas con movimientos
    //Agrupo todas las cuentas de los grupos en una sola
    let todasCuentas=[activos, pasivos, patrimonio, ingresos, gastos, costos]

    //Crea una nueva lista para guardar todos las cuentas con movimientos
    let lista = []

    //nueva lista donde se almacenan cada grupo de cuentas
    let nuevaLista = []

    //recorre toda la lista de grupos y por cada grupo filtra las cuentas con saldos
    for(grupo of todasCuentas){
        nuevaLista = grupo.filter(element => element.saldoTotal != null)
        for (cuenta of nuevaLista){
            lista.push(cuenta)
        }
    }
    return lista
}

//recibe una lista de objetos literales(obj{codigo:11, monto:500, operacion:debitar, descripcion:"sin descripcion"})
//Guarda los nuevos registros en las cuentas traidas por la lista de objetos
function generarTransaccion(lista){
    let cuenta
    let nuevoRegistro
    let nuevoCodigo = generarCodigo()
    //obj{codigo:11, monto:500, operacion:debitar, descripcion:"sin descripcion"}
    for(obj of lista){
        nuevoRegistro=crearRegistro(obj.monto, obj.descripcion, nuevoCodigo)
        cuenta=obtenerCuenta(obj.codigo)
        if(obj.operacion == "DEBITAR"){
            cuenta.debitar(nuevoRegistro)
        }else{
            cuenta.acreditar(nuevoRegistro)
        }
        cuenta.saldarCuenta()
    }
    alert("Transaccion Exitosa")
}

//                                  ############ Variables Globales ################
let secuenciaCodigo = 100 //variable que me secuencia el codigo de registros


//                                  ############       Listas       ################
// Creacion lista de cuentas de activos
const activos = [
    new Cuenta("11", "disponible"),
    new Cuenta("13", "deudores"),
    new Cuenta("14", "inventarios"),
    new Cuenta("191", "Agrupacion de activos no corrientes")
]
// Creacion lista de cuentas de pasivos
const pasivos = [
    new Cuenta("21", "obligaciones financieras"),
    new Cuenta("22", "proveedores"),
    new Cuenta("23", "cuentas por pagar")
]
// Creacion lista de cuentas de patrimonio
const patrimonio = [
    new Cuenta("31", "capital social"),
    new Cuenta("36", "Resultado del ejercisio"),
    new Cuenta("33", "reservas")
]
// Creacion lista de cuentas de ingresos
const ingresos = []
// Creacion lista de cuentas de gastos
const gastos = []
// Creacion lista de cuentas de costo de ventas
const costos = []
// por el momento solo se registrará la transacciones que involucren dos cuentas



/* let registroNuevo = crearRegistro(50000000000, "prestamo de efectivo en el banco")//creo un registro
console.log(registroNuevo)
let cuentaA = obtenerCuenta("11")// busco una cuenta ya creada
console.log(cuentaA)
let cuentaB = crearCuenta("51", "Gastos Operacionales")// creo una nueva cuenta
gastos.push(cuentaB)// agrego la nueva cuenta creada a la lista de cuentas de grupo gastos
console.log(cuentaB)
crearTransaccion(registroNuevo, cuentaA, cuentaB)// creo una transaccion con las dos cuentas
 */



/* console.table(activos)// muestro la tabla de la lista activos
console.table(gastos)// muestro las de gastos

listarCuentasTrans()// listo las cuentas que ya tienen movimientos
 */
