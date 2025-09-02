import 'package:biblioteca_app/controllers/usuario_controller.dart';
import 'package:biblioteca_app/models/usuario_model.dart';
import 'package:biblioteca_app/views/usuarios/usuario_form_view.dart';
import 'package:flutter/material.dart';

class UsuarioListView extends StatefulWidget {
  const UsuarioListView({super.key});

  @override
  State<UsuarioListView> createState() => _UsuarioListViewState();
}

class _UsuarioListViewState extends State<UsuarioListView> {
  final _buscarField = TextEditingController();
  List<UsuarioModel> _usuariosFiltrados = [];
  final _controller = UsuarioController();
  List<UsuarioModel> _usuarios = [];
  bool _carregando = true;

  @override
  void initState() {
    super.initState();
    _load();
  }

  _load() async {
    setState(() {
      _carregando = true;
    });
    try {
      _usuarios = await _controller.fetchAll();
      _usuariosFiltrados = _usuarios;
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(e.toString())),
      );
    }
    setState(() {
      _carregando = false;
    });
  }

  void _filtrar() {
    final busca = _buscarField.text.toLowerCase();
    setState(() {
      _usuariosFiltrados = _usuarios.where((user) {
        return user.nome.toLowerCase().contains(busca) ||
            user.email.toLowerCase().contains(busca);
      }).toList();
    });
  }

  void _delete(UsuarioModel user) async {
    if (user.id == null) return;
    final confirme = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: Text("Confirma Exclusão"),
        content: Text("Deseja Realmente Excluir o Usuário ${user.nome}"),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context, false),
            child: Text("Cancelar"),
          ),
          TextButton(
            onPressed: () => Navigator.pop(context, true),
            child: Text("Ok"),
          ),
        ],
      ),
    );
    if (confirme == true) {
      try {
        await _controller.delete(user.id!);
        _load();
      } catch (e) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text("Erro ao excluir usuário")),
        );
      }
    }
  }

  void _openForm({UsuarioModel? user}) async {
    final resultado = await Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => UsuarioFormView(user: user)),
    );
    if (resultado == true) {
      _load();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _carregando
          ? Center(child: CircularProgressIndicator())
          : Column(
              children: [
                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: TextField(
                    controller: _buscarField,
                    decoration: InputDecoration(labelText: "Pesquisar Usuário"),
                    onChanged: (value) => _filtrar(),
                  ),
                ),
                Divider(),
                Expanded(
                  child: ListView.builder(
                    padding: EdgeInsets.all(8),
                    itemCount: _usuariosFiltrados.length,
                    itemBuilder: (context, index) {
                      final usuario = _usuariosFiltrados[index];
                      return Card(
                        child: ListTile(
                          leading: IconButton(
                            onPressed: () => _openForm(user: usuario),
                            icon: Icon(Icons.edit),
                          ),
                          title: Text(usuario.nome),
                          subtitle: Text(usuario.email),
                          trailing: IconButton(
                            onPressed: () => _delete(usuario),
                            icon: Icon(Icons.delete, color: Colors.red),
                          ),
                        ),
                      );
                    },
                  ),
                ),
              ],
            ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => _openForm(),
        child: Icon(Icons.add),
      ),
    );
  }
}