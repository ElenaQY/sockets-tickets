const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');
const ticketControl = new TicketControl();


io.on('connection', (client) => {

    client.emit('estadoActual', {
        actual: ticketControl.getUltimo(),
        ultimos4: ticketControl.getUltimos4()
    });
    client.on('siguienteTicket', (data, callback) => {
        let ticket = ticketControl.siguiente();
        console.log(ticket);
        callback(ticket);
    });
    client.on('atenderTicket', (data, callback) => {
        console.log('llegado a atender Ticket');
        if (!data.escritorio) {
            return callback({
                ok: false,
                err: {
                    message: 'Es necesario indicar un escritorio'
                }
            });
        }
        let atenderTicket = ticketControl.atenderTicket(data.escritorio);
        callback(atenderTicket);
        client.broadcast.emit('estadoActual', {
            actual: ticketControl.getUltimo(),
            ultimos4: ticketControl.getUltimos4()
        });
    });

});