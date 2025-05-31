package com.works.log.api.controller;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Controller
public class DocsController {

    // Método que serve o scalar.html diretamente
    @GetMapping("/scalar.html")
    @ResponseBody
    public ResponseEntity<String> scalarHtml() {
        try {
            Resource resource = new ClassPathResource("static/scalar.html");
            if (resource.exists()) {
                String content = new String(resource.getInputStream().readAllBytes(), StandardCharsets.UTF_8);
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_TYPE, MediaType.TEXT_HTML_VALUE)
                        .body(content);
            } else {
                // Fallback - retorna HTML inline se o arquivo não existir
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_TYPE, MediaType.TEXT_HTML_VALUE)
                        .body(getScalarHtmlContent());
            }
        } catch (IOException e) {
            // Se houver erro, retorna HTML inline
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_TYPE, MediaType.TEXT_HTML_VALUE)
                    .body(getScalarHtmlContent());
        }
    }

    @GetMapping("/docs")
    public void apiDocs(HttpServletResponse response) throws IOException {
        response.sendRedirect("/scalar.html");
    }

    @GetMapping("/api-docs")
    public void apiDocsAlternative(HttpServletResponse response) throws IOException {
        response.sendRedirect("/scalar.html");
    }

    @GetMapping("/")
    public void home(HttpServletResponse response) throws IOException {
        response.sendRedirect("/scalar.html");
    }

    // HTML do Scalar como fallback
    private String getScalarHtmlContent() {
        return """
            <!DOCTYPE html>
            <html>
            <head>
                <title>WorksLog API Documentation</title>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <style>
                    body {
                        margin: 0;
                        padding: 0;
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    }
                    .loading {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        font-size: 18px;
                        color: #666;
                    }
                    .error {
                        background-color: #fee;
                        border: 1px solid #fcc;
                        color: #c00;
                        padding: 20px;
                        margin: 20px;
                        border-radius: 4px;
                    }
                </style>
            </head>
            <body>
                <div id="scalar-container">
                    <div class="loading">Carregando WorksLog API Documentation...</div>
                </div>

                <script
                    id="api-reference"
                    data-url="/v3/api-docs"
                    data-configuration='{
                        "theme": "purple",
                        "layout": "modern",
                        "defaultHttpClient": {
                            "targetKey": "javascript",
                            "clientKey": "fetch"
                        },
                        "showSidebar": true,
                        "searchHotKey": "k",
                        "metaData": {
                            "title": "WorksLog API",
                            "description": "API para gerenciamento de clientes, entregas e ocorrências"
                        }
                    }'
                    src="https://cdn.jsdelivr.net/npm/@scalar/api-reference">
                </script>

                <script>
                    // Verificação se o endpoint /v3/api-docs está funcionando
                    setTimeout(() => {
                        fetch('/v3/api-docs')
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                                }
                                return response.json();
                            })
                            .then(data => {
                                console.log('✅ OpenAPI spec carregada:', data.info?.title || 'API');
                            })
                            .catch(error => {
                                console.error('❌ Erro ao carregar OpenAPI spec:', error);
                                document.getElementById('scalar-container').innerHTML = `
                                    <div class="error">
                                        <h3>⚠️ Endpoint de documentação não encontrado</h3>
                                        <p>O endpoint <code>/v3/api-docs</code> não está disponível.</p>
                                        <p><strong>Verifique:</strong></p>
                                        <ul>
                                            <li>Se a aplicação iniciou corretamente</li>
                                            <li>Se não há erros no console da aplicação</li>
                                            <li>Tente acessar: <a href="/v3/api-docs" target="_blank">/v3/api-docs</a></li>
                                        </ul>
                                        <p><strong>Erro:</strong> <code>${error.message}</code></p>
                                    </div>
                                `;
                            });
                    }, 1000);
                </script>
            </body>
            </html>
            """;
    }
}
