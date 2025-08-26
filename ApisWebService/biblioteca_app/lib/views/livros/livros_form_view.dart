import 'package:flutter/material.dart';

class LivrosListView extends StatelessWidget {
  const LivrosListView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    // Exemplo de lista estática de livros
    final livros = [
      'Livro 1',
      'Livro 2',
      'Livro 3',
    ];

    return ListView.builder(
      itemCount: livros.length,
      itemBuilder: (context, index) {
        return ListTile(
          title: Text(livros[index]),
        );
      },
    );
  }
}