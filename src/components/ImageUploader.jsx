// src/components/ImageUploader.jsx
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import './ImageUploader.css';

function ImageUploader() {
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadResponse, setUploadResponse] = useState(null);
  const [directory, setDirectory] = useState('');
  const [existingDirectories, setExistingDirectories] = useState([]);

  // Função para buscar os diretórios existentes via API
  const fetchDirectories = async () => {
    try {
      // Note que aqui usamos '/directories' e não '/api/v1/directories'
      const res = await api.get('/directories');
      setExistingDirectories(res.data.directories || []);
    } catch (err) {
      console.error('Erro ao obter diretórios:', err);
    }
  };

  // Busca os diretórios ao montar o componente e atualiza a cada 30 segundos
  useEffect(() => {
    fetchDirectories();
    const interval = setInterval(fetchDirectories, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!imageFile) {
      alert('Selecione uma imagem para upload.');
      return;
    }

    const uploadDir = directory || 'default_directory';
    let overwrite = false;

    if (existingDirectories.includes(uploadDir)) {
      if (!window.confirm(`O diretório "${uploadDir}" já existe. Deseja sobrescrever os arquivos existentes?`)) {
        return;
      }
      overwrite = true;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('directory', uploadDir);
    formData.append('overwrite', overwrite);

    try {
      // Ajuste a URL aqui também: use '/imageupload' se a baseURL já incluir '/api/v1'
      const res = await api.post('/imageupload', formData);
      setUploadResponse(res.data);
      alert('Imagem enviada com sucesso!');
      // Atualiza a lista após upload
      fetchDirectories();
    } catch (err) {
      console.error('Erro ao enviar imagem:', err);
      alert('Erro ao enviar imagem.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="image-uploader">
      <h3 className="image-uploader__title">Upload de Imagem</h3>

      <div className="image-uploader__group">
        <label className="image-uploader__label">Selecione uma imagem:</label>
        <input
          className="image-uploader__input"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>

      <div className="image-uploader__group">
        <label className="image-uploader__label">Diretório (opcional):</label>
        <input
          className="image-uploader__input"
          type="text"
          value={directory}
          placeholder="Ex: assets/projects/project0001"
          onChange={(e) => setDirectory(e.target.value)}
        />
      </div>

      <button
        className="image-uploader__button"
        onClick={handleUpload}
        disabled={uploading}
      >
        {uploading ? 'Enviando...' : 'Enviar Imagem'}
      </button>

      {uploadResponse && (
        <div className="upload-response">
          <p><strong>URL da Imagem:</strong> {uploadResponse.imageUrl}</p>
        </div>
      )}

      {/* Exibe os diretórios existentes */}
      <div className="existing-directories">
        <h4>Diretórios existentes:</h4>
        <ul>
          {existingDirectories.map((dir, idx) => (
            <li key={idx}>{dir}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ImageUploader;
