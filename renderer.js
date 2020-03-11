const mysql = require('mysql')

const conexion = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '' ,
    database: 'examenparte2'
    });

conexion.connect(function(err) {
    if(err) {
        console.log('No se pudo papi');
            return;
        }
        console.log('Si se pudo papi');
})



const enlaces = document.getElementsByClassName('item-menu')
    for (let i = 0; i < enlaces.length; i++) {
        enlaces[i].addEventListener('click', function(e) {
            e.preventDefault();
            const idElemento = e.currentTarget.getAttribute('data-elemento');
            console.log(idElemento);
            const paginas = document.getElementsByClassName('pagina');
            for (let j = 0; j < paginas.length; j++) {
                paginas[j].classList.add('esconder')
            }
            document.getElementById(idElemento).classList.remove('esconder');
        })
            
}
const notas = document.getElementById('notas')
const guardar = document.getElementById('guardar')
guardar.addEventListener('click',function(e){
    e.preventDefault()
    let consulta = "insert into notas(id,notas) values(?,?)"
    conexion.query(consulta,[' ',`${notas.value}`], function(err,filas,campos){
        if (err) {
            console.log('Error')
        } else {
            console.log('Exitos')
        }
        
    })
})
const btnver = document.getElementById('vernotas')
const table = document.getElementById('notas_tabla');
btnver.addEventListener('click', function(e)
{
    let html = '<tr> <th>id</th> <th>Notas</th> </tr>'
    e.preventDefault();
    conexion.query(`select * from notas`,
        function(err, rows, fields)
        {
            if (err) throw err;
            for (let row of rows)
            {
                html += '<tr>'
                html += `<td>${row.id}</td>`
                html += `<td>${row.notas}</td>`
                html += '</tr>'
            }
            table.innerHTML = html
        })
})