class EmprestimoModel {
  String? id;
  String? usuarioId;
  String? livroId;
  String? dataEmprestimo;
  String? dataDevolucao;

  EmprestimoModel({
    this.id,
    this.usuarioId,
    this.livroId,
    this.dataEmprestimo,
    this.dataDevolucao,
  });

  factory EmprestimoModel.fromJson(Map<String, dynamic> json) {
    return EmprestimoModel(
      id: json['id'],
      usuarioId: json['usuarioId'],
      livroId: json['livroId'],
      dataEmprestimo: json['dataEmprestimo'],
      dataDevolucao: json['dataDevolucao'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'usuarioId': usuarioId,
      'livroId': livroId,
      'dataEmprestimo': dataEmprestimo,
      'dataDevolucao': dataDevolucao,
    };
  }
}