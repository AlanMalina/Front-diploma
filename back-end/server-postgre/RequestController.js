import pool from "../server-postgre/db.js"
import fileService from "../server-postgre/fileService.js"
import bcrypt from 'bcrypt' 
import JwtToken from "./JWT-token.js"
import jwt from 'jsonwebtoken'
// import { secretKey } from "./JWT-token.js"
import cookie from "cookie-parser"

class RequestController{

    async createRequest(req, res){
        try{
            const {description, sum, deadline, user_id} = req.body

            let picture = null;
            if (req.files && req.files.picture) {
                picture = fileService.saveFile(req.files.picture);
            }
            if(!description || !sum || !deadline || !user_id){
                return res.status(400).json({message: 'You must to fill this data!'})
            }

            const request = await pool.query(
                'INSERT INTO requests (description, sum, deadline, picture, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING * ', 
                [description, sum, deadline, picture, user_id])

            res.status(200).json(request.rows[0])

        }catch(e){
            res.status(500).json(e)
        }
    }

    async getOwn(req, res){
        const {id} = req.params
        try {
            const request = await pool.query('SELECT * FROM requests WHERE user_id = $1', [id]);
            const sortedRequest = request.rows.sort((a, b) => b.id - a.id);
            res.status(200).json(sortedRequest);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    }

    async getAll(req, res) {
        try {
            const request = await pool.query('SELECT * FROM requests');
            const sortedRequest = request.rows.sort((a, b) => b.id - a.id);
            res.status(200).json(sortedRequest);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    }
}

export default new RequestController();