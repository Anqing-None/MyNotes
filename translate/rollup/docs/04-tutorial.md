---
title: Tutorial
---

### Creating Your First Bundle

### 创建你的第一个打包模块代码

_Before we begin, you'll need to have [Node.js](https://nodejs.org) installed so that you can use [NPM](https://npmjs.com). You'll also need to know how to access the [command line](https://www.codecademy.com/learn/learn-the-command-line) on your machine._

你需要安装node.js和一些命令行基本操作知识，才能完成打包练习示例。

The easiest way to use Rollup is via the Command Line Interface (or CLI). For now, we'll install it globally (later on we'll learn how to install it locally to your project so that your build process is portable, but don't worry about that yet). Type this into the command line:

使用Rollup最简单的方式就是敲命令。我们先全局安装Rollup，输入以下命令。其中install可以简写为i，意为安装；--global可以简写为-g，表示全局安装。

```
npm install rollup --global
# or `npm i rollup -g` for short
```

You can now run the `rollup` command. Try it!

你可以直接在命令行运行rollup命令。

```
rollup
```

Because no arguments were passed, Rollup prints usage instructions. This is the same as running `rollup --help`, or `rollup -h`.

因为上条命令没有传递任何参数，Rollup会默认打印使用帮助，就像使用rollup --help/-h命令一样。

Let's create a simple project:

创建一个简单的项目：

```
mkdir -p my-rollup-project/src
cd my-rollup-project
```

First, we need an _entry point_. Paste this into a new file called `src/main.js`:

首先我们需要一个入口文件，这里为`src/main.js`。

```js
// src/main.js
import foo from './foo.js'; // 此处文件路径必须要有"./"，以标识这不是一个node内置模块，否则会找不到该模块
export default function () {
  console.log(foo);
}
```

Then, let's create the `foo.js` module that our entry point imports:

然后我们创建main.js文件依赖的foo.js模块：

```js
// src/foo.js
export default 'hello world!';
```

Now we're ready to create a bundle:

创建完成后运行打包命令：

```
rollup src/main.js -f cjs
```

The `-f` option (short for `--format`) specifies what kind of bundle we're creating — in this case, CommonJS (which will run in Node.js). Because we didn't specify an output file, it will be printed straight to `stdout`:

`-f`选项是`--format`的缩写，用来指定打包的模块格式。因为我们未指定输出内容到哪个文件，rollup将会直接在控制台输出打包结果。

```js
'use strict';

const foo = 'hello world!';

const main = function () {
  console.log(foo);
};

module.exports = main;
```

You can save the bundle as a file like so:

你可以使用参数将打包结果保存到文件：

```
rollup src/main.js -o bundle.js -f cjs
```

(You could also do `rollup src/main.js -f cjs > bundle.js`, but as we'll see later, this is less flexible if you're generating sourcemaps.)

（你同样也可以使用重定向符号来保存打包后的结果，这种保存的方法本质是将结果保存到文件，相对于-o参数，会缺乏一些灵活性。）

Try running the code:

```
node
> var myBundle = require('./bundle.js');
> myBundle();
'hello world!'
```

Congratulations! You've created your first bundle with Rollup.

恭喜，你已经完成了一个打包过程。

### Using Config Files

### 使用配置文件

So far, so good, but as we start adding more options it becomes a bit of a nuisance to type out the command.

如果每次打包都敲一遍老长老长的命令选项的话未免过于麻烦。

To save repeating ourselves, we can create a config file containing all the options we need. A config file is written in JavaScript and is more flexible than the raw CLI.

这个时候就可以创建一个配置文件，包含一些通用的配置项。配置文件用JavaScript编写，可以比单纯地使用命令行参数更加灵活。

Create a file in the project root called `rollup.config.js`, and add the following code:

在项目根目录创建一个名称为`rollup.config.js`地文件，添加以下代码：

```js
// rollup.config.js
export default {
  input: 'src/main.js',
  output: {
    file: 'bundle.js',
    format: 'cjs'
  }
};
```

(Note that you can use CJS modules and therefore `module.exports = {/* config */}`)

（你也可以用CJS模块写法来写配置文件，如`module.exports = {/* config */}`）

To use the config file, we use the `--config` or `-c` flag:

要使用刚刚写好的设置文件，需要使用`--config` or `-c`标识：

```
rm bundle.js # so we can check the command works!
rollup -c
```

You can override any of the options in the config file with the equivalent command line options:

你也可以在命令行选项中覆盖配置文件中的打包参数：

```
rollup -c -o bundle-2.js # `-o` is equivalent to `--file` (formerly "output")
```

_Note: Rollup itself processes the config file, which is why we're able to use `export default` syntax – the code isn't being transpiled with Babel or anything similar, so you can only use ES2015 features that are supported in the version of Node.js that you're running._

_注意：你之所以能够使用es6的`export default`语法来写配置文件，是因为配置文件是由Rollup自身来处理的，配置文件的代码并不是经过了Babel之类的转译器转译，因此你只能使用你Node.js版本所支持的ES6特性。_

You can, if you like, specify a different config file from the default `rollup.config.js`:

如果需要，你也可以指定不同环境下的配置文件。

```
rollup --config rollup.config.dev.js
rollup --config rollup.config.prod.js
```

### Installing Rollup locally

### 在项目目录下安装Rollup

When working within teams or distributed environments it can be wise to add Rollup as a _local_ dependency. Installing Rollup locally prevents the requirement that multiple contributors install Rollup separately as an extra step, and ensures that all contributors are using the same version of Rollup.

在团队合作的项目下使用项目本地的Rollup来统一版本是一个很好的选择。本地安装Rollup可以保证组内人员使用同一版本的Rollup。

To install Rollup locally with NPM:

运行一下命令可以本地安装Rollup

```
npm install rollup --save-dev
```

Or with Yarn:

```
yarn -D add rollup
```

After installing, Rollup can be run within the root directory of your project:

```
npx rollup --config
```

Or with Yarn:

```
yarn rollup --config
```

Once installed, it's common practice to add a single build script to `package.json`, providing a convenient command for all contributors. e.g.

本地安装之后，使用npm脚本可以很方便地使用Rollup。

```json
{
  "scripts": {
    "build": "rollup --config"
  }
}
```

_Note: Once installed locally, both NPM and Yarn will resolve the dependency's bin file and execute Rollup when called from a package script._

### Using plugins

### 使用插件

So far, we've created a simple bundle from an entry point and a module imported via a relative path. As you build more complex bundles, you'll often need more flexibility – importing modules installed with NPM, compiling code with Babel, working with JSON files and so on.

目前为止，我们以及创建了一个简单的打包。随着你的打包项目更加复杂，你通常需要更大的灵活性——引入通过 npm安装的模块，通过Babel转移代码，处理JSON格式文件等等。

For that, we use _plugins_, which change the behaviour of Rollup at key points in the bundling process. A list of awesome plugins is maintained on [the Rollup Awesome List](https://github.com/rollup/awesome).

为了实现上述需求，我们可以使用Plugins来增强Rollup打包。[the Rollup Awesome List](https://github.com/rollup/awesome)有一系列的插件可供选择。

For this tutorial, we'll use [@rollup/plugin-json](https://github.com/rollup/plugins/tree/master/packages/json), which allows Rollup to import data from a JSON file.

在本教程中，我们将使用 [@rollup/plugin-json](https://github.com/rollup/plugins/tree/master/packages/json)插件来导入JSON格式文件中的数据。

Create a file in the project root called `package.json`, and add the following content:

创建一个package.json文件，输入一下内容：

```json
{
  "name": "rollup-tutorial",
  "version": "1.0.0",
  "scripts": {
    "build": "rollup -c"
  }
}
```

Install @rollup/plugin-json as a development dependency:

安装@rollup/plugin-json开发依赖

```
npm install --save-dev @rollup/plugin-json
```

(We're using `--save-dev` rather than `--save` because our code doesn't actually depend on the plugin when it runs – only when we're building the bundle.)

Update your `src/main.js` file so that it imports from your package.json instead of `src/foo.js`:

```js
// src/main.js
import { version } from '../package.json';

export default function () {
  console.log('version ' + version);
}
```

Edit your `rollup.config.js` file to include the JSON plugin:

```js
// rollup.config.js
import json from '@rollup/plugin-json';

export default {
  input: 'src/main.js',
  output: {
    file: 'bundle.js',
    format: 'cjs'
  },
  plugins: [json()]
};
```

Run Rollup with `npm run build`. The result should look like this:

```js
'use strict';

var version = '1.0.0';

function main() {
  console.log('version ' + version);
}

module.exports = main;
```

_Note: Only the data we actually need gets imported – `name` and `devDependencies` and other parts of `package.json` are ignored. That's **tree-shaking** in action._

### Using output plugins

Some plugins can also be applied specifically to some outputs. See [plugin hooks](guide/en/#build-hooks) for the technical details of what output-specific plugins can do. In a nut-shell, those plugins can only modify code after the main analysis of Rollup has completed. Rollup will warn if an incompatible plugin is used as an output-specific plugin. One possible use-case is minification of bundles to be consumed in a browser.

Let us extend the previous example to provide a minified build together with the non-minified one. To that end, we install `rollup-plugin-terser`:

```
npm install --save-dev rollup-plugin-terser
```

Edit your `rollup.config.js` file to add a second minified output. As format, we choose `iife`. This format wraps the code so that it can be consumed via a `script` tag in the browser while avoiding unwanted interactions with other code. As we have an export, we need to provide the name of a global variable that will be created by our bundle so that other code can access our export via this variable.

```js
// rollup.config.js
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/main.js',
  output: [
    {
      file: 'bundle.js',
      format: 'cjs'
    },
    {
      file: 'bundle.min.js',
      format: 'iife',
      name: 'version',
      plugins: [terser()]
    }
  ],
  plugins: [json()]
};
```

Besides `bundle.js`, Rollup will now create a second file `bundle.min.js`:

```js
var version = (function () {
  'use strict';
  var n = '1.0.0';
  return function () {
    console.log('version ' + n);
  };
})();
```

### Code Splitting

For code splitting, there are cases where Rollup splits code into chunks automatically, like dynamic loading or multiple entry points, and there is a way to explicitly tell Rollup which modules to split into separate chunks via the [`output.manualChunks`](guide/en/#outputmanualchunks) option.

To use the code splitting feature to achieve the lazy dynamic loading (where some imported module(s) is only loaded after executing a function), we go back to the original example and modify `src/main.js` to load `src/foo.js` dynamically instead of statically:

```js
// src/main.js
export default function () {
  import('./foo.js').then(({ default: foo }) => console.log(foo));
}
```

Rollup will use the dynamic import to create a separate chunk that is only loaded on demand. In order for Rollup to know where to place the second chunk, instead of passing the `--file` option we set a folder to output to with the `--dir` option:

```
rollup src/main.js -f cjs -d dist
```

This will create a folder `dist` containing two files, `main.js` and `chunk-[hash].js`, where `[hash]` is a content based hash string. You can supply your own naming patterns by specifying the [`output.chunkFileNames`](guide/en/#outputchunkfilenames) and [`output.entryFileNames`](guide/en/#outputentryfilenames) options.

You can still run your code as before with the same output, albeit a little slower as loading and parsing of `./foo.js` will only commence once we call the exported function for the first time.

```
node -e "require('./dist/main.js')()"
```

If we do not use the `--dir` option, Rollup will again print the chunks to `stdout`, adding comments to highlight the chunk boundaries:

```js
//→ main.js:
'use strict';

function main() {
  Promise.resolve(require('./chunk-b8774ea3.js')).then(({ default: foo }) => console.log(foo));
}

module.exports = main;

//→ chunk-b8774ea3.js:
('use strict');

var foo = 'hello world!';

exports.default = foo;
```

This is useful if you want to load and parse expensive features only once they are used.

A different use for code-splitting is the ability to specify several entry points that share some dependencies. Again we extend our example to add a second entry point `src/main2.js` that statically imports `src/foo.js` just like we did in the original example:

```js
// src/main2.js
import foo from './foo.js';
export default function () {
  console.log(foo);
}
```

If we supply both entry points to rollup, three chunks are created:

```
rollup src/main.js src/main2.js -f cjs
```

will output

```js
//→ main.js:
'use strict';

function main() {
  Promise.resolve(require('./chunk-b8774ea3.js')).then(({ default: foo }) => console.log(foo));
}

module.exports = main;

//→ main2.js:
('use strict');

var foo_js = require('./chunk-b8774ea3.js');

function main2() {
  console.log(foo_js.default);
}

module.exports = main2;

//→ chunk-b8774ea3.js:
('use strict');

var foo = 'hello world!';

exports.default = foo;
```

Notice how both entry points import the same shared chunk. Rollup will never duplicate code and instead create additional chunks to only ever load the bare minimum necessary. Again, passing the `--dir` option will write the files to disk.

You can build the same code for the browser via native ES modules, an AMD loader or SystemJS.

For example, with `-f es` for native modules:

```
rollup src/main.js src/main2.js -f es -d dist
```

```html
<!DOCTYPE html>
<script type="module">
  import main2 from './dist/main2.js';
  main2();
</script>
```

Or alternatively, for SystemJS with `-f system`:

```
rollup src/main.js src/main2.js -f system -d dist
```

Install SystemJS via

```
npm install --save-dev systemjs
```

And then load either or both entry points in an HTML page as needed:

```html
<!DOCTYPE html>
<script src="node_modules/systemjs/dist/s.min.js"></script>
<script>
  System.import('./dist/main2.js').then(({ default: main }) => main());
</script>
```

See [rollup-starter-code-splitting](https://github.com/rollup/rollup-starter-code-splitting) for an example on how to set up a web app that uses native ES modules on browsers that support them with a fallback to SystemJS if necessary.
