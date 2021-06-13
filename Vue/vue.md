# [vue.js](https://www.bilibili.com/video/BV15741177Eh)

## 1. vue.js安装

### 		1.1.  CDN引入

```html
<!-- 开发环境 -->
<script src="http://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<!-- 生产环境 -->
<script src="https://cdn.jsdelivr.net/npm/vue/"></script>
```

### 		1.2. 下载和导入

```
开发环境： https://vuejs.org/js/vue.js
生产环境： https://vuejs.org/js/vue.min.js
```

### 		1.3. npm安装

```javascript
npm i -g vue-cli
```

## 2. vue 起步

### 		2.1. hello VueJs

```html
<div id="app">
    hello {{ message }}
</div>
<script src="../vue.js"></script>
<script>
    let app = new Vue({
        el: '#app',
        data: {
            message: "VueJs"
        }
    })
</script>
```

### 		2.2. v-for 遍历

```html
<div id="app">
   {{ message }}
   <ul>
       <li v-for="item in movies">{{ item }}</li>
   </ul>
</div>
<script src="../vue.js"></script>
<script>
    let app = new Vue({
        el: '#app',
        data: {
            message: 'hello',
            movies: ['元素1', '元素2', '元素3', '元素4']
        }
    })
</script>
```

### 		2.3. v-on 监听（基础）

#### 				2.3.1. v-on实例

```html
<button v-on:click="count++">+</button>
```

#### 				2.3.2. 计数器

```html
<div id="app">
    当前计数：{{ counts}}
    <div>
        <button v-on:click="add">+</button>
        <button @click="sub">-</button> <!-- 语法糖：简写，即v-on的语法糖是@ -->
    </div>
</div>
<script src="../vue.js"></script>
<script>
    let app = new Vue({
        el: '#app',
        data: {
            counts: 0
        },
        methods: {
            add: function () {
                this.counts++ //不加this会直接找全局的counts，但是没有
            },
            sub: function () {
                this.counts--
            }
        }
    })
</script>
```

## 3. MVVM

### 		3.1. 什么是MVVM

​		Model 		 ViewModel 		 View

​		Vue 中的 MVVM

![image-20210425225147852](C:\Users\伦\AppData\Roaming\Typora\typora-user-images\image-20210425225147852.png)

用上面的计数器做解析：

​		Model： 是定义在new Vue({})中的额数据

​		ViewModel： 是new Vue() 方法，以及定义在其中的methods

​		View 是看到的图层

### 	3.2. 创建Vue实例时传入的对象options

|         | 类型                                         | 作用                                                         |
| :-----: | -------------------------------------------- | ------------------------------------------------------------ |
|   el    | string\|HTMLElement                          | 决定之后Vue实例管理哪一个DOM                                 |
|  data   | Object\|Function（组件中data必须是一个函数） | Vue实例对应的数据对象                                        |
| methods | { [key : string]: Function  }                | 定义属于Vue的一些方法，可以在其他地方调用，也可以在指令中使用 |

### 	3.3. Vue的生命周期

​		从创建一个实例到销毁

​		callHook：生命周期钩子函数，beforeCreate、created...

​		钩子函数差不多就相当于Vue的生命周期中的各个关键点的标记

## 4. 模板语法

### 		4.1. 插值操作 - Mustache语法

#### 		4.1.1. 基本使用

```html
<div id="app">
  {{message}}
  <div v-once>{{message}}</div> <!-- 只进行一次插值 -->
  {{count * 2}} <!-- 输出是200 -->
</div>
<script>
	let app = new Vue({
        el: '#app',
        data: {
          	message: 'hello',
            counts: 100
        }
    })
</script>
```

tips： 如果不想进行交互，可以用`v-once`，只进行一次插值

#### 		4.1.2. v-html

```html
<div id="app">
   <h2 v-html="url"></h2>
</div>
<script src="../vue.js"></script>
<script>
  let app =new Vue({
    el: '#app',
    data: {
      url: '<a href="https://www.baidu.com">百度一下</a>'
    }
  })
</script>
```

#### 		4.1.3. v-text

​		不推荐使用，不如{{}}语法

#### 		4.1.4. v-pre

```html
<h2 v-pre>
  {{message}} <!-- 显示{{message}} 不会将值代入 -->
</h2>
```

#### 		4.1.5. v-cloak

```html
<div id="app" v-cloak>
    {{message}}
</div>
<script src="../vue.js"></script>
<script>
  //在vue解析之前v-cloak属性存在，div不显示
  //vue解析之后，v-cloak属性消失，div显示
  setTimeout(function () {
    let app = new Vue({
    el: '#app',
    data: {
      message: 'hello'
    }
  })
  },1000)
</script>
```

### 	4.2. v-bind 动态属性操作

#### 		4.2.1. 基本使用

```html
<div id="app">
    <img v-bind:src="imgUrl" alt="hold on">
    <a :href="aUrl">百度一下</a> <!-- 语法糖 v-bind 为 : -->
</div>

<script src="../vue.js"></script>
<script>
  let app = new Vue({
    el: '#app',
    data: {
      imgUrl: 'http://39.100.147.160/srf/New/img/logo.png',
      aUrl: 'https://ww.baidu.com'
    }
  })
</script>
```

#### 		4.2.2. v-bind 动态绑定class （对象语法）

```html
<div id="app">
    <div class="title" :class="{active: isActive, lines: isLines}">
      {{message}}
    </div>
</div>

<script src="../vue.js"></script>
<script>
  let app = new Vue({
    el: '#app',
    data: {
      message: '你好啊',
      isActive: true,
      isLines: false
    }
  })
</script>
```

#### 		4.2.3.  v-bind 动态绑定class （数组语法，用得少）

```html
<div id="app">
  <div :class="getClasses()"> <!-- aaaa bbbb -->
  {{message}}
	</div>
    
	<div :class="['active', 'lines']"> <!-- active lines -->
   {{message}}
	</div>

	<div :class="[active, lines]"> <!-- aaaa bbbb -->
      {{message}}
	</div>
</div>
<script src="../vue.js"></script>
<script>
  let app = new Vue({
    el: '#app',
    data: {
      message: '你好啊',
      active: 'aaaa',
      lines: 'bbbb'
    },
    methods: {
      getClasses: function () {
        return [this.active, this.lines]
      }
    }
  })
</script>
```

#### 		4.2.4.  homework

