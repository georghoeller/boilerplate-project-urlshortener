// import dns module
const dns = require("dns");

// lookup the hostname passed as argument
dns.lookup("educattiivve.io", (error, address, family) => {
  
  // if an error occurs, eg. the hostname is incorrect!
  if (error) {
    console.error(error.message);
    console.error(error);
    console.error(typeof error);
  } else {
    // if no error exists
    console.log(
      `The ip address is ${address} and the ip version is ${family}`
    );
  }
});