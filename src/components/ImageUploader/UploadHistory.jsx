// src/components/ImageUploader/UploadHistory.jsx
import React from 'react';

function UploadHistory({ history, uploadResponses }) {
  return (
    <>
      {uploadResponses.length > 0 && (
        <div className="upload-response">
          <h4>Uploads concluídos:</h4>
          <ul>
            {uploadResponses.map((res, idx) => (
              <li key={idx}>
                <a
                  href={res.imageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
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
          <ul>
            {history.map((h, idx) => (
              <li key={idx}>
                <a
                  href={h.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {h.name}
                </a>
                {' — '}
                {new Date(h.timestamp).toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default UploadHistory;
