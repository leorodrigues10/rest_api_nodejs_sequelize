const Article = require('../model/Article');
const slugify = require('slugify')



module.exports.create = (req, res) => {

    const { title, article, categoryId } = req.body;

    console.log(title)
    console.log(article)
    console.log(categoryId)

    if (title == undefined || title === "" || title === " ") {
        return res.status(404).json({ message: "Title must be defined!" })
    }
    if (article == undefined || article === "" || article === " ") {
        return res.status(404).json({ message: "Article must be defined!" })
    }
    if (categoryId == undefined || categoryId === "" || categoryId === " ") {
        return res.status(404).json({ message: "CategoryId must be defined!" })
    }

    Article.create({
        title: title,
        slug: slugify(title),
        body: article,
        categoryId: categoryId
    }).then(article => res.status(201).json({ message: 'Article created', article }))

}

module.exports.findAll = (req, res) => {

    Article.findAll().then(article => {
        return res.status(200).json({ article });
    });

}

module.exports.findById = (req, res) => {


    const { id } = req.params;

    if (isNaN(id)) {
        return res.status(400).json({ message: 'Malformed article id!' })
    }

    Article.findOne({
        where: { id: id }
    }).then(article => {
        if (article === null) {
            return res.status(404).json({ message: 'Article not found!' })
        }

        return res.status(200).json({ article });
    });

}

module.exports.update = (req, res) => {

    const { id } = req.params;
    const { title, article, categoryId } = req.body;

    if (isNaN(id)) {
        return res.status(400).json({ message: 'Malformed category id!' })
    }

    Article.update(
        {
            title: title,
            slug: slugify(title),
            body: article,
            categoryId: categoryId
        },
        { where: { id: id } }

    ).then(article => {

        if (article[0] !== 1) {
            return res.status(404).json({ message: 'Article not found!!' })
        }
        return res.status(200).json({ message: 'Article updated successfully!!' })
    });
}

module.exports.delete = (req, res) => {
    const { id } = req.params;

    if (isNaN(id)) {
        return res.status(400).json({ message: 'Malformed category id!' })
    }

    Article.destroy({ where: { id: id } })
        .then(article => {

            if (article === 0) {
                return res.status(404).json({ message: 'Article not found!' })
            }

            return res.status(200).json({ message: 'Article delete successfully!' });
        });
}

module.exports.paginate = (req, res) => {
    
    const {num} = req.params;

    Article.findAndCountAll({
        limit: 3,
        offset: 3 * num
    }).then(article => res.status(200).json({article: article}));
}