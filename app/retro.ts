export function playRetroAnimation(canvas: HTMLCanvasElement) {
  const maybeContext = canvas.getContext('2d');
  if (!maybeContext) return;
  const context: CanvasRenderingContext2D = maybeContext;

  // Set canvas resolution
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  
  if (rect.width === 0 || rect.height === 0) return;
  
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  context.scale(dpr, dpr);
  
  const W = rect.width;
  const H = rect.height;

  const start = performance.now();
  const duration = 15000; // 15s
  const typingSpeed = 50; // chars per second

  function drawCRTOverlay() {
    context.fillStyle = 'rgba(0,0,0,0.15)';
    for (let y = 0; y < H; y += 2) {
      context.fillRect(0, y, W, 1);
    }
  }

  function drawCursor(x: number, y: number, visible: boolean) {
    if (visible) {
      context.fillStyle = '#00ff00';
      context.fillRect(x, y - 12, 8, 14);
    }
  }

  function renderTerraformFrame(t: number) {
    const lines = [
      '# Terraform configuration for Cloud Run deployment',
      '',
      'provider "google" {',
      '  project = "nat-ya-solutions"',
      '  region  = "europe-west1"',
      '}',
      '',
      'resource "google_cloud_run_service" "api" {',
      '  name     = "natya-api"',
      '  location = "europe-west1"',
      '',
      '  template {',
      '    spec {',
      '      containers {',
      '        image = "gcr.io/nat-ya/api:latest"',
      '      }',
      '    }',
      '  }',
      '}',
      '',
      'resource "google_cloud_run_service" "web" {',
      '  name     = "natya-web"',
      '  location = "europe-west1"',
      '',
      '  template {',
      '    spec {',
      '      containers {',
      '        image = "gcr.io/nat-ya/web:latest"',
      '      }',
      '    }',
      '  }',
      '}',
      '',
      'output "web_url" {',
      '  value = google_cloud_run_service.web.status[0].url',
      '}',
    ];

    // Calculate total characters typed
    const totalChars = lines.join('\n').length;
    const charsTyped = Math.floor((t / 1000) * typingSpeed);
    
    let charCount = 0;
    let currentLine = 0;
    let currentChar = 0;

    context.fillStyle = '#00ff00';
    context.font = '16px "Courier New", monospace';
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lineY = 40 + i * 20;
      
      if (charCount + line.length < charsTyped) {
        // Full line visible
        context.fillText(line, 20, lineY);
        charCount += line.length + 1; // +1 for newline
      } else if (charCount < charsTyped) {
        // Partial line visible
        const visibleChars = charsTyped - charCount;
        context.fillText(line.substring(0, visibleChars), 20, lineY);
        
        // Draw cursor
        const cursorX = 20 + context.measureText(line.substring(0, visibleChars)).width;
        drawCursor(cursorX, lineY, Math.floor(t / 500) % 2 === 0);
        break;
      } else {
        break;
      }
    }
  }

  function renderDeploymentSuccess(t: number) {
    const deployTime = t - 10000;
    
    context.fillStyle = '#111';
    context.fillRect(0, 0, W, H);
    
    // Success message
    context.fillStyle = '#00ff00';
    context.font = 'bold 18px "Courier New", monospace';
    context.fillText('✓ Deployment successful!', 20, 50);
    
    context.font = '14px "Courier New", monospace';
    context.fillStyle = '#00aa00';
    context.fillText('Service URL:', 20, 100);
    context.fillStyle = '#00ff00';
    context.fillText('https://natya-web-xyz.run.app', 20, 125);
    
    // Pixelated browser window mockup
    const browserY = 180;
    context.fillStyle = '#333';
    context.fillRect(20, browserY, W - 40, 25); // Browser bar
    
    context.fillStyle = '#b8d8ff';
    context.fillRect(20, browserY + 25, W - 40, 240); // Page content (taller)
    
    context.fillStyle = '#ffd54a';
    context.fillRect(30, browserY + 35, W - 60, 40); // Header
    
    context.fillStyle = '#0b3d91';
    context.fillRect(40, browserY + 45, 80, 15); // Logo
    
    context.fillStyle = '#fff';
    context.fillRect(30, browserY + 90, (W - 60) / 3 - 5, 80); // Card 1
    context.fillRect(30 + (W - 60) / 3 + 5, browserY + 90, (W - 60) / 3 - 5, 80); // Card 2
    context.fillRect(30 + 2 * ((W - 60) / 3 + 5), browserY + 90, (W - 60) / 3 - 5, 80); // Card 3
  }

  function tick(now: number) {
    const elapsed = now - start;
    const t = elapsed % duration; // Loop by using modulo
    
    // Background
    context.fillStyle = '#000';
    context.fillRect(0, 0, W, H);

    if (t < 10000) {
      // Phase 1: Terraform typing (0-10s)
      renderTerraformFrame(t);
    } else {
      // Phase 2: Deployment success (10-15s)
      renderDeploymentSuccess(t);
    }

    drawCRTOverlay();

    // Always continue animating (infinite loop)
    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}
