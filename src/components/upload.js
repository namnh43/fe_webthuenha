import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useFormikContext } from "formik";

function UploadImageField({ name, images, setIsUpdateImg }) {
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
            setPreviewUrls(images.map((image) => image.fileUrl));
            setSelectedFiles(images.map((image) => image.fileUrl));
        }
    }, [images]);

    const handleImageUpload = (urls) => {
        setFieldValue(name, urls.map(url => ({ fileUrl: url })));
        setIsUpdateImg(true);

    };

    const changeHandler = (event) => {
        const files = event.target.files;
        const fileUrls = [];

        for (const element of files) {
            const fileUrl = URL.createObjectURL(element);
            fileUrls.push(fileUrl);
            console.log(fileUrls);
        }

        setSelectedFiles([...selectedFiles, ...files]);
        setPreviewUrls([...previewUrls, ...fileUrls]);

        setIsUpdateImg(false);
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

        setIsUpdateImg(false);
    };

    useEffect(() => {
        console.log(selectedFiles);
    }, [selectedFiles]);

    const handleSubmission = () => {
        const newFiles = selectedFiles.filter((file) => !(typeof file === "string")); // Lọc ra những file mới từ máy tính
        const existingFiles = selectedFiles.filter((file) => typeof file === "string"); // Lọc ra những file đã có URL

        const promises = [];

        for (const file of newFiles) {
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
                const newImages = [...existingFiles, ...urls]; // Kết hợp những file đã có URL và những file mới
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
                        <div key={url} style={{ margin: "10px", position: "relative" }}>
                            <img src={url} alt={"Preview" + index} style={{ maxWidth: "450px" }} />
                            <button
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
                                className="remove-button"
                                type="button" onClick={() => handleRemoveImage(index)}>
                                <b>X</b>
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <div>
                <button type="button" onClick={handleSubmission} className="btn btn-success">
                    Confirm
                </button>
            </div>
            <br/>
        </div>
    );
}

export default UploadImageField;
