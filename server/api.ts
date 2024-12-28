import { send_response, check_account, check_transaction, check_price_list } from "./functions";
import { Response as ExpressResponse, Request as ExpressRequest } from "express";

//? ----------  apigames.com
export async function games_transaction(req: ExpressRequest, res: ExpressResponse) {
    // Get available data
    const { ref_id, kode_produk, tujuan, server_id } = req.query;

    // Check for required data
    if (!ref_id || !kode_produk || !tujuan) {
        return send_response(res, false, "Error parameters is not complete");
    }

    // Get the result
    const result = await check_transaction(ref_id.toString(), kode_produk.toString(), tujuan.toString(), server_id?.toString());

    // Send back the response!
    return send_response(res, true, "Successfully retrieve transaction data", {
        "data": result
    });
}

export async function games_account_info(req: ExpressRequest, res: ExpressResponse) {
    // Get available data
    const game_code = req.params.game_code;
    const { user_id } = req.query;

    // Check for required data
    if (!user_id) {
        return send_response(res, false, "Error parameters is not complete");
    }

    // Get the result
    const result = await check_account(user_id.toString(), game_code);

    // Send back the response!
    return send_response(res, true, "Successfully get game account's information", {
        "data": result
    });
}

//? ----------- digiflazz.com
export async function digiflazz_price_list(req: ExpressRequest, res: ExpressResponse) {
    // Get available data
    const { code, category, brand, type } = req.query;

    // Get the result
    let result = await check_price_list(code?.toString(), category?.toString(), brand?.toString(), type?.toString());

    const indexOfData = Object.keys(result.data).indexOf("rc");
    if (indexOfData != -1) {
        if (Object.values(result.data)[indexOfData] != "0") {
            result = {
                data: []
            };
        }
    }

    // Send back the response!
    return send_response(res, true, "Successfully get the price list!", {
        result
    });
}