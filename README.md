# Colorizer

Minimum Viable Product:

- user can draw on canvas (choosing colors, thickness, etc.)
- web socket implementation to allow for collaboration
- new room created on new session, where user can invite other users
- export drawing to png/jpg file

Freezer:

- user can implement pictures into their canvas
- implement a database? (not really wanted at the moment)

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
     - components/
          - canvas.js

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
