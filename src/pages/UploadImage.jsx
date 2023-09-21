import React, { useState, useRef, useEffect } from "react";
import "../css/UploadImage.css";
import fetchCaption from './Request';

const urls = [
  'https://portal.vision.cognitive.azure.com/dist/assets/ImageCaptioningSample1-bbe41ac5.png',
   'https://portal.vision.cognitive.azure.com/dist/assets/ImageCaptioningSample2-72b3c1ca.png',
   'https://portal.vision.cognitive.azure.com/dist/assets/ImageCaptioningSample3-e03062c2.png',
   'https://portal.vision.cognitive.azure.com/dist/assets/ImageCaptioningSample4-0559774f.png',
   'https://portal.vision.cognitive.azure.com/dist/assets/ImageCaptioningSample5-14b26724.png',
   'https://portal.vision.cognitive.azure.com/dist/assets/ImageCaptioningSample6-97f9a965.png'
]
const denseUrls = [
  'https://portal.vision.cognitive.azure.com/dist/assets/DenseCaptioningSample0-2569b3c1.png',
  'https://portal.vision.cognitive.azure.com/dist/assets/DenseCaptioningSample1-c67207a8.png',
  'https://portal.vision.cognitive.azure.com/dist/assets/DenseCaptioningSample2-67d678cb.png',
  'https://portal.vision.cognitive.azure.com/dist/assets/ImageTaggingSample0-276aeff6.jpg',
  'https://portal.vision.cognitive.azure.com/dist/assets/DenseCaptioningSample3-eac10a5d.png'
]

const UploadImage = ({dense}) => {

  const [file, setFile] = useState([]);
  const [dropImage, setDropImage] = useState(null);
  const fileInputRef = useRef(null);
  const [annotations, setAnnotations] = useState("ewf")
  const [caption, setCaption] = useState([])
  const [loading, setLoading] = useState(false)
  const handleOnDrag = (e, image) => {
    e.dataTransfer.setData("image", image);
    console.log(image)
  }
  useEffect(() => {
    console.log(dense)
    if (dense){
      setFile(denseUrls)
    }else{
      setFile(urls)
    }
  }, [dense])
  const handleOnDrop = async (e) => {
    const newFile = e.dataTransfer.getData("image");
    setDropImage(newFile);
  
    try {
      console.log("confirm dense", dense)
      setLoading(true)
      var response;
      if (dense) {
        response = await fetchCaption(newFile, 'denseCaptions');
      }else{
        response = await fetchCaption(newFile, 'caption');
      }
      setLoading(false)
      console.log(response)
      if (dense){
        console.log("densetext:",response.denseCaptionsResult.values)
        setCaption(response.denseCaptionsResult.values);
      }else{
        setCaption([{text:response.captionResult.text}]);
      }
    } catch (error) {
      console.error("Error fetching caption:", error);
    }
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  }

  const images = file.map((image, index) => (
    <div key={index} 
      className="image-container" 
      onClick={()=>handleClear(index)} 
      draggable 
      onDragStart={(e)=>handleOnDrag(e, image)}
    >
      <img className="image" key={index} alt="not found" src={image} />
      <div className="hover-text">Click to Remove</div>
    </div>
  ));

  const handleChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const newfiles = selectedFiles.map((file) => URL.createObjectURL(file));
    setFile([...file, ...newfiles]);
  };

  const handleClear = (index) => {
    setFile(file.filter((item, i)=> i !== index));
    fileInputRef.current.value = null;

  };
  const handleRemoveDropImage = () => {
    if(!loading) {
      setDropImage(null);
      setCaption([]);
    }
  }
  return (
    <div className="main-page">
      <h2>Add Image:</h2>
      <br />
      <div className="all-images-container">
        {images}
      </div>
      <br />
      <input type="file" onChange={handleChange} ref={fileInputRef} multiple accept="image/*"/>
      
      <br /><br /><br /><br />

      <div className="image-annotation-container">
        <div className="drop-container" onDrop={handleOnDrop} onDragOver={handleDragOver}>
          <p>Drag and Drop Images Here</p>
          <p></p>
          <br />
          {dropImage? 
            <div className="image-container" onClick={()=>handleRemoveDropImage()}>
              <img src={dropImage} alt={dropImage.name} className="drop-image" draggable="false"/>
              <div className="hover-text">Click to Remove</div>
            </div>: <></>}
        </div>


        <div className="drop-container">
          {loading?
            <>Loading</>:<div>{caption.map(
              (item, index) => <div key={index}>{item.text}</div>
            )}</div>
          }
        </div>
      </div>
    </div>
  );
};

export default UploadImage;
