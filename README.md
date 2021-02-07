# MyPetStore

MyPetStore is an API which accepts a user’s address in the request body, proxies that request to the APIs of our shipping carriers (Canada Post & BoxKnight) to retrieve their shipping rates and returns the best shipping rate to the client.

### Prerequisites

Before you can run the application, you first need to have Node.js in your system. It can be found [here](https://nodejs.org/en/).
After the installation is complete, type node -v to in your command prompt or terminal to check your version.
```shell
$ node -v
v14.15.4
```
### Installing

1. Clone the repo
```shell
$ git clone https://github.com/mnhn329/MyPetStore.git
```
2. Change directory to the MyPetStore folder
```shell
...
$ cd MyPetStore
```
3. Install NPM packages
```shell
$ npm install
```
4. Run the application
 ```shell
$ npm start
```
5. Open http://localhost:3000/

6. Send it POST requests using cURL, Postman, or any tools to test APIs.
