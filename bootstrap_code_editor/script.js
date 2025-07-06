// Global variables
let isFullscreen = false;
let currentTemplate = null;

// Templates with 404 page and other common layouts
const templates = {
  '404': {
    html: `<div class="container-fluid vh-100 d-flex align-items-center justify-content-center bg-gradient">
  <div class="text-center">
    <div class="error-number mb-4">
      <h1 class="display-1 fw-bold text-primary">404</h1>
    </div>
    <div class="error-message mb-4">
      <h2 class="h3 mb-3">Oops! Page Not Found</h2>
      <p class="lead text-muted">The page you're looking for doesn't exist or has been moved.</p>
    </div>
    <div class="error-actions">
      <a href="#" class="btn btn-primary btn-lg me-3">
        <i class="fas fa-home"></i> Go Home
      </a>
      <button class="btn btn-outline-secondary btn-lg" onclick="history.back()">
        <i class="fas fa-arrow-left"></i> Go Back
      </button>
    </div>
    <div class="mt-5">
      <img src="https://via.placeholder.com/300x200/e9ecef/6c757d?text=Lost+in+Space" 
           alt="404 illustration" class="img-fluid rounded shadow">
    </div>
  </div>
</div>`,
    css: `.bg-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.error-number h1 {
  font-size: 8rem;
  text-shadow: 0 4px 8px rgba(0,0,0,0.3);
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

.error-message h2 {
  color: #fff;
}

.btn {
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0,0,0,0.2);
}

@media (max-width: 768px) {
  .error-number h1 {
    font-size: 5rem;
  }
  .btn-lg {
    margin-bottom: 10px;
  }
}`,
    js: `// 404 Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Add floating animation to the image
  const img = document.querySelector('img');
  if (img) {
    setInterval(() => {
      img.style.transform = 'translateY(' + Math.sin(Date.now() / 1000) * 5 + 'px)';
    }, 50);
  }
  
  // Add click tracking
  console.log('404 page loaded at:', new Date().toLocaleString());
});`
  },
  
  'landing': {
    html: `<nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
  <div class="container">
    <a class="navbar-brand fw-bold" href="#">MyApp</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item"><a class="nav-link" href="#home">Home</a></li>
        <li class="nav-item"><a class="nav-link" href="#features">Features</a></li>
        <li class="nav-item"><a class="nav-link" href="#contact">Contact</a></li>
      </ul>
    </div>
  </div>
</nav>

<section id="home" class="hero-section d-flex align-items-center">
  <div class="container text-center text-white">
    <h1 class="display-4 fw-bold mb-4">Welcome to the Future</h1>
    <p class="lead mb-4">Build amazing applications with Bootstrap 5</p>
    <button class="btn btn-primary btn-lg">Get Started</button>
  </div>
</section>

<section id="features" class="py-5">
  <div class="container">
    <h2 class="text-center mb-5">Features</h2>
    <div class="row g-4">
      <div class="col-md-4">
        <div class="card h-100 text-center">
          <div class="card-body">
            <i class="fas fa-rocket fa-3x text-primary mb-3"></i>
            <h5 class="card-title">Fast</h5>
            <p class="card-text">Lightning fast performance</p>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card h-100 text-center">
          <div class="card-body">
            <i class="fas fa-shield-alt fa-3x text-success mb-3"></i>
            <h5 class="card-title">Secure</h5>
            <p class="card-text">Enterprise-grade security</p>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card h-100 text-center">
          <div class="card-body">
            <i class="fas fa-cog fa-3x text-info mb-3"></i>
            <h5 class="card-title">Customizable</h5>
            <p class="card-text">Highly customizable interface</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>`,
    css: `.hero-section {
  height: 100vh;
  background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), 
              url('https://via.placeholder.com/1920x1080/0d6efd/ffffff?text=Hero+Background') center/cover;
}

.card {
  transition: transform 0.3s ease;
  border: none;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0,0,0,0.2);
}`,
    js: `// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});`
  },
  
  'dashboard': {
    html: `<div class="container-fluid">
  <div class="row">
    <nav class="col-md-2 d-none d-md-block bg-dark sidebar">
      <div class="sidebar-sticky pt-3">
        <ul class="nav flex-column">
          <li class="nav-item">
            <a class="nav-link active text-white" href="#"><i class="fas fa-tachometer-alt"></i> Dashboard</a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-light" href="#"><i class="fas fa-users"></i> Users</a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-light" href="#"><i class="fas fa-chart-bar"></i> Analytics</a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-light" href="#"><i class="fas fa-cog"></i> Settings</a>
          </li>
        </ul>
      </div>
    </nav>

    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Dashboard</h1>
      </div>

      <div class="row">
        <div class="col-xl-3 col-md-6 mb-4">
          <div class="card border-primary">
            <div class="card-body">
              <div class="d-flex justify-content-between">
                <div>
                  <h5 class="card-title text-primary">Users</h5>
                  <h2>1,234</h2>
                </div>
                <i class="fas fa-users fa-2x text-primary"></i>
              </div>
            </div>
          </div>
        </div>
        
        <div class="col-xl-3 col-md-6 mb-4">
          <div class="card border-success">
            <div class="card-body">
              <div class="d-flex justify-content-between">
                <div>
                  <h5 class="card-title text-success">Revenue</h5>
                  <h2>$12,345</h2>
                </div>
                <i class="fas fa-dollar-sign fa-2x text-success"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h5>Recent Activity</h5>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Action</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>John Doe</td>
                      <td>Login</td>
                      <td>2024-01-15</td>
                      <td><span class="badge bg-success">Success</span></td>
                    </tr>
                    <tr>
                      <td>Jane Smith</td>
                      <td>Purchase</td>
                      <td>2024-01-14</td>
                      <td><span class="badge bg-primary">Completed</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</div>`,
    css: `.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  padding: 48px 0 0;
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
}

.sidebar-sticky {
  position: relative;
  top: 0;
  height: calc(100vh - 48px);
  padding-top: .5rem;
  overflow-x: hidden;
  overflow-y: auto;
}

.nav-link {
  color: #adb5bd;
}

.nav-link:hover {
  color: #fff;
  background-color: #495057;
}

.nav-link.active {
  color: #fff;
  background-color: #0d6efd;
}

main {
  margin-left: 0;
}

@media (min-width: 768px) {
  main {
    margin-left: 16.666667%;
  }
}`,
    js: `// Dashboard functionality
document.addEventListener('DOMContentLoaded', function() {
  // Simulate real-time updates
  function updateStats() {
    const userCount = document.querySelector('h2');
    if (userCount) {
      const currentCount = parseInt(userCount.textContent.replace(',', ''));
      userCount.textContent = (currentCount + Math.floor(Math.random() * 10)).toLocaleString();
    }
  }
  
  // Update stats every 5 seconds
  setInterval(updateStats, 5000);
  
  console.log('Dashboard loaded successfully');
});`
  },
  
  'contact': {
    html: `<div class="container py-5">
  <div class="row justify-content-center">
    <div class="col-lg-8">
      <div class="text-center mb-5">
        <h2 class="display-4 fw-bold">Contact Us</h2>
        <p class="lead text-muted">We'd love to hear from you. Send us a message!</p>
      </div>
      
      <div class="card shadow-lg border-0">
        <div class="card-body p-5">
          <form id="contactForm">
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="firstName" class="form-label">First Name</label>
                <input type="text" class="form-control" id="firstName" required>
              </div>
              <div class="col-md-6 mb-3">
                <label for="lastName" class="form-label">Last Name</label>
                <input type="text" class="form-control" id="lastName" required>
              </div>
            </div>
            
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input type="email" class="form-control" id="email" required>
            </div>
            
            <div class="mb-3">
              <label for="subject" class="form-label">Subject</label>
              <select class="form-select" id="subject" required>
                <option value="">Choose...</option>
                <option value="general">General Inquiry</option>
                <option value="support">Support</option>
                <option value="feedback">Feedback</option>
              </select>
            </div>
            
            <div class="mb-4">
              <label for="message" class="form-label">Message</label>
              <textarea class="form-control" id="message" rows="5" required></textarea>
            </div>
            
            <div class="d-grid">
              <button type="submit" class="btn btn-primary btn-lg">
                <i class="fas fa-paper-plane"></i> Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <div class="row mt-5">
        <div class="col-md-4 text-center">
          <div class="mb-3">
            <i class="fas fa-map-marker-alt fa-2x text-primary"></i>
          </div>
          <h5>Address</h5>
          <p class="text-muted">123 Main St<br>City, State 12345</p>
        </div>
        <div class="col-md-4 text-center">
          <div class="mb-3">
            <i class="fas fa-phone fa-2x text-primary"></i>
          </div>
          <h5>Phone</h5>
          <p class="text-muted">+1 (555) 123-4567</p>
        </div>
        <div class="col-md-4 text-center">
          <div class="mb-3">
            <i class="fas fa-envelope fa-2x text-primary"></i>
          </div>
          <h5>Email</h5>
          <p class="text-muted">contact@example.com</p>
        </div>
      </div>
    </div>
  </div>
</div>`,
    css: `.card {
  transition: transform 0.3s ease;
}

.form-control:focus, .form-select:focus {
  border-color: #0d6efd;
  box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
}

.btn-primary {
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(13, 110, 253, 0.3);
}`,
    js: `document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Get form data
  const formData = new FormData(this);
  const data = Object.fromEntries(formData);
  
  // Simulate form submission
  const button = this.querySelector('button[type="submit"]');
  const originalText = button.innerHTML;
  
  button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  button.disabled = true;
  
  setTimeout(() => {
    alert('Message sent successfully! 🎉');
    this.reset();
    button.innerHTML = originalText;
    button.disabled = false;
  }, 2000);
});`
  }
};

