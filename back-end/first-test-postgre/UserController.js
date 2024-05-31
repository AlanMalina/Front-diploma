import pool from "../first-test-postgre/db.js"
import fileService from "../first-test-postgre/fileService.js"
import bcrypt from 'bcrypt' 
import JwtToken from "./JWT-token.js"
import { query } from "express";

class UserController{

    async addUser(req, res) {
        try {
        const { email, password, userName, userSurname, role } = req.body;
    
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const existingEmail = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
            if(existingEmail.rows.length > 0){
                return res.status(400).json({message: 'This email is already registered!'})
            }
        const user = await pool.query(
            'INSERT INTO users (email, password, userName, userSurname, role) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [email, hashedPassword, userName, userSurname, role]
        );
        const accessToken = JwtToken.generateAccessToken(user.rows[0]);
        
        res.cookie('ACCESS_TOKEN', accessToken, {
            maxAge: 60*60*24*30*1000,
            httpOnly: true,
            secure: true, // Токен передається лише через HTTPS
            sameSite: 'strict' // Встановлення атрибута SameSite
        })
        
        res.json({ token: accessToken });
        } catch (e) {
        res.status(500).json(e);
        }
    }

    async addVolunteer(req, res) {
        try {
            const {role} = req.params
            const { email, password, userName, userSurname } = req.body;
        
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const existingEmail = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
                if(existingEmail.rows.length > 0){
                    return res.status(400).json({message: 'This email is already registered!'})
                }
            const user = await pool.query(
                'INSERT INTO users (email, password, userName, userSurname, role) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                [email, hashedPassword, userName, userSurname, role]
            );
            const accessToken = JwtToken.generateAccessToken(user.rows[0]);
            
            
            res.json({ token: accessToken });
        } catch (e) {
        res.status(500).json(e);
        }
    }

    async logIn(req, res) {
        try{
            const {email, password} = req.body
            const user = await pool.query('SELECT * FROM users WHERE email = $1', [email])     

            if (!user.rows.length > 0) {
                return res.status(400).json({ message: 'User is not found!' });
            }  
            
            const hashedPassword = user.rows[0].password;
            const comparedPassword = await bcrypt.compare(password, hashedPassword);

            if (!comparedPassword) {
                return res.status(400).json({ message: 'Wrong password!' });
            }else {
                const accessToken = JwtToken.generateAccessToken(user.rows[0]);
                res.cookie('ACCESS_TOKEN', accessToken, {
                    maxAge: 60*60*24*30*1000,
                    httpOnly: true,
                    secure: true, // Токен передається лише через HTTPS
                    sameSite: 'strict' // Встановлення атрибута SameSite
                })

                return res.json({ token: accessToken });
            }

        }catch(err){
            res.status(500).json(err);
        }
        
    }


    async getMyProfile(req, res) {
        const {id} = req.params 
        try {
            // const accessToken = req.cookies["ACCESS_TOKEN"];
            // const validToken = jwt.verify(accessToken, secretKey);
            // const user_id = validToken.id;
            const role  = await pool.query(
                'SELECT role FROM users WHERE id = $1',
                [id]
            )

            const donorProf = await pool.query(
                'SELECT username, usersurname, avatar FROM users WHERE id = $1',
                [id]
            );
            const volunteerProf = await pool.query(
                "SELECT posts.*, users.username AS user_name, users.usersurname AS user_surname, users.avatar AS avatar FROM posts JOIN users ON posts.user_id = users.id WHERE user_id = $1", 
                [id]);
    
            const militaryProf = await pool.query(
                'SELECT username, usersurname, avatar FROM users WHERE id = $1',
                [id])
    

            if(role.rows[0].role === 'donor'){
                res.status(200).json(donorProf.rows);
            }else if(role.rows[0].role === 'volunteer'){
                if (volunteerProf.rows.length === 0) {
                    return res.status(404).json({ message: 'User not found' });
                }
                
                const sortedPosts = volunteerProf.rows.sort((a, b) => b.id - a.id);
                res.status(200).json(sortedPosts);
            }else if(role.rows[0].role === 'military'){
                // if (militaryProf.rows.length === 0) {
                //     return res.status(404).json({ message: 'User not found' });
                // }
                res.status(200).json(militaryProf.rows);
            }
            else{
                res.status(400).json({error: 'Wrong role'});
            }

        } catch (err) {
            res.status(500).json(err);
        }
    }

