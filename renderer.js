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
  filters: {
    fixed (value) {
      if (!value) return ''
      return value.toFixed(2).toLocaleString()
    }
  },
  computed: {
    resume () {
      let resume = this.ticket.reduce((list, element) => {
        if (element.name in list) {
          list[element.name].count = list[element.name].count + 1
        } else {
          list[element.name] = {}
          list[element.name].price = element.price
          list[element.name].count = 1
        }

        return list
      }, {})

      let resumeArray = _.reduce(resume, (array, val, key) => {
        array.push({name: key, price: val.price, count: val.count})
        return array
      }, [])

      return resumeArray
    },
    total () {
      let sum = this.ticket.reduce((sum, element) => {
        return sum + element.price
      }, 0)
      return sum.toFixed(2).toLocaleString()
    }
  }
})

// let scanner = new Instascan.Scanner({ video: document.getElementById('preview') });
//       scanner.addListener('scan', function (content) {
//         console.log(content)
//       });
//       Instascan.Camera.getCameras().then(function (cameras) {
//         if (cameras.length > 0) {
//           scanner.start(cameras[0])
//         } else {
//           console.error('No cameras found.')
//         }
//       }).catch(function (e) {
//         console.error(e)
//       })
//
// scanner.stop()
