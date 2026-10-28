package com.chat.config;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.EnvironmentPostProcessor;
import org.springframework.boot.SpringApplication;
import org.springframework.core.Ordered;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.MapPropertySource;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

/**
 * Automatically loads properties from .env file into Spring Environment
 * and System properties with highest precedence on startup and in tests.
 */
public class EnvEnvironmentPostProcessor implements EnvironmentPostProcessor, Ordered {

    @SuppressWarnings("null")
	@Override
    public void postProcessEnvironment(@SuppressWarnings("null") ConfigurableEnvironment environment, SpringApplication application) {
        String[] possiblePaths = { "./", "./backend/chat_application", "../", "../backend/chat_application" };
        for (String path : possiblePaths) {
            File envFile = new File(path, ".env");
            if (envFile.exists()) {
                Dotenv dotenv = Dotenv.configure()
                        .directory(path)
                        .ignoreIfMissing()
                        .load();

                Map<String, Object> envMap = new HashMap<>();
                dotenv.entries().forEach(entry -> {
                    envMap.put(entry.getKey(), entry.getValue());
                    if (System.getProperty(entry.getKey()) == null) {
                        System.setProperty(entry.getKey(), entry.getValue());
                    }
                });

                environment.getPropertySources().addFirst(new MapPropertySource("dotenvProperties", envMap));
                break;
            }
        }
    }

    @Override
    public int getOrder() {
        return Ordered.HIGHEST_PRECEDENCE;
    }
}
