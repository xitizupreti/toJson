import React from 'react';

class CSVtoJSONConverter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jsonData: null,
    };
  }

  handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const text = e.target.result;
      const jsonData = this.csvToJSON(text);
      this.setState({ jsonData });
    };

    reader.readAsText(file);
  };

  csvToJSON = (csvText) => {
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

  render() {
    const { jsonData } = this.state;

    return (
      <div>
        <input type="file" onChange={this.handleFileUpload} />
        {jsonData && (
          <pre>{JSON.stringify(jsonData, null, 2)}</pre>
        )}
      </div>
    );
  }
}

export default CSVtoJSONConverter;
