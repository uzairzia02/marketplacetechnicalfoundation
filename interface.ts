export interface Product {
    _id: string;
    price: number;
    name: string;
    slug: string;
    imageURL: string;
    categoryName: string,
    quantity:number

}


export interface FullProduct {
    imageURL: string ;
    _id: string;
    price: number;
    name: string;
    description:string;
    slug: string;
    image: any;
    categoryName: string
}
