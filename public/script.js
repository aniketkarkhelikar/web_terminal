// --- CONFIGURATION ---

// IMPORTANT: Update this list with the actual IPs or URLs of your lab PCs.

const LAB_PCS = [

    { name: "Lab 29(Desktop)", url: "http://172.25.120.212:3000" },

    { name: "Lab 28",           url: "http://172.25.120.211:3001"}

];

// --------------------


const terminalElement = document.getElementById('terminal');

const statusDot = document.getElementById('statusDot');

const statusText = document.getElementById('statusText');

const terminalSize = document.getElementById('terminalSize');

const terminalTitle = document.getElementById('terminalTitle');

const pcSelector = document.getElementById('pc-selector');


let socket = null;

let term = null;

let fitAddon = null;


function initializeTerminal() {

    term = new Terminal({

        cursorBlink: true,

        fontFamily: '"Fira Code", Menlo, "DejaVu Sans Mono", "Lucida Console", monospace',

        fontSize: 14,

        theme: { background: '#1e1e1e', foreground: '#d4d4d4', cursor: '#007acc' }

    });

    

    fitAddon = new FitAddon.FitAddon();

    term.loadAddon(fitAddon);

    term.open(terminalElement);

    

    fitAddon.fit();

    updateTerminalSize();


    term.onData(data => socket?.emit('input', data));

    term.onResize(size => {

        socket?.emit('resize', { cols: size.cols, rows: size.rows });

        updateTerminalSize();

    });


    window.addEventListener('resize', () => fitAddon.fit());

}


function updateTerminalSize() {

    if (term) {

        terminalSize.textContent = `${term.cols}x${term.rows}`;

    }

}


function connectToServer(pc) {

    // Disconnect any existing socket

    if (socket) {

        socket.disconnect();

    }

    

    term.clear();

    term.write(`\x1b[33mConnecting to ${pc.name} at ${pc.url}...\x1b[0m\r\n`);

    

    socket = io(pc.url);

    

    socket.on('connect', () => {

        statusDot.classList.add('connected');

        statusText.textContent = `Connected to ${pc.name}`;

        terminalTitle.textContent = `user@${pc.name}: ~`;

        fitAddon.fit(); // Refit terminal for the new session

    });

    

    socket.on('disconnect', () => {

        statusDot.classList.remove('connected');

        statusText.textContent = 'Disconnected';

        terminalTitle.textContent = 'Connection Lost';

        term.write('\r\n\x1b[31mDisconnected from server.\x1b[0m\r\n');

    });

    

    socket.on('output', data => term.write(data));

    socket.on('error', error => term.write(`\r\n\x1b[31mError: ${error}\x1b[0m\r\n`));

}


function populatePCSelector() {

    LAB_PCS.forEach(pc => {

        const button = document.createElement('button');

        button.className = 'command-btn';

        button.textContent = pc.name;

        button.onclick = () => {

            connectToServer(pc);

            // Highlight the active button

            document.querySelectorAll('#pc-selector .command-btn').forEach(btn => btn.classList.remove('active'));

            button.classList.add('active');

        };

        pcSelector.appendChild(button);

    });

}


document.addEventListener('DOMContentLoaded', () => {

    initializeTerminal();

    populatePCSelector();

});
