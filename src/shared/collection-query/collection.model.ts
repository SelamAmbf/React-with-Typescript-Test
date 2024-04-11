export interface CollectionQuery {
    search?: string;
    pageNumber?: number;
    pageSize?: number;
    filter?: Filter[][];
    orderBy?: Order[];
    filters?:any;
    filterParamQuery?:any;
    
  }
  
  export interface Filter {
    propertyName: string;
    operation: string;
    value: string;
  }
  
  export interface Order {
    field: string;
    direction?: 'asc' | 'desc';
  }
  
  
  