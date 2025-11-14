/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.sistemagestionpersonal;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

/**
 *
 * @author frieren
 */
abstract class Profesor extends Persona {
    protected String especialidad;
    
    public Profesor(String nombre, String documento, LocalDate fechaNacimiento, String especialidad) {
        super(nombre, documento, fechaNacimiento);
        this.especialidad = especialidad;
    }
    
    @Override
    public void mostrarInformacion() {
        System.out.println("\n========== INFORMACIÓN DEL PROFESOR ==========");
        System.out.println("Nombre: " + nombre);
        System.out.println("Documento: " + documento);
        System.out.println("Fecha de Nacimiento: " + fechaNacimiento.format(DateTimeFormatter.ofPattern("dd/MM/yyyy")));
        System.out.println("Especialidad: " + especialidad);
        System.out.println("Tipo: " + this.getClass().getSimpleName());
        System.out.println("Responsabilidades:");
        System.out.println("  • Dictar clases");
        System.out.println("  • Subir notas");
        System.out.println("  • Calificar");
        System.out.println("  • Tomar lista");
    }
}
