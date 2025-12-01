/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 */

package com.mycompany.sistemagestionpersonal;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Scanner;

/**
 *
 * @author frieren
 */
public class SistemaGestionPersonal {
    private static ArrayList<Persona> personal = new ArrayList<>();
    private static Scanner scanner = new Scanner(System.in);
    
    public static void main(String[] args) {
        // Agregar algunos empleados de ejemplo
        inicializarDatosEjemplo();
        
        // Menú interactivo
        mostrarMenu();
    }
    
    private static void inicializarDatosEjemplo() {
        // Profesores
        personal.add(new ProfesorPlanta("Carlos Méndez", "123456", 
            LocalDate.of(1980, 5, 15), "Matemáticas"));
        personal.add(new ProfesorCatedra("Ana López", "234567", 
            LocalDate.of(1985, 8, 20), "Física", 14));
        personal.add(new ProfesorOcasional("Luis Ramírez", "345678", 
            LocalDate.of(1990, 3, 10), "Química"));
        
        // Coordinador
        personal.add(new Coordinador("María García", "456789", 
            LocalDate.of(1982, 11, 25), 160, 50_000));
        
        // Director
        personal.add(new Director("Jorge Pérez", "567890", 
            LocalDate.of(1975, 7, 5), 4_500_000, 20, 60_000));
        
        // Secretaria
        personal.add(new Secretaria("Laura Rodríguez", "678901", 
            LocalDate.of(1988, 2, 14), "Término indefinido"));
    }
    
    private static void mostrarMenu() {
        int opcion;
        do {
            System.out.println("\n╔════════════════════════════════════════════════════╗");
            System.out.println("║   SISTEMA DE GESTIÓN DEL PERSONAL ACADÉMICO        ║");
            System.out.println("║              Colegio 'X'                           ║");
            System.out.println("╚════════════════════════════════════════════════════╝");
            System.out.println("\n1. Registrar nuevo personal");
            System.out.println("2. Mostrar todo el personal registrado");
            System.out.println("3. Buscar y mostrar información de un empleado");
            System.out.println("4. Calcular salario de un empleado");
            System.out.println("5. Procesar nómina completa (Secretaria)");
            System.out.println("6. Mostrar estadísticas");
            System.out.println("0. Salir");
            System.out.print("\nSeleccione una opción: ");
            
            opcion = leerEntero();
            
            switch (opcion) {
                case 1:
                    registrarPersonal();
                    break;
                case 2:
                    mostrarTodoPersonal();
                    break;
                case 3:
                    buscarEmpleado();
                    break;
                case 4:
                    calcularSalarioEmpleado();
                    break;
                case 5:
                    procesarNomina();
                    break;
                case 6:
                    mostrarEstadisticas();
                    break;
                case 0:
                    System.out.println("\n¡Gracias por usar el sistema! Hasta pronto.");
                    break;
                default:
                    System.out.println("\n⚠ Opción inválida. Intente nuevamente.");
            }
        } while (opcion != 0);
    }
    
