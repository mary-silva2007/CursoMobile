import 'package:biblioteca_app/controllers/livro_controller.dart';
import 'package:biblioteca_app/models/livro_model.dart';
import 'package:flutter/material.dart';

class LivroFormView extends StatefulWidget {
  //atributos da classe
  final LivroModel? livro; //pode ser nulo

  const LivroFormView({
    super.key,
    this.livro,
  }); //Livro não é obrigatório no construtor

  @override
  State<LivroFormView> createState() => _LivroFormViewState();
}

class _LivroFormViewState extends State<LivroFormView> {
  //atributos
  final _formKey = GlobalKey<FormState>(); // validações do formulário
  final _controller = LivroController(); //comunicação entre view e model
  final _tituloField = TextEditingController(); //controle o campo titulo
  final _autorField = TextEditingController(); //controla o campo autor
  bool _disponivel = true;

  @override
  void initState() {
    super.initState();
    if (widget.livro != null) {
      _tituloField.text = widget.livro!.titulo;
      _autorField.text = widget.livro!.autor;
      _disponivel = widget.livro!.disponivel;
    }
  }

  //criar novo usuario
  void _criar() async {
  if (_formKey.currentState!.validate()) {
    final livroNovo = LivroModel(
      id: DateTime.now().millisecond.toString(),
      titulo: _tituloField.text.trim(),
      autor: _autorField.text.trim(),
      disponivel: _disponivel,
    );
    try {
      await _controller.create(livroNovo);
    } catch (e) {}
    Navigator.pop(context, true); // <-- envia "true" como retorno
  }
}

void _atualizar() async {
  if (_formKey.currentState!.validate()) {
    final livroAtualizado = LivroModel(
      id: widget.livro!.id,
      titulo: _tituloField.text.trim(),
      autor: _autorField.text.trim(),
      disponivel: _disponivel,
    );
    try {
      await _controller.update(livroAtualizado);
    } catch (e) {}
    Navigator.pop(context, true); // <-- envia "true" como retorno
  }
}


  //build da Tela
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          //operador ternário
          widget.livro == null ? "Novo Livro" : "Editar Livro",
        ),
      ),
      body: Padding(
        padding: EdgeInsets.all(16),
        child: Form(
          child: Column(
            children: [
              TextFormField(
                controller: _tituloField,
                decoration: InputDecoration(labelText: "titulo"),
                validator: (value) => value!.isEmpty ? "Informe o titulo" : null,
              ),
              TextFormField(
                controller: _autorField,
                decoration: InputDecoration(labelText: "autor"),
                validator: (value) => value!.isEmpty ? "Informe o autor" : null,
              ),
              SizedBox(height: 10),
              SwitchListTile(
                title: Text(_disponivel ? "Disponível" : "Indisponível"),
                value: _disponivel,
                onChanged: (bool value) {
                  setState(() {
                    _disponivel = value;
                  });
                },
              ),

              SizedBox(height: 10),
              ElevatedButton(
                onPressed: widget.livro == null ? _criar : _atualizar,
                child: Text(widget.livro == null ? "Salvar" : "Atualizar"),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
