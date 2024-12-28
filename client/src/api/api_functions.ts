import got from "got";

const BASEAPI_URL = "http://localhost:3000";

export type PriceData = {
    product_name: string,
    category: string,
    brand: string,
    type: string,
    seller_name: string,
    price: number,
    buyer_sku_code: string,
    buyer_product_status: boolean,
    seller_product_status: boolean,
    unlimited_stock: boolean,
    stock: number,
    multi: boolean,
    start_cut_off: string,
    end_cut_off: string,
    desc: string;
};

type RawPriceList = {
    body: {
        result: {
            data: PriceData[];
        };
    };
};

export async function get_price_list(brand: string) {
    console.log("GETTING PRICE LIST");
    const response: RawPriceList = await got(BASEAPI_URL + "/api/digiflazz/price-list?brand=" + brand).json();
    let result: PriceData[] = [];
    if (Object.keys(response).includes("body")) {
        result = response.body.result.data;
    }
    return { error: false, result, response };
}