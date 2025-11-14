/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 */

package com.mycompany.liquidacionintereses;

import java.util.Scanner;

/**
 *
 * @author David
 */
public class LiquidacionIntereses {
    
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // Solicitar el número de cuentas
        System.out.print("Ingrese el numero de cuentas a procesar: ");
        int n = scanner.nextInt();
        scanner.nextLine(); // Limpiar el buffer
        
        // Crear el arreglo de cuentas
        Cuenta[] cuentas = new Cuenta[n];
        
        // Leer la información de cada cuenta
        System.out.println("\n===== INGRESO DE DATOS =====\n");
        for (int i = 0; i < n; i++) {
            System.out.println("--- Cuenta " + (i + 1) + " ---");
            cuentas[i] = leerCuenta(scanner);
            System.out.println();
        }
        
        // Procesar y mostrar resultados
        mostrarResultados(cuentas);
        
        scanner.close();
    }
    
    /**
     * Método para leer los datos de una cuenta
     * @param scanner objeto Scanner para entrada de datos
     * @return objeto Cuenta con los datos ingresados
     */
    public static Cuenta leerCuenta(Scanner scanner) {
        Cuenta cuenta = new Cuenta();
        
        System.out.print("Numero de cuenta (long): ");
        cuenta.setNumeroCuenta(scanner.nextLong());
        scanner.nextLine(); // Limpiar buffer
        
        System.out.print("Fecha de apertura (aaaa/mm/dd): ");
        cuenta.setFechaApertura(scanner.nextLine());
        
        System.out.print("Tipo de cuenta (1: AhorroDiario, 2: CuentaJoven, 3: Tradicional): ");
        cuenta.setTipoCuenta(scanner.nextInt());
        
        System.out.print("Saldo de la cuenta: $");
        cuenta.setSaldo(scanner.nextDouble());
        scanner.nextLine(); // Limpiar buffer
        
        return cuenta;
    }
    
    /**
     * Metodo para calcular y mostrar los resultados
     * @param cuentas arreglo de cuentas a procesar
     */
    public static void mostrarResultados(Cuenta[] cuentas) {
        System.out.println("RESULTADOS DE LIQUIDACION");
        
        // Variables para acumuladores
        double totalIntereses = 0;
        double totalSaldosAnteriores = 0;
        double totalSaldosNuevos = 0;
        
        // Imprimir encabezado de la tabla
        System.out.println(String.format("%-12s | %-15s | %-12s | %-15s | %-15s | %-15s",
            "No. Cuenta", "Tipo Cuenta", "Interes %", "Saldo Anterior", "Valor Interes", "Saldo Nuevo"));
        System.out.println("-".repeat(110));
        
        // Procesar cada cuenta
        for (Cuenta cuenta : cuentas) {
            long numeroCuenta = cuenta.getNumeroCuenta();
            String tipoCuenta = cuenta.getNombreTipoCuenta();
            double porcentaje = cuenta.getPorcentajeInteres();
            double saldo = cuenta.getSaldo();
            double interes = cuenta.calcularInteresMensual();
            double nuevoSaldo = cuenta.calcularNuevoSaldo();
            
            // Imprimir fila de la cuenta
            System.out.println(String.format("%-12d | %-15s | %11.1f%% | $%14.2f | $%14.2f | $%14.2f",
                numeroCuenta, tipoCuenta, porcentaje, saldo, interes, nuevoSaldo));
            
            // Acumular totales
            totalSaldosAnteriores += saldo;
            totalIntereses += interes;
            totalSaldosNuevos += nuevoSaldo;
        }
        
        // Imprimir totales
        System.out.println("-".repeat(110));
        System.out.println(String.format("%-12s | %-15s | %-12s | $%14.2f | $%14.2f | $%14.2f",
            "TOTALES", "", "", totalSaldosAnteriores, totalIntereses, totalSaldosNuevos));
        
        // Resumen adicional
        System.out.println("RESUMEN GENERAL");
        System.out.println("Total de cuentas procesadas: " + cuentas.length);
        System.out.println(String.format("Suma de saldos anteriores:   $%,.2f", totalSaldosAnteriores));
        System.out.println(String.format("Total de intereses generados: $%,.2f", totalIntereses));
        System.out.println(String.format("Suma de nuevos saldos:        $%,.2f", totalSaldosNuevos));
    }
}
