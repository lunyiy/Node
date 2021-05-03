/* jshint esversion: 6 */
const cpn = Vue.extend({
  template: '#cpn',
  props: {
    number1: {
      type: Number,
      default: -1
    },
    number2: {
      type: Number,
      default: -1
    }
  },
  data() {
    return  {
      dnumber1: this.number1,
      dnumber2: this.number2
    }
  },
  methods: {
    num1Input(event) {
      this.dnumber1 = event.target.value
      this.$emit('num1-change', event.target.value)
    },
    num2Input(event) {
      this.dnumber2 = event.target.value
      this.$emit('num2-change', event.target.value)
    }
  },
})

const app = new Vue({
  el: '#app',
  data: {
    num1: 1,
    num2: 0
  },
  components: {
    cpn
  },
  methods: {
    num1Change(value) {
      this.num1 = parseInt(value)
    },
    num2Change(value) {
      this.num2 = parseInt(value)
    }
  },
})