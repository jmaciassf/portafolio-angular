import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { ProductFull } from '../../interfaces/productFull.interfaces';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  product!: any;
  id: string;

  constructor(private route:ActivatedRoute, public productService:ProductosService) { }

  ngOnInit(): void {

    this.route.params.subscribe( params => {
      this.id = params["id"];
      console.log(this.id);
      
      this.productService.getProduct(this.id).subscribe(product => {
        this.product = product;
        console.log(product);
      });
    });
  }

}
