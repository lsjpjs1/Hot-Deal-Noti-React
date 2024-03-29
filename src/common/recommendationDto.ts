export default class RecommendationDto {
  public productPurposeDetail: ProductPurposeDetail;
  public productFamilies: ProductFamilies[];
}

export class ProductPurposeDetail {
  public productPurposeDetailId: number;
  public productPurposeDetailTitle: string;
  public productPurposeDetailBody: string;
}

export class ProductFamilies {
  public productFamily: ProductFamily;
  public products: Products[];
}

export class ProductFamily {
  public productFamilyId: number;
  public productFamilyName: string;
  public productFamilyDescription: string;
}

export class Products {
  public productId: number;
  public modelName: string;
  public isHotDealExist: boolean;
  public minHotDealPrice: number;
}

export interface PostProductFamilyRequest {
  productFamilyName: string,
  productFamilyDescription: string
}

export interface PostRecommendationProductFamilyRequest {
  productFamilyId: number,
  productPurposeDetailId: number
}
export interface GetProductFamiliesRequest {
  productFamilyName: string
}

export interface SetProductFamilyRequest {
  productFamilyId: number,
  productId: number
}


export interface UpdateProductFamilyRequest {
  productFamilyId: number,
  productFamilyDescription: string
}
