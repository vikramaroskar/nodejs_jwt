# nodejs_jwt

nodejs_jwt

C:\dev\github\nodejs_jwt>node

> require('crypto').randomBytes(64).toString('hex')
> 'a52e7c622c58a9a511afec207d7adcd6ac708332047b1e1eb90f591ef2222a01d52ae7fa8d63ec7c643bd1dd83f8cec8ad5dab58a6b53874deae474afb46699a'

Since JWT is used, we can use same token on different servers, 3000 port and 4000 port.

Missing, logout function to delete access and refreshtoken.

Ideally, separate out auth server and application post server.
