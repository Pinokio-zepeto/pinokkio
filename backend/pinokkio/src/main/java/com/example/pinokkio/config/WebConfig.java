package com.example.pinokkio.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOriginPatterns("https://localhost:3000")
                .allowedOriginPatterns("https://pinokio-openvidu.duckdns.org")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "CONNECT")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
    }
}
