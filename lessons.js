window.COURSE = {
kotlin:[
{name:"Primeros pasos",items:[
["Kotlin desde cero","Qué es Kotlin, dónde se usa y cómo ejecutar tu primer programa.",["Instala IntelliJ IDEA o utiliza Kotlin Playground.","El punto de entrada es la función main().","println escribe en la consola."],`fun main() {
    println("Hola, Kotlin")
    println("Bienvenido a AutoFlow")
}`,"Personaliza el saludo para un concesionario.","La consola debe mostrar dos mensajes.", "Agrega una variable con el nombre del negocio."],
["Variables y tipos","Diferencia entre val, var, inferencia y tipos numéricos.",["val no permite reasignación; var sí.","String, Int, Double y Boolean son tipos habituales.","La interpolación usa $variable o ${expresion}."],`fun main() {
    val marca = "Toyota"
    var precio = 72000000.0
    precio *= 0.95
    println("$marca: $precio COP")
}`,"Calcula el precio de un carro con 10% de descuento.","Imprime la marca y el precio final.","Evita usar var donde no sea necesario."],
["Entrada y conversiones","Recibe datos de consola sin asumir que el texto será numérico.",["readln lee una línea de texto.","toIntOrNull y toDoubleOrNull evitan excepciones de formato.","Elvis ?: permite indicar un valor por defecto."],`fun main() {
    print("Año del vehículo: ")
    val anio = readln().toIntOrNull()
    if (anio == null) {
        println("Año inválido")
    } else {
        println("Año: $anio")
    }
}`,"Solicita precio y rechaza valores no numéricos.","No debe terminar con excepción por letras.","Prueba los valores vacío, -5 y 50000000."],
["Operadores y condiciones","Usa if, when y expresiones booleanas.",["if puede devolver un valor.","when sirve para clasificar estados.","&& exige dos condiciones; || acepta una."],`fun evaluar(precio: Double): String =
    when {
        precio <= 0 -> "Precio inválido"
        precio < 50000000 -> "Económico"
        else -> "Premium"
    }`,"Clasifica vehículos económicos, medios y premium.","Devuelve una etiqueta según el precio.","Define los límites antes de programar."],
["Bucles y rangos","Recorre datos con for, while e índices seguros.",["for (elemento in lista) recorre elementos.","indices da los índices válidos.","while requiere una condición que cambie."],`fun main() {
    val marcas = listOf("Kia", "Mazda", "Renault")
    for ((pos, marca) in marcas.withIndex()) {
        println("\${pos + 1}. $marca")
    }
}`,"Imprime cinco marcas enumeradas.","Cada marca debe aparecer con un número.","Explora withIndex y forEachIndexed."]
]},
{name:"Programación estructurada",items:[
["Funciones y parámetros","Separa responsabilidades en funciones reutilizables.",["fun declara una función.","Los parámetros son inmutables dentro de la función.","Una función puede retornar un valor."],`fun precioConIva(base: Double, tasa: Double = 0.19): Double {
    require(base >= 0)
    return base * (1 + tasa)
}
fun main() = println(precioConIva(2000000.0))`,"Crea una función de descuento que reciba porcentaje.","Devuelve un número sin imprimir desde la función.","Prueba 0%, 10% y 100%."],
["Nulabilidad y seguridad","Comprende String?, acceso seguro y operador Elvis.",["Un String no acepta null.","?. evita acceso inseguro.","?: proporciona alternativa cuando el valor es null."],`data class Vehiculo(val propietario: String?)
fun main() {
    val auto = Vehiculo(null)
    println(auto.propietario?.uppercase() ?: "Sin propietario")
}`,"Muestra un teléfono opcional del cliente.","Si es null debe imprimirse No registrado.","Evita utilizar !!."],
["Listas y mapas","Organiza un inventario con colecciones.",["listOf crea una colección de solo lectura.","mutableListOf permite agregar y eliminar.","filter, map y firstOrNull transforman colecciones."],`fun main() {
    val marcas = mutableListOf("Toyota", "Kia")
    marcas.add("Mazda")
    val resultado = marcas.filter { it.startsWith("M") }
    println(resultado)
}`,"Filtra una lista por marca e imprime coincidencias.","Devuelve una nueva lista con filtros.","Utiliza contains con ignoreCase."],
["Cadenas y plantillas","Concatena variables y normaliza textos.",["Usa $variable y ${expresion} para interpolar.","trim elimina espacios externos.","uppercase, lowercase y replace transforman texto."],`fun main() {
    val marca = "  renault  ".trim()
    val modelo = "Sandero"
    println("\${marca.uppercase()} - $modelo")
}`,"Construye una descripción de vehículo usando interpolación.","La salida combina marca, modelo y año.","Evita concatenar repetidamente con +."],
["Excepciones y Result","Controla fallos sin ocultar su causa.",["try/catch maneja excepciones reales.","require valida argumentos.","runCatching representa éxito o fallo de una operación."],`fun convertir(texto: String): Result<Int> =
    runCatching { texto.toInt() }

fun main() {
    val resultado = convertir("abc")
    println(resultado.getOrElse { -1 })
}`,"Crea un conversor de kilometraje seguro.","Una entrada inválida debe producir un mensaje.","Considera toIntOrNull para entradas de usuario."]
]},
{name:"Orientación a objetos",items:[
["Clases y objetos","Crea un modelo del dominio AutoFlow.",["class agrupa estado y comportamiento.","constructor inicializa propiedades.","Los métodos definen acciones de cada objeto."],`class Vehiculo(val marca: String, var precio: Double) {
    fun resumen() = "$marca - $precio"
}
fun main() {
    val auto = Vehiculo("Kia", 45000000.0)
    println(auto.resumen())
}`,"Añade modelo, año y método calcularDescuento.","El método debe regresar el precio actualizado.","Valida que el precio nunca sea negativo."],
["Data class y copia","Representa datos con equals, toString y copy.",["data class genera equals/hashCode y toString.","copy facilita cambios inmutables.","No convierte propiedades var en inmutables automáticamente."],`data class Vehiculo(val id: Int, val marca: String, val precio: Double)
fun main() {
    val inicial = Vehiculo(1, "Mazda", 70000000.0)
    val actualizado = inicial.copy(precio = 68000000.0)
    println(actualizado)
}`,"Actualiza el estado de venta con copy.","El objeto original no debe modificarse.","Compara equals en dos instancias."],
["Herencia e interfaces","Reutiliza comportamientos sin acoplar modelos.",["Las clases son final por defecto.","interface define un contrato.","override implementa miembros heredados."],`interface Descriptible {
    fun descripcion(): String
}
data class Auto(val marca: String): Descriptible {
    override fun descripcion() = "Auto $marca"
}`,"Implementa una interfaz Vendible en dos tipos de vehículo.","Ambos tipos deben cumplir el mismo contrato.","Prefiere composición si no existe relación es-un."],
["Genéricos y sealed","Modela respuestas de servicios con tipos seguros.",["Result<T> representa un dato genérico.","sealed interface limita variantes conocidas.","when exhaustivo cubre cada estado."],`sealed interface Estado<out T> {
    data class Exito<T>(val dato: T): Estado<T>
    data class Error(val mensaje: String): Estado<Nothing>
}
fun texto(estado: Estado<String>) = when (estado) {
    is Estado.Exito -> estado.dato
    is Estado.Error -> estado.mensaje
}`,"Modela Cargando, Exito y Error de una consulta.","La vista debe diferenciar estados.","No uses cadenas mágicas para representar estado."]
]},
{name:"Datos y arquitectura",items:[
["CRUD completo","Construye un repositorio en memoria.",["Create agrega tras validar ID único.","Read lista y consulta registros.","Update y Delete operan por identificador."],`data class Vehiculo(val id: Int, val marca: String)
class Inventario {
    private val datos = mutableListOf<Vehiculo>()
    fun agregar(v: Vehiculo): Boolean {
        if (datos.any { it.id == v.id }) return false
        return datos.add(v)
    }
    fun listar(): List<Vehiculo> = datos.toList()
    fun eliminar(id: Int) = datos.removeAll { it.id == id }
}`,"Implementa actualizar, buscar y menú con opciones.","CRUD funcional para múltiples tipos de vehículos.","No expongas la lista mutable interna."],
["JSON y serialización","Convierte respuestas JSON en modelos tipados.",["JSON utiliza objetos y arreglos.","@Serializable funciona con kotlinx.serialization.","Decodificar requiere estructura compatible."],`// Requiere dependencia kotlinx-serialization-json
@kotlinx.serialization.Serializable
data class AutoApi(val id: Int, val make: String)

// Ejemplo de JSON: {"id":1,"make":"Toyota"}`,"Convierte una lista JSON de vehículos en objetos.","Cada entrada tiene id y marca.","Comprueba claves y nulos de la fuente."],
["APIs con Ktor","Consulta servicios HTTP con corrutinas.",["Ktor Client requiere dependencias y engine.","GET consulta recursos; POST envía datos.","Verifica status, tiempos de espera y conectividad."],`// Fragmento: requiere Ktor Client y contexto suspend
suspend fun descargar(client: io.ktor.client.HttpClient): String {
    val response = client.get("https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json")
    if (response.status.value !in 200..299) error("HTTP \${response.status.value}")
    return response.bodyAsText()
}`,"Consume la API pública vPIC y muestra tres marcas.","Distingue carga, HTTP no exitoso y error de red.","Revisa la respuesta real y evita bloquear el hilo principal."],
["Corrutinas","Ejecuta tareas suspendibles de forma estructurada.",["suspend permite suspender sin bloquear un hilo.","coroutineScope vincula tareas hijas.","Dispatchers.IO se usa para operaciones bloqueantes."],`import kotlinx.coroutines.*
suspend fun consultar(): String {
    delay(500)
    return "Inventario cargado"
}
fun main() = runBlocking {
    println(consultar())
}`,"Consulta dos fuentes concurrentemente y combina respuestas.","Las tareas deben tener un alcance estructurado.","No uses GlobalScope para lógica de pantallas."],
["Tests unitarios","Prueba reglas antes de integrar interfaces.",["Los tests deben ser independientes.","Comprueba condiciones normales y bordes.","Separar lógica de UI facilita automatización."],`// Ejemplo con kotlin.test
import kotlin.test.*
class PreciosTest {
    @Test fun descuento() {
        assertEquals(90.0, 100.0 * 0.9, 0.001)
    }
}`,"Prueba agregar duplicados, eliminar inexistentes y precio negativo.","Todos los tests deben pasar en el proyecto.","No confundas probar UI con probar dominio."]
]}
],
android:[
{name:"Fundamentos Android",items:[
["Android Studio y proyecto","Configura Android Studio, emulador y proyecto Compose.",["Usa la plantilla Empty Activity con Compose.","Gradle administra dependencias.","Ejecuta en emulador o dispositivo Android."],`// Ejemplo en una Activity con Compose configurado
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent { Text("Hola, Android") }
    }
}`,"Crea una app Android que muestre AutoFlow.","Se ve un mensaje en el emulador.","Comprueba la versión y configuración del proyecto."],
["Composable y Text","Comprende cómo se declara la UI.",["@Composable identifica funciones de interfaz.","MaterialTheme define estilo del proyecto.","Preview permite previsualizar algunos componentes."],`@Composable
fun Bienvenida(nombre: String) {
    Column {
        Text("AutoFlow")
        Text("Hola, $nombre")
    }
}`,"Crea un encabezado con título y subtítulo.","Ambos textos deben aparecer verticalmente.","Se requieren imports de Compose en el proyecto."],
["Layouts y modificadores","Organiza interfaces usando Column, Row y Box.",["Column dispone elementos verticalmente.","Row alinea elementos horizontalmente.","Modifier aplica padding, tamaño y acciones."],`@Composable
fun Resumen() {
    Row(modifier = Modifier.padding(16.dp)) {
        Text("Vehículos")
        Spacer(Modifier.width(12.dp))
        Text("12 disponibles")
    }
}`,"Construye una ficha de vehículo con nombre y precio.","El diseño conserva legibilidad en pantallas pequeñas.","Usa espaciados consistentes."],
["Material 3 y componentes","Usa Button, Card, TextField y Scaffold.",["Material 3 aporta componentes consistentes.","Scaffold define regiones comunes de pantalla.","El estado controla lo visible."],`@Composable
fun BotonGuardar(onGuardar: () -> Unit) {
    Button(onClick = onGuardar) {
        Text("Guardar vehículo")
    }
}`,"Diseña un formulario con TextField y botón.","El botón responde a la acción indicada.","Los datos deben validarse antes de guardar."]
]},
{name:"Estado e interfaces",items:[
["remember y estado","Mantén valores locales y provoca recomposición.",["mutableStateOf mantiene estado observable.","remember conserva estado en recomposiciones.","rememberSaveable permite guardar valores compatibles ante recreación."],`@Composable
fun Contador() {
    var cantidad by remember { mutableIntStateOf(0) }
    Button(onClick = { cantidad++ }) {
        Text("Vehículos: $cantidad")
    }
}`,"Crea un contador que pueda aumentar y reducir.","El número debe actualizarse en pantalla.","Agrega imports delegate getValue y setValue."],
["LazyColumn","Muestra grandes listas de manera eficiente.",["LazyColumn compone elementos necesarios.","Proporciona keys estables al mostrar listas.","Separa cada fila en su propia función."],`@Composable
fun Marcas(marcas: List<String>) {
    LazyColumn {
        items(marcas, key = { it }) { marca ->
            Text(marca, Modifier.padding(12.dp))
        }
    }
}`,"Construye el catálogo con LazyColumn.","Cada marca aparece una vez.","Para nombres duplicados usa IDs como key."],
["Formularios y validación","Valida entradas antes de crear entidades.",["OutlinedTextField permite texto controlado.","toDoubleOrNull valida cifras.","El botón puede deshabilitarse mientras los datos no sean válidos."],`@Composable
fun Formulario() {
    var precio by rememberSaveable { mutableStateOf("") }
    OutlinedTextField(
        value = precio,
        onValueChange = { precio = it },
        label = { Text("Precio") }
    )
    Text(if ((precio.toDoubleOrNull() ?: 0.0) > 0) "Válido" else "Ingresa un precio")
}`,"Construye formulario de marca, modelo y precio.","Evita almacenar precios no válidos.","Considera errores visibles y accesibilidad."],
["Navegación","Define pantallas y transiciones.",["Navigation Compose requiere dependencia.","Usa rutas y argumentos de tipo adecuado.","Envía identificadores y consulta datos en destino."],`// Esquema conceptual; configura navigation-compose
NavHost(navController, startDestination = "lista") {
    composable("lista") { ListaScreen() }
    composable("detalle/{id}") { entry ->
        DetalleScreen(entry.arguments?.getString("id"))
    }
}`,"Crea pantallas de catálogo y detalle.","La selección abre el ID correcto.","No transportes objetos grandes como rutas."]
]},
{name:"Arquitectura moderna",items:[
["MVVM y ViewModel","Separa vista, lógica de presentación y datos.",["UI observa estados, no accede directamente a la base.","ViewModel coordina casos de uso.","Repository abstrae origen local o remoto."],`data class InventarioUiState(val cargando: Boolean = false)
class InventarioViewModel: ViewModel() {
    private val _ui = MutableStateFlow(InventarioUiState())
    val ui = _ui.asStateFlow()
}`,"Define UiState para carga, error y vehículos.","La pantalla recibe un estado consistente.","Requiere lifecycle ViewModel y coroutines."],
["StateFlow y eventos","Expón estado observable y acciones del usuario.",["StateFlow conserva el estado actual.","collectAsStateWithLifecycle observa con ciclo de vida.","Las acciones de la UI deben convertirse en eventos."],`@Composable
fun InventarioScreen(vm: InventarioViewModel) {
    val ui by vm.ui.collectAsStateWithLifecycle()
    if (ui.cargando) CircularProgressIndicator()
    else Text("Inventario listo")
}`,"Implementa recarga y un mensaje de error visible.","Loading debe desaparecer al finalizar.","No inicies peticiones en el cuerpo de un composable."],
["Room y persistencia","Almacena inventario con base local.",["@Entity modela una tabla.","@Dao define operaciones.","Room utiliza SQLite y soporta Flow."],`@Entity(tableName = "vehiculos")
data class VehiculoEntity(
    @PrimaryKey val id: Int,
    val marca: String
)
@Dao interface VehiculoDao {
    @Query("SELECT * FROM vehiculos")
    fun observar(): Flow<List<VehiculoEntity>>
}`,"Añade insertar y eliminar, y crea la base.","Los registros persisten al reiniciar la app.","Configura Room y su procesador de código."],
["API REST y errores","Carga datos remotos en Android.",["Retrofit o Ktor simplifica HTTP.","Usa un repositorio y ViewModel.","Captura excepciones de red y presenta recuperación."],`// Función suspend dentro de un repositorio
suspend fun consultarSeguro(): Resultado {
    return try {
        Resultado.Exito(servicio.obtenerMarcas())
    } catch (e: IOException) {
        Resultado.Error("Sin conexión")
    }
}`,"Muestra carga, lista, vacío y error con reintento.","La app no debe cerrarse cuando falla la red.","Resultado y servicio deben definirse en el proyecto."],
["Pruebas Compose","Valida comportamientos y estados visuales.",["Los tests de UI usan semantics.","Comprueba contenido y acciones de usuario.","Las reglas de negocio se prueban por separado."],`// Fragmento dentro de test Android Compose
composeTestRule.onNodeWithText("Guardar vehículo")
    .assertExists()
    .performClick()`,"Verifica que el formulario muestra un error al guardar vacío.","La prueba debe fallar si desaparece la validación.","Configura dependencias de testing de Compose."]
]}
]};
window.COURSE.kotlin.forEach((p,i)=>p.id="K"+(i+1));window.COURSE.android.forEach((p,i)=>p.id="A"+(i+1));