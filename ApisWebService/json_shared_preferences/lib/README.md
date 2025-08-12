MOBILE  - 06.08 

JSON - arquivo de dados escrito em java script.
guarda textos...
-escrito por chave e valor (coleção de dados)
-chave: string 
-valor: número, texto, nulo, boileana
-transporta dados de uma maneira leve!
-fácil de trabalhar e converter
-ex: angular consegue ler json
-    dart (mobile) não le json
     python - tem q converter tbm

-conversão de Dados



-flutter pub add shared_preferences

(main.dart)

import 'package:flutter/material.dart';

void main() {
  runApp(Materi);
}


pacote de dados utilizado pra transmissão de dados = JSON
-conhecido como coleção, que armazenamos com chave e valor


instalar um pacote:
- roda: flutter pub add "nome do pacote"
- dps flutter pub get (verifica se esta faltando uma dependencia)





12/08/25

# json_shared_preferences

A new Flutter project.


Shared Prefrences (Armazenamento Interno do Aplicativo)

Aramzenamento   Chave -> Valor
                "config" -> "Texto" texto em formato Json

O que é um Texto em Formato Json -> 
[
    config:{
        "NomedoUsuario" : "nome do usuário",
        "IdadedoUsuaro" : 25,
        "TemaEscuro" : true,
    }
]

dart -> Linguagem de Programa do Flutter não lê JSON
     -> converter => ( json.decode => convert Text:Json em Map:Dart)
                  => ( json.encode => convert Map:Dart em Text:Json)




final => variavel (tem ou nao valor inicial) - é uma constante que me pemite trocar o valor dela uma única vez
