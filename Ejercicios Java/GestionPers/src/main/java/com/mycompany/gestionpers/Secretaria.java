/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.sistemagestionpersonal;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;

/**
 *
 * @author frieren
 */
class Secretaria extends Persona {
    private static final double SALARIO_MINIMO = 1_400_000;
    private String tipoPrestacion; // "Término indefinido", "Término fijo", etc.
    private ArrayList<Persona> listaPersonal;
    
    public Secretaria(String nombre, String documento, LocalDate fechaNacimiento, String tipoPrestacion) {
        super(nombre, documento, fechaNacimiento);
        this.tipoPrestacion = tipoPrestacion;
        this.listaPersonal = new ArrayList<>();
    }
    
    @Override
    public double calcularSueldo() {
        return SALARIO_MINIMO;
    }
    
    @Override
    public void mostrarInformacion() {
        System.out.println("\n========== INFORMACIÓN DE LA SECRETARIA ==========");
        System.out.println("Nombre: " + nombre);
        System.out.println("Documento: " + documento);
        System.out.println("Fecha de Nacimiento: " + fechaNacimiento.format(DateTimeFormatter.ofPattern("dd/MM/yyyy")));
        System.out.println("Responsabilidades:");
        System.out.println("  • Manejar los pagos de todos los funcionarios");
        System.out.println("  • Organizar listas");
        System.out.println("Tipo de prestación: " + tipoPrestacion);
        System.out.println("Salario mínimo: $" + String.format("%,.0f", calcularSueldo()));
        System.out.println("==================================================\n");
    }
    
    // Método especial para pagar a todos los funcionarios
    public void pagar(ArrayList<Persona> personal) {
        System.out.println("\n╔════════════════════════════════════════════════════╗");
        System.out.println("║       PROCESO DE PAGO DE FUNCIONARIOS              ║");
        System.out.println("║       Gestionado por: " + nombre + "                ║");
        System.out.println("╚════════════════════════════════════════════════════╝\n");
        
        double totalNomina = 0;
        int contador = 1;
        
        for (Persona p : personal) {
            double salario = p.calcularSueldo();
            totalNomina += salario;
            System.out.println(contador + ". " + p.getNombre() + " - $" + String.format("%,.0f", salario));
            contador++;
        }
        
        System.out.println("\n" + "=".repeat(50));
        System.out.println("TOTAL NÓMINA: $" + String.format("%,.0f", totalNomina));
        System.out.println("=".repeat(50) + "\n");
    }
}

