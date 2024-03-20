import pool from "../first-test-postgre/db.js"
import fileService from "../first-test-postgre/fileService.js"

class PostController{
    async create(req, res){
        try{
            const {author,title,content} = req.body
            const picture = fileService.saveFile(req.files.picture)
            const avatar = fileService.saveFile(req.files.avatar)

            // const post = await pool.query('INSERT INTO posts (author, title, content) VALUES ($1, $2, $3) RETURNING *', [author,title,content])
            const post = await pool.query('INSERT INTO posts (author, title, content, picture, avatare) VALUES ($1, $2, $3, $4, $5) RETURNING *', [author,title,content,picture,avatar])
            res.status(200).json(post.rows)

        }catch(e){
            res.status(500).json(e)
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
            if (post.rows.length===0)
            {
                return res.status(404).json({error:"Post not found"})
            }
            return res.status(200).json(post.rows)
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