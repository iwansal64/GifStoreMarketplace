import express from "express";
import { check_transaction, check_account, send_response } from './functions';
import { games_transaction, games_account_info, digiflazz_price_list } from './api';

//? ------ API Setup
const app = express();

//? apigames.com
/* 
    Get Transaction API
    
    query : {
        ref_id: string,
        kode_produk: string,
        tujuan: string,
        server_id: string?
    }
*/
app.get('/api/games/transaction/', games_transaction);

/*
    Get Account Information API

    params: {
        game_code: string
    }

    query : {
        user_id: string
    }
*/
app.get('/api/games/account/:game_code', games_account_info);

//? digiflazz.com
/*
    Get Price List API

    query: {
        code: string?
        category: string?
        brand: string?
        type: string?
    }
*/
app.get('/api/digiflazz/price-list', digiflazz_price_list);

//? --------- Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
