package bancoherencia;

public class Cliente {
    
    private final long documento;
    private final String nombre;
    private final String correo;
    private final int celular;
    private final String direccion;

    public Cliente(long documento, String nombre, String correo, int celular, String direccion) {
        this.documento = documento;
        this.nombre = nombre;
        this.correo = correo;
        this.celular = celular;
        this.direccion = direccion;
    }

    public long getDocumento() { return documento; }
    public String getNombre() { return nombre; }
    public String getCorreo() { return correo; }
    public int getCelular() { return celular; }
    public String getDireccion() { return direccion; }
}
