export function playRetroAnimation(canvas: HTMLCanvasElement) {
  const maybeContext = canvas.getContext('2d');
  if (!maybeContext) return;
  const context: CanvasRenderingContext2D = maybeContext;

  const W = (canvas.width = canvas.clientWidth);
  const H = (canvas.height = canvas.clientHeight);

  const start = performance.now();
  const duration = 15000; // 15s

  function drawCRTOverlay() {
    context.fillStyle = 'rgba(0,0,0,0.3)';
    for (let y = 0; y < H; y += 2) {
      context.fillRect(0, y, W, 1);
    }
  }

  function renderTerraformFrame(t: number) {
    const lines = [
      'provider "google" { project = "nat-ya" region = "europe-west1" }',
      'resource "google_cloud_run_service" "api" {',
      '  name = "ny-api"',
      '  location = "europe-west1"',
      '  template { containers { image = "gcr.io/nat-ya/ny-api:latest" } }',
      '}',
      'resource "google_cloud_run_service" "web" {',
      '  name = "ny-web"',
      '  location = "europe-west1"',
      '  template { containers { image = "gcr.io/nat-ya/ny-web:latest" } }',
      '}',
      'output "web_url" { value = google_cloud_run_service.web.status[0].url }',
    ];
    const visible = Math.floor((t / 8000) * lines.length);
    context.fillStyle = '#0f0';
    context.font = '14px monospace';
    for (let i = 0; i < visible; i++) {
      context.fillText(lines[i], 12, 24 + i * 18);
    }
  }

  function renderHomepageTop(t: number) {
    context.fillStyle = '#111';
    context.fillRect(0, 0, W, H);
    // Pixelated banner resembling top of homepage
    context.fillStyle = '#b8d8ff';
    context.fillRect(10, 10, W - 20, 40);
    context.fillStyle = '#ffd54a';
    context.fillRect(10, 54, W - 20, 4);
    context.fillStyle = '#0b3d91';
    context.fillRect(20, 20, 120, 20); // logo block
    context.fillStyle = '#fff';
    context.fillRect(160, 20, W - 180, 12);
  }

  function tick(now: number) {
    const t = now - start;
    context.fillStyle = '#001100';
    context.fillRect(0, 0, W, H);

    if (t < duration - 5000) {
      renderTerraformFrame(t);
    } else {
      renderHomepageTop(t);
    }

    drawCRTOverlay();

    if (t < duration) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}