function runEditor() {
  showLoading(true);
  hideError();
  
  try {
    const html = document.getElementById("htmlCode").value;
    const css = document.getElementById("cssCode").value;
    const js = document.getElementById("jsCode").value;

    const result = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Preview</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
  <style>
    ${css}
    
    /* Error handling styles */
    .error-boundary {
      padding: 20px;
      background: #f8d7da;
      border: 1px solid #f5c6cb;
      border-radius: 4px;
      color: #721c24;
      margin: 10px;
    }
  </style>
</head>
<body>
  ${html}
  
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"><\/script>
  <script>
    // Error handling
    window.addEventListener('error', function(e) {
      console.error('Runtime error:', e.error);
      const errorDiv = document.createElement('div');
      errorDiv.className = 'error-boundary';
      errorDiv.innerHTML = '<strong>JavaScript Error:</strong> ' + e.message;
      document.body.insertBefore(errorDiv, document.body.firstChild);
    });
    
    // User JavaScript
    try {
      ${js}
    } catch (error) {
      console.error('User script error:', error);
      const errorDiv = document.createElement('div');
      errorDiv.className = 'error-boundary';
      errorDiv.innerHTML = '<strong>Script Error:</strong> ' + error.message;
      document.body.insertBefore(errorDiv, document.body.firstChild);
    }
  <\/script>
</body>
</html>
    `;

    const iframe = document.getElementById("outputFrame");
    iframe.srcdoc = result;
    
    // Hide loading after iframe loads
    iframe.onload = function() {
      showLoading(false);
      showStatus("Code executed successfully!", "success");
    };
    
    // Handle iframe errors
    iframe.onerror = function() {
      showLoading(false);
      showError("Failed to load preview. Please check your code for syntax errors.");
    };
    
  } catch (error) {
    showLoading(false);
    showError("Error: " + error.message);
    console.error("Editor error:", error);
  }
}

function showLoading(show) {
  const loading = document.getElementById("loading");
  const iframe = document.getElementById("outputFrame");
  
  if (show) {
    loading.classList.remove("d-none");
    iframe.style.opacity = "0.5";
  } else {
    loading.classList.add("d-none");
    iframe.style.opacity = "1";
  }
}

function showError(message) {
  const errorDisplay = document.getElementById("errorDisplay");
  const errorMessage = document.getElementById("errorMessage");
  const iframe = document.getElementById("outputFrame");
  
  errorMessage.textContent = message;
  errorDisplay.classList.remove("d-none");
  iframe.style.opacity = "0.3";
  
  showStatus("Error in code execution", "danger");
}

function hideError() {
  const errorDisplay = document.getElementById("errorDisplay");
  const iframe = document.getElementById("outputFrame");
  
  errorDisplay.classList.add("d-none");
  iframe.style.opacity = "1";
}

function showStatus(message, type = "info") {
  const statusAlert = document.getElementById("statusAlert");
  const statusMessage = document.getElementById("statusMessage");
  
  statusAlert.className = `alert alert-${type}`;
  statusMessage.textContent = message;
  statusAlert.classList.remove("d-none");
  
  // Auto-hide after 3 seconds
  setTimeout(() => {
    statusAlert.classList.add("d-none");
  }, 3000);
}

function clearCode(type) {
  const codeMap = {
    'html': 'htmlCode',
    'css': 'cssCode',
    'js': 'jsCode'
  };
  
  if (codeMap[type]) {
    document.getElementById(codeMap[type]).value = '';
    showStatus(`${type.toUpperCase()} code cleared`, "warning");
  }
}

function refreshPreview() {
  showStatus("Refreshing preview...", "info");
  runEditor();
}

function toggleFullscreen() {
  const iframe = document.getElementById("outputFrame");
  const button = event.target.closest('button');
  const icon = button.querySelector('i');
  
  if (!isFullscreen) {
    iframe.classList.add("fullscreen-preview");
    icon.className = "fas fa-compress";
    isFullscreen = true;
    showStatus("Entered fullscreen mode", "info");
  } else {
    iframe.classList.remove("fullscreen-preview");
    icon.className = "fas fa-expand";
    isFullscreen = false;
    showStatus("Exited fullscreen mode", "info");
  }
}

function saveCode() {
  const code = {
    html: document.getElementById("htmlCode").value,
    css: document.getElementById("cssCode").value,
    js: document.getElementById("jsCode").value,
    timestamp: new Date().toISOString()
  };
  
  localStorage.setItem("savedCode", JSON.stringify(code));
  showStatus("Code saved successfully!", "success");
}

function loadCode() {
  const savedCode = localStorage.getItem("savedCode");
  
  if (savedCode) {
    const code = JSON.parse(savedCode);
    document.getElementById("htmlCode").value = code.html || '';
    document.getElementById("cssCode").value = code.css || '';
    document.getElementById("jsCode").value = code.js || '';
    
    showStatus("Code loaded successfully!", "success");
    runEditor();
  } else {
    showStatus("No saved code found", "warning");
  }
}

function exportCode() {
  const html = document.getElementById("htmlCode").value;
  const css = document.getElementById("cssCode").value;
  const js = document.getElementById("jsCode").value;
  
  const fullHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Exported Code</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
  <style>
${css}
  </style>
</head>
<body>
${html}

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <script>
${js}
  </script>
</body>
</html>`;

  const blob = new Blob([fullHTML], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'exported-code.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  showStatus("Code exported successfully!", "success");
}

function showTemplates() {
  const modal = new bootstrap.Modal(document.getElementById('templatesModal'));
  modal.show();
}

function loadTemplate(templateName) {
  if (templates[templateName]) {
    const template = templates[templateName];
    document.getElementById("htmlCode").value = template.html;
    document.getElementById("cssCode").value = template.css;
    document.getElementById("jsCode").value = template.js;
    
    currentTemplate = templateName;
    
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('templatesModal'));
    modal.hide();
    
    showStatus(`${templateName.toUpperCase()} template loaded!`, "success");
    runEditor();
  }
}

// Auto-run on load
window.onload = function() {
  runEditor();
  
  // Add keyboard shortcuts
  document.addEventListener('keydown', function(e) {
    if (e.ctrlKey) {
      switch(e.key) {
        case 'Enter':
          e.preventDefault();
          runEditor();
          break;
        case 's':
          e.preventDefault();
          saveCode();
          break;
        case 'o':
          e.preventDefault();
          loadCode();
          break;
      }
    }
  });
  
  // Auto-save every 30 seconds
  setInterval(saveCode, 30000);
  
  console.log("Bootstrap Code Editor loaded successfully!");
};
