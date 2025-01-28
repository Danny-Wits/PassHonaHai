import React from 'react';
import NavBar from "../../Components/Jsx/NavBar.jsx";
import Dropzone from 'react-dropzone';
import "../Styles/UploadMaterial.css";
import {enqueueSnackbar} from "notistack";
import {useAuth} from "../../Context.jsx";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import API from "../../Scripts/API.js";

// (material_id: INT AUTO_INCREMENT, user_id: INT, title: VARCHAR(255),
// description: TEXT, view_count: INT, file_url: VARCHAR(255),
// file_type:VARCHAR(255), category: VARCHAR(100), tags: VARCHAR(255),
// upload_date: TIMESTAMP DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY(material_id),

const UploadMaterial = () => {
    const {user_info} = useAuth();
    const queryClient = useQueryClient();
    const {mutate: uploadStudyMaterial, isLoading: isUploading} = useMutation({
        mutationFn: (data) => {
            return API.uploadStudyMaterial(data.user_id, data.data)
        },
        onSuccess: (data) => {
            if (data.error) {
                enqueueSnackbar(data.error, {variant: "error"});
                return
            }
            queryClient.refetchQueries(["get_material", 1]).then(() => {
            });
            enqueueSnackbar("Material Uploaded Successfully", {variant: "success"})
        },
        onError: (error) => {
            enqueueSnackbar(error.message, {variant: "error"})
        }
    })
    const [formData, setFormData] = React.useState({
        title: "",
        description: "",
        category: "General",
        tags: "",
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };
    const fileChanged = (files) => {
        const file = files[0] ?? null;
        if (file) {
            setFormData({...formData, 'file': file})
        } else {
            enqueueSnackbar("Please Select a valid file to upload ", {variant: "error"})
        }
    }
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title || !formData.description || !formData.category || !formData.tags || !formData.file) {
            enqueueSnackbar("Please fill all the fields", {variant: "error"});
            return;
        }
        if (formData.file?.size > 10 * 1024 * 1024 || formData.file?.size <= 0) {
            enqueueSnackbar("File size cannot exceed 10MB", {variant: "error"});
            return;
        }
        if (formData.title.length < 3 || formData.title.length > 100) {
            enqueueSnackbar("The title must be in range 3 - 100 letters ", {variant: "error"});
            return;
        }
        if (formData.description.length < 10 || formData.description.length > 1000) {
            enqueueSnackbar("The description must be in range 10 -1000", {variant: "error"});
            return;
        }
        const formDataObject = new FormData();
        formDataObject.append("title", formData.title);
        formDataObject.append("description", formData.description);
        formDataObject.append("category", formData.category);
        formDataObject.append("tags", formData.tags);
        formDataObject.append("file", formData.file);
        for (const key in formData) {
            formDataObject.append(key, formData[key]);
        }
        console.log(user_info.user_id, formDataObject);
        uploadStudyMaterial({user_id: user_info.user_id, data: formDataObject})
    }
    return (
        <div className={"page"}>
            <NavBar/>
            <div className={"section-header"}>UPLOAD STUDY MATERIAL</div>
            <form className={"login-form"} onSubmit={handleFormSubmit}>
                <label htmlFor="title">Title</label>
                <input type="text" id={"title"}
                       name={"title"}
                       value={formData.name}
                       onChange={handleChange}
                       max={25}
                       min={3}
                       placeholder={"Enter Title 3 to 100 letters"}
                />
                <label htmlFor="description">Description</label>
                <input type="text" id={"description"} name={"description"} value={formData.description}
                       onChange={handleChange} min={10} max={1000}
                       placeholder={"Enter Description of content : 10 to 1000 letters"}/>
                <label htmlFor={"category"}>Category</label>
                <select value={formData.category} name={"category"} id={"category"} onChange={handleChange}>
                    <option value="General">General</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Biology">Biology</option>
                    <option value="English">English</option>
                    <option value="History">History</option>
                    <option value="Geography">Geography</option>
                    <option value="Psychology">Psychology</option>
                </select>
                <label htmlFor="tags">Tags</label>
                <input type="text" id={"tags"} name={"tags"} max={50} value={formData.tags} onChange={handleChange}/>
                {
                    formData.file ? (
                        <div>
                            <h1>{formData.file.name ?? "Unknown"} </h1>
                            <embed src={URL.createObjectURL(formData.file)}/>
                            <button onClick={() => setFormData({...formData, file: null})}>Delete</button>
                        </div>
                    ) : (<Dropzone onDrop={fileChanged}>
                        {({getRootProps, getInputProps}) => (
                            <section className={"file-dropzone"}>
                                <div {...getRootProps()}>
                                    <input {...getInputProps()}
                                           accept={"application/pdf, image/jpeg, image/png ,image/jpg , .docx , .ppt"}/>
                                    <p>Drag drop some files here, or <span className={"primary"}> click to</span> select
                                        files</p>
                                </div>
                            </section>
                        )}
                    </Dropzone>)
                }

                <button type={"submit"} disabled={isUploading}>Upload</button>
            </form>


        </div>
    );
};

export default UploadMaterial;