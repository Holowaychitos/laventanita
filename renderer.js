/* global Vue, window, _, Instascan, fetch  */

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
    ticket: [],
    clientId: '',
    popup: false,
    resolve: false,
    loading: false,
    error: false
  },
  methods: {
    closeDialog () {
      this.popup = false
      this.ticket = []
    },
    closeAndTryAgain(){
      this.popup = false
    },
    scand () {
      let self = this
      this.popup = true
      let data = this.resume
      _.delay(() => {
        let cam = openCam((code) => {
          self.loading = true
          // fetch
          fetch('http://ecoticket.mx/API/venta', {
            method: 'POST',
            headers: {
              'Content-Type': 'text/plain;charset=UTF-8'
            },
            body: JSON.stringify({
              user: code,
              shop: 222,
              data: data
            })
          }).then((response) => {
            if(response.status === 200){
              self.resolve = true
              self.loading = false
              self.error = false
              cam.stop()
              return response.text()
            } else {
              cam.stop()
              self.error = true
              self.resolve = false
              self.loading = false
            }

          }).then(json => {
            console.warn(json)
          })
          .catch(function(err){
            console.error()
          })
        })
      }, 30)
    },
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
      if (!value) return '0.00'
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

function openCam (callback) {
  let scanner = new Instascan.Scanner({ video: document.getElementById('preview') })

  scanner.addListener('scan', function (content) {
    callback(content)
  })

  Instascan.Camera.getCameras().then(function (cameras) {
    if (cameras.length > 0) {
      scanner.start(cameras[0])
    } else {
      console.error('No cameras found.')
    }
  }).catch(function (e) {
    console.error(e)
  })

  return scanner
}

// scanner.stop()
