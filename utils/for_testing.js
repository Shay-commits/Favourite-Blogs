const dummy = (blogs) => {

    return 1
}


const totalLikes = (blogs) => {

    total = 0

    const result = blogs.map(x => total += x.likes)

    
    return Math.max(...result)
}

const favoriteBlog = (blog) => {

    total = 0

    const result = blog.map(x => x.likes)

    
const max = Math.max(...result)

const array1 = blog.map(x => x.likes )

const ans = array1.findIndex((x) => x == max)

return blog[ans]



}

module.exports = {
    dummy, totalLikes, favoriteBlog
}