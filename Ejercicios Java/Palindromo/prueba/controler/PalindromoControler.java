package com.example.prueba.controler;

import com.example.prueba.service.PalindromoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/ejer")
public class PalindromoControler {
    @Autowired
    private PalindromoService palindromoService;

    @GetMapping("/asd/{palabra}")
    public ResponseEntity<String> asd(@PathVariable String palabra){
        return this.palindromoService.esPalindromo(palabra).getBody() ? new ResponseEntity<String>("Es palindromo",
                HttpStatus.OK): new ResponseEntity<>("No es palindromo", HttpStatus.OK);
    }
}
