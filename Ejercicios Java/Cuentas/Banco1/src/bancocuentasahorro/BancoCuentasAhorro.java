package BancoCuentasAhorro;
import java.util.Scanner;

public class BancoCuentasAhorro {
    public static void main(String[] args) {
        
        // Constantes de interés mensual por tipo de cuenta
        final double TASA_AHORRO_DIARIO = 1.5;
        final double TASA_CUENTA_JOVEN = 1.7;
        final double TASA_TRADICIONAL = 1.6;

        Scanner entrada = new Scanner(System.in);

        int numCuentas;
        long numeroCuenta;
        String fechaApertura;
        int tipoCuenta;
        double saldo;
        double interesMensual ;
        double  nuevoSaldo;

        double totalIntereses = 0;
        double totalSaldos = 0;

        System.out.print("Ingrese la cantidad de cuentas: ");
        numCuentas = entrada.nextInt();

        System.out.println("\n==== PROCESO DE CUENTAS ====\n");

        for (int i = 1; i <= numCuentas; i++) {

            System.out.println("Cuenta #" + i + ":");

            // Lectura de datos
            System.out.print("Ingrese el numero de cuenta (long): ");
            numeroCuenta = entrada.nextLong();

            System.out.print("Ingrese la fecha de apertura (aaaa/mm/dd): ");
            fechaApertura = entrada.next();

            System.out.print("Ingrese el tipo de cuenta (1=AhorroDiario, 2=CuentaJoven, 3=Tradicional): ");
            tipoCuenta = entrada.nextInt();

            System.out.print("Ingrese el saldo de la cuenta: ");
            saldo = entrada.nextDouble();

            // Determinar tasa segun tipo
            if (tipoCuenta == 1) {
                interesMensual = (saldo * TASA_AHORRO_DIARIO) / 100;
            } else if (tipoCuenta == 2) {
                interesMensual = (saldo * TASA_CUENTA_JOVEN) / 100;
            } else if (tipoCuenta == 3) {
                interesMensual = (saldo * TASA_TRADICIONAL) / 100;
            } else {
                System.out.println("Tipo de cuenta invalido... se toma tasa 0.");
                interesMensual = 0;
            }

            nuevoSaldo = saldo + interesMensual;

            // Acumular totales
            totalIntereses += interesMensual;
            totalSaldos += nuevoSaldo;

            // Imprimir resultados
            System.out.println("Numero de cuenta: " + numeroCuenta);
            System.out.println("Interes mensual: $" + interesMensual);
            System.out.println("Saldo con interes: $" + nuevoSaldo);
            System.out.println("-------------------------------------\n");
        }

        System.out.println("==== RESULTADOS TOTALES ====");
        System.out.println("Total intereses: $" + totalIntereses);
        System.out.println("Total saldos nuevos: $" + totalSaldos);

    }
}
