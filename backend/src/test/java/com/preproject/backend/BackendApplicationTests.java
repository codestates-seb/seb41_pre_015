package com.preproject.backend;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;


@SpringBootTest
@TestPropertySource(locations = "classpath:application-server.yml")
class BackendApplicationTests {

	@Test
	void contextLoads() {
	}

}
