# DFE Pharma Careers 页面仿制版

这是一个仿制 [DFE Pharma Careers](https://dfepharma.com/careers/) 页面的本地网页前端项目。

## 项目结构

```
Pharm/
├── index.html          # 主HTML文件
├── styles.css          # CSS样式文件
├── script.js           # JavaScript功能文件
├── readme.md           # 项目说明文档
└── image/              # 图片资源文件夹
```

## 功能特性

### 🎨 设计特点
- 现代化的响应式设计
- 专业的制药行业风格
- 流畅的动画效果
- 移动端友好的界面

### 📱 响应式功能
- 完全响应式布局，支持桌面、平板和手机
- 移动端汉堡包菜单
- 触摸友好的交互元素

### ⚡ 交互功能
- 工作职位过滤器（按地区、部门筛选）
- 平滑滚动导航
- 按钮点击波纹效果
- 图片懒加载优化
- 滚动时导航栏样式变化

### 🔧 技术特性
- 原生HTML5、CSS3、JavaScript
- CSS Grid 和 Flexbox 布局
- Intersection Observer API
- 现代ES6+ JavaScript语法
- 性能优化的图片加载

## 使用方法

1. **直接打开**：在浏览器中打开 `index.html` 文件即可查看网页

2. **本地服务器**（推荐）：
   ```bash
   # 使用Python
   python -m http.server 8000
   
   # 使用Node.js
   npx http-server
   
   # 使用Live Server (VS Code插件)
   右键 index.html > Open with Live Server
   ```

3. **访问网页**：在浏览器中访问 `http://localhost:8000`

## 浏览器兼容性

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 自定义配置

### 修改颜色主题
在 `styles.css` 中修改以下CSS变量：
```css
:root {
    --primary-color: #0066cc;
    --secondary-color: #f8f9fa;
    --text-color: #333;
}
```

### 添加新的工作职位
在 `index.html` 的 `.job-list` 部分添加新的 `.job-item` 元素：
```html
<div class="job-item">
    <div class="job-info">
        <h4>职位名称</h4>
        <div class="job-details">
            <span class="job-department">部门</span>
            <span class="job-location">地点</span>
            <span class="job-level">级别</span>
            <span class="job-hours">工作时间</span>
        </div>
    </div>
    <button class="btn-outline">Apply Now</button>
</div>
```

### 修改图片
- 替换 `src` 属性中的 Unsplash 图片链接
- 或将本地图片文件放入 `image/` 文件夹并更新链接

## 开发和扩展

### 添加新功能
1. 在 `script.js` 中添加新的JavaScript功能
2. 在 `styles.css` 中添加相应的样式
3. 在 `index.html` 中添加必要的HTML结构

### 性能优化建议
- 压缩CSS和JavaScript文件
- 优化图片大小和格式
- 使用CDN加载外部资源
- 启用浏览器缓存

## 许可证

此项目仅用于学习和演示目的。原始设计版权归 DFE Pharma 所有。

## 更新日志

### v1.0.0 (2024)
- 初始版本发布
- 完整的页面结构和样式
- 响应式设计
- 基础交互功能

---

**注意**：此项目是对 DFE Pharma 网站的仿制版本，仅用于学习和演示目的。
