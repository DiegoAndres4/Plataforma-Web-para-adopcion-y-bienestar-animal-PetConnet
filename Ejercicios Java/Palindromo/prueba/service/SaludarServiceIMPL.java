package com.example.prueba.service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class SaludarServiceIMPL implements SaludarService{

    @Override
    public ResponseEntity<String> Saludar() {
        return new ResponseEntity<String>( "Saludar", HttpStatus.OK);
    }
}
