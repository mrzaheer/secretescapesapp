export const getSalesSearchQuery = `
query GetSalesSearch($query: String!, $offset: Int!) {
    saleSearch(query: $query, travelTypes: "HOTEL_ONLY") {
        resultCount
        sales(limit: 10, offset: $offset) {
            id
            editorial {
                title
                destinationName
            }
            photos { 
                url 
            }
        }
    }
}
`;

export const getSaleDetailsQuery = `
query GetSaleDetails($id: String!) {
    sale(saleId: $id) {
        editorial {
            title
            destinationName
            hotelDetails
        }
        prices {
            leadRate {
                forDisplay
            }
        }
        photos { 
            url 
        }
    }
}
`