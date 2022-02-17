import http from "../http-common";

class DocumentService {

    upload(document, documentTypeId, onUploadProgress) {
        let formData = new FormData();
        formData.append("doc", document);
        formData.append("type", documentTypeId);
        return http.post("/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            onUploadProgress
        });
    }
    getDocs() {
        return http.get("/docs");
    }
    deleteDoc(id) {
        return http.delete("/delete/" + id);
    }
}
export default new DocumentService();