//Comando para establecer la conexión
var socket = io();
var label = $('#lblNuevoTicket');
socket.on('connect', function() {
    console.log('conectado al servidor');
});
socket.on('estadoActual', function(data) {
    label.text(data.ticket);
});
socket.on('disconnect', function() {
    console.log('desconectado al servidor');
});
$('button').on('click', function() {
    console.log('click');
    socket.emit('siguienteTicket', null, function(ticket) {
        label.text(ticket);
    });
});