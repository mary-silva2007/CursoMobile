package Model;

public class Professor extends Pessoa {
    //Atributos
    private double salario;

    //Métodos
    //Construtor
    public Professor(String nome, String cpf, double salario) {
        super(nome, cpf);
        this.salario = salario;
    }

    //Getters and Setters
    
    public double getSalario() {
        return salario;
    }

    public void setSalario(double salario) {
        this.salario = salario;
    }

    //Testando aqui
    @Override
    public void exibirInformacoes(){
        super.exibirInformacoes();
        System.out.println("Salário: R$"+salario);
    }
}
