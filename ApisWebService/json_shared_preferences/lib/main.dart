import 'package:flutter/material.dart';

void main() {
  runApp(MaterialApp(
    home: ConfigPage(),
  ));
}

class ConfigPage extends StatefulWidget {

  @override
  State<StatefulWidget> createState() {
    return _ConfigPageState();
  }
  
}

class _ConfigPageState extends State<ConfigPage> {
  //atributos
  bool temaEscuro = false;

  // método que roda antes de carregar a página
  @override
  void initState() {
    super.initState();
    carregarPreferencias();
  }

  // método para carregar as preferências
  void carregarPreferencias() {
    // Aqui você pode carregar as preferências do usuário
    final prefs = await SharedPreference.getInstances();
  }

  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    throw UnimplementedError();
  }

}


