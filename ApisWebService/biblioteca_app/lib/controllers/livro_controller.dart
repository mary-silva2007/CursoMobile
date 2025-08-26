import '../models/livro_model.dart';
import '../services/api_service.dart';

class LivroController {

  //GET - All
  Future<List<LivroModel>> fetchAll() async {
    final list = await ApiService.getList("livros?_sort=titulo");
    return list.map<LivroModel>((item) => LivroModel.fromJson(item)).toList();
  }

  //GET - One
  Future<LivroModel> fetchOne(String id) async {
    final livro = await ApiService.getOne("livros", id);
    return LivroModel.fromJson(livro);
  }

  //POST
  Future<LivroModel> create(LivroModel l) async {
    final created = await ApiService.post("livros", l.toJson());
    return LivroModel.fromJson(created);
  }

  //PUT
  Future<LivroModel> update(LivroModel l) async {
    final updated = await ApiService.put("livros", l.toJson(), l.id!);
    return LivroModel.fromJson(updated);
  }

  //DELETE
  Future<void> delete(String id) async {
    await ApiService.delete("livros", id);
  }
}