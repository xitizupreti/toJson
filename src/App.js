import React, { useState } from "react";

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
    const lines = csvText.split("\n");
    const headers = lines[0].split(",");
    // console.log(lines);
    // console.log(headers.length);
    const jsonData = [];
    for (let i = 1; i < lines.length; i++) {
      const currentLine = lines[i].split(",");
      // console.log(currentLine);
      // console.log(currentLine.length);
      if (currentLine.length !== headers.length) continue;

      const entry = {};
      for (let j = 0; j < headers.length; j++) {
        // console.log(headers[j].replace("/STATION_ID/g", "origin_code"));
        if (headers[j] === "STATION_ID") {
          headers[j] = "origin_code";
        } else if (headers[j] === "WATER_LEVEL (m)") {
          headers[j] = "Value";
        } else if (headers[j] === "STATION_NAME") {
          continue;
        } else if (headers[j] === "DISCHARGE (m3/s)") {
          continue;
        }
        entry[headers[j]] = currentLine[j];
      }
      jsonData.push(entry);
      // console.log(entry);
    }

    return jsonData;
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      {jsonData && <pre>{JSON.stringify(jsonData, null, 2)}</pre>}
    </div>
  );
};

export default CSVtoJSONConverter;
