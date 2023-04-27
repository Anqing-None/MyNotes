# Egg.js

## egg目录结构

```bash
egg-project
├── package.json
├── app.js (可选)
├── agent.js (可选)
├── app
|   ├── router.js
│   ├── controller
│   |   └── home.js
│   ├── service (可选)
│   |   └── user.js
│   ├── middleware (可选)
│   |   └── response_time.js
│   ├── schedule (可选)
│   |   └── my_task.js
│   ├── public (可选)
│   |   └── reset.css
│   ├── view (可选)
│   |   └── home.tpl
│   └── extend (可选)
│       ├── helper.js (可选)
│       ├── request.js (可选)
│       ├── response.js (可选)
│       ├── context.js (可选)
│       ├── application.js (可选)
│       └── agent.js (可选)
├── config
|   ├── plugin.js
|   ├── config.default.js
│   ├── config.prod.js
|   ├── config.test.js (可选)
|   ├── config.local.js (可选)
|   └── config.unittest.js (可选)
└── test
    ├── middleware
    |   └── response_time.test.js
    └── controller
        └── home.test.js
```

企业级框架开发建议遵循[目录规范](https://www.eggjs.org/zh-CN/basics/structure)，以减少沟通成本。

## app目录

app/router.js用于配置URL路由规则，约定此文件统一所有路由规则，路由规则就是URL路径与处理函数的对应关系。

### 定义Router

```javascript
// app/router.js

module.exports = app => {
	const {router, controller} = app;
	router.get('/', controller.home.index);
};
```

使用CommonJS模块导出一个箭头函数，箭头函数会接收app对象参数，使用解构赋值从app对象中拿到router与controller

用户请求主页面时，app/controller下的home.js中的index函数就会处理该请求。

#### 请求参数获取

##### URL查询参数方式（Query String）

`http://127.0.0.1:8080/?a=b&c=d`

用户在url后附带查询字符串，查询字符串会被egg处理为一个对象，在controller中就可以依据不同的查询参数返回对应资源。

```javascript
// ctx为请求上下文
ctx.query = {
	a:'b',
	c:'d'
}
```

##### 命名参数方式（named Parameters）

```javascript
// app/router.js
router.get('/user/:id', controller.user.info);
```

请求url：`http://127.0.0.1:8080/user/1`

路由规则中:id用于匹配用户传入的id，传入值会被命名为id

```javascript
// app/controller/user.js
ctx.params = {
	id:1
}
```

正则路由

```javascript
// app/router.js
router.get(/regular expression/, controller.user.info);
```

### controller目录

app/router.js已经定义了路径与处理函数的映射关系。所以下一步就是定义处理请求的对应方法。

controller目录用于定义处理特定路径请求的处理方法。

controller目录中的js文件继承egg的controller构造函数，然后导出即可在controller中拿到。

controller.user.info表示的是user.js文件中的info函数。

### service目录

有些逻辑是通用的，controller中的处理函数若有相同的处理需求，可以将其通用逻辑写在service目录中，从而进行代码复用。

service中的方法继承了egg的service对象

在controller目录中定义的路由处理函数可以通过this拿到在service中定义的函数`this.ctx.service.main.getData`

main是service中的main.js。

getData是main.js中的函数。



### extend目录

定义一些对egg内置对象的拓展方法。

如果要在app对象上定义一个方法，需要在app/extend目录下创建一个application.js，导出对应方法即可。

```javascript
// app/extend/application.js
module.exports = {
  foo(param) {
    // this 就是 app 对象，在其中可以调用 app 上的其他方法，或访问属性
  },
};
```

参考：[egg框架拓展](https://www.eggjs.org/zh-CN/basics/extend)



## model目录

数据库模型ORM映射

使用egg-sequelize建立ORM

```javascript
// config/plugin.js

sequelize: {
  enable: true,
  package: 'egg-sequelize'
}
```

```javascript
// config/config.default.js

//连接mysql数据库
config.sequelize = {
  dialect: "mysql",
  database: "my_db_01",
  host: "127.0.0.1",
  port: 3306,
  username: "root",
  password: "6666",
  timezone: "+08:00"
}
```

建立数据模型

```javascript
// app/model/user.js
module.exports = app => {
  const { STRING } = app.Sequelize;

  // 在sql中创建一个userSequelize的table，一列为name
  const User = app.model.define('userSequelize',{
    //sequelize会自动创建id
    name: STRING,
  })

  return User;
  
}
```

项目启动时与数据库连接并建表

```javascript
// app.js
module.exports = app => {
  // egg启动时，同步数据模型，sync会创建table
  app.beforeStart(async () => {
    await app.model.sync({});
  })
}
```

定义RESTful接口

```javascript
  // app/router.js
  
  // userSequelize
  router.resources('userSequelize', '/usersequelize', controller.userSequelize);
```

定义controller处理逻辑

```javascript

```

操作模型

```javascript
// 操作model层
app.model.User.findAll()
app.model.User.create({name:"xxx"})
app.model.User.update({name:"xxx"}, {where: {id:1}})
app.model.User.destroy({where: {id:1}})
```

create

```
2022-04-17 14:42:28,633 INFO 1116 [egg-sequelize](6ms) Executed (default): INSERT INTO `user_sequelizes` (`id`,`name`,`created_at`,`updated_at`) VALUES (DEFAULT,?,?,?);
```

update

```
2022-04-17 15:22:15,660 INFO 15384 [egg-sequelize](5ms) Executed (default): UPDATE `user_sequelizes` SET `name`=?,`updated_at`=? WHERE `id` = ?
```



























controll中的this对象结构

```
AboutController {
  ctx: {
    request: { method: 'GET', url: '/about', header: [Object] },
    response: {
      status: 404,
      message: 'Not Found',
      header: [Object: null prototype] {}
    },
    app: {
      env: 'local',
      name: 'egg',
      baseDir: 'D:\\Users\\anqing\\Desktop\\Projects\\FrontEnd\\temp\\eggDemo',
      subdomainOffset: 2,
      config: '<egg config>',
      controller: '<egg controller>',
      httpclient: '<egg httpclient>',
      loggers: '<egg loggers>',
      middlewares: '<egg middlewares>',
      router: '<egg router>',
      serviceClasses: '<egg serviceClasses>'
    },
    originalUrl: '/about',
    req: '<original node req>',
    res: '<original node res>',
    socket: '<original node socket>'
  },
  app: {
    env: 'local',
    name: 'egg',
    baseDir: 'D:\\Users\\anqing\\Desktop\\Projects\\FrontEnd\\temp\\eggDemo',
    subdomainOffset: 2,
    config: '<egg config>',
    controller: '<egg controller>',
    httpclient: '<egg httpclient>',
    loggers: '<egg loggers>',
    middlewares: '<egg middlewares>',
    router: '<egg router>',
    serviceClasses: '<egg serviceClasses>'
  },
  config: {
    session: {
      maxAge: 86400000,
      key: 'EGG_SESS',
      httpOnly: true,
      encrypt: true,
      logValue: true,
      overwrite: true,
      signed: true,
      autoCommit: true,
      encode: [Function: encode],
      decode: [Function: decode],
      genid: [Function: v4]
    },
    security: {
      domainWhiteList: [],
      protocolWhiteList: [],
      defaultMiddleware: 'csrf,hsts,methodnoallow,noopen,nosniff,csp,xssProtection,xframe,dta',
      csrf: [Object],
      xframe: [Object],
      hsts: [Object],
      dta: [Object],
      methodnoallow: [Object],
      noopen: [Object],
      nosniff: [Object],
      referrerPolicy: [Object],
      xssProtection: [Object],
      csp: [Object],
      ssrf: [Object],
      _protocolWhiteListSet: [Set]
    },
    helper: { shtml: {} },
    jsonp: { limit: 50, callback: [Array], csrf: false },
    onerror: {
      errorPageUrl: '',
      appErrorFilter: null,
      templatePath: 'D:\\Users\\anqing\\Desktop\\Projects\\FrontEnd\\temp\\eggDemo\\node_modules\\egg-onerror\\lib\\onerror_page.mustache'
    },
    i18n: {
      defaultLocale: 'en_US',
      dirs: [Array],
      queryField: 'locale',
      cookieField: 'locale',
      cookieDomain: '',
      cookieMaxAge: '1y',
      functionName: '__'
    },
    watcher: { type: 'development', eventSources: [Object] },
    customLogger: { scheduleLogger: [Object] },
    schedule: { directory: [] },
    multipart: {
      mode: 'stream',
      autoFields: false,
      defaultCharset: 'utf8',
      fieldNameSize: 100,
      fieldSize: 102400,
      fields: 10,
      fileSize: 10485760,
      files: 10,
      fileExtensions: [],
      whitelist: null,
      allowArrayField: false,
      tmpdir: 'C:\\Users\\anqing\\AppData\\Local\\Temp\\egg-multipart-tmp\\egg',
      cleanSchedule: [Object]
    },
    development: {
      watchDirs: [],
      ignoreDirs: [],
      fastReady: false,
      reloadOnDebug: true,
      overrideDefault: false,
      overrideIgnore: false
    },
    logrotator: {
      filesRotateByHour: null,
      hourDelimiter: '-',
      filesRotateBySize: null,
      maxFileSize: 52428800,
      maxFiles: 10,
      rotateDuration: 60000,
      maxDays: 31
    },
    static: {
      prefix: '/public/',
      dir: 'D:\\Users\\anqing\\Desktop\\Projects\\FrontEnd\\temp\\eggDemo\\app\\public',     
      dynamic: true,
      preload: false,
      buffer: false,
      maxFiles: 1000
    },
    view: {
      root: 'D:\\Users\\anqing\\Desktop\\Projects\\FrontEnd\\temp\\eggDemo\\app\\view',      
      cache: false,
      defaultExtension: '.html',
      defaultViewEngine: '',
      mapping: {}
    },
    env: 'local',
    name: 'egg',
    keys: 'egg_1649248677813_2176',
    cookies: {},
    proxy: false,
    maxIpsCount: 0,
    maxProxyCount: 0,
    protocolHeaders: 'x-forwarded-proto',
    ipHeaders: 'x-forwarded-for',
    hostHeaders: '',
    pkg: {
      name: 'egg',
      version: '1.0.0',
      description: 'demo',
      private: true,
      egg: [Object],
      dependencies: [Object],
      devDependencies: [Object],
      engines: [Object],
      scripts: [Object],
      ci: [Object],
      repository: [Object],
      author: '',
      license: 'MIT'
    },
    baseDir: 'D:\\Users\\anqing\\Desktop\\Projects\\FrontEnd\\temp\\eggDemo',
    HOME: 'C:\\Users\\anqing',
    rundir: 'D:\\Users\\anqing\\Desktop\\Projects\\FrontEnd\\temp\\eggDemo\\run',
    dump: { ignore: [Set] },
    confusedConfigurations: {
      bodyparser: 'bodyParser',
      notFound: 'notfound',
      sitefile: 'siteFile',
      middlewares: 'middleware',
      httpClient: 'httpclient'
    },
    notfound: { pageUrl: '' },
    siteFile: {
      '/favicon.ico': <Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 00 ca 00 
00 00 ca 08 06 00 00 00 e4 65 df a8 00 00 00 01 73 52 47 42 00 ae ce 1c e9 00 00 18 f9 ... 6413 more bytes>,
      cacheControl: 'public, max-age=2592000'
    },
    bodyParser: {
      enable: true,
      encoding: 'utf8',
      formLimit: '1mb',
      jsonLimit: '1mb',
      textLimit: '1mb',
      strict: true,
      queryString: [Object],
      onerror: undefined,
      detectJSON: undefined,
      returnRawBody: true
    },
    logger: {
      dir: 'D:\\Users\\anqing\\Desktop\\Projects\\FrontEnd\\temp\\eggDemo\\logs\\egg',       
      encoding: 'utf8',
      env: 'local',
      level: 'INFO',
      consoleLevel: 'INFO',
      disableConsoleAfterReady: false,
      outputJSON: false,
      buffer: true,
      appLogName: 'egg-web.log',
      coreLogName: 'egg-web.log',
      agentLogName: 'egg-agent.log',
      errorLogName: 'common-error.log',
      coreLogger: [Object],
      allowDebugAtProd: false,
      enablePerformanceTimer: false,
      type: 'application'
    },
    httpclient: {
      enableDNSCache: false,
      dnsCacheLookupInterval: 10000,
      dnsCacheMaxLength: 1000,
      request: [Object],
      httpAgent: [Object],
      httpsAgent: [Object]
    },
    meta: { enable: true, logging: false },
    coreMiddleware: [
      'meta',
      'siteFile',
      'notfound',
      'static',
      'bodyParser',
      'overrideMethod',
      'session',
      'securities',
      'i18n',
      'eggLoaderTrace'
    ],
    workerStartTimeout: 600000,
    serverTimeout: null,
    cluster: { listen: [Object] },
    clusterClient: { maxWaitTime: 60000, responseTimeout: 60000 },
    onClientError: null,
    middleware: [],
    coreMiddlewares: [
      'meta',
      'siteFile',
      'notfound',
      'static',
      'bodyParser',
      'overrideMethod',
      'session',
      'securities',
      'i18n',
      'eggLoaderTrace'
    ],
    appMiddlewares: [],
    appMiddleware: [],
    multipartParseOptions: {
      autoFields: false,
      defCharset: 'utf8',
      limits: [Object],
      checkFile: [Function: checkFile]
    }
  },
  service: ClassLoader {
    _cache: Map(0) {},
    _ctx: {
      request: [Object],
      response: [Object],
      app: [Object],
      originalUrl: '/about',
      req: '<original node req>',
      res: '<original node res>',
      socket: '<original node socket>'
    }
  }
}
```

## config目录

配置可以在app.config中访问到。

配置文件类型由运行环境区分。一个配置本质就是一个js对象，在文件中直接返回即可。





## 插件与框架

应用是整个egg项目，包含路由与控制器。

框架与应用结构类似，但不包含路由与控制器。

插件与框架类似，但不包含config/plugins.js。

### 使用插件

使用npm安装后，在config/plugin.js文件内启用。

```js
// 应用配置
// package.json
{
  "dependencies": {
    "egg": "^2.0.0",
    "egg-mysql": "^3.0.0"
  }
}

// config/plugin.js
module.exports = {
  mysql: {
    enable: true,
    package: 'egg-mysql',
  },
}
```

使用