    private static void registrarPersonal() {
        System.out.println("\n--- REGISTRAR NUEVO PERSONAL ---");
        System.out.println("1. Profesor de Planta");
        System.out.println("2. Profesor de Cátedra");
        System.out.println("3. Profesor Ocasional");
        System.out.println("4. Coordinador");
        System.out.println("5. Director");
        System.out.println("6. Secretaria");
        System.out.print("\nSeleccione el tipo de personal: ");
        
        int tipo = leerEntero();
        
        System.out.print("Nombre: ");
        scanner.nextLine(); // Limpiar buffer
        String nombre = scanner.nextLine();
        
        System.out.print("Documento: ");
        String documento = scanner.nextLine();
        
        System.out.print("Fecha de nacimiento (dd/MM/yyyy): ");
        String fechaStr = scanner.nextLine();
        LocalDate fecha = LocalDate.parse(fechaStr, DateTimeFormatter.ofPattern("dd/MM/yyyy"));
        
        try {
            switch (tipo) {
                case 1:
                    System.out.print("Especialidad: ");
                    String esp1 = scanner.nextLine();
                    personal.add(new ProfesorPlanta(nombre, documento, fecha, esp1));
                    System.out.println("\n✓ Profesor de Planta registrado exitosamente.");
                    break;
                    
                case 2:
                    System.out.print("Especialidad: ");
                    String esp2 = scanner.nextLine();
                    System.out.print("Horas semanales (10-16): ");
                    int horas = leerEntero();
                    personal.add(new ProfesorCatedra(nombre, documento, fecha, esp2, horas));
                    System.out.println("\n✓ Profesor de Cátedra registrado exitosamente.");
                    break;
                    
                case 3:
                    System.out.print("Especialidad: ");
                    String esp3 = scanner.nextLine();
                    personal.add(new ProfesorOcasional(nombre, documento, fecha, esp3));
                    System.out.println("\n✓ Profesor Ocasional registrado exitosamente.");
                    break;
                    
                case 4:
                    System.out.print("Horas trabajadas: ");
                    int horasCoord = leerEntero();
                    System.out.print("Valor por hora: ");
                    double valorHora = leerDouble();
                    personal.add(new Coordinador(nombre, documento, fecha, horasCoord, valorHora));
                    System.out.println("\n✓ Coordinador registrado exitosamente.");
                    break;
                    
                case 5:
                    System.out.print("Sueldo base: ");
                    double sueldoBase = leerDouble();
                    System.out.print("Horas extras: ");
                    int horasExtras = leerEntero();
                    System.out.print("Valor hora extra: ");
                    double valorHoraExtra = leerDouble();
                    personal.add(new Director(nombre, documento, fecha, sueldoBase, horasExtras, valorHoraExtra));
                    System.out.println("\n✓ Director registrado exitosamente.");
                    break;
                    
                case 6:
                    System.out.print("Tipo de prestación: ");
                    String tipoPrestacion = scanner.nextLine();
                    personal.add(new Secretaria(nombre, documento, fecha, tipoPrestacion));
                    System.out.println("\n✓ Secretaria registrada exitosamente.");
                    break;
                    
                default:
                    System.out.println("\n⚠ Tipo de personal inválido.");
            }
        } catch (IllegalArgumentException e) {
            System.out.println("\n⚠ Error: " + e.getMessage());
        }
    }
    
    private static void mostrarTodoPersonal() {
        if (personal.isEmpty()) {
            System.out.println("\n⚠ No hay personal registrado.");
            return;
        }
        
        System.out.println("\nLISTADO COMPLETO DEL PERSONAL ");
        for (Persona p : personal) {
            p.mostrarInformacion();
        }
    }
    
    private static void buscarEmpleado() {
        if (personal.isEmpty()) {
            System.out.println("\n⚠ No hay personal registrado.");
            return;
        }
        
        System.out.print("\nIngrese el nombre del empleado: ");
        scanner.nextLine(); // Limpiar buffer
        String nombre = scanner.nextLine();
        
        boolean encontrado = false;
        for (Persona p : personal) {
            if (p.getNombre().equalsIgnoreCase(nombre)) {
                p.mostrarInformacion();
                encontrado = true;
            }
        }
        
        if (!encontrado) {
            System.out.println("\n⚠ No se encontró ningún empleado con ese nombre.");
        }
    }
    
    private static void calcularSalarioEmpleado() {
        if (personal.isEmpty()) {
            System.out.println("\n⚠ No hay personal registrado.");
            return;
        }
        
        System.out.print("\nIngrese el documento del empleado: ");
        scanner.nextLine(); // Limpiar buffer
        String documento = scanner.nextLine();
        
        boolean encontrado = false;
        for (Persona p : personal) {
            if (p.getDocumento().equals(documento)) {
                System.out.println("\n--- CÁLCULO DE SALARIO ---");
                System.out.println("Empleado: " + p.getNombre());
                System.out.println("Salario: $" + String.format("%,.0f", p.calcularSueldo()));
                encontrado = true;
                break;
            }
        }
        
        if (!encontrado) {
            System.out.println("\n⚠ No se encontró ningún empleado con ese documento.");
        }
    }
    
