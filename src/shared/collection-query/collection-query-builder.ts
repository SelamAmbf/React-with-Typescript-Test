import { CollectionQuery } from './collection.model';



export const collectionQueryBuilder = (
  request: CollectionQuery,
) => {
  const params = new URLSearchParams();
  if (request.pageSize !== undefined) {
    const pageSize ='pageSize';
    params.set(pageSize, request.pageSize.toString());
  }

  if (request.pageNumber !== undefined) {
    const pageNumber ='pageNumber';
    params.set(pageNumber, request.pageNumber.toString());
  }

  if (request.search !== undefined && request.search !== '') {
    params.set('search', request.search.toString());
  }

  if (request.filters.length>0 &&  request.filters !== undefined && request.filters !== '') {
    params.set('filters',  JSON.stringify(request.filters));
  }
  if (request.filter && request.filter.length > 0) {
      request.filter.forEach((filterAnd, index) => {
        filterAnd.forEach((filterOr: any, orIndex) => {
          Object.keys(filterOr).forEach((key) => {
            params.append(
              `filter[${index}][${orIndex}][${key}]`,
              filterOr[key]
            );
          });
        });
      });
    
  }

  return params;
};