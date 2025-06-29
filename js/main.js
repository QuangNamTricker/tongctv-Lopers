document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    document.body.appendChild(mobileMenuBtn);
    
    const sidebar = document.querySelector('.sidebar');
    
    mobileMenuBtn.addEventListener('click', function() {
      sidebar.classList.toggle('active');
    });
    
    // Branch selector change
    const branchSelect = document.getElementById('branchSelect');
    if (branchSelect) {
      branchSelect.addEventListener('change', function() {
        // Lưu lựa chọn nhánh vào localStorage
        localStorage.setItem('selectedBranch', this.value);
        // Có thể thêm logic tải lại dữ liệu theo nhánh ở đây
        console.log(`Đã chọn nhánh: ${this.value}`);
      });
      
      // Khôi phục lựa chọn nhánh nếu có
      const savedBranch = localStorage.getItem('selectedBranch');
      if (savedBranch) {
        branchSelect.value = savedBranch;
      }
    }
    
    // Navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        
        // Nếu là mobile thì đóng sidebar sau khi chọn
        if (window.innerWidth < 992) {
          sidebar.classList.remove('active');
        }
      });
    });
    
    // Load content dynamically
    const contentWrapper = document.querySelector('.content-wrapper');
    
    function loadContent(url) {
      fetch(url)
        .then(response => response.text())
        .then(html => {
          contentWrapper.innerHTML = html;
          // Khởi tạo các component/script cần thiết sau khi tải nội dung
          initComponents();
        })
        .catch(err => {
          console.error('Lỗi khi tải nội dung:', err);
          contentWrapper.innerHTML = '<div class="error-message">Không thể tải nội dung</div>';
        });
    }
    
    // Xử lý điều hướng
    if (window.location.pathname.includes('/pages/')) {
      const currentPage = window.location.pathname.split('/').pop().replace('.html', '');
      const activeLink = document.querySelector(`.nav-link[href*="${currentPage}"]`);
      if (activeLink) {
        navLinks.forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');
      }
    }
    
    // Hiệu ứng loading
    function showLoading() {
      contentWrapper.innerHTML = `
        <div class="loading-animation">
          <div class="spinner"></div>
          <p>Đang tải dữ liệu...</p>
        </div>
      `;
    }
    
    // Khởi tạo các component
    function initComponents() {
      // Khởi tạo biểu đồ, datepicker, etc.
      initCharts();
      initDatePickers();
      initDataTables();
    }
    
    // Ví dụ khởi tạo biểu đồ
    function initCharts() {
      const chartEls = document.querySelectorAll('.chart-container');
      if (chartEls.length > 0) {
        chartEls.forEach(el => {
          const ctx = el.getContext('2d');
          const chartType = el.dataset.chartType || 'bar';
          const chartData = JSON.parse(el.dataset.chartData || '{}');
          
          new Chart(ctx, {
            type: chartType,
            data: chartData,
            options: {
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: el.dataset.chartTitle || 'Biểu đồ'
                }
              }
            }
          });
        });
      }
    }
    
    // Các hàm khởi tạo khác
    function initDatePickers() {
      // Khởi tạo datepicker nếu có
    }
    
    function initDataTables() {
      // Khởi tạo datatable nếu có
    }
    
    // Lắng nghe sự kiện popstate (back/forward)
    window.addEventListener('popstate', function() {
      // Xử lý thay đổi nội dung khi dùng back/forward
    });
  });