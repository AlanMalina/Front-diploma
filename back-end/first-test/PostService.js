import Post from "./Post.js";
import fileService from "./fileService.js";

class PostService{
    async create(post, picture
         //avatar
         ){
        const picName = fileService.saveFile(picture)
        // const avaName = fileService.saveFile(avatar)
        const createPost = await Post.create({...post,
              picture: picName
            // avatar: avaName
            });
        return createPost
    }

    async getAll(){
        const posts = await Post.find();
        return posts
    }

    async getOne(id){
        if(!id){
            throw new Error("Id didn't specified!")
        }
        const post = await Post.findById(id)
        return post;
    }

    async update(post){
        if(!post._id){
            throw new Error("Id didn't specified!")
        }
        const updatedPost = await Post.findByIdAndUpdate(post._id, post, {new: true})
        return updatedPost
    }

    async delete(id){
        if(!id){
            throw new Error("Id didn't specified!")
        }
        const post = await Post.findByIdAndDelete(id)
        return post
    }
}

export default new PostService();