# Web Terminal

A web-based terminal application that provides remote access to a Linux terminal through a browser interface. This project features secure authentication, real-time terminal interaction using WebSockets, and support for sudo operations. 

## Features

- **Browser-Based Terminal**:  Access a Linux terminal from any web browser
- **Basic Authentication**: Secure login system to protect access
- **Real-time Communication**: Uses Socket. IO for instant terminal interaction
- **PTY Support**: Full pseudo-terminal (PTY) implementation with `node-pty`
- **Modern UI**: Clean and responsive terminal interface
- **Multi-Instance Support**: Agent-based architecture for managing multiple terminal sessions

## Project Structure

```
web_terminal/
├── master-server.js          # Main web UI server
├── agent-web-term/            # Agent terminal server
│   ├── server.js              # Terminal session handler
│   └── package.json           # Agent dependencies
├── public/                    # Frontend files
│   ├── index.html             # Main HTML interface
│   ├── script.js              # Client-side JavaScript
│   └── style.css              # Styling
└── package.json               # Main dependencies
```

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Linux/Unix-based operating system (for PTY support)

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/aniketkarkhelikar/web_terminal.git
   cd web_terminal
   ```

2. **Install main server dependencies**
   ```bash
   npm install
   ```

3. **Install agent server dependencies**
   ```bash
   cd agent-web-term
   npm install
   cd ..
   ```

## Usage

### Starting the Master Server

The master server serves the web interface and handles user authentication. 

```bash
node master-server.js
```

Or with nodemon for development:
```bash
npm run dev
```

By default, the server runs on **port 8000**. Access it at: 
```
http://localhost:8000
```

**Default credentials:**
- Username: `admin`
- Password: `password123`

**SECURITY WARNING**: Change these default credentials before deploying to production!

### Starting the Agent Server

The agent server handles the actual terminal sessions.

```bash
cd agent-web-term
node server.js
```

Or with nodemon:
```bash
npm run dev
```

## Configuration

### Master Server (master-server.js)

- **Port**: Set via `PORT` environment variable (default: 8000)
- **Credentials**: Update the `basicAuth` configuration in `master-server.js`

```javascript
app.use(basicAuth({
    users: { 'admin': 'password123' },  // Change these! 
    challenge: true,
    realm: 'Web Terminal Login'
}));
```

### Agent Server

Configure the agent server by modifying `agent-web-term/server. js` or using environment variables (if implemented).

## Technologies Used

### Backend
- **Express. js**: Web server framework
- **Socket.IO**: Real-time bidirectional communication
- **node-pty**: Pseudo-terminal bindings for Node.js
- **express-basic-auth**: HTTP basic authentication middleware
- **ws**: WebSocket library

### Frontend
- HTML5
- JavaScript (ES6+)
- CSS3
- Socket.IO Client

## Security Considerations

1. **Change default credentials** immediately
2. **Use HTTPS** in production environments
3. **Implement proper authentication** (consider OAuth, JWT, or other secure methods)
4. **Restrict access** using firewall rules or reverse proxy
5. **Run with limited privileges** - avoid running as root when possible
6. **Monitor terminal access** and implement logging
7. **Keep dependencies updated** to patch security vulnerabilities

## Development

### Running in Development Mode

Both servers support nodemon for auto-reloading: 

```bash
# Master server
npm run dev

# Agent server
cd agent-web-term && npm run dev
```

### Dependencies

**Main Server:**
- express
- socket.io
- node-pty
- express-basic-auth

**Agent Server:**
- express
- socket.io
- socket. io-client
- node-pty
- express-basic-auth
- ws
- dotenv

## Common Troubleshooting I found

### PTY Issues
If you encounter issues with `node-pty`, ensure you have the necessary build tools: 

**Ubuntu/Debian:**
```bash
sudo apt-get install build-essential python3
```

**MacOS:**
```bash
xcode-select --install
```

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## Disclaimer

This application provides direct terminal access to your system. Use it responsibly and ensure proper security measures are in place before deploying in any environment accessible from the internet.

## Author
- [Nikhil Hegde](https://github.com/Nikh-on-Linux/)
- [Aniket Karkhelikar](https://github.com/aniketkarkhelikar)
