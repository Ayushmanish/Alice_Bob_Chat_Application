package com.chat;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import java.io.File;

@SpringBootApplication
public class ChatApplication {

	static {
		loadEnv();
	}

	public static void loadEnv() {
		String[] possiblePaths = { "./", "./backend/chat_application", "../", "../backend/chat_application" };
		for (String path : possiblePaths) {
			File envFile = new File(path, ".env");
			if (envFile.exists()) {
				Dotenv.configure()
						.directory(path)
						.ignoreIfMissing()
						.systemProperties()
						.load();
				break;
			}
		}
	}

	@SuppressWarnings("null")
	public static void main(String[] args) {
		loadEnv();
		SpringApplication.run(ChatApplication.class, args);
	}

}
