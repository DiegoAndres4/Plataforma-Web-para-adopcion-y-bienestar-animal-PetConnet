public class Cuenta {

    // Atributos privados (encapsulamiento)
    private long numeroCuenta;
    private String fechaApertura;
    private int tipoCuenta;
    private double saldo;

    // Constructor
    public Cuenta(long numeroCuenta, String fechaApertura, int tipoCuenta, double saldo) {
        this.numeroCuenta = numeroCuenta;
        this.fechaApertura = fechaApertura;
        this.tipoCuenta = tipoCuenta;
        this.saldo = saldo;
    }

    // Métodos Get y Set
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

    // Método para calcular interés
    public double calcularInteres() {
        double interes = 0;

        if (tipoCuenta == 1) { 
            interes = saldo * 0.015;        // 1.5%
        } else if (tipoCuenta == 2) { 
            interes = saldo * 0.017;        // 1.7%
        } else if (tipoCuenta == 3) { 
            interes = saldo * 0.016;        // 1.6%
        } else {
            interes = 0;
        }

        return interes;
    }
}
