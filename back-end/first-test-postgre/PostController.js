import pool from "../first-test-postgre/db.js"
import fileService from "../first-test-postgre/fileService.js"
import bcrypt from 'bcrypt' 

class PostController{
    async create(req, res){
        try{
            const {content, goal, appointer, deadline, user_id} = req.body
            const picture = fileService.saveFile(req.files.picture)
            // const avatar = fileService.saveFile(req.files.avatar)

            // const post = await pool.query('INSERT INTO posts (author, title, content) VALUES ($1, $2, $3) RETURNING *', [author,title,content])
            const post = await pool.query(
                'INSERT INTO posts (picture, content, goal, appointer, deadline, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', 
                [picture, content, goal, appointer, deadline, user_id])
            res.status(200).json(post.rows)

        }catch(e){
            res.status(500).json(e)
        }
    }

    async addUser(req, res) {
        try {
          const { email, password, userName, userSurname } = req.body;
      
          // Hash the password using bcrypt before storing it
          const saltRounds = 10; // Adjust this value as needed
          const hashedPassword = await bcrypt.hash(password, saltRounds);

          const existingEmail = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
            if(existingEmail.rows.length > 0){
                return res.status(400).json({message: 'This email is already registered!'})
            }
          const user = await pool.query(
            'INSERT INTO users (email, password, userName, userSurname) VALUES ($1, $2, $3, $4) RETURNING *',
            [email, hashedPassword, userName, userSurname]
          );
          

          
          res.status(200).json(user.rows);
        } catch (e) {
          res.status(500).json(e);
        }
      }

    async getAll(req, res){
        try{
            const posts = await pool.query('select * from posts')
            res.status(200).json(posts.rows)
        }catch(e){
            res.status(500).json(e)
        }
    }


    async getOne(req, res){
        const {id} = req.params
        try{
            const post = await pool.query('select * FROM posts where id = $1', [id]);
            if (post.rows.length === 0)
            {
                return res.status(404).json({error:"Post not found"})
            }
            return res.status(200).json(post.rows)
        }catch(e){
            res.status(500).json(e)
        }
    }

    async getOneUser(req, res){
        const {id} = req.params
        try{
            const user = await pool.query('select * FROM users where id = $1', [id]);
            if (user.rows.length === 0)
            {
                return res.status(404).json({error:"User not found"})
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
                id,author,title,content 
            } = req.body
            const post = await pool.query('update posts set author = $1, title = $2, content = $3 where id=$4 returning *', [author,title,content,id])
            res.json(post.rows)
    
        }catch(e){
            res.status(500).json(e.message)
        }
    }

}

export default new PostController();