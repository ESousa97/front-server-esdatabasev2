import React, { useState, useEffect, useCallback } from 'react';
import { useFeedback } from './ImageUploader/useFeedback';
import { useRetryRequest } from '../hooks/useRetryRequest';
import api from '../services/api';

import DirectoryManager from './ImageUploader/DirectoryManager';
import FileUploader from './ImageUploader/FileUploader';
import UploadHistory from './ImageUploader/UploadHistory';
import Feedback from './ImageUploader/Feedback';
import ImageModal from './Shared/ImageModal';
import { STORAGE_KEYS } from '../constants/storageKeys';
import { getJsonStorageItem, setStorageItem } from '../utils/storage';

import './style.css';

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
  const [history, setHistory] = useState(
    () => getJsonStorageItem(STORAGE_KEYS.UPLOAD_HISTORY, [])
  );
  const [renamingItem, setRenamingItem] = useState(null);
  const [renameInputValue, setRenameInputValue] = useState('');
  const [dropError, setDropError] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [progressMap, setProgressMap] = useState({});

  const showFeedback = useFeedback();

  const handleApiError = useCallback((err, fallbackMessage = 'Erro inesperado.') => {
    console.error(fallbackMessage, err);
    if (err.response) {
      const status = err.response.status;
      if (status === 403) {
        showFeedback('Sem permissão para acessar os diretórios.', 'error');
      } else if (status === 404) showFeedback('Recurso não encontrado.', 'error');
      else if (status === 409) showFeedback('Conflito detectado.', 'error');
      else if (status >= 500) showFeedback('Erro no servidor.', 'error');
      else showFeedback(err.response.data?.message || fallbackMessage, 'error');
    } else if (err.request) {
      showFeedback('Falha de rede.', 'error');
    } else {
      showFeedback(fallbackMessage, 'error');
    }
  }, [showFeedback]);

  const {
    execute: fetchDirectories,
    error: directoryFetchError,
    retry: retryFetchDirectories,
    hasAttempted
  } = useRetryRequest(
    async () => {
      const res = await api.get('/directories');
      setExistingDirectories(res.data.directories || []);
    },
    null,
    (err) => handleApiError(err, 'Erro ao obter diretórios.')
  );

  const fetchDirectoryContent = useCallback(async (dir) => {
    if (!dir || dir === selectedDirectory) return;
    try {
      const res = await api.get(`/directory-content/${dir}`);
      setSelectedDirectory(dir);
      setDirectoryContent(res.data.content || []);
      setDirectory(dir);
    } catch (err) {
      handleApiError(err, 'Erro ao buscar conteúdo do diretório.');
    }
  }, [selectedDirectory, handleApiError]);

  useEffect(() => {
    if (!directoryFetchError && !hasAttempted) {
      fetchDirectories();
    }
  }, [fetchDirectories, directoryFetchError, hasAttempted]);

  const createDirectory = async () => {
    const trimmedName = newDirectoryName.trim();
    if (!trimmedName) return showFeedback('Digite um nome válido.', 'error');

    const targetPath = selectedDirectory
      ? `${selectedDirectory}/${trimmedName}`
      : `assets/${trimmedName}`;

    if (existingDirectories.includes(targetPath)) {
      return showFeedback(`O diretório "${targetPath}" já existe.`, 'error');
    }

    try {
      await api.post('/create-directory', { name: targetPath });
      showFeedback(`Diretório "${targetPath}" criado com sucesso.`, 'success');
      setNewDirectoryName('');
      setExistingDirectories((prev) => [...prev, targetPath]);
      if (selectedDirectory) fetchDirectoryContent(selectedDirectory);
    } catch (err) {
      handleApiError(err, 'Erro ao criar diretório.');
    }
  };

  const exitDirectoryNavigation = () => {
    setSelectedDirectory(null);
    setDirectoryContent([]);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const pngFiles = files.filter((file) => file.type === 'image/png');
    setImageFiles(pngFiles.map((file) => ({ file, newName: file.name })));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const pngFiles = files.filter((file) => file.type === 'image/png');
    if (pngFiles.length !== files.length) {
      setDropError('Somente arquivos .png são permitidos.');
      setTimeout(() => setDropError(''), 4000);
    } else {
      setDropError('');
    }
    setImageFiles(pngFiles.map((file) => ({ file, newName: file.name })));
  };

  const handleUpload = async () => {
    if (imageFiles.length === 0) {
      return showFeedback('Selecione ao menos uma imagem.', 'error');
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
            const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setProgressMap((prev) => ({ ...prev, [newName]: percent }));
          },
        });
        setUploadResponses((prev) => [...prev, res.data]);
        newHistory.unshift({ name: newName, url: res.data.imageUrl, timestamp: new Date().toISOString() });
      } catch (err) {
        if (err.response?.status === 409) {
          const confirmOverwrite = window.confirm(`"${newName}" já existe. Deseja sobrescrever?`);
          if (confirmOverwrite) {
            formData.set('overwrite', true);
            try {
              const res = await api.post('/imageupload', formData);
              setUploadResponses((prev) => [...prev, res.data]);
              newHistory.unshift({ name: newName, url: res.data.imageUrl, timestamp: new Date().toISOString() });
            } catch (errOverwrite) {
              handleApiError(errOverwrite, `Erro ao sobrescrever "${newName}".`);
            }
          }
        } else {
          handleApiError(err, `Erro ao enviar "${newName}".`);
        }
      }
    }

    setStorageItem(STORAGE_KEYS.UPLOAD_HISTORY, JSON.stringify(newHistory.slice(0, 20)));
    setHistory(newHistory.slice(0, 20));

    fetchDirectories();
    if (selectedDirectory === uploadDir) {
      fetchDirectoryContent(uploadDir);
    }

    setUploading(false);
    setImageFiles([]);
    setProgressMap({});
  };

  const handleRename = (oldPath) => {
    const parts = oldPath.split('/');
    const fullName = parts.pop();
    const currentDir = parts.join('/');
    const extension = fullName.includes('.') ? '.' + fullName.split('.').pop() : '';
    const baseName = fullName.replace(extension, '');
    setRenameInputValue(baseName);
    setRenamingItem({ oldPath, extension, currentDir });
  };

  const confirmRename = async () => {
    if (!renamingItem) return;
    const { oldPath, extension, currentDir } = renamingItem;
    const newName = renameInputValue.trim();
    if (!newName) return;
    const newPath = currentDir ? `${currentDir}/${newName}${extension}` : `${newName}${extension}`;
    try {
      await api.put('/rename-content', { oldPath, newPath });
      showFeedback(`"${oldPath}" renomeado para "${newName}${extension}".`, 'success');
      setRenamingItem(null);
      setRenameInputValue('');
      fetchDirectories();
      if (selectedDirectory) fetchDirectoryContent(selectedDirectory);
    } catch (err) {
      handleApiError(err, 'Erro ao renomear item.');
    }
  };

  const cancelRename = () => {
    setRenamingItem(null);
    setRenameInputValue('');
  };

  const handleDelete = async (path, type) => {
    if (!window.confirm(`Deseja deletar "${path}"?`)) return;
    try {
      await api.delete('/delete-content', { data: { path, type } });
      showFeedback(`"${path}" deletado.`, 'success');
      fetchDirectories();
      if (selectedDirectory) fetchDirectoryContent(selectedDirectory);
    } catch (err) {
      handleApiError(err, 'Erro ao deletar item.');
    }
  };

  const handleImageClick = (item) => {
    setSelectedImage(item);
  };

  return (
    <div className="image-uploader">

      {directoryFetchError && (
        <div className="directory-error-message">
          <p>Erro ao carregar os diretórios.</p>
          <button onClick={retryFetchDirectories} className="image-uploader__button">
            Tentar novamente
          </button>
        </div>
      )}

      <Feedback />

      <DirectoryManager
        selectedDirectory={selectedDirectory}
        setSelectedDirectory={setSelectedDirectory}
        newDirectoryName={newDirectoryName}
        setNewDirectoryName={setNewDirectoryName}
        createDirectory={createDirectory}
        existingDirectories={existingDirectories}
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
        fetchDirectoryContent={fetchDirectoryContent}
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
        progressMap={progressMap}
        setProgressMap={setProgressMap}
      />

      <UploadHistory history={history} uploadResponses={uploadResponses} />

      {selectedImage && (
        <ImageModal image={selectedImage} onClose={() => setSelectedImage(null)} />
      )}
    </div>
  );
}

export default ImageUploader;