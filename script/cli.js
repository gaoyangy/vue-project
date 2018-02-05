const program = require('commander')
const fs = require('fs-extra')
//
function addRouter(path, name) {
  return `{
    path: '/${path}',
    component: Layout,
    redirect: '${name}',
    hidden: ${program.args[1] === 'hide' ? 'true' : false},
    children: [{
      path: '${name}',
      component: _import('${path}/${name}'),
      name: '${path}${name}',
      meta: { title: '${path}${name}', icon: 'form' }
    }]
  },
  // router-auto不能删除`
}
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
              err === null ? console.log('sass模板生成成功') : reject(err)
            })
          })
        })
        fs.readFile('src/router/index.js', 'utf-8', (error, data) => {
          if (error) return console.error(error)
          const datas = data.replace('// router-auto不能删除', addRouter(directory, name))
          fs.outputFile('src/router/index.js', datas, error => {
            error === null ? console.log('路由生成成功') : reject(error)
          })
        })
        fs.readFile('src/lang/zh.js', 'utf-8', (error, data) => {
          if (error) return console.error(error)
          const datafiles = data.replace('// routerName不能删除', `${program.args[0].replace('/', '')}: '${program.args[1] === 'hide' ? '' : program.args[1]}',\r\n    // routerName不能删除'`)
          fs.outputFile('src/lang/zh.js', datafiles, error => {
            if (program.args[1] === 'hide') {
              console.log('这个路由不会出现在菜单里面')
            }
            error === null ? resolve('路由名称生成成功') : reject(error)
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
      reject('请输入正确参数如: npm run cli -l 路径/文件名 路由名称')
    }
  })
}
program
  .version('0.1.0')
  .usage('[options] <file ...>')
  .option('-l, --list <items>')
  .parse(process.argv)

if (!program.args[1]) {
  console.log('请输入正确参数如: npm run cli -l 路径/文件名 路由名称')
  return
}
add(program.args).then(info => {
  console.log(program.args[1])
  return
}).catch(err => {
  console.log(err)
})

// 使用方式 例如 npm run cli -l app/demo 实例
// app指的是文件夹demo是文件名称 实例是路由名称 如果把实例改为hide则该路由不会自动注册到菜单里面
