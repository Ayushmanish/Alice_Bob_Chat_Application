package com.chat.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/health-check")
public class HealthCheck {

	@GetMapping
	public Map<String, String> healthCheck() {
		HashMap<String, String> map = new HashMap<>();
		map.put("status", "up");
		map.put("database", "connected");
		map.put("service", "Alice-Bob Chat Backend");
		return map;
	}
}
