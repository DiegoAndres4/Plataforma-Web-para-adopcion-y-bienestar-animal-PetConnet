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
class Director extends Persona {
    private double sueldoBase;
    private int horasExtras;
    private double valorHoraExtra;
    
    public Director(String nombre, String documento, LocalDate fechaNacimiento, 
                   double sueldoBase, int horasExtras, double valorHoraExtra) {
        super(nombre, documento, fechaNacimiento);
        this.sueldoBase = sueldoBase;
        this.horasExtras = horasExtras;
        this.valorHoraExtra = valorHoraExtra;
    }
    
    @Override
    public double calcularSueldo() {
        return sueldoBase + (horasExtras * valorHoraExtra);
    }
    
    @Override
    public void mostrarInformacion() {
        System.out.println("\n========== INFORMACIÓN DEL DIRECTOR ==========");
        System.out.println("Nombre: " + nombre);
        System.out.println("Documento: " + documento);
        System.out.println("Fecha de Nacimiento: " + fechaNacimiento.format(DateTimeFormatter.ofPattern("dd/MM/yyyy")));
        System.out.println("Responsabilidades:");
        System.out.println("  • Crear eventos institucionales");
        System.out.println("  • Manejar el presupuesto");
        System.out.println("Sueldo base: $" + String.format("%,.0f", sueldoBase));
        System.out.println("Horas extras: " + horasExtras);
        System.out.println("Valor hora extra: $" + String.format("%,.0f", valorHoraExtra));
        System.out.println("Pago horas extras: $" + String.format("%,.0f", horasExtras * valorHoraExtra));
        System.out.println("Salario total: $" + String.format("%,.0f", calcularSueldo()));
        System.out.println("==============================================\n");
    }
}