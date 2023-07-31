import React, {useState, useEffect} from "react";
import {initializeApp} from "firebase/app";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import './uploadCss.css';

function UploadImageField({images, values, handleFormSubmit}) {

    useEffect(() => {
            if (values && values.price !== '')
                handleSubmission();
        }
        , [values]);

    const firebaseConfig = {
        apiKey: "AIzaSyBoTj1_SNijRYo4DGugLqnCKWOy2pF7hWk",
        authDomain: "casemd4-3a742.firebaseapp.com",
        projectId: "casemd4-3a742",
        storageBucket: "casemd4-3a742.appspot.com",
        messagingSenderId: "149528641745",
        appId: "1:149528641745:web:852427a18e21880305c5f0",
        measurementId: "G-HKY5QFR16C"
    };

    const storage = getStorage(initializeApp(firebaseConfig));

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [previewUrls, setPreviewUrls] = useState([]);

    useEffect(() => {
        if (images && images.length > 0) {
            setPreviewUrls(images.map((image) => image.fileUrl));
            setSelectedFiles(images.map((image) => image.fileUrl));
        }
    }, [images]);

    const handleImageUpload = (urls) => {
        let listImages = urls.map(url => ({fileUrl: url}));
        handleFormSubmit({...values, images: listImages});
    };

    const changeHandler = (event) => {
        const files = event.target.files;
        const fileUrls = [];

        for (const element of files) {
            const fileUrl = URL.createObjectURL(element);
            fileUrls.push(fileUrl);
        }

        setSelectedFiles([...selectedFiles, ...files]);
        setPreviewUrls([...previewUrls, ...fileUrls]);
    };

    const handleRemoveImage = (index) => {
        setSelectedFiles((prevSelectedFiles) => {
            const updatedSelectedFiles = [...prevSelectedFiles];
            updatedSelectedFiles.splice(index, 1);
            return updatedSelectedFiles;
        });

        setPreviewUrls((prevPreviewUrls) => {
            const updatedPreviewUrls = [...prevPreviewUrls];
            updatedPreviewUrls.splice(index, 1);
            return updatedPreviewUrls;
        });

    };

    const handleSubmission = () => {
        const newFiles = selectedFiles.filter((file) => !(typeof file === "string")); // Lọc ra những file mới từ máy tính
        const existingFiles = selectedFiles.filter((file) => typeof file === "string"); // Lọc ra những file đã có URL

        const promises = [];

        for (const file of newFiles) {
            const storageRef = ref(storage, "md6/" + file.name);
            const promise = uploadBytes(storageRef, file)
                .then((snapshot) => {
                    return getDownloadURL(snapshot.ref);
                })
                .catch((error) => {
                    console.error("Error uploading file:", error);
                });

            promises.push(promise);
        }

        Promise.all(promises)
            .then((urls) => {
                const newImages = [...existingFiles, ...urls]; // Kết hợp những file đã có URL và những file mới
                console.log("File uploaded successfully");
                handleImageUpload(newImages);
            })
            .catch((error) => {
                console.error("Error getting file URLs:", error);
            });
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const files = event.dataTransfer.files;
        const fileUrls = [];

        for (const element of files) {
            const fileUrl = URL.createObjectURL(element);
            fileUrls.push(fileUrl);
        }

        setSelectedFiles([...selectedFiles, ...files]);
        setPreviewUrls([...previewUrls, ...fileUrls]);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    return (
        <div
            style={{
                border: "2px dashed #ccc",
                padding: "10px",
                textAlign: "center",
                background: "#f9f9f9"
            }}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
        >
            <div
            >
                <span>
                    Drag and drop images here or click to select files &nbsp;
                </span>
                <input type="file" name="file" onChange={changeHandler} multiple style={{color: "transparent"}}
                       id="fileInput"/>
                <label htmlFor="fileInput" className="custom-file-button">Choose File</label>
            </div>
            <br/>

            {previewUrls.length > 0 && (
                <div
                    className="d-flex flex-wrap justify-content-around"
                    style={{
                        gap: "10px", background: "#f9f9f9",
                    }}
                >
                    {previewUrls.map((url, index) => (
                        <div
                            key={url}
                            style={{
                                border: "2px dashed #ccc",
                                maxWidth: "450px",
                                position: "relative",
                                flex: "0 0 30%",
                            }}
                        >
                            <img src={url} alt={"Preview" + index} style={{width: "100%"}}/>
                            <button
                                style={{
                                    position: "absolute",
                                    top: "0px",
                                    right: "0px",
                                    width: "25px",
                                    height: "25px",
                                    background: "red",
                                    border: "none",
                                    cursor: "pointer",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    paddingBottom: "7px",
                                }}
                                className="remove-button"
                                type="button"
                                onClick={() => handleRemoveImage(index)}
                            >
                                <span style={{
                                    fontSize: "30px", color: "white"
                                }}>&times;</span>
                            </button>

                        </div>
                    ))}
                </div>
            )}
            <br/>
        </div>
    );
}

export default UploadImageField;
