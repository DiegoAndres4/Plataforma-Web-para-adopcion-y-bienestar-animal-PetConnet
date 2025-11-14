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
class Coordinador extends Persona {
    private int horasTrabajadas;
    private double valorHora;
    
    public Coordinador(String nombre, String documento, LocalDate fechaNacimiento, 
                      int horasTrabajadas, double valorHora) {
        super(nombre, documento, fechaNacimiento);
        this.horasTrabajadas = horasTrabajadas;
        this.valorHora = valorHora;
    }
    
    @Override
    public double calcularSueldo() {
        return horasTrabajadas * valorHora;
    }
    
    @Override
    public void mostrarInformacion() {
        System.out.println("\n========== INFORMACIÓN DEL COORDINADOR ==========");
        System.out.println("Nombre: " + nombre);
        System.out.println("Documento: " + documento);
        System.out.println("Fecha de Nacimiento: " + fechaNacimiento.format(DateTimeFormatter.ofPattern("dd/MM/yyyy")));
        System.out.println("Responsabilidades:");
        System.out.println("  • Supervisar a los profesores");
        System.out.println("  • Asignar materias");
        System.out.println("  • Realizar cambios de calendario");
        System.out.println("  • Firmar actas");
        System.out.println("Horas trabajadas: " + horasTrabajadas);
        System.out.println("Valor por hora: $" + String.format("%,.0f", valorHora));
        System.out.println("Salario total: $" + String.format("%,.0f", calcularSueldo()));
        System.out.println("=================================================\n");
    }
}
