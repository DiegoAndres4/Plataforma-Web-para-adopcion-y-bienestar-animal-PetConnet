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
class ProfesorOcasional extends Profesor {
    private static final double VALOR_HORA = 40_000;
    private static final int HORAS_SEMANALES = 46;
    
    public ProfesorOcasional(String nombre, String documento, LocalDate fechaNacimiento, String especialidad) {
        super(nombre, documento, fechaNacimiento, especialidad);
    }
    
    @Override
    public double calcularSueldo() {
        return HORAS_SEMANALES * VALOR_HORA * 4; // 4 semanas por mes
    }
    
    @Override
    public void mostrarInformacion() {
        super.mostrarInformacion();
        System.out.println("Horas semanales: " + HORAS_SEMANALES + " (fijas)");
        System.out.println("Valor por hora: $" + String.format("%,.0f", VALOR_HORA));
        System.out.println("Salario mensual: $" + String.format("%,.0f", calcularSueldo()));
        System.out.println("==============================================\n");
    }
}
