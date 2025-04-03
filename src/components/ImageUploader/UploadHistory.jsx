import React from 'react';
import { LinkIcon } from './icons'; // Importa do seu sistema centralizado

function UploadHistory({ history, uploadResponses }) {
  return (
    <>
      {uploadResponses.length > 0 && (
        <div className="upload-response">
          <h4>Uploads concluídos:</h4>
          <ul className="upload-history-list">
            {uploadResponses.map((res, idx) => (
              <li key={idx}>
                <a
                  href={res.imageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="upload-history-link"
                >
                  <LinkIcon size={16} style={{ marginRight: '0.4rem' }} />
                  {res.imageUrl}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {history.length > 0 && (
        <div className="upload-response">
          <h4>Histórico recente de uploads:</h4>
          <ul className="upload-history-list">
            {history.map((h, idx) => (
              <li key={idx}>
                <a
                  href={h.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="upload-history-link"
                >
                  <LinkIcon size={16} style={{ marginRight: '0.4rem' }} />
                  {h.name}
                </a>
                <span className="upload-history-date">
                  {new Date(h.timestamp).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default UploadHistory;
