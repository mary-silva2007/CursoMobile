import 'dart:io';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:intl/intl.dart';
import 'package:sa_geolocator_maps/controllers/point.controller.dart';
import 'controllers/point_controller.dart';
import 'package:geolocator/geolocator.dart';

void main() {
  runApp(const GeoPhotoApp());
}

class GeoPhotoApp extends StatelessWidget {
  const GeoPhotoApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'GeoPhoto App',
      theme: ThemeData.dark(useMaterial3: true),
      home: const PhotoHomePage(),
      debugShowCheckedModeBanner: false,
    );
  }
}

class PhotoHomePage extends StatefulWidget {
  const PhotoHomePage({super.key});

  @override
  State<PhotoHomePage> createState() => _PhotoHomePageState();
}

class _PhotoHomePageState extends State<PhotoHomePage> {
  final List<Map<String, dynamic>> _photos = [];
  final ImagePicker _picker = ImagePicker();
  final PointController _controller = PointController();

  Future<void> _addPhoto() async {
    final XFile? image = await _picker.pickImage(source: ImageSource.camera);
    if (image == null) return;

    final position = await _controller.getCurrentPosition();
    final city = await _controller.getCityFromPosition(position);
    final dateTime = DateFormat('dd/MM/yyyy - HH:mm').format(DateTime.now());

    setState(() {
      _photos.add({
        'file': File(image.path),
        'latitude': position.latitude,
        'longitude': position.longitude,
        'city': city,
        'dateTime': dateTime,
      });
    });
  }

  void _showDetails(Map<String, dynamic> photo) {
    showDialog(
      context: context,
      builder: (_) => AlertDialog(
        title: const Text('Detalhes da Foto'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('📅 Data/Hora: ${photo['dateTime']}'),
            Text('📍 Latitude: ${photo['latitude']}'),
            Text('📍 Longitude: ${photo['longitude']}'),
            Text('🏙️ Cidade: ${photo['city']}'),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Fechar'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Minhas Fotos com Localização'),
        centerTitle: true,
      ),
      body: _photos.isEmpty
          ? const Center(child: Text('Nenhuma foto adicionada ainda.'))
          : GridView.builder(
              padding: const EdgeInsets.all(12),
              gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 2,
                crossAxisSpacing: 8,
                mainAxisSpacing: 8,
              ),
              itemCount: _photos.length,
              itemBuilder: (_, index) {
                final photo = _photos[index];
                return GestureDetector(
                  onTap: () => _showDetails(photo),
                  child: ClipRRect(
                    borderRadius: BorderRadius.circular(12),
                    child: Image.file(
                      photo['file'],
                      fit: BoxFit.cover,
                    ),
                  ),
                );
              },
            ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: _addPhoto,
        label: const Text('Adicionar Foto'),
        icon: const Icon(Icons.add_a_photo),
      ),
    );
  }
}
