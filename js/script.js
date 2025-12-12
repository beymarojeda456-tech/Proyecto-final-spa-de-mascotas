const duenos = [];
const mascotas = [];
const agendaServicios = [];
const carrito = [];

const catalogoProductos = [
  { id:1, nombre:"Baño", precio:30, imagen:"img/baño.jpg" },
  { id:2, nombre:"Corte de uñas", precio:15, imagen:"img/corte de uñas.jpg" },
  { id:3, nombre:"Comida Premium", precio:45, imagen:"img/comida.jpg" },
  { id:4, nombre:"Juguete", precio:25, imagen:"img/juguetes.jpg" }
];

const loginForm = document.getElementById("login-form");
const loginSection = document.getElementById("login-section");
const loginMsg = document.getElementById("login-msg");
const navbar = document.getElementById("navbar");

const formDueno = document.getElementById("form-dueno");
const formMascota = document.getElementById("form-mascota");
const formAgenda = document.getElementById("form-agenda");
const agMascota = document.getElementById("ag_mascota");
const listaAgenda = document.getElementById("lista-agenda");

const catalogoContainer = document.getElementById("catalogo");
const carritoLista = document.getElementById("carrito-lista");
const subtotalEl = document.getElementById("subtotal");
const totalEl = document.getElementById("total");

loginForm.addEventListener("submit", function(e){
  e.preventDefault();
  let u = document.getElementById("user").value.trim();
  let p = document.getElementById("pass").value.trim();

  if(u==="admin" && p==="123"){
    loginSection.classList.add("hidden");
    navbar.classList.remove("hidden");
    showSection("mod-registro");
  } else {
    loginMsg.textContent = "Usuario o contraseña incorrectos";
  }
});

document.querySelectorAll("nav button[data-section]").forEach(btn=>{
  btn.addEventListener("click", ()=> showSection(btn.dataset.section));
});

function showSection(id){
  document.querySelectorAll(".modulo").forEach(m=>m.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

document.getElementById("logout-btn").onclick = ()=>location.reload();

formDueno.addEventListener("submit", e => {
  e.preventDefault();
  const nombre = dueno_nombre.value.trim();
  const tel = dueno_tel.value.trim();
  const correo = dueno_correo.value.trim();

  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
  if (!emailValido) { alert("Ingrese un correo válido"); return; }

  const telValido = /^[0-9]{1,8}$/.test(tel);
  if (!telValido) { alert("Teléfono inválido"); return; }

  duenos.push({ nombre, tel, correo });
  alert("Dueño registrado correctamente");
  e.target.reset();
});

const razasPerro = ["Labrador","Poodle","Bulldog","Pastor Alemán"];
const razasGato = ["Persa","Siames","Bengalí","Angora"];

mascota_especie.addEventListener("change", ()=>{
  mascota_raza.innerHTML = `<option value="">Seleccione raza</option>`;
  let lista = mascota_especie.value==="perro" ? razasPerro :
              mascota_especie.value==="gato" ? razasGato : [];
  lista.forEach(r=>{
    let op=document.createElement("option");
    op.value=r; op.textContent=r;
    mascota_raza.appendChild(op);
  });
});

formMascota.addEventListener("submit", e=>{
  e.preventDefault();
  mascotas.push({
    nombre: mascota_nombre.value,
    especie: mascota_especie.value,
    raza: mascota_raza.value
  });
  alert("Mascota guardada");
  e.target.reset();
  actualizarListaMascotasAgenda();
});

function actualizarListaMascotasAgenda(){
  agMascota.innerHTML = `<option value="">Seleccione mascota</option>`;
  mascotas.forEach(m=>{
    let op=document.createElement("option");
    op.value=m.nombre; op.textContent=m.nombre;
    agMascota.appendChild(op);
  });
}

formAgenda.addEventListener("submit", e=>{
  e.preventDefault();
  agendaServicios.push({
    fecha: ag_fecha.value,
    hora: ag_hora.value,
    mascota: ag_mascota.value,
    servicio: ag_servicio.value
  });
  actualizarAgenda();
  alert("Servicio agendado");
  e.target.reset();
});

function actualizarAgenda(){
  listaAgenda.innerHTML="";
  agendaServicios.forEach(a=>{
    let li=document.createElement("li");
    li.textContent=`${a.fecha} ${a.hora} | ${a.mascota} → ${a.servicio}`;
    listaAgenda.appendChild(li);
  });
}

function mostrarCatalogo(){
  catalogoContainer.innerHTML="";
  catalogoProductos.forEach(p=>{
    let c=document.createElement("div");
    c.className="card-small";
    c.innerHTML=`
      <div class="img-space"><img src="${p.imagen}" alt="${p.nombre}" style="width:100%;height:120px;object-fit:cover;border-radius:8px;"></div>
      <p><strong>${p.nombre}</strong></p>
      <p>Bs ${p.precio}</p>
      <button>Comprar</button>
    `;
    c.querySelector("button").onclick=()=>agregarCarrito(p.id);
    catalogoContainer.appendChild(c);
  });
}
mostrarCatalogo();

function agregarCarrito(id){
  carrito.push(catalogoProductos.find(p=>p.id===id));
  actualizarCarrito();
}

function actualizarCarrito(){
  carritoLista.innerHTML="";
  let subtotal=0;

  carrito.forEach(i=>{
    let li=document.createElement("li");
    li.className="carrito-item";
    li.innerHTML=`
      <img src="${i.imagen}" alt="${i.nombre}" class="carrito-img">
      <span class="carrito-nombre">${i.nombre}</span>
      <span class="carrito-precio">Bs ${i.precio}</span>
    `;
    carritoLista.appendChild(li);
    subtotal+=i.precio;
  });

  subtotalEl.textContent=subtotal;
  totalEl.textContent=subtotal;
}