    async getOneUser(req, res){
        const {id} = req.params
        try{
            const user = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
            if (user.rows.length === 0)
            {
                return res.status(404).json({error: "User not found"})
            }
            return res.status(200).json(user.rows)
        }catch(e){
            res.status(500).json(e)
        }
    }

    async updateUser(req, res) {
        try {
            const { id } = req.params;
            const { username, usersurname, description } = req.body;
            let avatar;
            
            if (req.files && req.files.avatar) {
                // Якщо файл був завантажений, збережіть його і отримайте шлях
                avatar = fileService.saveFile(req.files.avatar);
            }
            
            // Отримуємо поточного користувача з бази даних
            const currentUser = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
            const currentData = currentUser.rows[0];
    
            // Створюємо об'єкт, який містить тільки передані дані, які не є пустими
            const updateFields = {};
            if (username) updateFields.username = username;
            else updateFields.username = currentData.username;
            if (usersurname) updateFields.usersurname = usersurname;
            else updateFields.usersurname = currentData.usersurname;
            if (avatar) updateFields.avatar = avatar;
            else updateFields.avatar = currentData.avatar;
            if (description) updateFields.description = description;
            else updateFields.description = currentData.description;
    
            const user = await pool.query(
                'UPDATE users SET username = $1, usersurname = $2, avatar = $3, description = $4 WHERE id = $5 RETURNING *',
                [updateFields.username, updateFields.usersurname, updateFields.avatar, updateFields.description, id]
            );
            const accessToken = JwtToken.generateAccessToken(user.rows[0]);
            res.json({ token: accessToken });
        } catch (e) {
            res.status(500).json(e.message);
        }
    }
    
    

    async postFollowing(req, res){
        const {user_id, username, following_user_id, following_username} = req.body
        try{
            const following = await pool.query(
                'INSERT INTO user_following (user_id, username, following_user_id, following_username) VALUES ($1, $2, $3, $4) RETURNING *',
                [user_id, username, following_user_id, following_username])

            res.json(following.rows[0])
        }
        catch(e){
            res.status(500).json({message: e.message})
        }
    }

    async getFollowingCount(req, res){
        const {id} = req.params;
        try {
            await pool.query(
                'UPDATE users SET followers = (SELECT COUNT(*) FROM user_following WHERE following_user_id = $1), following = (SELECT COUNT(*) FROM user_following WHERE user_id = $1) WHERE id = $1', 
                [id]
            );
            const getIds = await pool.query(
                'SELECT user_id, following_user_id FROM user_following WHERE user_id = $1 OR following_user_id = $1',
                [id]
            )
            const getCounts = await pool.query(
                'SELECT followers, following FROM users WHERE id = $1',
                [id]);
            const followingData = [...getIds.rows, ...getCounts.rows];
                // if (getCounts.rows.length === 0) {
                //     return res.status(404).json({ error: 'User not found' });
                // }
            return res.status(200).json(followingData);
        } catch(e) {
            res.status(500).json({message: e.message});
        }
    }

    async getPublicProfile(req, res) {
        const {id} = req.params 
        try{
            const volunteerProf = await pool.query(
                "SELECT posts.*, users.username AS user_name, users.usersurname AS user_surname, users.avatar AS avatar, users.description, users.following, users.followers, users.postsCount FROM posts JOIN users ON posts.user_id = users.id WHERE user_id = $1", 
                [id]);

            const sortedPosts = volunteerProf.rows.sort((a, b) => b.id - a.id);
            res.status(200).json(sortedPosts); 
        }
        catch(e){
            res.status(500).json({message: e.message});
        }
    }



}

export default new UserController();