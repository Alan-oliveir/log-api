package com.works.log.api.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Configuração para servir arquivos estáticos
        registry.addResourceHandler("/**")
                .addResourceLocations("classpath:/static/")
                .setCachePeriod(3600);
        
        // Configuração específica para o scalar.html
        registry.addResourceHandler("/scalar.html")
                .addResourceLocations("classpath:/static/scalar.html")
                .setCachePeriod(0); // Sem cache durante desenvolvimento
    }

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        // Remove os redirects problemáticos - vamos usar controller direto
        // registry.addRedirectViewController("/", "/docs");
    }
}