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
            const request = await pool.query('SELECT * FROM requests WHERE user_id = $1 AND status = \'false\'', [id]);
            const sortedRequest = request.rows.sort((a, b) => b.id - a.id);
            res.status(200).json(sortedRequest);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    }

    async getAll(req, res) {
        try {
            const request = await pool.query('SELECT requests.*, users.username AS user_name, users.usersurname AS user_surname, users.avatar AS avatar FROM requests JOIN users ON requests.user_id = users.id WHERE status = \'false\'');
            const sortedRequest = request.rows.sort((a, b) => b.id - a.id);
            res.status(200).json(sortedRequest);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    async addVolunteerReq(req, res){
        const {user_id, request_id} = req.body
            try{
                // Перевірка ролі користувача
            const user_role_result = await pool.query(
                'SELECT role FROM users WHERE id = $1',
                [user_id]
            );

            if (user_role_result.rows.length === 0) {
                return res.status(404).json({ message: 'User not found' });
            }

            const user_role = user_role_result.rows[0].role;
            if (user_role !== 'volunteer') {
                return res.status(403).json({ message: 'Permission denied. Only volunteers can approve requests' });
            }

            const get_V_req = await pool.query('SELECT * FROM volunteer_requests WHERE user_id = $1 AND request_id = $2',
             [user_id, request_id])
            if(get_V_req.rows.length !== 0){
                return res.status(400).json({message: 'You already approved this request'})
            }
            
            const get_V_req_user_id = await pool.query(
                'SELECT user_id FROM volunteer_requests WHERE request_id = $1',
                [request_id]
            );
    
            if (get_V_req_user_id.rows.length !== 0) {
                const existingUserId = get_V_req_user_id.rows[0].user_id;
                if (existingUserId !== user_id) {
                    return res.status(400).json({ message: 'This request has already been approved by another user' });
                } else {
                    return res.status(400).json({ message: 'You already approved this request' });
                }
            }
    

            const req_status_result = await pool.query('SELECT status FROM requests WHERE id = $1',
                [request_id])
            if (req_status_result.rows.length === 0) {
                return res.status(404).json({ message: 'Request not found' });
            }
            const req_status = req_status_result.rows[0].status;
            // Якщо статус false, оновити його на true
            if (!req_status) {
                await pool.query('UPDATE requests SET status = true WHERE id = $1', [request_id]);
            }
            
            const V_requests = await pool.query('INSERT INTO volunteer_requests (user_id, request_id) VALUES ($1, $2) RETURNING *',
        [user_id, request_id])

            res.status(200).json(V_requests.rows[0])
        }
        catch (err) {
            res.status(500).json(err);
        }
    }

    async getAccept(req, res){
        const {id} = req.params
        try{
            const V_requests = await pool.query('SELECT * FROM volunteer_requests WHERE user_id = $1',
            [id])
            const V_requests_id = []
            if (V_requests.rows.length > 0) {
                V_requests.rows.forEach(row => {
                    V_requests_id.push(row.request_id);
                });
            } else {
                return res.status(404).json({ message: "No requests found for this user." });
            }
            console.log(V_requests_id)

            if (V_requests_id.length > 0) {
                const requests = await pool.query('SELECT * FROM requests WHERE id = ANY($1::int[])', [V_requests_id]);
                const sortedPosts = requests.rows.sort((a, b) => b.id - a.id);
                res.status(200).json(sortedPosts);
            } else {
                return res.status(404).json({ message: "No requests found for this user." });
            }
        }
        catch(e){
            res.status(500).json(e);
        }
    }

    async getWaiting(req, res) {
        const {id} = req.params
        try {
            const request = await pool.query('SELECT * FROM requests WHERE user_id = $1 AND status = \'true\'', [id]);
            
            if(request.rows.length === 0){
                return res.status(404).json({message: "You have no requests!"})
            }
            
            const sortedRequest = request.rows.sort((a, b) => b.id - a.id);
            res.status(200).json(sortedRequest);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    }

    async finishRequest(req, res) {
        const { id } = req.params;
        try {
            // Спочатку видаляємо записи з таблиці volunteer_requests
            const v_request = await pool.query('DELETE FROM volunteer_requests WHERE request_id = $1 RETURNING *', [id]);
            if (v_request.rows.length === 0) {
                return res.status(404).json({ error: "Volunteer request not found" });
            }
    
            // Тепер видаляємо запис з таблиці requests
            const request = await pool.query('DELETE FROM requests WHERE id = $1 RETURNING *', [id]);
            if (request.rows.length === 0) {
                return res.status(404).json({ error: "Request not found" });
            }
    
            return res.status(200).json({ request: request.rows[0], volunteerRequest: v_request.rows[0] });
        } catch (e) {
            console.error(e);
            res.status(500).json(e);
        }
    }
    

}

export default new RequestController();