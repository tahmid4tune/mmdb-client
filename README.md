### WHAT THIS IS ABOUT
This is the front-end for MMDB application. 

The back-end of this application can be found in following repository: 
[mmdb-server](https://github.com/tahmid4tune/mmdb-server)


### HOW TO RUN
After downloading the code, go to the root directory of the project. 
Copy all content of ```env.local.example``` file and paste them into a new (newly created) file named ```.env.local```
Execute following command to resolve the dependencies mentioned in package.json file.

```
yarn install
```

Now execute following command to run the application:

```
yarn dev
```

Based on the configuration mentioned in env.local.example file, you should be able to see a login screen in following URL:

http://localhost:3000/login
