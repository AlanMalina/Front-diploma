import pool from "../first-test-postgre/db.js"
import fileService from "../first-test-postgre/fileService.js"
import bcrypt from 'bcrypt' 
import JwtToken from "./JWT-token.js" 
import jwt from 'jsonwebtoken'
import { secretKey } from "./JWT-token.js"
import cookie from "cookie-parser"

class PostController{
    async create(req, res){
        try{
            const {content, goal, appointer, deadline, user_id} = req.body
            const picture = fileService.saveFile(req.files.picture)

            const post = await pool.query(
                'INSERT INTO posts (picture, content, goal, appointer, deadline, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING * ', 
                [picture, content, goal, appointer, deadline, user_id])

            res.status(200).json(post.rows)

        }catch(e){
            res.status(500).json(e)
        }
    }

    async addUser(req, res) {
        try {
          const { email, password, userName, userSurname } = req.body;
      
          const saltRounds = 10;
          const hashedPassword = await bcrypt.hash(password, saltRounds);

          const existingEmail = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
            if(existingEmail.rows.length > 0){
                return res.status(400).json({message: 'This email is already registered!'})
            }
          const user = await pool.query(
            'INSERT INTO users (email, password, userName, userSurname) VALUES ($1, $2, $3, $4) RETURNING *',
            [email, hashedPassword, userName, userSurname]
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


    async getUserProfile(req, res) {
        const {id} = req.params
        try {
            // const accessToken = req.cookies["ACCESS_TOKEN"];
            // const validToken = jwt.verify(accessToken, secretKey);
            // const user_id = validToken.id;
            
            const posts = await pool.query('SELECT posts.*, users.username AS user_name, users.usersurname AS user_surname, users.following AS following FROM posts JOIN users ON posts.user_id = users.id WHERE user_id = $1', [id]);
            
            if (posts.rows.length === 0) {
                return res.status(404).json({ message: 'User not found' });
            }

            const sortedPosts = posts.rows.sort((a, b) => b.id - a.id);
            
            res.status(200).json(sortedPosts);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    }
    

    async getAll(req, res) {
        try {
            const posts = await pool.query('SELECT posts.*, users.username AS user_name, users.usersurname AS user_surname FROM posts JOIN users ON posts.user_id = users.id');
            const sortedPosts = posts.rows.sort((a, b) => b.id - a.id);
            res.status(200).json(sortedPosts);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    }
    


    async getOne(req, res){
        const {id} = req.params
        try{
            const post = await pool.query('SELECT posts.*, users.username AS user_name, users.usersurname AS user_surname FROM posts JOIN users ON posts.user_id = users.id WHERE posts.id = $1', [id]);
            if (post.rows.length === 0)
            {
                return res.status(404).json({error: "Post not found"})
            }
            return res.status(200).json(post.rows)
        }catch(e){
            res.status(500).json(e)
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

    async deleteOne(req, res){
        const { id } = req.params;
        try{
            const post = await pool.query('DELETE FROM posts WHERE id = $1 RETURNING *', [id]);
            if (post.rows.length === 0) {
                return res.status(404).json({ error: "Post not found" });
            }
            return res.json(post.rows[0]);
        } catch(e) {
            res.status(500).json(e);
        }
    }

    async deleteAll(req, res){
        try{
            const post = await pool.query('DELETE FROM posts ');
            return res.json(post.rows[0]);
        } catch(e) {
            res.status(500).json(e);
        }
    }

    async update(req, res){
        try{
            const{
                id, content, goal, appointer
            } = req.body
            const post = await pool.query('update posts set content = $1, goal = $2, appointer = $3 where id=$4 returning *', [content, goal, appointer,id])
            res.json(post.rows)
    
        }catch(e){
            res.status(500).json(e.message)
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

    async getPostsCount(req, res){
        try{
            const {user_id} = req.params
             await pool.query(
            // 'SELECT * FROM posts WHERE user_id = $1', 
            'UPDATE users SET postsCount = (SELECT COUNT(*) FROM posts WHERE posts.user_id = users.id)',
           )

            const getPostsCount = await pool.query(
                'SELECT postsCount FROM users WHERE id = $1', 
                [user_id]
            )

            res.status(200).json(getPostsCount.rows[0])
        }
        catch(e){
            res.status(500).json({message: e.message})
        }
    }
    
    

}

export default new PostController();