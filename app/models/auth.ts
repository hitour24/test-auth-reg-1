
import DB from "./db";
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

export default class Auth {

    /**
     * Создание токена авторищации
     * @param id 
     */
    static async createToken(id: number): Promise<any> {
        return await jwt.sign({ id: id }, 'applicationsecret', {
            expiresIn: 1800
        });
    }


    /**
    * Запись юзера в БД
    * @param user 
    */
    static async insert(user: { name: string, email: string, password: string }): Promise<any> {
        await DB.executeQuery('INSERT INTO public.userauth_test (name,email,password) VALUES ($1,$2,$3)', [String(user.name), String(user.email), String(user.password)]);
        return true;
    }

    /**
   * ПОлчение бзера по emali
   * @param email 
   */
    static async selectByEmail(email: any): Promise<any> {
        const isValid = typeof email === "string";
        if (!isValid) return null;
        let user = await DB.executeQuery(`SELECT * FROM public.userauth_test WHERE email = $1`, [String(email)]);
        user = ('rows' in user) ? (user.rows.length > 0 ? user.rows[0] : null) : null;
        if (user)
            user.name = encodeURIComponent(user.name);
        return user;
    }

}