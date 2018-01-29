const program = require('commander')
const fs = require('fs-extra')

// With async/await:
async function example(directory, name, resolve, reject) {
  try {
    console.log('目录是：' + directory + '/' + name)
    fs.copy('config/template.vue', 'src/views/' + directory + '/' + name + '.vue')
      .then(() => {
        fs.readFile('src/views/' + directory + '/' + name + '.vue', 'utf8', (err, data) => {
          if (err) return console.error(err)
          const fileDate = data.replace(/name:(.*)/, `name: "${name.replace('.vue', '')}",`)
          const files = fileDate.replace(/sassURL/, 'src/styles/' + directory + '/' + name + '.sass')
          fs.outputFile('src/views/' + directory + '/' + name + '.vue', files, err => {
            err === null ? console.log('vue模板生成成功') : reject(err)
            fs.outputFile('src/styles/' + directory + '/' + name + '.sass', '// ' + 'src/views/' + directory + '/' + name + '.vue', err => {
              err === null ? resolve('sass模板生成成功') : reject(err)
            })
          })
        })
      })
      .catch(err => {
        console.log(err)
      })
  } catch (err) {
    console.error(err)
  }
}
function add(arg) {
  return new Promise((resolve, reject) => {
    if (/[a-z]\/[a-z]/.test(arg)) {
      fs.ensureDir('src/views/' + arg[0].split('/')[0])
        .then(() => {
          console.log('目录正确开始插入模板')
          example(arg[0].split('/')[0], arg[0].split('/')[1], resolve, reject)
        })
    } else {
      reject('请输入正确参数如: npm run cli -l add/test')
    }
  })
}
// 自动增加路由
// function addRouter(directory) {
//   const key = directory.split('/')[0]
//   if (routes.asyncRouterMap[key]) {
//     console.log('1111')
//   }
// }
//
program
  .version('0.1.0')
  .usage('[options] <file ...>')
  .option('-l, --list <items>')
  .parse(process.argv)

add(program.args).then(info => {
  // addRouter(program.args[0])
  console.log(info)
  return
}).catch(err => {
  console.log(err)
})
