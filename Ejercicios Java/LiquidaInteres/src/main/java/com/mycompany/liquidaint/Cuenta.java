/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.liquidacionintereses;

/**
 *
 * @author David
 */
public class Cuenta {
    // Atributos privados (encapsulamiento)
    private long numeroCuenta;
    private String fechaApertura;
    private int tipoCuenta; // 1: AhorroDiario, 2: CuentaJoven, 3: Tradicional
    private double saldo;
    
    // Constantes para los porcentajes de interés
    private static final double INTERES_AHORRO_DIARIO = 1.5;
    private static final double INTERES_CUENTA_JOVEN = 1.7;
    private static final double INTERES_TRADICIONAL = 1.6;
    
    // Constructor vacío
    public Cuenta() {
    }
    
    // Constructor con parámetros
    public Cuenta(long numeroCuenta, String fechaApertura, int tipoCuenta, double saldo) {
        this.numeroCuenta = numeroCuenta;
        this.fechaApertura = fechaApertura;
        this.tipoCuenta = tipoCuenta;
        this.saldo = saldo;
    }
    
    // Métodos getter y setter
    public long getNumeroCuenta() {
        return numeroCuenta;
    }
    
    public void setNumeroCuenta(long numeroCuenta) {
        this.numeroCuenta = numeroCuenta;
    }
    
    public String getFechaApertura() {
        return fechaApertura;
    }
    
    public void setFechaApertura(String fechaApertura) {
        this.fechaApertura = fechaApertura;
    }
    
    public int getTipoCuenta() {
        return tipoCuenta;
    }
    
    public void setTipoCuenta(int tipoCuenta) {
        this.tipoCuenta = tipoCuenta;
    }
    
    public double getSaldo() {
        return saldo;
    }
    
    public void setSaldo(double saldo) {
        this.saldo = saldo;
    }
    
    // Método para obtener el porcentaje de interés según el tipo de cuenta
    public double getPorcentajeInteres() {
        switch (tipoCuenta) {
            case 1: // AhorroDiario
                return INTERES_AHORRO_DIARIO;
            case 2: // CuentaJoven
                return INTERES_CUENTA_JOVEN;
            case 3: // Tradicional
                return INTERES_TRADICIONAL;
            default:
                return 0.0;
        }
    }
    
    // Método para calcular el valor del interés mensual
    public double calcularInteresMensual() {
        return saldo * (getPorcentajeInteres() / 100);
    }
    
    // Método para calcular el nuevo saldo (saldo + interés)
    public double calcularNuevoSaldo() {
        return saldo + calcularInteresMensual();
    }
    
    // Método para obtener el nombre del tipo de cuenta
    public String getNombreTipoCuenta() {
        switch (tipoCuenta) {
            case 1:
                return "AhorroDiario";
            case 2:
                return "CuentaJoven";
            case 3:
                return "Tradicional";
            default:
                return "Desconocido";
        }
    }
    
    // Método toString para imprimir la información de la cuenta
    @Override
    public String toString() {
        return String.format("Cuenta #%d | Tipo: %s | Fecha: %s | Saldo: $%.2f", 
                           numeroCuenta, getNombreTipoCuenta(), fechaApertura, saldo);
    }
}
