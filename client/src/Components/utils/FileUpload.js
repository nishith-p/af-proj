import React, { useState } from "react";
import DropZone from "react-dropzone";
import Axios from "axios";

function FileUpload(props) {
  const [Images, setImages] = useState([]);

  const onDrop = (files) => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);

    Axios.post("/product/upload", formData, config).then((response) => {
      if (response.data.success) {
        setImages([...Images, response.data.image]);
        props.refreshFunction([...Images, response.data.image]);
      } else {
        alert("Failed to save the image.");
      }
    });
  };

  const onDelete = (image) => {
    const currentIndex = Images.indexOf(image);

    let newImages = [...Images];
    newImages.splice(currentIndex, 1);

    setImages(newImages);
    props.refreshFunction(newImages);
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div class="container">
        <div class="row">
          <DropZone onDrop={onDrop} multiple={false} maxsize={80000000}>
            {({ getRootProps, getInputProps }) => (
              <div
                style={{
                  width: "350px",
                  height: "139px",
                  border: "1px solid lightgray",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <i className="far fa-images fa-3x"></i>
              </div>
            )}
          </DropZone>
        </div>
        <div class="row">
          <div
            style={{
              display: "flex",
              width: "350px",
              height: "150px",
              overflowX: "scroll",
            }}
          >
            {Images.map((image, index) => (
              <div onClick={() => onDelete(image)}>
                <img
                  style={{ minWdith: "300px", width: "300px", height: "300px" }}
                  src={`${image}`}
                  alt={`productImg=${index}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FileUpload;
