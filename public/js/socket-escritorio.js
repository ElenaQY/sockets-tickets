var socket = io();

var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');

console.log(escritorio);
$('h1').text('Escritorio ' + escritorio);

socket.on('connect', function() {
    console.log('conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('desconectado al servidor');
});

$('button').on('click', function() {
    console.log('click');
    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {
        console.log(resp);
        if (resp.err) {
            alert(resp.err.message);
            $('small').text(resp.err.message);
        } else if (resp.numero) {
            $('small').text(resp.numero);
        }
    });
});