import Auth from "../models/auth";
const bcrypt = require('bcryptjs');


/**
 * Регистрация
 * @param req 
 * @param res 
 * @param next 
 */
export const register = (req: any, res: any, next: any) => {
    let body = req.body;
    body.password = bcrypt.hashSync(body.password, 8);
    // console.log(body);
    Auth.insert(body)
        .then(() => {
            Auth.selectByEmail(body.email)
                .catch(er => {
                    res.status(400).json({ message: 'Не удалось найти учетную запись по указанному адресу электронной почты.' });
                })
                .then(async (user: any) => {
                    const token = await Auth.createToken(user.id);
                    res.status(200).send({ auth: true, token: token, user: user });
                })
        })
        .catch(er => {
            console.log(er);
            res.status(400).json({ message: 'Ошибка создания аккаунта! Возможно такой email уже зарегистрирован' })
        })
}


/**
 * Авторизацяи
 * @param req 
 * @param res 
 * @param next 
 */
export const login = (req: any, res: any, next: any) => {
    const { password, email } = req.body;
    Auth.selectByEmail(email)
        .catch(er => {
            console.log(er);
            res.status(400).json({ message: 'Не удалось найти учетную запись по указанному адресу электронной почты.' });
        })
        .then(async (user) => {
            if (user != null) {
                const passwordIsValid = bcrypt.compareSync(password, user.password);
                if (!passwordIsValid) {
                    res.status(400).send({ message: 'Некорректный пароль!', auth: false, token: null });
                } else {
                    const token = await Auth.createToken(user.id);
                    res.status(200).send({ auth: true, token: token, user: user });
                }
            } else {
                res.status(404).json({ message: 'Не удалось найти учетную запись по указанному адресу электронной почты.' });
            }
        })
};
