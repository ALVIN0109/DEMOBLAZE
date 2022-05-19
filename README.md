# DEMOBLAZE LOGIN AND LOGOUT 

## Install and Run

```sh 
  npm install
  node test.js
```

## Edit Test Data

```sh

// test data
var input_data = [
    { title : 'Login without username and password', username : '',password : '', id:'TC_L-00003' },
    { title : 'Login without username', username : '',password : 'admin', id:'TC_L-00004' },
    { title : 'Login without password!', username : 'admin',password : '', id:'TC_L-00005'},
    { title : 'Login incorrect username!', username : 'admins',password : 'admin', id:'TC_L-00006'},
    { title : 'Login incorrect password!', username : 'admin',password : 'admins', id:'TC_L-00007'}, 
    { title : 'Login with correct username and password!', username : 'admin',password : 'admin', id:'TC_L-00008' },
];

```
## sample result - console
```js
SUMMARY RESULT
 TC_L-00003:  'PASSED '
 TC_L-00004:  'PASSED '
 TC_L-00005:  'PASSED '
 TC_L-00006:  'PASSED '
 TC_L-00007:  'PASSED '
 TC_L-00008:  'PASSED '
```
