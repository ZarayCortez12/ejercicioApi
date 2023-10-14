const url = "https://api-colombia.com/api/v1/Country/Colombia"

fetch(url)
.then(response => response.json())
.then(data => {

    let element = document.getElementById('information')
    element.innerHTML = `
                         <p>${data.description}</p>`;
    console.log(data)
})
.catch(err=>console.log(err))

function radioOptionSelected() {
    // Obtén el valor del radio button seleccionado
    let rta = ''
    const selectedValue = document.querySelector('input[name="flexRadioDefault"]:checked').value;
    if (selectedValue === 'Andina') {
        verRegion(5);
        rta  = `<img src="https://spanishincolombia.caroycuervo.gov.co/documentos/imagenes/Region-Andina.jpg">`
        document.getElementById('vistas').innerHTML = rta;

    }
    else{
        if (selectedValue === 'Caribe') {
        verRegion(1);
        rta  = `<img src="https://regionesnaturalescolombia.com/wp-content/uploads/2023/04/Actividades-economicas-de-la-region-caribe.jpg">`
        document.getElementById('vistas').innerHTML = rta;
        }
        else{
            if (selectedValue === 'Pacifica') {
                verRegion(2);
                rta  = `<img src="https://adrenalinecolombia.com/wp-content/uploads/2021/11/Playas-En-Buenaventura-800x600.jpg">`
                document.getElementById('vistas').innerHTML = rta;
            }
            else{
                if (selectedValue === 'Orinoquia') {
                    verRegion(3);
                    rta  = `<img src="https://dngtco.files.wordpress.com/2020/12/ogrunewald_cano_cristales_24_1800x1201.jpg?w=1400">`
                    document.getElementById('vistas').innerHTML = rta;
                }
                else{
                    if (selectedValue === 'Amazonia') {
                        verRegion(4);
                        rta  = `<img src="https://cdn.colombia.com/images/v2/colombia-info/folclor/region-amazonica/indigenas-800.jpg">`
                        document.getElementById('vistas').innerHTML = rta;
                    }
                    else{
                        if (selectedValue === 'Insular') {
                            verRegion(6);
                            rta  = `<img src="https://encolombia.com/wp-content/uploads/2020/06/Regi%C3%B3n-Insular-en-Colombia.jpg">`
                            document.getElementById('vistas').innerHTML = rta;
                        }
                    } 
                }
            }
        }
    } 
    
    // Realiza la acción que desees según el valor seleccionado
    
}


function verRegion(valor) {
    const miSeccion = document.getElementById('region');

    // Comprueba el estado actual de la sección
    if (miSeccion.style.display === "none" || miSeccion.style.display === "") {
        // Si está oculta, muéstrala
        miSeccion.style.display = "block";
    } else {
        // Si ya está visible, ocúltala
        miSeccion.style.display = "none";
    }

    //Metodos

    const urlRegion = `https://api-colombia.com/api/v1/Region/${valor}/departments`;
    fetch(urlRegion)
    .then(response => response.json())
    .then(data => { 
        ObtenerDepartamentos();
        let element = document.getElementById('descrip')
        element.innerHTML = `
                            <p>${data.description}</p>`;
        console.log(data)
        let alement = document.getElementById('nombreRegion')
        alement.innerHTML = `<h1>Región ${data.name} </h1>`
    })
    .catch(err=>console.log(err))


    function ObtenerDepartamentos(){
        let urlDepa = `https://api-colombia.com/api/v1/Region/${valor}/departments`;
        fetch(urlDepa)
            .then(response => response.json())
            .then(data => mostrarData(data))
            .catch(err => console.log(err));

            
        const mostrarData = (data) => {
            let rta= ''; 

            for (let i = 0; i < data.departments.length; i++) {
                rta += `<tr><td>${data.departments[i].name}</td>
                            <td>${data.departments[i].description}</td>
                            <td><a href="#atracciones-seccion" onclick="ObtenerAtracciones(${data.departments[i].id})">Ver lugares turísticos</a></td>
                        </tr>`;
            }
            
            document.getElementById('departamentos').innerHTML = rta;
        }

    }  

}

    function ObtenerAtracciones(id){

        let urlAtracciones = `https://api-colombia.com/api/v1/Department/${id}/touristicattractions`;
        fetch(urlAtracciones)
            .then(response => response.json())
            .then(data => mostrarData(data))
            .catch(err => console.log(err));

            
        const mostrarData = (data) => {
            if (data.length > 0) {
                let rta = '';
    
                for (let i = 0; i < data.length; i++) {
                    rta += `<tr>
                                <td>${data[i].name}</td>
                                <td>${data[i].description}</td>
                                <td>${data[i].city.name}</td>
                                <td><img src="${data[i].images}"></td>
                            </tr>`;
                }
    
                document.getElementById('atracciones').innerHTML = rta;
                document.getElementById('atracciones-seccion').style.display = 'block';
            } else {
                // No se encontraron datos, puedes mostrar un mensaje de error o hacer otra acción.
                alert("No se encontraron datos de atracciones.");
            }
        }

    }

    
