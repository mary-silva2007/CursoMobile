package Model;

public class Aluno extends Pessoa{
    //Atributos 
    private String matricula; 
    private double nota;
    //Métodos 
    //construtor 
    public Aluno(String nome, String cpf, String matricula) {
        super(nome, cpf);
        this.matricula = matricula;
    }
    //getters and setters 
    public String getMatricula() {
        return matricula;
    }
    public void setMatricula(String matricula) {
        this.matricula = matricula;
    }
    public double getNota() {
        return nota;
    }
    public void setNota(double nota) {
        this.nota = nota;
    }
    //sobreescrita exibri informações 
    @Override
    public void exibirInformacoes(){
        super.exibirInformacoes();{
            System.out.println("Matricula: "+matricula);
            System.out.println("Nota: "+nota); 
        }
    }
}
