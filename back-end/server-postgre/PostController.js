import pool from "../server-postgre/db.js"
import fileService from "../server-postgre/fileService.js"


class PostController{
    // async create(req, res){
    //     try{
    //         const {content, goal, appointer, deadline, user_id} = req.body
    //         const picture = fileService.saveFile(req.files.picture)
            

    //         const post = await pool.query(
    //             'INSERT INTO posts (picture, content, goal, appointer, deadline, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING * ', 
    //             [picture, content, goal, appointer, deadline, user_id])

    //         res.status(200).json(post.rows)

    //     }catch(e){
    //         res.status(500).json(e)
    //     }
    // }

    async create(req, res) {

        try {
            const { 
                content, 
                goal = null, 
                appointer = null, 
                deadline = null, 
                user_id,
                link = null,
                extra_link = null,
                card = null,
                extra_card = null,
                iban = null,
                extra_iban = null
            } = req.body;
            
            let picture = null;
            if (req.files && req.files.picture) {
                picture = fileService.saveFile(req.files.picture);
            }
    
            let parsedDeadline = null;
            if (deadline) {
                const parsedDate = Date.parse(deadline);
                if (!isNaN(parsedDate)) {
                    parsedDeadline = new Date(parsedDate).toISOString();
                } else {
                    parsedDeadline = null; // Записуємо null, якщо дата некоректна
                }
            }
            if(!content){
                return res.status(400).json({ message: 'Please write a description for post!' });
            }
            if (!link && !extra_link && !card && !extra_card && !iban && !extra_iban) {
                return res.status(400).json({ message: 'Please bring any payment detail!' });
            }

            // Регулярний вираз для перевірки номера банківської карти
            const cardRegex = /^\d{16}$/;
            // Регулярний вираз для перевірки IBAN рахунку в Україні
            const ukrainianIbanRegex = /^UA\d{2}\d{6}\d{19}$/;
            // Регулярний вираз для перевірки формату посилання
            const linkRegex = /^(http(s)?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ;,./?%&=]*)?$/;

            if ((card && !cardRegex.test(card)) || (extra_card && !cardRegex.test(extra_card))) {
                return res.status(400).json({ message: 'Номер картки повинен містити тільки цифри і бути довжиною від 13 до 19 символів.' });
            }
            if ((iban && !ukrainianIbanRegex.test(iban)) || (extra_iban && !ukrainianIbanRegex.test(extra_iban))) {
                return res.status(400).json({ message: 'Номер IBAN повинен відповідати українському формату.' });
            }   
            if ((link && !linkRegex.test(link)) || (extra_link && !linkRegex.test(extra_link))) {
                return res.status(400).json({ message: 'Неправильний формат посилання.' });
            }  
            
            if((extra_link && !link) || (link && extra_link && link === extra_link) || 
                (extra_card && !card) || (card && extra_card && card === extra_card) || 
                (extra_iban && !iban) || (iban && extra_iban && iban === extra_iban)){
                    
                return res.status(400).json({ message: 'You can`t bring details in extra field if the main is empty, or paste same details!'})
            }

    
            const post = await pool.query(
                'INSERT INTO posts (picture, content, goal, appointer, deadline, user_id, link, extra_link, card, extra_card, iban, extra_iban) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *', 
                [picture, content, goal, appointer, parsedDeadline, user_id, link, extra_link, card, extra_card, iban, extra_iban]
            );
    
            res.status(200).json(post.rows);
        } catch (e) {
            res.status(500).json(e);
        }
    }
    

    async getAll(req, res) {
        try {
            const posts = await pool.query('SELECT posts.*, users.username AS user_name, users.usersurname AS user_surname, users.avatar AS avatar FROM posts JOIN users ON posts.user_id = users.id');
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
            const post = await pool.query('SELECT posts.*, users.username AS user_name, users.usersurname AS user_surname, users.avatar AS avatar FROM posts JOIN users ON posts.user_id = users.id WHERE posts.id = $1', [id]);
            if (post.rows.length === 0)
            {
                return res.status(404).json({error: "Post not found"})
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
            const {id} = req.params
            const{
                content, goal, appointer, deadline
            } = req.body
            const picture = fileService.saveFile(req.files.picture)
            const post = await pool.query('update posts set content = $1, goal = $2, appointer = $3, deadline = $4, picture = $5 where id=$6 returning *', [content, goal, appointer, deadline,picture, id])
            res.json(post.rows[0])
    
        }catch(e){
            res.status(500).json(e.message)
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