package bancoherencia;

public class Cuenta extends Cliente {

    private long numeroCuenta;
    private String fechaApertura;
    private int tipoCuenta;
    private double saldo;

    public Cuenta(long documento, String nombre, String correo, int celular, String direccion,
                  long numeroCuenta, String fechaApertura, int tipoCuenta, double saldo) {

        super(documento, nombre, correo, celular, direccion);

        this.numeroCuenta = numeroCuenta;
        this.fechaApertura = fechaApertura;
        this.tipoCuenta = tipoCuenta;
        this.saldo = saldo;
    }

    public double calcularInteres() {
        if (tipoCuenta == 1) return saldo * 0.015;
        else if (tipoCuenta == 2) return saldo * 0.017;
        else if (tipoCuenta == 3) return saldo * 0.016;
        else return 0;
    }

    public double getSaldo() { return saldo; }
    public long getNumeroCuenta() { return numeroCuenta; }
}
