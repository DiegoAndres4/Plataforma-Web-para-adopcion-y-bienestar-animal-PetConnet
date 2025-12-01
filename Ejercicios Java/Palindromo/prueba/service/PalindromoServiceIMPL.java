package com.example.prueba.service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class PalindromoServiceIMPL implements PalindromoService{

    @Override
    public ResponseEntity<Boolean> esPalindromo(String pla) {
        StringBuffer sb = new StringBuffer();
        sb.append(pla.toLowerCase());
        return new ResponseEntity<Boolean>(sb.reverse().toString().equals(pla.toLowerCase()), HttpStatus.OK);
    }
}
