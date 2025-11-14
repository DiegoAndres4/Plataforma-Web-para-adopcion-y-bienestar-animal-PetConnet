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
class ProfesorCatedra extends Profesor {
    private static final double VALOR_HORA = 40_000;
    private static final int HORAS_MINIMAS = 10;
    private static final int HORAS_MAXIMAS = 16;
    private int horasSemanales;
    
    public ProfesorCatedra(String nombre, String documento, LocalDate fechaNacimiento, 
                           String especialidad, int horasSemanales) {
        super(nombre, documento, fechaNacimiento, especialidad);
        if (horasSemanales < HORAS_MINIMAS || horasSemanales > HORAS_MAXIMAS) {
            throw new IllegalArgumentException("Las horas deben estar entre " + HORAS_MINIMAS + " y " + HORAS_MAXIMAS);
        }
        this.horasSemanales = horasSemanales;
    }
    
    @Override
    public double calcularSueldo() {
        return horasSemanales * VALOR_HORA * 4; // 4 semanas por mes
    }
    
    @Override
    public void mostrarInformacion() {
        super.mostrarInformacion();
        System.out.println("Horas semanales: " + horasSemanales);
        System.out.println("Valor por hora: $" + String.format("%,.0f", VALOR_HORA));
        System.out.println("Salario mensual: $" + String.format("%,.0f", calcularSueldo()));
        System.out.println("==============================================\n");
    }
}
