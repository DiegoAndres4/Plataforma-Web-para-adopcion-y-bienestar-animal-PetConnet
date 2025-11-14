package com.example.prueba.controler;

import com.example.prueba.service.SaludarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/prueba")
public class SaludarControler {
    @Autowired
    private SaludarService saludarService;
    @GetMapping("/pla")
    public ResponseEntity<String> pla() {
        return this.saludarService.Saludar();

    }
}
