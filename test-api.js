const data = {
  customerName: "Test",
  items: [{
    item: "65a1b2c3d4e5f6a7b8c9d0e1",
    name: "Item",
    price: 10,
    quantity: 1
  }],
  subtotal: 10,
  taxAmount: 0.5,
  totalAmount: 10.5,
  paymentMethod: "cash"
};

fetch("https://backendvarun.vercel.app/api/orders", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data)
})
  .then(r => r.text())
  .then(text => console.log("Response:", text))
  .catch(err => console.error("Error:", err));
