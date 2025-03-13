document.addEventListener("DOMContentLoaded", () => {
    cargarMesas();
});

document.getElementById("mesaForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const id = document.getElementById("id").value;
    const tipo_material = document.getElementById("tipo_material").value;
    const marca = document.getElementById("marca").value;
    const no_sillas = document.getElementById("no_sillas").value;
    const no_patas = document.getElementById("no_patas").value;
    
    let mesas = JSON.parse(localStorage.getItem("mesas")) || [];
    
    if (id) {
        mesas = mesas.map(m => m.id == id ? { id, tipo_material, marca, no_sillas, no_patas } : m);
    } else {
        const newId = mesas.length ? Math.max(...mesas.map(m => m.id)) + 1 : 1;
        mesas.push({ id: newId, tipo_material, marca, no_sillas, no_patas });
    }
    
    localStorage.setItem("mesas", JSON.stringify(mesas));
    this.reset();
    cargarMesas();
});

function cargarMesas() {
    const mesas = JSON.parse(localStorage.getItem("mesas")) || [];
    const tbody = document.getElementById("mesaTableBody");
    tbody.innerHTML = "";
    mesas.forEach(mesa => {
        const row = `<tr>
            <td>${mesa.id}</td>
            <td>${mesa.tipo_material}</td>
            <td>${mesa.marca}</td>
            <td>${mesa.no_sillas}</td>
            <td>${mesa.no_patas}</td>
            <td>
                <button onclick="editarMesa(${mesa.id})">Editar</button>
                <button onclick="eliminarMesa(${mesa.id})">Eliminar</button>
            </td>
        </tr>`;
        tbody.innerHTML += row;
    });
}

function editarMesa(id) {
    const mesas = JSON.parse(localStorage.getItem("mesas"));
    const mesa = mesas.find(m => m.id == id);
    document.getElementById("id").value = mesa.id;
    document.getElementById("tipo_material").value = mesa.tipo_material;
    document.getElementById("marca").value = mesa.marca;
    document.getElementById("no_sillas").value = mesa.no_sillas;
    document.getElementById("no_patas").value = mesa.no_patas;
}

function eliminarMesa(id) {
    let mesas = JSON.parse(localStorage.getItem("mesas")) || [];
    mesas = mesas.filter(m => m.id != id);
    localStorage.setItem("mesas", JSON.stringify(mesas));
    cargarMesas();
}