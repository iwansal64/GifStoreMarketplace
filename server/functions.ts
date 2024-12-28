//? -------  Import libraries
import dotenv from "dotenv";
import got from "got";
import { Response as ExpressResponse } from "express";

//? -------  Configurations
const BASE_APIGAMES_URL = "https://v1.apigames.id";
const BASE_DIGIFLAZZ_URL = "https://api.digiflazz.com/v1";

dotenv.config();

const merchant_id = "M241226DIRO7728HR";
const apigames_secret_key = process.env.APIGAMES_SECRETKEY || "";
const apigames_signature = process.env.APIGAMES_SIGNATURE || "";
const digiflazz_username = process.env.DIGIFLAZZ_USERNAME || "";
const digiflazz_devkey = process.env.DIGIFLAZZ_DEVKEY || "";

if (apigames_secret_key == "" || apigames_signature == "" || digiflazz_username == "" || digiflazz_devkey == "") {
    throw new Error("Configure your environment correctly!");
}

const crypto = require('crypto');

type ResponseObject = {
    success: boolean,
    message: string,
    code: number | null,
    body: object;
};

//? -------  Functions
//? Other Functions
function md5(text: string) {
    return crypto.createHash('md5').update(text).digest('hex');
}

export function send_response(res: ExpressResponse, success: boolean, message: string, body: object = {}, code: number | null = null) {
    const response: ResponseObject = {
        success,
        message,
        code,
        body
    };
    console.log(response.body);
    res.json(response);
}

//? API Functions
//? ------ apigames.com
export async function check_transaction(ref_id: string, kode_produk: string, tujuan: string, server_id: string | null = null) {
    const request_url = `${BASE_APIGAMES_URL}/v2/transaksi?ref_id=${ref_id}&merchant_id=${merchant_id}&produk=${kode_produk}&tujuan=${tujuan}&signature=${apigames_signature}${server_id ? '&server_id=' + server_id : ''}`;
    const result = await got(request_url).json();
    console.log(result);
    return result;
}

export async function check_account(user_id: string, game_code: string) {
    const request_url = `${BASE_APIGAMES_URL}/merchant/${merchant_id}/cek-username/${game_code}?user_id=${user_id}&signature=${md5(merchant_id + apigames_secret_key)}`;
    const result = await got(request_url).json();
    console.log(result);
    return result;
}

//? ------ digiflazz.com
export async function check_price_list(code?: string, category?: string, brand?: string, type?: string) {
    const request_url = `${BASE_DIGIFLAZZ_URL}/price-list`;

    console.log(brand);

    const post_body = {
        "cmd": "prepaid",
        "username": digiflazz_username,
        "sign": md5(digiflazz_username + digiflazz_devkey + "pricelist"),
        code,
        category,
        brand,
        type
    };

    const result: {
        data: object;
    } = await got.post(request_url, {
        json: post_body,
        responseType: "json"
    }).json();

    return result;
}