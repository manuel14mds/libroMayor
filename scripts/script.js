

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
        this.saldoDebito += registro.monto
    }
    acreditar(registro) {
        this.credito.push(registro)
        this.saldoCredito += registro.monto
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
    let encontrado = false
    for(elemento of lista){
        if(elemento.codigo == codigo){
            encontrado = true
            break
        }
    }
    return encontrado
}

function obtenerCuenta(codigo){// me devuelve el objeto de una lista de cuentas
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
            if(buscarCodigo(codigo, activos)){
                return true
            }
        case "2":
            if(buscarCodigo(codigo, pasivos)){
                return true
            }
        case "3":
            if(buscarCodigo(codigo, patrimonio)){
                return true
            }
        case "4":
            if(buscarCodigo(codigo, ingresos)){
                return true
            }
        case "5":
            if(buscarCodigo(codigo, gastos)){
                return true
            }
        case "6":
            if(buscarCodigo(codigo, costos)){
                return true
            }
        }
        return false
}

function crearCuenta(codigo, nombre){ // se crea una nueva cuenta
    while(naturatezaCuenta(codigo)=="INDEFINIDO"){//valido si el codigo pertenece a un grupo de cuentas
        codigo=prompt("Digite un codigo de cuenta entre los grupos de 1 y 6")
    }
    while(validarCuenta(codigo)){// valido si la cuenta existe
        if(confirm("la cuenta ya existe, desea utilizar la cuenta existente?")){
            return obtenerCuenta(codigo)
        }else{
            codigo=prompt("Digite otro codigo")
        }
    }
    const nuevaCuenta = new Cuenta(codigo, nombre)
    return nuevaCuenta
}

function generarFecha(){//genera una cadena con la fecha y lo retorna
    let date = new Date()
    let output = String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear()
    return(output)
}

function crearRegistro(monto, descripcion){  //  crea y retorna un nuevo registro
    let codigo=generarCodigo()
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

function crearTransaccion(registro, cuentaUno, cuentaDos){ // genera una transaccion entre dos cuentas
    let operacion = prompt(`digite el nombre de la operacion que desea en la cuenta ${cuentaUno.nombre}:
    - acreditar
    - debitar`)
    operacion = validarOperacion(operacion, "acreditar", "debitar")
    if(operacion=="acreditar"){
        cuentaUno.acreditar(registro)
    }else{
        cuentaUno.debitar(registro)
    }
    operacion = prompt(`digite el nombre de la operacion que desea en la cuenta ${cuentaDos.nombre}:
    - acreditar
    - debitar`)
    operacion = validarOperacion(operacion, "acreditar", "debitar")
    if(operacion=="acreditar"){
        cuentaDos.acreditar(registro)
    }else{
        cuentaDos.debitar(registro)
    }
    cuentaUno.saldarCuenta()
    cuentaDos.saldarCuenta()
}

function listarCuentasTrans(){ //imprime lista de solo las cuentas que tienen movimientos
    let nuevaLista= activos.filter(element => element.saldoTotal != null)
    if(nuevaLista.length != 0){
        console.log(nuevaLista)
    }
    
    nuevaLista= pasivos.filter(element => element.saldoTotal != null)
    if(nuevaLista.length != 0){
        console.log(nuevaLista)
    }
    
    nuevaLista= patrimonio.filter(element => element.saldoTotal != null)
    if(nuevaLista.length != 0){
        console.log(nuevaLista)
    }

    nuevaLista= ingresos.filter(element => element.saldoTotal != null)
    if(nuevaLista.length != 0){
        console.log(nuevaLista)
    }

    nuevaLista= gastos.filter(element => element.saldoTotal != null)
    if(nuevaLista.length != 0){
        console.log(nuevaLista)
    }

    nuevaLista= costos.filter(element => element.saldoTotal != null)
    if(nuevaLista.length != 0){
        console.log(nuevaLista)
    }
    
}

//                                  ############ Variables Globales ################
let secuenciaCodigo = 100 //variable que me secuencia el codigo de registros


//                                  ############       Listas       ################
// Creacion lista de cuentas de activos
let nuevacuenta
const activos = [
    nuevacuenta=new Cuenta("11", "disponible"),
    nuevacuenta=new Cuenta("13", "deudores"),
    nuevacuenta=new Cuenta("14", "inventarios"),
    nuevacuenta=new Cuenta("191", "Agrupacion de activos no corrientes")
]
// Creacion lista de cuentas de pasivos
const pasivos = [
    nuevacuenta=new Cuenta("21", "obligaciones financieras"),
    nuevacuenta=new Cuenta("22", "proveedores"),
    nuevacuenta=new Cuenta("23", "cuentas por pagar")
]
// Creacion lista de cuentas de patrimonio
const patrimonio = [
    nuevacuenta=new Cuenta("31", "capital social"),
    nuevacuenta=new Cuenta("36", "Resultado del ejercisio"),
    nuevacuenta=new Cuenta("33", "reservas")
]
// Creacion lista de cuentas de ingresos
const ingresos = []
// Creacion lista de cuentas de gastos
const gastos = []
// Creacion lista de cuentas de costo de ventas
const costos = []
// por el momento solo se registrará la transacciones que involucren dos cuentas



let registroNuevo = crearRegistro(50000000000, "prestamo de efectivo en el banco")//creo un registro
console.log(registroNuevo)
let cuentaA = obtenerCuenta("11")// busco una cuenta ya creada
console.log(cuentaA)
let cuentaB = crearCuenta("51", "Gastos Operacionales")// creo una nueva cuenta
gastos.push(cuentaB)// agrego la nueva cuenta creada a la lista de cuentas de grupo gastos
console.log(cuentaB)
crearTransaccion(registroNuevo, cuentaA, cuentaB)// creo una transaccion con las dos cuentas




console.table(activos)// muestro la tabla de la lista activos
console.table(gastos)// muestro las de gastos

listarCuentasTrans()// listo las cuentas que ya tienen movimientos


