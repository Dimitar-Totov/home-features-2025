import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "../../models";


@Injectable({ providedIn: 'root' })

export class ProductService {
    private apiUrl = 'http://localhost:3000/api/products';

    constructor(private httpClient: HttpClient) {

    }

    getProducts(): Observable<Product[]> {
        return this.httpClient.get<Product[]>(this.apiUrl);
    }

    createProduct(productName: string,
        productCategory: string,
        productPrice: string,
        productColor: string,
        productDimensions: string,
        productDescription: string) {
        const body = JSON.stringify({ productName, productCategory, productPrice, productColor, productDimensions, productDescription });
        return this.httpClient.post<Product>(this.apiUrl, body, {
            withCredentials: true,
        })
    }
}