# **Finance App SSD**

This is the frontend and backend of the Finance App for the class SSD

## Setup

1. Install dependencies
   You will have to open a terminal for both the frontend and backend project then run the following command for both.

```bash
npm install
```

2. You will have to use your localhost IPv4 address in order to connect with the backend server. The address should be added to the file called URL.ts that is located in the /frontend/constants/ directory. This is required for the frontend and backend to be able to communicate. The default port that is being used is 3000.

   This is what the contents of the file looks like and the IP address should be added inside the quotation marks for example "192.168.1.2"

```typescript
const IP = ""; // <-- YOUR LOCAL HOST IP HERE
export const URL = `http://${IP}:3000`;
```

## Start

In order for the project to work with the backend both the frontend and backend will need to be running.

Open a terminal for both frontend and backend and run these commands respectively.

```bash
npx expo start -c
```

```bash
node index.js
```

These will start up both the app and the server. Once they are both running use the QR code displayed in the frontend terminal to connect with the expo app on your phone.
