import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../interfaces/product.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  loading = true;
  products: Product[] = [];
  productsFilter: Product[] = [];

  constructor(private http:HttpClient) { 
    this.loadProducts();
  }

  private loadProducts(){
    return new Promise((resolve, reject) => {
      this.http.get("https://angular-2146b-default-rtdb.firebaseio.com/productos_idx.json")
      .subscribe( (resp: any) => {
        console.log(resp);

        this.products = resp;

        setTimeout(() => {            
          this.loading = false;
        }, 500);

        resolve(0);
      });
    });    
  }

  getProduct(id:string){
    return this.http.get(`https://angular-2146b-default-rtdb.firebaseio.com/productos/${ id }.json`);
  }

  searchProduct(search:string){
    if(!this.products.length){
      // Load products
      this.loadProducts().then( () => {
        // Filter
        this.filterProducts(search);
      } );
    }
    else {
      // Filter
      this.filterProducts(search);
    }

    console.log(this.productsFilter);
  }

  private filterProducts(search:string){
    search = search.toLowerCase();
    this.productsFilter = this.products.filter(product=>{
      if(product.categoria.toLowerCase().indexOf(search) != -1 || product.titulo.toLowerCase().indexOf(search) != -1)
        return true;
      
      return false;
    });

    return this.productsFilter;
  }
}
