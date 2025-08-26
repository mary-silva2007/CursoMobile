import 'package:flutter/material.dart';

class EmprestimosFormView extends StatefulWidget {
  const EmprestimosFormView({Key? key}) : super(key: key);

  @override
  State<EmprestimosFormView> createState() => _EmprestimosFormViewState();
}

class _EmprestimosFormViewState extends State<EmprestimosFormView> {
  final _formKey = GlobalKey<FormState>();
  final _livroController = TextEditingController();
  final _usuarioController = TextEditingController();
  final _dataController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Cadastrar Empréstimo')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            children: [
              TextFormField(
                controller: _livroController,
                decoration: const InputDecoration(labelText: 'Livro'),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Informe o livro';
                  }
                  return null;
                },
              ),
              TextFormField(
                controller: _usuarioController,
                decoration: const InputDecoration(labelText: 'Usuário'),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Informe o usuário';
                  }
                  return null;
                },
              ),
              TextFormField(
                controller: _dataController,
                decoration: const InputDecoration(labelText: 'Data do Empréstimo'),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Informe a data';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 20),
              ElevatedButton(
                onPressed: () {
                  if (_formKey.currentState!.validate()) {
                    // Aqui você pode salvar os dados ou chamar uma API
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text('Empréstimo cadastrado!')),
                    );
                  }
                },
                child: const Text('Salvar'),
              ),
            ],
          ),
        ),
      ),
    );
  }

  @override
  void dispose() {
    _livroController.dispose();
    _usuarioController.dispose();
    _dataController.dispose();
  }
}