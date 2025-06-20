// 产品数据管理模块
class ProductManager {
    constructor() {
        this.products = [];
        this.filteredProducts = [];
        this.currentPage = 1;
        this.productsPerPage = 6;
    }

    // 加载产品数据
    async loadProducts() {
        try {
            const response = await fetch('./data/products.json');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            this.products = data.products;
            this.filteredProducts = [...this.products];
            
            return this.products;
        } catch (error) {
            console.error('Failed to load products:', error);
            return [];
        }
    }

    // 渲染产品卡片
    renderProductCard(product) {
        return `
            <div class="product-card" data-category="${product.category.toLowerCase().replace(/\s+/g, '-')}" data-function="${product.function}" onclick="window.location.href='product-detail.html?product=${product.id}'">
                <div class="product-header">
                    <h3>${product.name}</h3>
                    <span class="product-category">${product.category}</span>
                </div>
                <p class="product-description">${product.description}</p>
                
                <div class="product-details">
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    
                    <div class="product-specs">
                        <table class="specs-table">
                            <thead>
                                <tr>
                                    <th>Particle size distribution (μm)</th>
                                    <th>Bulk density (g/L)</th>
                                    <th>Hausner ratio (-)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <div class="size-values">
                                            <span class="size-label">X<sub>10</sub></span>
                                            <span class="size-value">${product.specifications.particle_size.x10}</span>
                                        </div>
                                        <div class="size-values">
                                            <span class="size-label">X<sub>50</sub></span>
                                            <span class="size-value">${product.specifications.particle_size.x50}</span>
                                        </div>
                                        <div class="size-values">
                                            <span class="size-label">X<sub>90</sub></span>
                                            <span class="size-value">${product.specifications.particle_size.x90}</span>
                                        </div>
                                    </td>
                                    <td class="highlight-value">${product.specifications.bulk_density}</td>
                                    <td class="highlight-value">${product.specifications.moisture}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    }

    // 渲染产品网格
    renderProductsGrid() {
        const container = document.getElementById('products-grid');
        if (!container) {
            console.error('找不到products-grid容器!');
            return;
        }

        const startIndex = (this.currentPage - 1) * this.productsPerPage;
        const endIndex = startIndex + this.productsPerPage;
        const productsToShow = this.filteredProducts.slice(startIndex, endIndex);

        container.innerHTML = productsToShow.map(product => this.renderProductCard(product)).join('');
        
        // 更新产品计数
        this.updateProductCount();
        
        // 更新分页
        this.updatePagination();
    }

    // 更新产品计数
    updateProductCount() {
        const countElement = document.querySelector('.results-header h1');
        if (countElement) {
            countElement.textContent = `Excipients (${this.filteredProducts.length})`;
        }
    }

    // 更新分页
    updatePagination() {
        const totalPages = Math.ceil(this.filteredProducts.length / this.productsPerPage);
        const paginationContainer = document.getElementById('pagination');
        const pageNumbersContainer = document.getElementById('page-numbers');
        
        if (!paginationContainer || !pageNumbersContainer) return;

        // 显示或隐藏分页
        if (totalPages <= 1) {
            paginationContainer.style.display = 'none';
            return;
        } else {
            paginationContainer.style.display = 'flex';
        }

        // 清空现有页码
        pageNumbersContainer.innerHTML = '';

        // 添加页码按钮
        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.className = 'page-btn';
            pageBtn.textContent = i;
            
            if (i === this.currentPage) {
                pageBtn.classList.add('active');
            }
            
            pageBtn.addEventListener('click', () => {
                this.currentPage = i;
                this.renderProductsGrid();
            });
            
            pageNumbersContainer.appendChild(pageBtn);
        }

        // 更新上一页/下一页按钮状态
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        
        if (prevBtn) {
            prevBtn.disabled = this.currentPage === 1;
            prevBtn.onclick = () => {
                if (this.currentPage > 1) {
                    this.currentPage--;
                    this.renderProductsGrid();
                }
            };
        }
        
        if (nextBtn) {
            nextBtn.disabled = this.currentPage === totalPages;
            nextBtn.onclick = () => {
                if (this.currentPage < totalPages) {
                    this.currentPage++;
                    this.renderProductsGrid();
                }
            };
        }
    }

    // 过滤产品
    filterProducts(categories = [], functions = [], searchTerm = '') {
        this.filteredProducts = this.products.filter(product => {
            // 检查类别匹配
            const matchesCategory = categories.length === 0 || 
                categories.some(cat => product.category.toLowerCase().replace(/\s+/g, '-') === cat);
            
            // 检查功能匹配
            const matchesFunction = functions.length === 0 || 
                functions.includes(product.function);
            
            // 检查搜索词匹配
            const matchesSearch = !searchTerm || 
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description.toLowerCase().includes(searchTerm.toLowerCase());
            
            return matchesCategory && matchesFunction && matchesSearch;
        });
        
        this.currentPage = 1; // 重置到第一页
        this.renderProductsGrid();
    }

    // 获取当前选中的过滤器
    getSelectedFilters() {
        const categoryCheckboxes = document.querySelectorAll('.filter-category:first-child input[type="checkbox"]:checked');
        const functionCheckboxes = document.querySelectorAll('.filter-category:last-child input[type="checkbox"]:checked');
        
        const categories = Array.from(categoryCheckboxes).map(cb => cb.value);
        const functions = Array.from(functionCheckboxes).map(cb => cb.value);
        
        return { categories, functions };
    }

    // 应用过滤器
    applyFilters() {
        const { categories, functions } = this.getSelectedFilters();
        const searchTerm = document.getElementById('excipient-search')?.value || '';
        this.filterProducts(categories, functions, searchTerm);
    }

    // 初始化
    async init() {
        await this.loadProducts();
        this.renderProductsGrid();
        
        // 绑定搜索事件
        const searchInput = document.getElementById('excipient-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.applyFilters();
            });
        }
        
        // 绑定复选框过滤事件
        const filterCheckboxes = document.querySelectorAll('.filter-category input[type="checkbox"]');
        filterCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.applyFilters();
            });
        });
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    const productManager = new ProductManager();
    productManager.init();
});

// 导出供其他模块使用
window.ProductManager = ProductManager; 