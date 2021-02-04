
import { Injectable } from '@angular/core';



declare function getParamConfig_data ();


@Injectable()
export class ProductsService {
    private array_data:any[] = getParamConfig_data();
    private data: any[] = this.array_data;
    private counter: number = this.array_data.length;

    public products(): any[] {
      //  console.log("DATA_IN_SERVICE",this.data);
        return this.data;
    }

    public remove(product: any): void {
        const index = this.data.findIndex(({ ID }) => ID === product.ID);
        this.data.splice(index, 1);
    }

    public save(product: any, isNew: boolean): void {
        if (isNew) {
            product.ID = this.counter++;
            this.data.splice(0, 0, product);
        } else {
            Object.assign(
                this.data.find(({ ID }) => ID === product.ID),
                product
            );
        }
    }
}
