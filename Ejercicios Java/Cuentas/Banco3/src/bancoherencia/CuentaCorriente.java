package bancoherencia;

public class CuentaCorriente extends Cliente {

    private long numeroCuenta;
    private String fechaApertura;
    private double saldo;
    private double porcentajeInteres;
    private double sobregiro;

    public CuentaCorriente(long documento, String nombre, String correo, int celular, String direccion,
                           long numeroCuenta, String fechaApertura, double saldo,
                           double porcentajeInteres, double sobregiro) {

        super(documento, nombre, correo, celular, direccion);

        this.numeroCuenta = numeroCuenta;
        this.fechaApertura = fechaApertura;
        this.saldo = saldo;
        this.porcentajeInteres = porcentajeInteres;
        this.sobregiro = sobregiro;
    }

    // Sin @Override porque Cliente no lo tiene
    public double calcularInteres() {
        return saldo * porcentajeInteres;
    }

    public double getSaldo() { return saldo; }
    public long getNumeroCuenta() { return numeroCuenta; }
}
