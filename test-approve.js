fetch("https://backendvarun.vercel.app/api/orders/approve/69bee9827d15ec9ba62fb5bd", {
  method: "PUT"
})
  .then(res => res.text())
  .then(text => console.log(text))
  .catch(err => console.error(err));