​				[v-for和v-bind组合作业](https://github.com/lunyiy/Web/blob/main/Vue/v-for%26v-bind_homework.html)

#### 4.2..5. v-bind 绑定 style (对象语法)

```html
<div id="app">
   <h2 :style="{fontSize: fSize + 'px', color: fColor}">{{message}}</h2>
</div>

<script src="../vue.js"></script>
<script>
  let app = new Vue({
    el: '#app',
    data: {
      message: '你好啊',
      fSize: 100,
      fColor: 'red'
    }
  })
</script>
```

#### 4.2.6. v-bind 绑定 style (数组语法)

```html
<div id="app">
   <h2 :style="[fSize, fColor]">{{message}}</h2>
</div>
  
<script src="../vue.js"></script>
<script>
  let app = new Vue({
    el: '#app',
    data: {
      message: '你好啊',
      fSize: {fontSize: '100px'},
      fColor: {color: 'red'}
    }
  })
</script>
```

## 5. 计算属性 computed

```html
<div id="app">
  <!--四种效果一致 -->
  <h2>{{lastname+ ' ' + firstname}}</h2>
  <h2>{{lastname}} {{firstname}}</h2>
  <h2>{{getFullname()}}</h2>
  <h2>{{fullname}}</h2>
</div>
<script src="../vue.js"></script>
<script>
  let app = new Vue({
    el: '#app',
    data: {
      firstname: 'ly',
      lastname: 'yan'
    },
    computed: {
      fullname: function () {
        return this.lastname + ' ' + this.firstname
      }
    },
    methods: {
      getFullname: function () {
        return this.lastname + ' ' + this.firstname
      }
    }
  })
</script>
```

### 5.1. computed & methods

​	computed 会进行缓存，优先从缓存中读取，性能更高；methods每次都会重新调用，性能更低

​	computed是一个对象，对象里有一个属性fullname

​	fullname完整写有两个方法：

```javascript
computed: {
  fullname: {
    set: function () {} //一般是空，不想外部修改属性值，所以一般删掉；如果有，通过赋值来用
    get: fcuntion () { //只读属性
      return this.firstname + ' ' + this.lastname
    }
  }
}
//不使用set方法，简写模式
computed: {
  fullname: function () {
    return this.firstname + ' ' + this.lastname
  }
}
```

## 6. ES6

### 6.1. let & const

​	ES5只有函数有作用域，ES6 `let` 声明的变量都有块级作用域

​	`const` 声明静态变量（不能修改指向地址），对于变量不能修改值，对于对象不能修改指向，可以修改对象内属性

### 6.2.增强写法

#### 6.2.1. 对象增强写法

```javascript
const name = 'zhangshan'
const age = 18
const height = 100

const obj = {
  name,  //name : 'zhangshan'
  age, //age: 18
  height //height: 100
}
```

#### 6.2.2. 函数增强写法

```javascript
const obj = {
  //run : function () {} //非增强写法
  run() {} //增强写法
}
```

## 7.v-on

### 7.1. 初步 无参数

​	无参数在调用时可省略括号

### 7.2. v-on 有参数

#### 7.2.1. 传入一个参数

```html
<div id="app">
  <button @click="btn1('hello')">按钮1</button>
  <!-- 输出 hello -->
  
	<button @click="btn1()">按钮2</button>
  <!-- 输出 undefined -->
  
	<button @click="btn1">按钮3</button>
  <!-- 输出对象 MouseEvent 鼠标点击事件 -->
  <!-- 当需要参数但是连括号都没有时，默认将鼠标事件作为参数输入 -->
  
</div>
<script>
	const app = new Vue({
    el: 'app',
    methods: {
      btn1(string) {
      console.log(string)
    }
  })
</script>
```

#### 7.2.2. 传入多个参数

```html
<div id="app">
  <button @click="btn2('hello', event)">按钮3</button>
  <!-- 输出 ++ hello 然后报错，没有找到event变量，如果需要浏览器event对象，需要加$ -->
  
  <button @click="btn2('hello', $event)">按钮3</button>
  <!-- 输出 ++ hello MouseEvent对象 -->
  
</div>
<script>
	const app = new Vue({
    el: 'app',
    methods: {
      btn2(abc, event) {
        console.log('++', abc, event)
      }
    }
    
  })
</script>
```

### 7.3. v-on修饰符

#### 7.3.1.  修饰符 `.stop`

​	vue中阻止冒泡非常简单，只需用一个修饰符 `.stop`即可，相当于调用 `wvent.stopPropagation()`

```html
<div id="app">
  <div @click="divClick">
    aaaaaa    <!-- 只输出 divClick -->
    <button @click.stop="btnClick">按钮</button> <!-- 只输出 btnClick -->
  </div>
</div>
<script src="../vue.js"></script>
<script>
  const app = new Vue({
    el: '#app',
    methods: {
      divclick() {
        console.log('divClick')
      },
      btnclick() {
        console.log('btnClick')
      }
    }
  })
</script>
```

#### 7.3.2. 修饰符 `.prevent`

​	相当于调用 `event.preventDefault()`，阻止默认事件

```html
<form @click.prevent></form> <!-- 仅阻止默认行为 -->
<button @click.prevent="doThis"></button> <!-- 阻止默认行为后，调用doThis方法 -->
```

#### 7.3.3. 键修饰符

​		键别名

```html
<button @keyup.enter="onEnter"></button>
```

​		键代码

```html
<button @keyup.13="onEnter"></button>
```

#### 7.3.4. 其他修饰符

​	1.串联修饰符，即链式

```html
<button @click.stop.prevent="doThis"></button>
```

​	2.只执行一次回调

```html
<button @click.once="doThis"></button>
```

​	3.监听组件（开发组件的时候用）

```html
<cpn @click.native="cpnClick"></cpn>
```

## 8. v-if

### 8.1.v-if、v-else-if、v-else

```html
<div id="app">
  <div v-if="score>=90">优秀</div>
  <div v-else-if="score>=70">良好</div>
  <div v-else-if="score>=60">及格</div>
  <div v-else>不及格</div>
</div>
<script src="../vue.js"></script>
<script>
  const app = new Vue({
    el: '#app',
    data: {
     score: 89
    }
  })
</script>
```

### 8.2. 小案例

​	[**if-else小案例.html**](https://github.com/lunyiy/Web/blob/main/Vue/if-else%E5%B0%8F%E6%A1%88%E4%BE%8B.html)

​	小问题： 在切换的时候，框里输入的字符不会清空，这是因为Vue底层出于性能的考虑，回尽可能得复用，要解决这个问题，可以添加一个属性 `key=""` ，如果`key`一样，则会复用，否则不会复用

### 8.3. v-show

​	v-if 和 v-show的对比

​		v-if和v-show都可以决定一个元素是否渲染

​		区别： v-if 条件为false时，DOM中没有该元素，v-show元素为false时，仅仅是将元素的display属性设置为none，可以`F12`查看该元素 

​		如何选择：当需要频繁切换显示与隐藏时，使用v-show，使用一次切换时，使用v-if

## 9. v-for

### 9.1. 遍历数组

### 9.2. 遍历对象

​	获取value

```html
<ul>
  <li v-for="item in info">{{item}}</li>
</ul>
```

​	获取value和key

```html
<ul>
  <li v-for="(value, key) in info">{{key}}-{{value}}</li>
</ul>
```

​	获取value、key和index

```html
<ul>
  <li v-for="(value, key, index) in info">{{index}}-{{key}}-{{value}}</li>
</ul>
```

```html
<script>
	const app = new Vue({
    el: '#app',
    data: {
      info: {
        name: 'a',
        age: 19,
        height: 188
      }
    }
  })
</script>
```

### 9.3. key属性

​	官方推荐我们在使用v-for的时候，给对应的元素或组件添加上一个`:key`属性，当某一层有很多相同的结点时（列表结点），如果想要插入一个新的结点，没有key时的插入过程是这样的。

![image-20210501110708751](C:\Users\伦\AppData\Roaming\Typora\typora-user-images\image-20210501110708751.png)

![image-20210501110723231](C:\Users\伦\AppData\Roaming\Typora\typora-user-images\image-20210501110723231.png)

在有key的时候：

![image-20210501110750806](C:\Users\伦\AppData\Roaming\Typora\typora-user-images\image-20210501110750806.png)

当插入时，查找key和对应值，没有发生变化，直接复用，性能高

​	**使用`key`是为了高效的更新虚拟DOM**

###  9.4. 响应式方法

​	通过索引值修改数组内的元素（`this.item[0]='a'`）是不会进行响应的

响应式方法：

​	`.push()`

​	`.pop()`

​	`.shift()`

​	`.unshift()`

​	`.splice()`

​	`.sort()`

​	`.reverse()`

响应式vue方法：

​	`vue.set(this.letter, 0, 'a')`

### 9.5. 书籍购物车案例

​	[书籍购物车案例](https://github.com/lunyiy/Web/tree/main/Vue/%E4%B9%A6%E7%B1%8D%E8%B4%AD%E7%89%A9%E8%BD%A6%E6%A1%88%E4%BE%8B)

​	过滤器：

```javascript
const app = new Vue({
  el,
  data,
  computed: {},
  methods: {},
  filters: {
    showPrice(price) {
      return price.toFixed(2);
    }
  }
})
```

​	调用（类似于管道）：

```html
<div id="app">
  <td>{{price | showPrice}}</td>
</div>
```

## 10. JavaScript高阶函数

### 10.1. filter 函数(过滤)

```javascript
const nums = [10, 20, 50, 99, 100, 200, 600]
let newNums = nums.filter(function (n) {
  return n < 100   // newNums ==> [10, 20, 50, 99]
})
```

### 10.2. map 函数(映射)

```javascript
let new2Nums = newNums.map(function (n) {
  return n * 2     // new2Nums ==> [20, 40, 100, 198]
})
```

### 10.3. reduce 函数

​	对数组中的所有内容进行汇总

```javascript
//
reduce((previousValue, currentValue) => {}, initValue)
let total = new2Nums.reduce(function (preValue, n) {
  return preValue + n   // total ==>  358
}, 0)
```

### 10.4. 链式

```javascript
let total = nums
	.filter(function (n) {
    return n < 100
  })
	.map(function (n) {
    return n * 2
  })
	.reduce(function (preValue, n) {
  	return preValue + n
  }, 0) //初始值默认为0
```

##  11. v-model

​	表单控件，Vue中使用v-model指令来实现表单元素和数据的**双向绑定**

### 11.1. 原理

​	v-model其实是一个语法糖，它的背后本质是包含两个操作：

​		1.v-bind绑定一个value属性

​		2.v-on指令给当前元素绑定事件

### 11.2. v-model : radio

```html
<div id="app">
  <label for="male">
    <input type="radio" value="男" id="male" name="gender" v-model="gender">男
  </label>
  <label for="female">
    <input type="radio" value="女" id="female" name="gender" v-model="gender">女
  </label>
  <br>
  您的性别是：{{gender}}
</div>
<script src="../vue.js"></script>
<script>
  const app = new Vue({
    el: '#app',
    data: {
      gender: '男'
    }
  })
</script>
```

### 11.3. v-model : checkbox

#### 11.3.1. 单个多选框

​	v-model 对应的 value 是 布尔值

```html
<div id="app">
  <label for="protocol">
    <input type="checkbox" name="protocol" id="protocol" v-model="isAgree">协议
  </label>
  <button :disabled="!isAgree">next</button>
  <h2></h2>
</div>
<script src="../vue.js"></script>
<script>
  const app = new Vue({
    el: '#app',
    data: {
      isAgree: false
    }
  })
</script>
```

#### 11.3.2. 多个多选框

```html
<div id="app">
  <input type="checkbox" value="篮球" v-model="hobbies">篮球
  <input type="checkbox" value="足球" v-model="hobbies">足球
  <input type="checkbox" value="羽毛球" v-model="hobbies">乒乓球
  <input type="checkbox" value="网球" v-model="hobbies">网球
  <h2>您的爱好是：{{hobbies}}</h2>
</div>
<script src="../vue.js"></script>
<script>
  const app = new Vue({
    el: '#app',
    data: {
      hobbies: []
    }
  })
```

### 11.4. v-model : select

#### 11.4.1. 单选下拉框

```html
<div id="app">
  <select name="fruit" id="fruit" v-model="fruit">
    <option value="香蕉">香蕉</option>
    <option value="苹果">苹果</option>
    <option value="菠萝">菠萝</option>
    <option value="桃子">桃子</option>
  </select>
  <h2>选择了{{fruit}}</h2>
</div>
<script src="../vue.js"></script>
<script>
  const app = new Vue({
    el: '#app',
    data: {
      fruit: '菠萝'
    }
  })
</script>
```

#### 11.4.2. 多选下拉框

```html
<div id="app">
  <!-- 按住 ctrl 多选 -->
  <select name="fruits" id="fruits" v-model="fruits" multiple>
    <option value="香蕉">香蕉</option>
    <option value="苹果">苹果</option>
    <option value="菠萝">菠萝</option>
    <option value="桃子">桃子</option>
  </select>
  <h2>选择了{{fruits}}</h2>
</div>
<script src="../vue.js"></script>
<script>
  const app = new Vue({
    el: '#app',
    data: {
      fruits: []
    }
  })
</script>
```

### 11.5. 修饰符

#### 11.5.1. lazy

​	默认情况下，v-model是在input事件中同步输入框的数据，使用`.lazy`后，失去焦点或者回车才会更新

#### 11.5.2. number

​	默认情况下,v-model在输入框中无论输入的是什么类型的数据，都会被当作字符类型处理，使用`.number`后，可以使输入框中的内容自动转换成数值类型

#### 11.5.3. trim

​	`.trim`修饰符可以过滤内容首尾两边的空格

## 12. 组件化*

### 12.1. 组件使用的三个步骤

​	创建组件构造器(Vue.extend())

​	注册组件(Vue.component())

​	使用组件

### 12.2. 基本使用

```html
<div id="app">
  <my-cpn></my-cpn>
  <my-cpn></my-cpn>
  <my-cpn></my-cpn>
  <cpn></cpn>
</div>
<script src="../vue.js"></script>
<script>
  //1.创建组件构造器对象，需要在创建Vue实例对象之前
  const cpnC = Vue.extend({
    template: `
			<div>
				<h2>我是标题</h2>
				<p>我是内容</p>  
		  </div>
		`
  })

  //2.注册组件，全局组件
  Vue.component('my-cpn', cpnC)

  const app = new Vue({  //必须有，没有无法使用，
    el: '#app'
		/*componets: {
    		cpn: cpnC  //局部组件
  	}*/
  })
</script>
```

### 12.3. 父子组件

```html
<div id="app">
  <cpn2></cpn2>
</div>
```

```javascript
//定义子组件
const cpnC1 = Vue.extend({
  template: `
    <div>
      <h2>我是标题1</h2>
      <p>我是内容1</p>
    </div>
  `
})

//定义父组件
const cpnC2 = Vue.extend({
  template: `
    <div>
      <h2>我是标题2</h2>
      <p>我是内容2</p>
      <cpn1></cpn1>
    </div>
  `,
  components: {
    cpn1: cpnC1
  }
})

const app = new Vue({
  el: '#app',
  components: {
    cpn2: cpnC2
  }
})
```

### 12.4. 组件语法糖

​	全局

```javascript
Vue.component('cpnC1', {
  template: `
    <div>
      <h2>我是标题2</h2>
      <p>我是内容2</p>
      <cpn1></cpn1>
    </div>
  `
})
```

​	局部

```javascript
const app = new Vue({
  el: '#app',
  components: {
    'cpn1': {
      template: `
        <div>
          <h2>我是标题2</h2>
          <p>我是内容2</p>
          <cpn1></cpn1>
        </div>
      `
    }
  }
})
```

### 12.5. 组件分离写法

​	1.稍微麻烦

```html
<script type="text/x-template" id="cpn">
    <div>
      <h2>我是标题</h2>
      <p>我是内容</p>
  </div>
</script>
```

​	2.多用这个

```html
<template id="cpn">
  <div>
    <h2>我是标题</h2>
    <p>我是内容</p>
  </div>
</template>
```

```javascript
Vue.component('cpn', {
  template: '#cpn'
})
```



### 12.6. 组件的data数据

​	组件的data数据不在Vue实例中，组件也访问不了实例的data数据，所以组件的data数据就放在组件里面

​	组件有data属性，还有methods等属性

​	data属性只能是一个函数，函数返回一个对象，对象保存着数据。**为什么data是函数**：当组件复用时，每个组件的data数据都是分离独立的，不会相互影响(data函数返回都是)。

```html
<template>
	<h2>
    {{title}}
  </h2>
</template>
```

```javascript
Vue.component('cpn', {
  template: '#cpn',
  data() {
    return {
      title: '标题'
    }
  }
})
```

### 12.7. 父子组件通信

​	父组件通过props向子组件传递数据

​	子组件通过事件向父组件发送消息

#### 12.7.1 父向子通信

​	**父对子组件通信过程中，props内的变量命名问题：**

​			props内定义变量名时，可以使用驼峰写法，但是在使用时（即在html中），驼峰大写字母需要改成短横线加小写字母，格式可参考`css`样式名（`background-color`）与JavaScript样式名(`backgroundColor`)

​	使用：

```html
<div id="app">
  <cpn1 :c-movies="movies" :c-message="message"></cpn1>
</div>
```

​	组件模板：

```html
<template id="cpn1">
  <div>
    <ul>
      <li v-for="item in cMovies">{{item}}</li>
    </ul>
    <p>{{cMessage}}</p>
  </div>
</template>
```

​	创建组件：

```javascript
const cpn1 = Vue.extend({
  template: '#cpn1',
  props: { //可用数组形式和对象形式（主要），数组形式==> props: ['cmovies', 'cmessage']
    cMovies: {
      type: Array,
      default() {
        return []
      }
    },
    cMessage: {
      type: String,
      default: 'none'
    }
  }
})
```

​	组件注册及root组件（Vue实例）创建：

```javascript
const app = new Vue({
  el: '#app',
  data: {
    movies: ['海王', '海尔兄弟', '指环王'],
    message: 'hello world',
    title: '标题'
  },
  components: {
    cpn1
  }
})
```

#### 12.7.2. 子向父通信

​	需要使用自定义事件，自定义事件流程：

​		在子组件中，通过`$emit()`来触发事件

​		在父组件中，通过`v-on`来监听子组件事件

​	使用：

```html
<div id="app">
  <p>当前计数： {{counts}}</p>
  <cpn @count-increase="counts++"
       @count-decrease="counts--"></cpn>
</div>
```

​	组件模板：

```html
<template id="cpn">
  <div>
    <button @click="increase">+</button>
    <button @click="decrease">-</button>
  </div>
</template>
```

​	创建组件：

```javascript
const cpn = Vue.extend({
  template: '#cpn',
  methods: {
    increase(item) {
      this.$emit('count-increase', item) //发送事件，第一个参数是事件命名，vue脚手架可以使用驼峰命名，如果不是脚手架，命名方式跟html内属性名方法一样
    },
    decrease(item) {
      this.$emit('count-decrease', item)
    }
  }
})
```

​	组件注册及root组件（Vue实例）创建：

```javascript
const app = new Vue({
  el: '#app',
  data: {
    counts: 0
  },
  components: {
    cpn: cpn
  }
})
```

#### 12.7.3. 双向通信小案例

​	[双向通信小案例](https://github.com/lunyiy/Web/tree/main/Vue/%E7%BB%84%E4%BB%B6%E5%8F%8C%E5%90%91%E9%80%9A%E4%BF%A1%E5%B0%8F%E6%A1%88%E4%BE%8B)

### 12.8. 父子组件的访问

#### 12.8.1. 父访问子 \$children / \$refs

​	`this.$children`是一个数组类型，它包含所有子组件对象，在调用的时候需要`this.$children[n].dataName` 或者 `this.$children[n].methodsName`，$refs是给组件起一个名字，在使用的时候直接`this.$refs.refNmae.dataName/methodsName`，

​	使用：

```html
<div id="app">
  <cpn ref="aaa"></cpn>  //ref="aaa"，给子组件起名字 aaa
  <p>我是父组件</p>
  <button @click="btnClick">按钮2</button>
</div>
```

​	组件模板：

```html
<template id="cpn">
  <div>
    <p>我是子组件</p>
    <button @click="showMessage">按钮1</button>
  </div>
</template>
```

​	创建组件：

```javascript
const cpn = Vue.extend({
  template: '#cpn',
  data() {
    return {
      message: '你好啊'
    }
  },
  methods: {
    showMessage() {
      console.log(this.message)
    }
  }
})
```

​	注册及父组件：

```javascript
const app = new Vue({
  el: '#app',
  methods: {
    btnClick() {
      this.$children[0].showMessage()     //调用子组件的方法
      console.log(this.$refs.aaa.message) //访问子组件的数据
    }
  },
  components: {
    cpn
  }
})
```



#### 12.8.2. 子访问父 \$parent \$root

​	与上面类似

```javascript
const cpn = Vue.extend({
  template: '#cpn',
  data() {
    return {
      message: '我是子组件'
    }
  },
  methods: {
    showMessage() {
      console.log(this.$parent) //访问父组件
      console.log(this.$root)   //访问根组件
    }
  }
})
```

## 13. slot 插槽

​	组件的插槽是为了让我们封装的组件更加具有扩展性，让使用者可以决定组件内部的一些内容到底展示什么

​	如何封装： **抽取共性，保留个性**

### 13.1. 基本使用

​	模板：

```html
<template id="cpn">
  <div>
    <h2>This is title</h2>
    <slot><button>按钮</button></slot> //默认为button 按钮
  </div>
</template>
```

​	使用：

```html
<div id="app">
  <cpn>
    hello world  <!-- 一次性全部插入 -->
    <i>你好</i>
  </cpn>
</div>
```

### 13.2. 具名插槽

​	模板：

```html
<template id="cpn">
  <div>
    <slot name="left">左边</slot>
    <slot name="center">中间</slot>
    <slot name="right">右边</slot>
  </div>
</template>
```

​	使用：

```html
<div id="app">
  <cpn>
    <button slot="left">左边按钮</button>
    <span slot="center">这是修改后的center</span>
  </cpn>
</div>
```

vue2.6 - vue3：

```vue
<div id="app">
  <cpn>
    <template v-slot:left>
    	<button slot="left">左边按钮</button>
    </template>
    <template slot:center>
    	<span slot="center">这是修改后的center</span>
    </template>
  </cpn>
</div>
```



### 13.2. slot-scope

​	编译作用域

​	在哪个模板就使用哪个模板的变量，在`<div id="app">`中就是使用Vue实例的变量，在`template`中就是使用组件的变量

​	使用：

```html
<div id="app">
  <cpn></cpn>
  <cpn >
    <div slot-scope="slot" slot="a">
      <span>{{slot.data.join('-')}}</span>
    </div>
  </cpn>
</div>
```

​	模板：

```html
<template id="cpn">
  <div>
    <slot><button>按钮</button></slot>
    <slot :data="pLanguages" name="a"> <!-- 当出现多个插槽时，需要具名插槽 -->
      <ul>
        <li v-for="item in pLanguages">{{item}}</li>
      </ul>
    </slot>
  </div>
</template>
```

​	创建：

```javascript
const cpn = Vue.extend({
  template: '#cpn',
  data() {
    return {
      pLanguages: ['c', 'c++', 'python', 'perl', 'php', 'javascript']
    }
  }
})
```

## 14. 模块化开发

​	常见的模块化规范： CommonJS(nodejs)、AMD、CMD、ES6的Modules

### 14.1. ES6 模块化 `export/import`

​	导出：`export`

方式一：

```javascript
let flag = true, sum = function () {}
export {
	flag,
	sum
}
```

方式二：

```javascript
export let flag = true
//export let sum = function () {}
export function sum() {} //导出函数
export  class Person{ //导出类，ES6直接定义类，关键字 class
  run() {
    console.log('在奔跑')
  }
}
```

​	导入：

​	一般的导入模块需要使用大括号并且变量名要一致，如果想要使用者自己修改名字，可以在导出的时候使用`default`

```javascript
import {flag, sum} from './test.js'
//如果导入的变量太多，可以这样写，类似python
import * as aaa from './test.js' //使用：aaa.flag
```

### 14.2. 使用default导出

​	只能默认导出一个。如果导出多个，可以写成对象类型

```javascript
export default class Person {}
```

```javascript
import 任意变量名 from './test.js' //这里导入的只会是上面默认导出
```

## 15. webpack

### 15.1. 什么是webpack

​	从本质上讲，webpack是一个现代的JavaScript应用的静态**模块打包**工具

​	在ES6之前，想要进行模块化开发，就必须借助于其他的工具，并且在通过模块化开发完成了项目之后，还需要处理模块间的各种依赖关系，而webpack其中一个核心就是能够进行模块开发，并且帮助处理模块间的依赖关系，而且不仅仅是JavaScript文件，CSS、图片、json文件等等在webpack中都可以被当做模块来使用

### 15.2. webpack安装

​	依赖node环境 

​	`--save-dev` 开发时依赖，项目打包后不需要继续使用

 ```shell
 npm install webpack 
 npm i -g webpack@3.6.0 #vue cli2依赖该版本的webpack
 ```

### 15.3. webpack打包模块

#### 15.3.1. 一般模式

```shell
webpack ./src/main.js ./dist/bundle.js #打包处理入口文件，自动处理模块间依赖
```

#### 15.3.2. 省略模式

```shell
webpack
```

但是需要配置`webpack.config.js`文件

```javas
//webpack.config.js
const path = reuqire('path')
  module.exports = {
    //入口文件
    entry: './src/index.js',
    //出口文件
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'bundle.js'
  } 
}
```

#### 15.3.2. npm模式

```shell
npm run build
```

在配置`webpack.config.js`的基础上，配置`package.json`中的`"script"`部分

```javascript
"script" :{
  "build": "webpack"
}
```

### 15.4. loader

​	[loader官方文档](https://webpack.docschina.org/concepts/)

​	webpack本身不支持加载css、图片、ES6转成ES5代码、typescript转成ES5代码、scss / less转成css、.jsx / .vue转成js，使用`loader`可以做到这些，不同的文件处理需要不同的`loader`

​	`loader`使用过程：

​	步骤一： npm安装需要的loader

​	步骤二： 在`webpack.config.js`中的`modules`关键字下进行配置

#### 15.4.1. CSS文件处理

​	[css-loader官方文档](https://webpack.docschina.org/loaders/css-loader/)

​	需要使用`css-loader`和`style-loader`

​	`css-loader`只负责将css文件进行加载，`style-loader`负责将样式添加到DOM中

```shell
npm i --save-dev webpack@3.6.0 #因为练习的是视频里的版本，所以下载的是老师的版本
npm i --save-dev css-loader@2.0.2
npm i --save-dev style-loader@0.23.1
```

相关配置：

`webpack.config.js`

```javascript
const path = require('path')

module.exports = {
  //入口文件
  entry: './src/index.js',
  //出口文件
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: { //重点是配置这些，上面这些是之前的配置
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],  //读取多个loader是从右向左读
      },
    ],
  }
}
```

`index.js`

```javascript
//html文件只导入一个bundle.js，其他需要加载的文件（css、js等）都是在index.js中调用

import './css/index.css' //ES6版导入样式方法
require('./css/index.css') //commonJS版导入样式方法
```

#### 15.4.2. less文件处理

​	[less-loader官方文档](https://webpack.docschina.org/loaders/less-loader/)

​	需要安装`less-loader`和`less`

```shell
npm i --save-dev less-loader@4.1.0 less@3.9.0 #安装与之前适配的版本
```

`webpack.config.js`

```javascript
const path = require('path')

module.exports = {
  ...
  module: {
    rules: [
      { ... },
      {
        test: /\.less$/i,
        loader: [
          // compiles Less to CSS
          "style-loader",
          "css-loader",
          "less-loader",
        ],
      },
    ]
  }
}
```

`index.js`

```javascript
import './css/special.less'
```

#### 15.4.3. 图片处理

​	[url-loader官方文档](https://webpack.docschina.org/loaders/url-loader/)

​	[file-loader官方文档](https://webpack.docschina.org/loaders/file-loader/)

​	`url-loader`&`file-loader`

```shell
npm i --save-dev url-loader@1.1.2 file-loader@3.0.1
```

`webpack.config.js`

```javascript
module.exports = {
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: 'dist/' //看下文注释
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|jpeg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              //文件大小 小于limit时，直接编译成base64字符串
              //文件大小 大于limit时，使用file-loader模块进行加载，file-loader会对文件进行打包压缩，文件放在 path 路径中，需要指明公共路径 publicPath: 'dist/'
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
};
```

图片命名处理

webpack在打包大于 `limit` 的图片时，会生成一个以 `32位hash值`命名的图片

可以在`options`中添加属性`name`：

+ img: 文件要打包到的文件夹
+ name: 获取图片原来的名字
+ hash:8: 为了防止图片命名冲突，依然使用hash，但是只保留8位
+ ext: 使用图片原来的扩展名

```javascript
// webpack.config.js
options: {
  name: 'img/[name].[hash:8].[ext]' //需要在dist/下新建一个img/，以后文件保存在dist/img/中
}
```

#### 15.4.4. ES6语法处理(未配置)

​	[babel-loader官方文档](https://webpack.docschina.org/loaders/babel-loader/)

​	将ES6语法转成ES5，需要使用babel，webpack中使用对应的loader

```shell
npm i --save-dev babel-loader@7 babel-core bable-preset-es2015 #适配上面的版本
```

​	配置webpack.config.js

```javascript
module: {
  rules: [
    {
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['@babel/plugin-proposal-object-rest-spread']
        }
      }
    }
  ]
}
```

### 15.5. webpack配置vue

```shell
npm i vue
```

webpack.config.js

```javascript
moudule.exports = {
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  }
}
```

index.js

```javascript
import Vue from 'vue'
```

#### 15.5.1. `.vue`文件处理

​	安装loader，安装14.2.2版本vue-loader是为了方便一点

```shell
npm i vue-loader@14.2.2 vue-template-compiler --save-dev
```

​	配置webpack.config.js

```javascript
//const VueLoaderPlugin = require('vue-loader/lib/plugin') //vue-loader版本 >= 15 

module.exports = {
  /* plugins: [
    new VueLoaderPlugin() //vue-loader版本 >= 15
  ], */
  module: {
    rules: [
      {
        test: /\.vue$/i, 
        loader: ['vue-loader']
      }
    ]
  }
}
```

#### 15.2.2. 多重组件方法

​	父组件： `App.vue`

​	子组件： `Cpn.vue`

​	每一个组件都是一个独立的vue文件

​	App.vue :

```vue
<script>
  import Cpn from './Cpn.vue' //子组件

  export default {
    name: "App",
    components: {
      Cpn
    },
    ...
  }
</script>
```

## 16. plugin

插件

​	loader主要用于转换某些类型的模块，是一个转换器

​	plugin是插件，它是对webpack本身的一个扩展

### 16.1. plugin的使用步骤

​	一、npm安装（已内置的不需要安装）

​	二、在webpack.config.js中的plugins中配置插件

### 16.2. 添加版权说明的plugin

​	webpack.config.js

```js
const webpack = require('webpack')

module.exports = {
  ...
  plugins: {
    new webpack.BannerPlugin('最终版权归yly所有')
  }
}
```

### 16.3. 打包html的plugin

​	HtmlWebpackPlugin插件

工作过程：

​	自动生成一个index.html文件（可以指定模板）

​	将打包的js文件，自动通过`script`标签插入到`body`中

安装

```shell
npm i html-webpack-plugin --save-dev
```

配置

修改`webpack.config.js`中的plugins部分

```js
new htmlWebpackPlugin({
  template: 'index.html'
})
```

然后删除在`output`中设置的`publicPath`属性

### 16.4. 压缩js文件的plugin

​	uglifyjs-webpack-plugin@1.1.1

安装

```shell
npm i --save-dev uglifyjs-webpack-plugin@1.1.1
```

修改配置 `webpack.config.js`

```js
const uglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  ...
  plugins: {
    new uglifyJsPlugin()
  }
}
```

## 17. 搭建本地服务器

需要安装一个模块

```shell
npm i --save-dev webpack-dev-server@2.9.1
```

配置`webpack.config.js`

```js
module.exports = {
  ...
  devServer: {
    contentBase: './dist',
    inline: true,
    //port: //端口号，不指定默认端口8080
    //historyApiFallback:  //在SPA页面中，依赖HTML5的history模式
  }
}
```

因为是局部安装的模块，所以需要在`package.json`的`scripts`中配置命令

```json
"dev": "webpack-dev-server"
"dev": "webpack-dev-server --open" 运行代码时自动打开浏览器
```

**配置文件抽离：开发配置文件 & 发布配置文件**

使用`webpack-merge@4.1.5`合并`base.config.js`

​	`base.config.js` -> `dev.config.js` ==> 开发配置文件

```js
const webpackMerge = require('webpack-merge')
const baseConfig = require('./base.config.js')

module.exports = webpackMerge(baseConfig, {
  devServer: {
    contentBase: './dist',
    inline: true
  }
})
```

​	`base.config.js` -> `prod.config.js` ==> 发布配置文件

```js
const uglifyJsPlugin = require('uglifyjs-webpack-plugin')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./base.config.js')

module.exports = webpackMerge(baseConfig, {
  plugins: [
    new uglifyJsPlugin() 
  ]
})
```

同时修改`package.json`中的`build`和`dev`脚本

```json
"build": "webpack --config ./config/prod.config.js",
"dev": "webpack-dev-server --config ./config/dev.config.js --open"
```

同时还要修改`base.config.js`中的`output`的`path`属性，不然会在`./config/`下生成`dist/`和打包文件

```js
output: {
  path: path.join(__dirname, '../dist'),
  filename: 'bundle.js',
},
```

## 18. Vue CLI

CLI : Command-Line Interface  命令行界面，俗称脚手架

使用 vue-cli 可以快速搭建 Vue 开发环境及对应的webpack配置

### 18.1. 使用前提 - Node

### 18.2. 安装Vue CLI

[Vue CLI](https://cli.vuejs.org/zh/guide/installation.html) https://cli.vuejs.org/zh/guide/installation.html

```shell
npm i -g @vue/cli
```

安装报错，可参考：https://www.cnblogs.com/wwj007/p/13516933.html

使用

#### 18.2.1. Vue CLI2初始化项目

```shell
vue init webpack my-project
```

现在好像可以使用大写了，文件夹我使用了大写符号，没报错

![image-20210513212738755](C:\Users\伦\AppData\Roaming\Typora\typora-user-images\image-20210513212738755.png)

![image-20210513221148474](C:\Users\伦\AppData\Roaming\Typora\typora-user-images\image-20210513221148474.png)

**关于`runtime-compiler`和`runtime-only`**

`runtime-compiler`:

​	template => ast(抽象虚拟树) => render => vdom => UI

`runtime-only`:

​	render => vdom => UI

使用`runtime-only`编译成的代码量更少

```js
creatElement('标签',
            {标签属性：属性值},
            ['标签内容'])
```

#### 18.2.2. Vue CLI3初始化项目

```shell
vue create my-project
```

vue cli3与cli2的一个不同之处就是去掉了config和build文件夹，看不到配置文件

那 配置在 哪儿

​	`vue ui`：用户图形化界面

​	node_modules/@vue/cli-service/ ：配置都在这，不能随便修改，如果想要修改配置，在项目目录下创建一个配置文件`vue.config.js`(名字固定)

```js
//vue.config.js
module.exports = { }
```



#### 18.2.3. Vue CLI4初始化项目

```shell
npx vue create myProject
```

## 19. Vue-Router

### 19.1. 认识路由

​	**后端渲染**

在服务器后端直接渲染完成最终网页，发送到网站的时候已经是最终的网页了

服务器直接生产渲染好对应的HTML页面，返回给客户端进行

​	后端路由

+ 一个页面有自己对应的网址URL
+ URL会发送到服务器，服务器会通过正则对该URL进行匹配，并且最后交给一个Controller进行处理
+ Controller进行各种处理，最终生成HTML或者数据，返回给前端
+ 这就完成了一个iO操作

这种渲染好的页面，不需要单独加载任何的js和css，可以直接交给浏览器展示，这样也有利于SEO的优化

​	后端路由缺点

+ 整个页面的模块有后端人员来编写和维护
+ 前端开发人员如果要开发页面，需要通过PHP和Java等语言来编写页面代码
+ 通常情况下HTML代码和数据以及对应的逻辑会混在一起，编写和维护都是非常糟糕的事情

### 19.2. hash的url和html5的history

```js
location.hash = 'aaa'
//localhost:8080/aaa 不会发生页面转换

history.pushState({}, '', 'bbb') //会保留历史记录，将状态压入栈中
//第一个参数是对象，第二个是title，都可可以为空，第三个参数是url
history.back() //回到前一个状态/页面
history.go(num) //num可正可负，前景或者后退

history.replaceState({}, '', 'ccc')
//使用这个不会有历史记录，不会将状态压入栈中，无法
```

### 19.3. 安装和使用vue-router

安装：

```shell
npm i vue-router
```

使用好像有问题



### 19.4. 路由的默认值和修改为history模式

​	修改默认进入位置

```js
// ./router/index.js
const routes = [
  {
    path: '',
    redirect: '/home' //重定向
  }
]
```

​	修改为history模式

其本身是hash模式： http://127.0.0.1/#/home

改为h5的history模式： http://127.0.0.1/home

```js
// ./router/index.js vue2
const router = new VueRouter({
  routes,
  mode: 'history'
})
// vue3
import {  createRouter,  creatWebHashHistory} from 'vue-router'
/=>
import {  createRouter,  createWebHistory} from 'vue-router'
```

ps: 补充

```vue
<!-- App.vue -->
<template>
	<div>
    <router-link to="/home" tag="button" replace>首页</router-link>
    <!-- tag属性：改变router-link标签的渲染样式，默认为超链接
				 replace属性：点击之后无法回退，没有历史记录
		-->
  </div>
</template>
```

在页面上，点击哪个router-link，会自动加上类名：`router-link-active`，可用于更改点击活跃样式，如不喜欢这个类名可使用属性 `active-class="active"`，自动活跃类名就修改为 `active`了，也可在router里改

```js
const router = new VueRouter({
  routes,
  mode: 'history',
  linkActiveClass: 'active'
})
```

### 19.5. $router属性

vue-router给所有的组件都配置了一个$router属性

```vue
methods: {
	//改变url
	this.$router.push('/home') //将url修改为home，可回退
	this.$router.replace('/home') //将url修改为home，不可回退
}
```

### 19.6. 动态路由

```js
// const routes = [
  {
    path: '/user/:userid',
    component: User
  }
]
```

```vue
<template>
	<div>
    <router-link :to="'/user/' + userId"></router-link>
  </div>
</template>

<script>
	export default {
    name: 'App'
    data() {
      return {
        userId: 'zhangshan'
      }
    }
  }
</script>
```

子组件获取动态路由id

```vue
<template>
	<p>
    {{$route.params.userId}} <!-- 不需要this -->
  </p>
</template>

<script>
	export default {
    name: 'User',
    computed: {
      userId() {
        return this.$router //这是获取整个router对象
        return this.$route.params.userId //获取动态路由id
      }
    }
  }
</script>
```

### 19.7. 路由的懒加载

```js
// router/index.js
const Home = () => import('Home.vue')
const routes = [
  {
    path: '/home',
    component: () => import('..Home.vue')
  }
]
```

### 19.8. 路由嵌套

```js
const routes = [
  {
    path: '/home',
    component: () => import('..Home.vue'),
    children: [
    	{
    		path: '',
    		redirect: 'news'
  		},
  		{
        path: 'news', //不能加斜杆
        component: HomeNews
      }
    ]
	}
]
```

### 19.9. 传递参数

（一）

传递

```vue
<router-link :to="{apth: '/profile', query: {name: 'yly', age: 21, height: 184}}">档案</router-link>
```

获取

```vue
<!-- 另一个vue -->
{{$route.query.name}} <!-- yly -->
```

（二）

```vue
<template>
	<button @click="profileclick">
    档案
  </button>
</template>

<script>
	//使用button跳转，并传参
  export default {
    name: 'Profile',
    mathods: {
      profileclick() {
        this.$router.push({
          path: '/profile',
          query: {
            name: 'yly',
            age: 21,
            height: 184
          }
        })
      }
    }
  }
</script>
```

### 19.10. 全局导航守卫

1.生命周期函数：

```vue
<script>
	export default {
    name: 'App',
    created() {}, //创建vue组件/实例是回调这个created函数
    mounted() {}, //挂载完场页面内容后回调此杉函数
    updated() {}  //页面内容发生刷新时回调此内容
  }
</script>
```

2.在vue-router里面设置

```js
const route = {
  {
		path: '/',
  	name: 'Home',
  	meta: {
  		title: '首页'
		}
	}
}
//前置钩子（hook）/前置守卫（guard）
router.beforeEach(function (to, from, next) {
  document.title = to.meta.title //如果是嵌套路径，会出现问题 undefined
  //解决上述问题
  //document.title = to.matched[0].meta.title
  next() //必须调用，否则出错，可以用于处理一些问题，如未登录，就跳转到登录界面 next({path: '/login'})
})
```

补充：路由独享的守卫、组件内的守卫，[vue-router官方文档](https://next.router.vuejs.org/zh/guide/advanced/navigation-guards.html)

### 19.11. keep-alive 遇见 vue-router

keep-alive是Vue内置的一个组件，可以使被包含的组件保留状态，或者避免重新渲染。

两个重要属性：

+ include -- 字符串或正则表达，只有匹配的组件会被缓存
+ exclude -- 字符串或正则表达式，任何匹配的组件都不会被缓存

```vue
<template>
	<keep-alive exclude="Profile,User"> //这里用的是组件的name，而且不能加空格
  		<router-view/>
  </keep-alive>
</template>
```



router-view也是一个组件，如果直接被包在keep-alive里面，所有路径匹配到的视图组件都会被缓存。

### 19.12. tabBar小案例                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     

vue引用css文件：

```vue
<style>
	@import './assets/base.css'
</style>
```

## 20. promise

### 20.1. 什么是promise

​	promise是异步编程的一种解决方案，常见的异步编程是网络请求

​	解决回调地狱

### 20.2. promise简单使用

```js
new promise(function (resolve, reject) {
  setTimeout(() => {
    resolve(data)
  }, 1000)
}).then((data) => {
  ...
  //前面函数的后续操作，然后
  return new promise((reslove, reject) => {
    setTimeout(() => {
      resolve()
    }, 1000)
  })
}).then(() => {
  ...
  //前面函数的后续操作，然后
  return new promise((reslove, reject) => {
    setTimeout(() => {
      resolve() 							//成功调用resolve()
      reject('error message') //失败调用reject()
    }, 1000)
  })
}).then(function (resData) {
  ...
  throw 'error message' //手动抛出异常，会被catch捕获
  return newResData
}).then()
.catch((err) => {
  //如果失败就会直接到这来，处理失败结果，捕获异常
})
```

第二种写法：

```js
new promise((reslove, reject) => {
  ...
  resolve(data)
  reject(err)
}).then((data) => {
  ...
  console.log('successfully')
  
}, (err) => {
  console.log(err)
})
```



### 20.3.  promise的三种状态

+ pending: 等待状态，比如正在进行网络请求，或者定时器没有到时间
+ fulfill: 满足状态，当主动回调了resolve时，就处于该状态，并且回调`.then()`
+ reject: 拒绝状态，当主动回调了reject时，就处于该状态，并且回调`.catch()`

### 20.4. promise.all

```js
Promise.all([
  new Promise((res, rej) => {
    ...
    res(data1)
  }),
  new Promise((res, rej) => {
    ...
    res(data2)
  }),
  ...
]).then((results) => {
  results[0] //对应第一个Promise的结果
  results[1] //对应第二个Promise的结果
  ...
})
```

## 21. axios

### 21.1. 简单了解

功能特点：

+ 在浏览器中发送XMLHttpRequests请求
+ 在node.js中发送http请求
+ 支持Promise API
+ 拦截请求和响应
+ 转换请求和响应数据

axios请求方式：

+ axios(config)
+ axios.request(config)
+ axios.get(url[, config])
+ axios.delete(url[, config])
+ axios.head(url[, config])
+ axios.post(url[, data[, config]])
+ axios.put(url[, data[, config]])
+ axios.patch(url[, data[, config]])

### 21.2. 基本使用

```js
import axios from 'axios'

axios({
  url: 'http://127.0.0.1/webcourse',
  method: 'get', //默认为get请求方式，可以不写
  params: { //自动拼接到问号后面
    type: 'aa',
    ...
  }
}).then((res) => {
  
})
```

```js
axios.all([
  axios({
    url: ''
  }),
  axios({
    url: '',
    params: {
      type: ''
    }
  })
]).then((results) => {
  ...
})
```

```js
//或者使用另外一种写法,将结果数组结构为多个参数
.then(axiox.spread((res1, res2) => {
  console.log(res1)
  console.log(res2)
}))
```

### 21.3. 全局配置

```js
//抽取相同的部分，简化代码
axios.defaults.baseURL = '127.0.0.1'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-from-urlencoded'
axios.defaults.timeout = 5000 //5s

axios.all([
  axios({
    url: '/webcourse'
  }),
  axios({
    url: '/data',
    params: {
      type: ''
    }
  })
])
```

### 21.4. axios实例

```js
const axios1 = axios.create({
  baseURL: 'http://127.0.0.1',
  timeout: 5000
})
axios1({
  url: '/webcourse'
}).then()
```

不要对第三方框架过于依赖，可以做一个封装

```js
//network.js
import axios from 'axios'

export default function request(config) {
  const axios1 = axios.create({
    baseURL: 'http://127.0.0.1',
    timeout: 5000
  })
  return axios1(config)
  //到时候外部直接使用promise徐相关语法就行
}
```

### 21.5. 拦截器

axios提供了四种拦截：请求成功、请求失败、响应成功、响应失败

```js
axios1.interceptors.request.use(config => {
  console.log('请求成功拦截')
  return config
},err => {
  console.log('请求失败拦截')
  return err
})


axios1.interceptors.response.use(response => {
  console.log('响应成功拦截')
  return response.data
}, err => {
  console.log('响应失败拦截')
  return err
})
```

## 22. Vuex

### 22.1. Vuex是干什么的

官方解释： Vuex是一个专为Vue.js应用程序开发的状态管理模式（响应式 ）

+ 它采用`集中式存储管理`应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化
+ Vuex也集成到Vue的官方调试工具`devtools extension`，提供了诸如零配置的`time-travel`调试、状态快照导入导出等高级调试功能

 **一般存放多个界面需要共享的状态**

### 22.2. Vuex安装

```shell
npm i vuex
```

挂载方法一：

```js
// main.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// 会使main.js越来越大，不推荐
```

挂载方法二：

创建`store`目录与`/store/index.js`，脚手架自动生成

```js
// /store/index.js

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: { //这里是同步操作，异步操作不要放这里
  },
  actions: { //异步操作可以放在这里
  },
  modules: {
  }
})
```

![vuex的机制](C:\Users\伦\AppData\Roaming\Typora\typora-user-images\image-20210608223221870.png)

### 22.3. Vuex简单使用

在组件中引用`store`中的变量数据———`$store.state.counts`

```js
// /store/index.js

export default new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment(state) {
      state.count++
    },
    decrement(state) {
      state.count--
    }
  },
  actions: {
  },
  modules: {
  }
})
```

```vue
// /view/Test.vue

<template>
  <div id="test">
    <p>{{ $store.state.count }}</p>
    <button @click="increase()">+</button>  
    <button @click="decrease()">-</button>
  </div>
</template>

<script>
export default {
  name: "Test",
  methods: {
    increase() {
      this.$store.commit("increment");
    },
    decrease() {
      this.$store.commit("decrement");
    },
  },
};
</script>
```

```js
// router/index.js
...
```

### 22.4. Vuex核心概念

+ State
  + 保存共享状态的地方
  + 单一状态树                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
+ Getters
  + 类似于组件中的计算属性
  + 例：getters: {poweCount(state) { return state.count * state.count}}
+ Mutation
  + 对Vuex中`state`状态进行修改，只做同步操作，不做异步操作
  + 响应规则：只有先在state声明的数据才会在moutations修改数据时进行响应，通过moutations添加的数据是不会进行响应的，但是可以通过一些响应式方法使其能够响应
  + 响应式方法：
    +  Vue.set(state.info, 'new key', 'new value')  增加属性
    + Vue.delete(state.info, 'key') 删除属性
+ Action
  + 做一些异步操作
  + Actions类似于Mutations，就是用来代替Mutations进行异步操作
  + 
+ Module
  + 针对模块
  + 当应用变得非常复杂时，store对象有可能会变得相当臃肿，为了解决这个问题，Vuex允许将store分割成模块（Module），而每个模块拥有自己的state、moutations、actions、getters



**getters**

```js
// vuex/index.js

getters: {
  poweCount(state) {
    return state.count * state.count
  },
  power4Count(state, getters) { //第一个参数就是state，第二个参数是getters，名字改变，实质不变
    return getters.powerCount * getters.powerCount
  }，
  overAgeStu(state) {
    return (age) => {
      return state.student.filter(s => s.age > age)
    }
  }
}
```



**mutations**

```js
// vuex/index.js

moutations: {
  incrementCount(state, count) { //传递参数, 参数被称为是mutation的载荷（payload)
    state.count += count //多参数传递通过对象方式进行传递
  }
}
```

使用：

```vue

<script>
	methods: {
    addCount(count) {
      this.$store.commit('increment', count)  // 一般的提交封装
      this.$store.commit({ // 提交过去后，在vuex的第二个参数是对象
        type: 'increment',
        count
      })
    }
	}
</script>
```



**actions**:

```js
// vuex/index.js

actions: {
  // context 上下文
  aUpdateInfo(context) { // 可以return 一个 promise，外部可以执行回调
    setTimeOut(() => {
      context.commit('updateInfo')
    }, 1000)
  },
   aUpdateInfo(context) { // 可以return 一个 promise，外部可以执行回调
     return new promise((reslove, reject) => {
       setTimeOut(() => {
         context.commit('updateInfo')
         console.log('ok')
       }, 1000)
     })
   }
}
```

使用：

```vue
<script>
	methods: {
    updateInfo(content) {
      this.$store.dispatch('aUpdateInfo', content)
      	.then() // 使用return promise后的回调
    }
  }
</script>
```



**modules**:

```js
// store/index.js

const moduleA = {
  state: {
    name: 'aaa'
  },
  mutations: {},
  actions: {},

}
--------------
modules: {
  a: moduleA
}
```

使用：

```vue
<template>
	<div>
    {{ $store.a.name }}
  </div>
</template>

<script>
// mutations与定义在state的使用 方法一致，程序先在state里面找，没有再去modules里面找
// getters也是一样，直接调用的state与getters都是当前模块的state和getters，有一点不同的是有第三个参数rootState，调用的是store内定义的state
// actions commit也是使用自己module的mutation的方法
// modules可以再定义module，但是没必要
</script>
```

### 22.5. store的目录结构

![image-20210612215215123](C:\Users\伦\AppData\Roaming\Typora\typora-user-images\image-20210612215215123.png)

