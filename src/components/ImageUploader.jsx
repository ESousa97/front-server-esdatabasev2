// src/components/ImageUploader/ImageUploader.jsx
import React, { useState, useEffect, useCallback } from 'react';
import api from '../services/api';

// Import dos componentes
import DirectoryManager from './ImageUploader/DirectoryManager';
import FileUploader from './ImageUploader/FileUploader';
import UploadHistory from './ImageUploader/UploadHistory';
import Feedback from './ImageUploader/Feedback';
import ImageModal from './ImageUploader/ImageModal';

import './ImageUploader.css';

function ImageUploader() {
  const [imageFiles, setImageFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadResponses, setUploadResponses] = useState([]);
  const [directory, setDirectory] = useState('');
  const [newDirectoryName, setNewDirectoryName] = useState('');
  const [existingDirectories, setExistingDirectories] = useState([]);
  const [selectedDirectory, setSelectedDirectory] = useState(null);
  const [directoryContent, setDirectoryContent] = useState([]);
  const [filter, setFilter] = useState('');
  const [history, setHistory] = useState(() => JSON.parse(localStorage.getItem('uploadHistory')) || []);
  const [renamingItem, setRenamingItem] = useState(null);
  const [renameInputValue, setRenameInputValue] = useState('');
  const [message, setMessage] = useState(null);
  const [dropError, setDropError] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  // Exibe mensagem de sucesso/erro
  const showMessage = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 4000);
  };

  // Lida com erros de API
  const handleApiError = useCallback((err, fallbackMessage = 'Erro inesperado.') => {
    console.error(fallbackMessage, err);
    if (err.response) {
      const status = err.response.status;
      if (status === 404) showMessage('Recurso não encontrado.', 'error');
      else if (status === 409) showMessage('Conflito detectado.', 'error');
      else if (status >= 500) showMessage('Erro no servidor.', 'error');
      else showMessage(err.response.data?.message || fallbackMessage, 'error');
    } else if (err.request) {
      showMessage('Falha de rede.', 'error');
    } else {
      showMessage(fallbackMessage, 'error');
    }
  }, []);

  // Busca a lista de diretórios existentes
  const fetchDirectories = useCallback(async () => {
    try {
      const res = await api.get('/directories');
      setExistingDirectories(res.data.directories || []);
    } catch (err) {
      handleApiError(err, 'Erro ao obter diretórios.');
    }
  }, [handleApiError]);

  // Busca o conteúdo de um diretório selecionado (raiz da árvore)
  const fetchDirectoryContent = async (dir) => {
    try {
      const res = await api.get(`/directory-content/${dir}`);
      setSelectedDirectory(dir);
      setDirectoryContent(res.data.content || []);
      setDirectory(dir);
    } catch (err) {
      handleApiError(err, 'Erro ao buscar conteúdo do diretório.');
    }
  };

  useEffect(() => {
    fetchDirectories();
    const interval = setInterval(fetchDirectories, 30000);
    return () => clearInterval(interval);
  }, [fetchDirectories]);

  // Cria um novo diretório
  const createDirectory = async () => {
    if (!newDirectoryName.trim()) {
      return showMessage('Digite um nome.', 'error');
    }
    const targetPath = selectedDirectory
      ? `${selectedDirectory}/${newDirectoryName}`
      : `assets/${newDirectoryName}`;

    if (existingDirectories.includes(targetPath)) {
      return showMessage(`O diretório "${targetPath}" já existe.`, 'error');
    }

    try {
      await api.post('/create-directory', { name: targetPath });
      showMessage(`Diretório "${targetPath}" criado.`, 'success');
      setNewDirectoryName('');
      fetchDirectories();
      if (selectedDirectory) {
        fetchDirectoryContent(selectedDirectory);
      }
    } catch (err) {
      handleApiError(err, 'Erro ao criar diretório.');
    }
  };

  // Função para sair da navegação de diretório
  const exitDirectoryNavigation = () => {
    setSelectedDirectory(null);
    setDirectoryContent([]);
  };

  // Handler para input de arquivos
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const pngFiles = files.filter(file => file.type === 'image/png');
    setImageFiles(pngFiles.map(file => ({ file, newName: file.name })));
  };

  // Handler para soltar arquivos na área de drop
  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const pngFiles = files.filter(file => file.type === 'image/png');
    if (pngFiles.length !== files.length) {
      setDropError('Somente arquivos .png são permitidos.');
      setTimeout(() => setDropError(''), 4000);
    } else {
      setDropError('');
    }
    setImageFiles(pngFiles.map(file => ({ file, newName: file.name })));
  };

  // Realiza o upload dos arquivos
  const handleUpload = async () => {
    if (imageFiles.length === 0) {
      return showMessage('Selecione ao menos uma imagem.', 'error');
    }

    const uploadDir = directory || selectedDirectory || 'default_directory';

    if (!existingDirectories.includes(uploadDir)) {
      const confirmCreate = window.confirm(`O diretório "${uploadDir}" não existe. Criar?`);
      if (!confirmCreate) return;
    }

    setUploading(true);
    setUploadResponses([]);
    const newHistory = [...history];

    for (const { file, newName } of imageFiles) {
      const formData = new FormData();
      const renamedFile = new File([file], newName, { type: file.type });
      formData.append('image', renamedFile);
      formData.append('directory', uploadDir);
      formData.append('overwrite', false);

      try {
        const res = await api.post('/imageupload', formData, {
          onUploadProgress: (progressEvent) => {
            // Se necessário, você pode atualizar um estado com o progresso.
            // Exemplo: const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          },
        });
        setUploadResponses(prev => [...prev, res.data]);
        newHistory.unshift({
          name: newName,
          url: res.data.imageUrl,
          timestamp: new Date().toISOString(),
        });
      } catch (err) {
        if (err.response?.status === 409) {
          const confirmOverwrite = window.confirm(`"${newName}" já existe. Deseja sobrescrever?`);
          if (confirmOverwrite) {
            formData.set('overwrite', true);
            try {
              const res = await api.post('/imageupload', formData);
              setUploadResponses(prev => [...prev, res.data]);
              newHistory.unshift({
                name: newName,
                url: res.data.imageUrl,
                timestamp: new Date().toISOString(),
              });
            } catch (errOverwrite) {
              handleApiError(errOverwrite, `Erro ao sobrescrever "${newName}".`);
            }
          }
        } else {
          handleApiError(err, `Erro ao enviar "${newName}".`);
        }
      }
    }

    localStorage.setItem('uploadHistory', JSON.stringify(newHistory.slice(0, 20)));
    setHistory(newHistory.slice(0, 20));

    fetchDirectories();
    if (selectedDirectory === uploadDir) {
      fetchDirectoryContent(uploadDir);
    }

    setUploading(false);
    setImageFiles([]);
  };

  // Inicia o processo de renomear
  const handleRename = (oldPath) => {
    const parts = oldPath.split('/');
    const fullName = parts.pop();
    const currentDir = parts.join('/');
    const extension = fullName.includes('.') ? '.' + fullName.split('.').pop() : '';
    const baseName = fullName.replace(extension, '');

    setRenameInputValue(baseName);
    setRenamingItem({ oldPath, extension, currentDir });
  };

  // Confirma renomeação
  const confirmRename = async () => {
    if (!renamingItem) return;
    const { oldPath, extension, currentDir } = renamingItem;
    const newName = renameInputValue.trim();
    if (!newName) return;

    const newPath = currentDir
      ? `${currentDir}/${newName}${extension}`
      : `${newName}${extension}`;

    try {
      await api.put('/rename-content', { oldPath, newPath });
      showMessage(`"${oldPath}" renomeado para "${newName}${extension}".`, 'success');
      setRenamingItem(null);
      setRenameInputValue('');
      fetchDirectories();
      if (selectedDirectory) {
        fetchDirectoryContent(selectedDirectory);
      }
    } catch (err) {
      handleApiError(err, 'Erro ao renomear item.');
    }
  };

  // Cancela renomeação
  const cancelRename = () => {
    setRenamingItem(null);
    setRenameInputValue('');
  };

  // Deleta arquivo ou diretório
  const handleDelete = async (path, type) => {
    if (!window.confirm(`Deseja deletar "${path}"?`)) return;
    try {
      await api.delete('/delete-content', { data: { path, type } });
      showMessage(`"${path}" deletado.`, 'success');
      fetchDirectories();
      if (selectedDirectory) {
        fetchDirectoryContent(selectedDirectory);
      }
    } catch (err) {
      handleApiError(err, 'Erro ao deletar item.');
    }
  };

  // Handler para quando uma imagem é clicada na árvore
  const handleImageClick = (item) => {
    setSelectedImage(item);
  };

  return (
    <div className="image-uploader">
      <h3 className="image-uploader__title">Upload de Imagens</h3>

      {message && <Feedback message={message} />}

      {/* O DirectoryManager agora renderiza a lista de diretórios existentes e, abaixo dela, o conteúdo do diretório selecionado */}
      <DirectoryManager
        selectedDirectory={selectedDirectory}
        newDirectoryName={newDirectoryName}
        setNewDirectoryName={setNewDirectoryName}
        createDirectory={createDirectory}
        existingDirectories={existingDirectories}
        fetchDirectoryContent={fetchDirectoryContent}
        //
        directoryContent={directoryContent}
        filter={filter}
        setFilter={setFilter}
        handleRename={handleRename}
        handleDelete={handleDelete}
        renamingItem={renamingItem}
        renameInputValue={renameInputValue}
        setRenameInputValue={setRenameInputValue}
        confirmRename={confirmRename}
        cancelRename={cancelRename}
        exitDirectoryNavigation={exitDirectoryNavigation}
        onImageClick={handleImageClick}
      />

      <FileUploader
        imageFiles={imageFiles}
        setImageFiles={setImageFiles}
        handleDrop={handleDrop}
        handleFileChange={handleFileChange}
        handleUpload={handleUpload}
        uploading={uploading}
        directory={directory}
        setDirectory={setDirectory}
        selectedDirectory={selectedDirectory}
        dropError={dropError}
      />

      <UploadHistory
        history={history}
        uploadResponses={uploadResponses}
      />

      {selectedImage && (
        <ImageModal image={selectedImage} onClose={() => setSelectedImage(null)} />
      )}
    </div>
  );
}

export default ImageUploader;
