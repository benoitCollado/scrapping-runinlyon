console.log("child vide");
process.on('message', (m) => {
  console.log('CHILD got message:', m);
});