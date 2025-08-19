import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:json_web_service_clima/models/clima_model.dart';

class ClimaController {
  final String _apiKey = "46704b7a0b960c7e2300243992201315";

  // método para pegar a informação do CLima de uma cidade

  Future<ClimaModel?> buscarClima(String cidade) async{
    final url = Uri.parse(
      "https://api.openweathermap.org/data/2.5/weather?q=$cidade&appid=$_apiKey&unit=metric&lang=pt_br"
    );
    final response = await http.get(url);
    if(response.statusCode ==200){
      final dados = json.decode(response.body);
      return ClimaModel.fromJson(dados);
    }else{
      return null;
    }

  }
}

