import React from "react";
import ReactDOM from "react-dom";
import ReactImageUploading from "react-images-uploading";

function TestJS() {
    const [images, setImages] = React.useState([]);
    const maxNumber = 69;
    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };

    return (
        <div className="App">
            <ReactImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
            >
                {({
                      imageList,
                      onImageUpload,
                      onImageRemoveAll,
                      onImageUpdate,
                      onImageRemove,
                      isDragging,
                      dragProps
                  }) => (
                    <div className="upload__image-wrapper">
                        <button
                            className="btn btn-primary"
                            style={isDragging ? { color: "red" } : null}
                            onClick={onImageUpload}
                            {...dragProps}
                        >
                            Click or Drop here
                        </button>
                        &nbsp;&nbsp;
                        <button onClick={onImageRemoveAll} className="btn btn-danger">Remove all images</button>
                        {imageList.map((image, index) => (
                            <div key={index} className="image-item">
                                <div><img src={image.data_url} alt="" width="300" /></div>
                                <div className="image-item__btn-wrapper">
                                    <button onClick={() => onImageUpdate(index)} className="btn btn-success">Change</button>&nbsp;&nbsp;
                                    <button onClick={() => onImageRemove(index)} className="btn btn-danger right">Remove</button>
                                </div>
                                <br/>
                            </div>
                        ))}
                    </div>
                )}
            </ReactImageUploading>
        </div>
    );
}

export default TestJS;