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
class ProfesorPlanta extends Profesor {
    private static final double SUELDO_FIJO = 2_600_000;
    
    public ProfesorPlanta(String nombre, String documento, LocalDate fechaNacimiento, String especialidad) {
        super(nombre, documento, fechaNacimiento, especialidad);
    }
    
    @Override
    public double calcularSueldo() {
        return SUELDO_FIJO;
    }
    
    @Override
    public void mostrarInformacion() {
        super.mostrarInformacion();
        System.out.println("Salario fijo mensual: $" + String.format("%,.0f", calcularSueldo()));
        System.out.println("==============================================\n");
    }
}
