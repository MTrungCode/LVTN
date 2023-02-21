import { update } from "../../../BackendLVTN/app/controllers/product.controller";
import createApiClient from "./api.service";

class ProductService {
    constructor(baseUrl = "/api/products") {
        this.api = createApiClient(baseUrl);
    }
    async getAllProduct() {
        return (await this.api.get("/")).data;
    }
    async insertNewProduct() {
        return (await this.api.post("/")).data;
    }
    async findByIdProduct(id) {
        return (await this.get(`/${id}`)).data;
    }
    async updateProduct(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }

    async deleteProduct(id) {
        return (await this.api.delete(`${id}`)).data;
    }
    // async getAllProduct() {
        
    // }
    // async getAllProduct() {
        
    // }
}

export default new ProductService();