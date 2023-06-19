function App() {
  const upload = () => {
    var files = document.getElementById("file_upload").files;
    if (files.length == 0) {
      alert("Please choose any file...");
      return;
    }
    var filename = files[0].name;
    var extension = filename.substring(filename.lastIndexOf(".")).toUpperCase();
    if (extension == ".CSV") {
      //Here calling another method to read CSV file into json
      csvFileToJSON(files[0]);
    } else {
      alert("Please select a valid csv file.");
    }
  };

  //Method to read csv file and convert it into JSON
  function csvFileToJSON(file) {
    try {
      var reader = new FileReader();
      reader.readAsBinaryString(file);
      reader.onload = function (e) {
        var jsonData = [];
        var headers = [];
        var rows = e.target.result.split("\r\n");
        for (var i = 0; i < rows.length; i++) {
          var cells = rows[i].split(",");
          var rowData = {};
          for (var j = 0; j < cells.length; j++) {
            if (i == 0) {
              var headerName = cells[j].trim();
              headers.push(headerName);
            } else {
              var key = headers[j];
              if (key) {
                rowData[key] = cells[j].trim();
              }
            }
          }
          //skip the first row (header) data
          if (i != 0) {
            jsonData.push(rowData);
          }
        }

        //displaying the json result in string format
        document.getElementById("display_data_in_readable_format").value =
          JSON.stringify(jsonData, null, 4);
      };
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <>
      <center>
        <h2>Upload a CSV file to convert in human readable JSON</h2>
        {/* <!-- Input element to upload an csv file --> */}
        <input type="file" id="file_upload" />
        <button onClick={upload()}>Upload</button>
        <br />
        <br />
        {/* <!-- container to display the csv data --> */}
        <textarea
          id="display_data_in_readable_format"
          style={{height:"400px", width:"400px;"}}
        ></textarea>
      </center>
    </>
  );
}

export default App;
