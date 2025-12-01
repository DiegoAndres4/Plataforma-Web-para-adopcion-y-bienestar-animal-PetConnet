package bancoherencia;

import java.util.Scanner;

public class BancoApp3 {

    public static void main(String[] args) {
        Scanner entrada = new Scanner(System.in);

        System.out.print("Ingrese cuantas cuentas desea registrar: ");
        int n = entrada.nextInt();

        Cliente[] cuentas = new Cliente[n];

        for (int i = 0; i < n; i++) {
            System.out.println("\n--- Registro Cuenta #" + (i + 1) + " ---");

            System.out.print("Documento: ");
            long doc = entrada.nextLong();
            entrada.nextLine(); 

            System.out.print("Nombre: ");
            String nombre = entrada.nextLine();

            System.out.print("Correo: ");
            String correo = entrada.nextLine();

            System.out.print("Celular: ");
            int cel = entrada.nextInt();
            entrada.nextLine();

            System.out.print("Direccion: ");
            String dir = entrada.nextLine();

            System.out.print("Tipo de cuenta (1:Ahorro 2:Corriente): ");
            int tipo = entrada.nextInt();

            System.out.print("Numero de cuenta: ");
            long numCuenta = entrada.nextLong();

            System.out.print("Fecha de apertura (aaaa/mm/dd): ");
            String fecha = entrada.next();

            System.out.print("Saldo: ");
            double saldo = entrada.nextDouble();

            if (tipo == 1) {
                System.out.print("Tipo ahorro (1 Diario, 2 Joven, 3 Tradicional): ");
                int tipoA = entrada.nextInt();

                cuentas[i] = new Cuenta(doc, nombre, correo, cel, dir, numCuenta, fecha, tipoA, saldo);

            } else {
                System.out.print("Porcentaje interes mensual (ej. 0.012): ");
                double p = entrada.nextDouble();

                System.out.print("Sobregiro permitido: ");
                double s = entrada.nextDouble();

                cuentas[i] = new CuentaCorriente(doc, nombre, correo, cel, dir, numCuenta, fecha, saldo, p, s);
            }
        }

        System.out.println("\n===== RESULTADOS DE INTERESES =====");

        for (Cliente c : cuentas) {

            double interes;
            long cuentaNum ;
            double saldo ;

            if (c instanceof Cuenta) {
                Cuenta x = (Cuenta) c;
                interes = x.calcularInteres();
                cuentaNum = x.getNumeroCuenta();
                saldo = x.getSaldo() + interes;
            } else {
                CuentaCorriente x = (CuentaCorriente) c;
                interes = x.calcularInteres();
                cuentaNum = x.getNumeroCuenta();
                saldo = x.getSaldo() + interes;
            }

            System.out.println("\nCuenta: " + cuentaNum);
            System.out.println("Interes generado: " + interes);
            System.out.println("Saldo final: " + saldo);
        }

        entrada.close();
    }
}
