

解决添加新属性ts报错问题
```typescript
interface customWindow extends Window {
	CESIUM_BASE_URL: string;
}

declare const window: customWindow;
```