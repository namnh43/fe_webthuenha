import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useFormikContext } from "formik";

function UploadImageField({ name }) {
    const { setFieldValue } = useFormikContext();

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
    const [isDragOver, setIsDragOver] = useState(false);

    const handleImageUpload = (urls) => {
        const fileUrlObjects = urls.map((url) => ({ fileUrl: url }));
        setFieldValue(name, fileUrlObjects);
    };

    const changeHandler = (event) => {
        const files = event.target.files;
        const fileUrls = [];

        for (const element of files) {
            const fileUrl = URL.createObjectURL(element);
            fileUrls.push(fileUrl);
        }

        setSelectedFiles(files);
        setPreviewUrls(fileUrls);
    };

    const removeImage = (index) => {
        const updatedFiles = [...selectedFiles];
        updatedFiles.splice(index, 1);
        setSelectedFiles(updatedFiles);

        const updatedUrls = [...previewUrls];
        updatedUrls.splice(index, 1);
        setPreviewUrls(updatedUrls);
    };

    const handleSubmission = () => {
        const promises = [];

        for (const file of selectedFiles) {
            const storageRef = ref(storage, "md6/" + file.name);

            const promise = uploadBytes(storageRef, file)
                .then((snapshot) => {
                    console.log("File uploaded successfully");
                    return getDownloadURL(snapshot.ref);
                })
                .catch((error) => {
                    console.error("Error uploading file:", error);
                });

            promises.push(promise);
        }

        Promise.all(promises)
            .then((urls) => {
                handleImageUpload(urls);
                alert("Uploaded successfully");
            })
            .catch((error) => {
                console.error("Error getting file URLs:", error);
            });
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        setIsDragOver(true);
    };

    const handleDragEnter = (event) => {
        event.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = () => {
        setIsDragOver(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setIsDragOver(false);
        const files = event.dataTransfer.files;
        const fileUrls = [];

        for (const element of files) {
            const fileUrl = URL.createObjectURL(element);
            fileUrls.push(fileUrl);
        }

        // Concatenate newly dropped files with existing files
        setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
        setPreviewUrls((prevUrls) => [...prevUrls, ...fileUrls]);
    };

    return (
        <div
            style={{ border: "1px solid black" }}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >

            <div>
                <input type="file" name="file" onChange={changeHandler} multiple />
                <button type="button" onClick={handleSubmission} className="btn btn-success">
                    Confirm
                </button>
            </div>
            <br/>

            {isDragOver && <div>Drop files here</div>}

            {previewUrls.length > 0 && (
                <div className="d-inline-flex" style={{ flexWrap: "wrap" }}>
                    {previewUrls.map((url, index) => (
                        <div key={url} style={{ position: "relative", margin: "10px" }}>
                            <img src={url} alt={"Preview" + index} style={{ maxWidth: "450px" }} />
                            <button
                                type="button"
                                onClick={() => removeImage(index)}
                                style={{
                                    position: "absolute",
                                    top: "3px",
                                    right: "3px",
                                    width: "25px",
                                    height: "25px",
                                    background: "red",
                                    color: "white",
                                    borderRadius: "50%",
                                    cursor: "pointer",
                                }}
                            >
                                <b>X</b>
                            </button>
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
}

export default UploadImageField;
