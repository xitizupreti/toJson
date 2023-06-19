import React, { useState } from 'react';

const CSVtoJSONConverter = () => {
  const [jsonData, setJsonData] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const text = e.target.result;
      const jsonData = csvToJSON(text);
      setJsonData(jsonData);
    };

    reader.readAsText(file);
  };

  const csvToJSON = (csvText) => {
    const lines = csvText.split('\n');
    const headers = lines[0].split(',');

    const jsonData = [];
    for (let i = 1; i < lines.length; i++) {
      const currentLine = lines[i].split(',');
      if (currentLine.length !== headers.length) continue;

      const entry = {};
      for (let j = 0; j < headers.length; j++) {
        entry[headers[j]] = currentLine[j];
      }
      jsonData.push(entry);
    }

    return jsonData;
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      {jsonData && (
        <pre>{JSON.stringify(jsonData, null, 2)}</pre>
      )}
    </div>
  );
};

export default CSVtoJSONConverter;
