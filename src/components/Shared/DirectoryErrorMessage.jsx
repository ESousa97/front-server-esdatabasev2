import React from 'react';
import PropTypes from 'prop-types';
import './DirectoryErrorMessage.css';

function DirectoryErrorMessage({ onRetry }) {
  return (
    <div className="directory-error-container">
      <span className="directory-error-message">
        Erro ao carregar os diretórios. Verifique sua conexão ou permissões.
      </span>
      <button className="retry-button" onClick={onRetry}>
        Tentar novamente
      </button>
    </div>
  );
}

DirectoryErrorMessage.propTypes = {
  onRetry: PropTypes.func.isRequired,
};

export default DirectoryErrorMessage;
