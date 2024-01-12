


配置`@`符号映射为项目根目录

``` ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
```



`resolve.alias`选项参考[vite resolve.alias](https://cn.vitejs.dev/config/shared-options.html#resolve-alias)

`URL`是Node.js url模块下的一个类，用于解析URL，参考[node:url](https://nodejs.cn/api/url.html#%E7%B1%BBurl)
`fileURLToPath`是Node.js url模块的原生方法，参考[fileURLToPath](https://nodejs.cn/api/url.html#urlfileurltopathurl)

`import.meta.url`是ESM模块的元数据信息，url属性是模块的路径。参考[MDN import.meta](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/import.meta)
