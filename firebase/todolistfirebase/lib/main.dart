import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:todolistfirebase/firebase_options.dart';
import 'package:todolistfirebase/views/auth_widget.dart';


//
void main() async { // vai concectar com o firebase
//garatir o carregamento primeiro das bindings
    WidgetsFlutterBinding.ensureInitialized();
    //inicializar o firebase
    await Firebase.initializeApp(
        options: DefaultFirebaseOptions.currentPlatform // garante a conexão somente com android
    );
    runApp(MaterialApp(
        title: "Lista de Tarefas Firebase",
        home: AuthWidget(), //widget que decide qual tela mostrar 
    ));
}

