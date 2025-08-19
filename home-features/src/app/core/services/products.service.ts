import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "../../models";


@Injectable({ providedIn: 'root' })

export class ProductService {
    private apiUrl = 'http://localhost:3000/api/catalog';

    constructor(private httpClient: HttpClient) {

    }

    getProducts(): Observable<Product[]> {
        return this.httpClient.get<Product[]>(this.apiUrl);
    }

    getProduct(productId: string): Observable<Product> {
        return this.httpClient.get<Product>(`${this.apiUrl}/${productId}/details`)
    }

    createProduct(productData: {}, ownerId: string): Observable<Product> {
        return this.httpClient.post<Product>(this.apiUrl, { ...productData, ownerId }, {
            withCredentials: true,
        })
    }

    likeProduct(productId: string, userId: string) {
        return this.httpClient.put<Product>(`${this.apiUrl}/${productId}/like`, { userId }, { withCredentials: true });
    }

    editProduct(productData: {}, productId: string): Observable<Product> {
        return this.httpClient.put<Product>(`${this.apiUrl}/${productId}/edit`, productData, { withCredentials: true });
    }

    deleteProduct(productId: string) {
        return this.httpClient.delete(`${this.apiUrl}/${productId}`);
    }
}