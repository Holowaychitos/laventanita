/* global Vue, window, _  */

// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const productList = [
  { name: 'Jugo', price: 4.50 },
  { name: 'Cafe', price: 2.10 },
  { name: 'Galletas', price: 8.10 },
  { name: 'Sopa', price: 6.00 },
  { name: 'Pizza', price: 47.17 },
  { name: 'Torta', price: 4.56 },
  { name: 'Paracetamol', price: 5.76 },
  { name: 'Coca Cola', price: 7.35 }
]

const getRamdomItem = () => productList[_.random(0, productList.length - 1)]

const getRamdomList = () => {
  let tmp = []
  let times = _.random(3, 8)

  for (var i = 0; i < times; i++) {
    tmp.push(getRamdomItem())
  }

  return tmp
}

const App = new Vue({
  el: '#app',
  data: {
    ticket: []
  },
  methods: {
    reverseMessage () {
      this.ticket = getRamdomList()
    },

    print () {
      // call socket
      window.print()
    }
  },
  computed: {
    total () {
      let sum = this.ticket.reduce((sum, element) => {
        return sum + element.price
      }, 0)
      return sum.toFixed(2).toLocaleString()
    }
  }
})
