/* jshint esversion: 6 */
const app = new Vue({
   el: '#app',
   data: {
      books: [
         {
            name: '算法大全',
            date: '20',
            price: 85,
            num: 1,
            isShow: true
         },
         {
            name: 'UNIX编程艺术',
            date: '20',
            price: 59,
            num: 1,
            isShow: true
         },
         {
            name: '编程珠玑',
            date: '20',
            price: 39,
            num: 1,
            isShow: true
         },
         {
            name: '代码大全',
            date: '20',
            price: 128,
            num: 1,
            isShow: true
         }
      ],
      isHavingBooks: true
   },
   computed: {
      total() {
         let money = 0;
         for (let i in this.books) {
            money += this.books[i].num * this.books[i].price;
         }
         return money;
      }
   },
   methods: {
      remove(index) {
         this.books.splice(index, 1);
      }
   },
});