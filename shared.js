// Shared JavaScript utilities for Big Data Architecture Hub
// This file contains common functions used across all pages

// Navigation functionality
function createNavigation() {
    const nav = document.createElement('nav');
    nav.style.cssText = 'background: rgba(0,0,0,0.1); padding: 10px 0; text-align: center;';
    nav.innerHTML = `
        <a href="index.html" style="color: #667eea; text-decoration: none; margin: 0 15px; font-weight: bold;">🏠 Big Data Hub</a>
        <a href="hadoop.html" style="color: #ff6b35; text-decoration: none; margin: 0 15px; font-weight: bold;">🔧 Hadoop</a>
        <a href="hive.html" style="color: #ffb300; text-decoration: none; margin: 0 15px; font-weight: bold;">🐝 Hive</a>
        <a href="spark.html" style="color: #e25a1c; text-decoration: none; margin: 0 15px; font-weight: bold;">⚡ Spark</a>
    `;
    document.body.insertBefore(nav, document.body.firstChild);
}

// Common animation utilities
function animateElement(element, animation, duration = 300) {
    element.style.transition = `all ${duration}ms ease`;
    element.style.transform = animation;
    setTimeout(() => {
        element.style.transform = '';
    }, duration);
}

function pulseElement(element, color = '#e74c3c') {
    const originalBg = element.style.backgroundColor;
    element.style.backgroundColor = color;
    element.style.transform = 'scale(1.1)';
    setTimeout(() => {
        element.style.backgroundColor = originalBg;
        element.style.transform = 'scale(1)';
    }, 500);
}

// Logging utility for process monitors
function createLogger(containerId) {
    return {
        log: function(message, type = 'info') {
            const container = document.getElementById(containerId);
            if (!container) return;
            
            const timestamp = new Date().toLocaleTimeString();
            const colors = {
                info: '#00ff00',
                success: '#51cf66',
                error: '#ff6b6b',
                warning: '#ffd43b'
            };
            
            const logEntry = document.createElement('div');
            logEntry.style.color = colors[type] || colors.info;
            logEntry.textContent = `[${timestamp}] ${message}`;
            
            container.appendChild(logEntry);
            container.scrollTop = container.scrollHeight;
        },
        clear: function() {
            const container = document.getElementById(containerId);
            if (container) container.innerHTML = '';
        }
    };
}

// Common step execution utility
function executeStepsSequentially(steps, processName, detailsPanelId) {
    const detailsPanel = document.getElementById(detailsPanelId);
    if (!detailsPanel) return;
    
    detailsPanel.innerHTML = `<div>🚀 Starting ${processName}...</div>`;
    
    steps.forEach((step, index) => {
        setTimeout(() => {
            if (step.element) {
                step.element.style.background = step.color;
                step.element.style.transform = 'scale(1.1)';
                step.element.style.color = 'white';
            }
            
            const logEntry = document.createElement('div');
            logEntry.style.color = step.color;
            logEntry.textContent = `[Step ${index + 1}] ${step.title}: ${step.desc}`;
            detailsPanel.appendChild(logEntry);
            detailsPanel.scrollTop = detailsPanel.scrollHeight;
            
            if (index === steps.length - 1) {
                setTimeout(() => {
                    const completion = document.createElement('div');
                    completion.style.color = '#00ff00';
                    completion.textContent = `✅ ${processName} COMPLETED SUCCESSFULLY`;
                    detailsPanel.appendChild(completion);
                }, 500);
            }
        }, index * 1000);
    });
}

// Common tab switching functionality
function createTabSwitcher(tabButtonsSelector, tabContentsSelector) {
    return function(activeTabId) {
        // Hide all tab contents
        document.querySelectorAll(tabContentsSelector).forEach(content => {
            content.classList.remove('active');
        });
        
        // Remove active class from all tab buttons
        document.querySelectorAll(tabButtonsSelector).forEach(button => {
            button.classList.remove('active');
        });
        
        // Show selected tab content
        const activeTab = document.getElementById(activeTabId);
        if (activeTab) activeTab.classList.add('active');
        
        // Activate clicked tab button
        if (event && event.target) {
            event.target.classList.add('active');
        }
    };
}

// Performance metrics utilities
function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function formatDuration(milliseconds) {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
}

// Common fact-checking display
function createFactCheckBox(content, source = 'Apache Documentation') {
    const factBox = document.createElement('div');
    factBox.className = 'fact-check';
    factBox.style.cssText = `
        background: #d4edda;
        border: 1px solid #c3e6cb;
        border-left: 4px solid #28a745;
        padding: 15px;
        margin: 15px 0;
        border-radius: 5px;
    `;
    factBox.innerHTML = `
        <strong style="color: #28a745;">✓ Fact-Checked (${source}): </strong>
        ${content}
    `;
    return factBox;
}

// Responsive layout handler
function handleResponsiveLayout() {
    const isMobile = window.innerWidth <= 768;
    const containers = document.querySelectorAll('.architecture-flow, .process-flow');
    
    containers.forEach(container => {
        if (isMobile) {
            container.style.flexDirection = 'column';
            const arrows = container.querySelectorAll('.flow-arrow, .dag-arrow');
            arrows.forEach(arrow => {
                arrow.style.transform = 'rotate(90deg)';
                arrow.style.margin = '20px 0';
            });
        } else {
            container.style.flexDirection = 'row';
            const arrows = container.querySelectorAll('.flow-arrow, .dag-arrow');
            arrows.forEach(arrow => {
                arrow.style.transform = 'rotate(0deg)';
                arrow.style.margin = '0 10px';
            });
        }
    });
}

// Common keyboard navigation
function setupKeyboardNavigation(handlers) {
    document.addEventListener('keydown', function(event) {
        if (handlers[event.key]) {
            event.preventDefault();
            handlers[event.key]();
        }
    });
}

// Performance monitoring utilities
function createPerformanceMonitor() {
    const startTime = performance.now();
    
    return {
        mark: function(label) {
            performance.mark(label);
        },
        measure: function(name, startMark, endMark) {
            performance.measure(name, startMark, endMark);
            const measure = performance.getEntriesByName(name)[0];
            return measure.duration;
        },
        getElapsedTime: function() {
            return performance.now() - startTime;
        }
    };
}

// Initialize shared functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add responsive layout handling
    handleResponsiveLayout();
    window.addEventListener('resize', handleResponsiveLayout);
    
    // Add common CSS if not already present
    if (!document.getElementById('shared-styles')) {
        const style = document.createElement('style');
        style.id = 'shared-styles';
        style.textContent = `
            .fact-check {
                background: #d4edda;
                border: 1px solid #c3e6cb;
                border-left: 4px solid #28a745;
                padding: 15px;
                margin: 15px 0;
                border-radius: 5px;
            }
            .fact-check::before {
                content: "✓ Fact-Checked: ";
                font-weight: bold;
                color: #28a745;
            }
            @media (max-width: 768px) {
                .architecture-flow, .process-flow {
                    flex-direction: column !important;
                }
                .flow-arrow, .dag-arrow {
                    transform: rotate(90deg) !important;
                    margin: 20px 0 !important;
                }
            }
        `;
        document.head.appendChild(style);
    }
});

// Export for module systems (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        createNavigation,
        animateElement,
        pulseElement,
        createLogger,
        executeStepsSequentially,
        createTabSwitcher,
        formatBytes,
        formatDuration,
        createFactCheckBox,
        handleResponsiveLayout,
        setupKeyboardNavigation,
        createPerformanceMonitor
    };
}
