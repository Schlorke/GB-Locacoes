import { neon } from "@neondatabase/serverless"

export async function GET() {
  const timestamp = new Date().toISOString()
  const services: any = {}
  let overallStatus = "healthy"

  // === TEST DATABASE (NEON) ===
  try {
    if (process.env.DATABASE_URL) {
      const sql = neon(process.env.DATABASE_URL)
      const result = await sql`SELECT NOW() as current_time, version() as db_version`
      services.database = {
        status: "healthy",
        details: {
          connected: true,
          serverTime: result[0].current_time,
          version: "PostgreSQL (Neon)",
          project: process.env.NEON_PROJECT_ID || "unknown",
        },
      }
    } else {
      services.database = {
        status: "error",
        details: { error: "DATABASE_URL not configured" },
      }
      overallStatus = "unhealthy"
    }
  } catch (error) {
    services.database = {
      status: "error",
      details: { error: error.message },
    }
    overallStatus = "unhealthy"
  }

  // === TEST REDIS (UPSTASH KV) ===
  try {
    if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
      const response = await fetch(`${process.env.KV_REST_API_URL}/ping`, {
        headers: {
          Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
        },
      })

      if (response.ok) {
        services.redis = {
          status: "healthy",
          details: {
            connected: true,
            endpoint: "Upstash KV",
            url: process.env.KV_REST_API_URL,
          },
        }
      } else {
        services.redis = {
          status: "error",
          details: { error: `HTTP ${response.status}` },
        }
        overallStatus = "unhealthy"
      }
    } else {
      services.redis = {
        status: "error",
        details: { error: "KV credentials not configured" },
      }
      overallStatus = "unhealthy"
    }
  } catch (error) {
    services.redis = {
      status: "error",
      details: { error: error.message },
    }
    overallStatus = "unhealthy"
  }

  // === CHECK BLOB STORAGE (VERCEL) ===
  services.blob = {
    status: process.env.BLOB_READ_WRITE_TOKEN ? "configured" : "not_configured",
    details: {
      hasToken: !!process.env.BLOB_READ_WRITE_TOKEN,
      provider: "Vercel Blob",
    },
  }

  // === CHECK AUTHENTICATION (NEXTAUTH) ===
  services.auth = {
    status: process.env.NEXTAUTH_SECRET && process.env.NEXTAUTH_URL ? "configured" : "incomplete",
    details: {
      hasSecret: !!process.env.NEXTAUTH_SECRET,
      hasUrl: !!process.env.NEXTAUTH_URL,
      url: process.env.NEXTAUTH_URL || "not set",
    },
  }

  // === CHECK STACK AUTH (OPCIONAL) ===
  services.stack_auth = {
    status: process.env.STACK_SECRET_SERVER_KEY ? "configured" : "not_configured",
    details: {
      hasServerKey: !!process.env.STACK_SECRET_SERVER_KEY,
      hasProjectId: !!process.env.NEXT_PUBLIC_STACK_PROJECT_ID,
      projectId: process.env.NEXT_PUBLIC_STACK_PROJECT_ID || "not set",
    },
  }

  // === REQUIRED VARIABLES CHECK ===
  const requiredVars = [
    "DATABASE_URL",
    "KV_REST_API_URL",
    "KV_REST_API_TOKEN",
    "NEXTAUTH_SECRET",
    "NEXTAUTH_URL",
    "BLOB_READ_WRITE_TOKEN",
  ]

  const missingVars = requiredVars.filter((varName) => !process.env[varName])

  if (missingVars.length > 0) {
    overallStatus = "unhealthy"
  }

  const healthData = {
    timestamp,
    status: overallStatus,
    services,
    environment: {
      nodeEnv: process.env.NODE_ENV,
      hasRequiredVars: missingVars.length === 0,
      missingVars,
      totalEnvVars: Object.keys(process.env).length,
    },
  }

  // === RETURN FORMATTED HTML ===
  const html = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>GB Locações - System Health</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          padding: 20px;
        }
        .container { 
          max-width: 900px; 
          margin: 0 auto; 
          background: white; 
          border-radius: 12px; 
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          overflow: hidden;
        }
        .header { 
          background: ${overallStatus === "healthy" ? "#10b981" : "#ef4444"}; 
          color: white; 
          padding: 30px; 
          text-align: center; 
        }
        .header h1 { font-size: 2rem; margin-bottom: 10px; }
        .status { font-size: 1.2rem; opacity: 0.9; }
        .content { padding: 30px; }
        .service { 
          display: flex; 
          justify-content: space-between; 
          align-items: center; 
          padding: 15px 0; 
          border-bottom: 1px solid #e5e7eb; 
        }
        .service:last-child { border-bottom: none; }
        .service-name { font-weight: 600; color: #374151; }
        .service-details { font-size: 0.875rem; color: #6b7280; margin-top: 4px; }
        .service-status { 
          padding: 6px 12px; 
          border-radius: 20px; 
          font-size: 0.875rem; 
          font-weight: 500; 
        }
        .healthy { background: #dcfce7; color: #166534; }
        .configured { background: #dbeafe; color: #1e40af; }
        .error { background: #fee2e2; color: #dc2626; }
        .not_configured { background: #fef3c7; color: #92400e; }
        .incomplete { background: #fef3c7; color: #92400e; }
        .stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin: 20px 0;
          padding: 20px;
          background: #f9fafb;
          border-radius: 8px;
        }
        .stat {
          text-align: center;
        }
        .stat-value {
          font-size: 1.5rem;
          font-weight: bold;
          color: #374151;
        }
        .stat-label {
          font-size: 0.875rem;
          color: #6b7280;
          margin-top: 4px;
        }
        .timestamp { 
          text-align: center; 
          color: #6b7280; 
          font-size: 0.875rem; 
          margin-top: 20px; 
          padding-top: 20px; 
          border-top: 1px solid #e5e7eb; 
        }
        .json-toggle {
          text-align: center;
          margin: 20px 0;
        }
        .json-btn {
          background: #4f46e5;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.875rem;
        }
        .json-data {
          display: none;
          background: #1f2937;
          color: #e5e7eb;
          padding: 20px;
          border-radius: 8px;
          margin-top: 20px;
          font-family: 'Monaco', 'Menlo', monospace;
          font-size: 0.875rem;
          overflow-x: auto;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🏗️ GB Locações</h1>
          <div class="status">System Health: ${overallStatus.toUpperCase()}</div>
        </div>
        
        <div class="content">
          <div class="stats">
            <div class="stat">
              <div class="stat-value">${Object.keys(services).length}</div>
              <div class="stat-label">Serviços</div>
            </div>
            <div class="stat">
              <div class="stat-value">${healthData.environment.totalEnvVars}</div>
              <div class="stat-label">Variáveis de Ambiente</div>
            </div>
            <div class="stat">
              <div class="stat-value">${missingVars.length}</div>
              <div class="stat-label">Variáveis Faltando</div>
            </div>
            <div class="stat">
              <div class="stat-value">${healthData.environment.nodeEnv}</div>
              <div class="stat-label">Ambiente</div>
            </div>
          </div>

          <div class="service">
            <div>
              <div class="service-name">🗄️ Database (Neon PostgreSQL)</div>
              <div class="service-details">Projeto: ${services.database?.details?.project || "N/A"}</div>
            </div>
            <div class="service-status ${services.database.status}">${services.database.status}</div>
          </div>
          
          <div class="service">
            <div>
              <div class="service-name">⚡ Redis Cache (Upstash KV)</div>
              <div class="service-details">${services.redis?.details?.url || "N/A"}</div>
            </div>
            <div class="service-status ${services.redis.status}">${services.redis.status}</div>
          </div>
          
          <div class="service">
            <div>
              <div class="service-name">📁 Blob Storage (Vercel)</div>
              <div class="service-details">Upload de arquivos e imagens</div>
            </div>
            <div class="service-status ${services.blob.status}">${services.blob.status}</div>
          </div>
          
          <div class="service">
            <div>
              <div class="service-name">🔐 Authentication (NextAuth)</div>
              <div class="service-details">${services.auth?.details?.url || "N/A"}</div>
            </div>
            <div class="service-status ${services.auth.status}">${services.auth.status}</div>
          </div>

          <div class="service">
            <div>
              <div class="service-name">👤 Stack Auth (Opcional)</div>
              <div class="service-details">Sistema de autenticação alternativo</div>
            </div>
            <div class="service-status ${services.stack_auth.status}">${services.stack_auth.status}</div>
          </div>
          
          <div class="json-toggle">
            <button class="json-btn" onclick="toggleJson()">Ver JSON Completo</button>
          </div>
          
          <div class="json-data" id="jsonData">
            <pre>${JSON.stringify(healthData, null, 2)}</pre>
          </div>
          
          <div class="timestamp">
            Última verificação: ${new Date(timestamp).toLocaleString("pt-BR")}
          </div>
        </div>
      </div>
      
      <script>
        function toggleJson() {
          const jsonData = document.getElementById('jsonData');
          const btn = document.querySelector('.json-btn');
          if (jsonData.style.display === 'none' || !jsonData.style.display) {
            jsonData.style.display = 'block';
            btn.textContent = 'Ocultar JSON';
          } else {
            jsonData.style.display = 'none';
            btn.textContent = 'Ver JSON Completo';
          }
        }
      </script>
    </body>
    </html>
  `

  return new Response(html, {
    headers: { "Content-Type": "text/html" },
    status: overallStatus === "healthy" ? 200 : 503,
  })
}
