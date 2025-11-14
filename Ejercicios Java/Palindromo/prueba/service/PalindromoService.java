package com.example.prueba.service;

import org.springframework.http.ResponseEntity;

public interface PalindromoService {
    ResponseEntity<Boolean> esPalindromo(String pla);
}
