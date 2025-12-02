/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.sistemagestionpersonal;

import java.time.LocalDate;

/**
 *
 * @author frieren
 */
abstract class Persona {
    protected String nombre;
    protected String documento;
    protected LocalDate fechaNacimiento;
    
    public Persona(String nombre, String documento, LocalDate fechaNacimiento) {
        this.nombre = nombre;
        this.documento = documento;
        this.fechaNacimiento = fechaNacimiento;
    }
    
    // Métodos abstractos que deben implementar las subclases
    public abstract double calcularSueldo();
    public abstract void mostrarInformacion();
    
    // Getters
    public String getNombre() { return nombre; }
    public String getDocumento() { return documento; }
    public LocalDate getFechaNacimiento() { return fechaNacimiento; }
}
