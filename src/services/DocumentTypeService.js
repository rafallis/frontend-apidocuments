import http from "../http-common";

class DocumentTypeService {

    getTypes() {
        return http.get("/types");
    }
}
export default new DocumentTypeService();