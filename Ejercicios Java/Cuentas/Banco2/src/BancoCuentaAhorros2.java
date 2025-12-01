import java.util.Scanner;

public class BancoCuentaAhorros2 {
    public static void main(String[] args) {

        Scanner entrada = new Scanner(System.in);

        System.out.print("Ingrese la cantidad de cuentas: ");
        int numCuentas = entrada.nextInt();

        // Array para guardar objetos Cuenta
        Cuenta[] cuentas = new Cuenta[numCuentas];

        double totalIntereses = 0;
        double totalSaldos = 0;

        // Registro de cuentas
        for (int i = 0; i < numCuentas; i++) {
            System.out.println("\n--- Registro cuenta #" + (i + 1) + " ---");

            System.out.print("Número de cuenta: ");
            long numeroCuenta = entrada.nextLong();

            System.out.print("Fecha de apertura (aaaa/mm/dd): ");
            String fecha = entrada.next();

            System.out.print("Tipo de cuenta (1: AhorroDiario, 2: CuentaJoven, 3: Tradicional): ");
            int tipo = entrada.nextInt();

            System.out.print("Saldo: ");
            double saldo = entrada.nextDouble();

            // Crear objeto y almacenarlo en el arreglo
            cuentas[i] = new Cuenta(numeroCuenta, fecha, tipo, saldo);
        }

        // Cálculos e impresión
        System.out.println("\n===== RESULTADOS =====");
        for (int i = 0; i < numCuentas; i++) {
            double interes = cuentas[i].calcularInteres();
            double nuevoSaldo = cuentas[i].getSaldo() + interes;

            totalIntereses += interes;
            totalSaldos += nuevoSaldo;

            System.out.println("\nCuenta #" + (i + 1));
            System.out.println("Número de cuenta: " + cuentas[i].getNumeroCuenta());
            System.out.println("Interés mensual: " + interes);
            System.out.println("Saldo con interés: " + nuevoSaldo);
        }

        System.out.println("\nTOTAL intereses generados: " + totalIntereses);
        System.out.println("TOTAL saldos actualizados: " + totalSaldos);

        entrada.close();
    }
}
