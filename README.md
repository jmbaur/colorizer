# Colorizer

Minimum Viable Product:

- user can draw on canvas (choosing colors, thickness, etc.)
- web socket implementation to allow for collaboration
- new room created on new session, where user can invite other users
- export drawing to png/jpg file

Freezer:

- user can implement pictures into their canvas
- implement a database? (not really wanted at the moment)

# Requirements

.env

```txt
REACT_APP_URL="<base url for front end in production>"
SESSION_SECRET="<session store secret>"
SERVER_PORT="<backend port>"
CONN_STR="<mongodb connection string>"
MONGO_INITDB_ROOT_USERNAME="<mongo username>"
MONGO_INITDB_ROOT_PASSWORD="<mongo password>"
```

## Front-End

### Dependencies

- socket.io?

### Routes

- home /

### File Structure

- src/
     - App.js
     - App.css
     - index.js
     - hooks/
     - components/
          - canvas.js - toolbar.js

## Back-End

### Dependencies

- express
- express-session
- socket.io

### Endpoints

- GET / serves up index.html

## Testing

- test for socket connection from front-end
- test sending/receiving data to socket
- test that undo/clear buttons work
- test that canvas can be exported

- test that user gets placed into room on landing page
- test that color (,thickness, etc.) changes when choosing from toolbar
- test that new user joins the same room as other user

## Nginx location block for websocket

```txt
location /wsapp/ {
    proxy_pass http://wsbackend;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "Upgrade";
    proxy_set_header Host $host;
}
```

## SystemD Unit File

```
[Unit]
Description=Node.js instance for Colorizer web app
After=network.target

[Service]
Environment=NODE_ENV=production
EnvironmentFile=/home/jared/colorizer/.env
Type=simple
ExecStart=/usr/bin/node /home/jared/colorizer/server/index.js
Restart=on-failure

[Install]
WantedBy=multi-user.target
```
