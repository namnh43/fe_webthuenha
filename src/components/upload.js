import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useFormikContext } from "formik";

function UploadImageField({ name, images }) {
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

    useEffect(() => {
        if (images && images.length > 0) {
            // Set the previewUrls initially to display the existing images
            setPreviewUrls(images.map((image) => image.fileUrl));
        }
    }, [images]);

    const handleImageUpload = (urls) => {
        setFieldValue(name, urls);
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
        const updatedSelectedFiles = [...selectedFiles];
        const updatedPreviewUrls = [...previewUrls];
        updatedSelectedFiles.splice(index, 1);
        updatedPreviewUrls.splice(index, 1);
        setSelectedFiles(updatedSelectedFiles);
        setPreviewUrls(updatedPreviewUrls);
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
                // Filter out any images that were removed
                const remainingImages = images.filter((image) => typeof image === "object");

                // Combine the remaining images with the newly uploaded images
                const newImages = [...remainingImages, ...urls.map((url) => ({ fileUrl: url }))];

                handleImageUpload(newImages);
                alert("Uploaded successfully");
            })
            .catch((error) => {
                console.error("Error getting file URLs:", error);
            });
    };


    return (
        <div style={{ border: "1px solid black" }}>
            <input type="file" name="file" onChange={changeHandler} multiple />
            <br />

            {previewUrls.length > 0 && (
                <div className="d-inline-flex" style={{ flexWrap: "wrap" }}>
                    {previewUrls.map((url, index) => (
                        <div key={url} style={{ margin: "10px" }}>
                            <img src={url} alt={"Preview" + index} style={{ maxWidth: "450px" }} />
                            <button type="button" onClick={() => handleRemoveImage(index)}>
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <div>
                <button type="button" onClick={handleSubmission} className="btn btn-success">
                    Upload
                </button>
            </div>
        </div>
    );
}

export default UploadImageField;