    private static void procesarNomina() {
        if (personal.isEmpty()) {
            System.out.println("\n⚠ No hay personal registrado.");
            return;
        }
        
        // Buscar una secretaria para procesar la nómina
        Secretaria secretaria = null;
        for (Persona p : personal) {
            if (p instanceof Secretaria) {
                secretaria = (Secretaria) p;
                break;
            }
        }
        
        if (secretaria == null) {
            System.out.println("\n⚠ No hay ninguna secretaria registrada para procesar la nómina.");
            System.out.println("Se procederá con el cálculo sin secretaria asignada.\n");
            
            // Procesar sin secretaria
            System.out.println("PROCESO DE PAGO DE FUNCIONARIOS");
            
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
        } else {
            secretaria.pagar(personal);
        }
    }
    
    private static void mostrarEstadisticas() {
        if (personal.isEmpty()) {
            System.out.println("\n⚠ No hay personal registrado.");
            return;
        }
        
        int profPlanta = 0, profCatedra = 0, profOcasional = 0;
        int coordinadores = 0, directores = 0, secretarias = 0;
        double totalSalarios = 0;
        double salarioMayor = 0, salarioMenor = Double.MAX_VALUE;
        String nombreMayor = "", nombreMenor = "";
        
        for (Persona p : personal) {
            double salario = p.calcularSueldo();
            totalSalarios += salario;
            
            if (salario > salarioMayor) {
                salarioMayor = salario;
                nombreMayor = p.getNombre();
            }
            if (salario < salarioMenor) {
                salarioMenor = salario;
                nombreMenor = p.getNombre();
            }
            
            if (p instanceof ProfesorPlanta) profPlanta++;
            else if (p instanceof ProfesorCatedra) profCatedra++;
            else if (p instanceof ProfesorOcasional) profOcasional++;
            else if (p instanceof Coordinador) coordinadores++;
            else if (p instanceof Director) directores++;
            else if (p instanceof Secretaria) secretarias++;
        }
        
        System.out.println("\n╔════════════════════════════════════════════════════╗");
        System.out.println("║            ESTADÍSTICAS DEL PERSONAL               ║");
        System.out.println("╚════════════════════════════════════════════════════╝");
        System.out.println("\nTOTAL DE EMPLEADOS: " + personal.size());
        System.out.println("\n--- Distribución por cargo ---");
        System.out.println("Profesores de Planta: " + profPlanta);
        System.out.println("Profesores de Cátedra: " + profCatedra);
        System.out.println("Profesores Ocasionales: " + profOcasional);
        System.out.println("Coordinadores: " + coordinadores);
        System.out.println("Directores: " + directores);
        System.out.println("Secretarias: " + secretarias);
        System.out.println("\n--- Información salarial ---");
        System.out.println("Total nómina mensual: $" + String.format("%,.0f", totalSalarios));
        System.out.println("Salario promedio: $" + String.format("%,.0f", totalSalarios / personal.size()));
        System.out.println("Salario más alto: $" + String.format("%,.0f", salarioMayor) + " (" + nombreMayor + ")");
        System.out.println("Salario más bajo: $" + String.format("%,.0f", salarioMenor) + " (" + nombreMenor + ")");
        System.out.println("\n" + "=".repeat(50) + "\n");
    }
    
    private static int leerEntero() {
        while (!scanner.hasNextInt()) {
            System.out.print("Por favor ingrese un número válido: ");
            scanner.next();
        }
        return scanner.nextInt();
    }
    
    private static double leerDouble() {
        while (!scanner.hasNextDouble()) {
            System.out.print("Por favor ingrese un número válido: ");
            scanner.next();
        }
        return scanner.nextDouble();
    }
}
