const Category = require('../model/Category');
const slugify = require('slugify')

module.exports.create = (req, res) => {

    const { title } = req.body;

    if (title == undefined || title === "" || title === " ") {
        return res.status(400).json({ message: "Title must be defined!" })
    }

    Category.create({

        title: title,
        slug: slugify(title)

    }).then(category => {
        return res.status(201).json({ message: "Category created!!", data: category })
    });

};


module.exports.findById = (req, res) => {

    const { id } = req.params;

    if (isNaN(id)) {
        return res.status(400).json({ message: 'Malformed category id!' })
    }

    Category.findOne({ where: { id: id } })
        .then(category => {

            if (category === null) {
                return res.status(404).json({ message: 'Category not found!' })
            }

            return res.status(200).json({ category });
        });

}


module.exports.findAll = (req, res) => {

    Category.findAll().then(category => {
        return res.status(200).json({ category });
    });
};


module.exports.delete = (req, res) => {

    const { id } = req.params;

    if (isNaN(id)) {
        return res.status(400).json({ message: 'Malformed category id!' })
    }

    Category.destroy({ where: { id: id } })
        .then(category => {

            if (category === 0) {
                return res.status(404).json({ message: 'Category not found!' })
            }

            return res.status(200).json({ message: 'Category delete successfully!' });
        });

}

module.exports.update = (req, res) => {

    const { id } = req.params;
    const { title } = req.body;

    if (isNaN(id)) {
        return res.status(400).json({ message: 'Malformed category id!' })
    }

    Category.update(
        {
            title: title,
            slug: slugify(title.toLowerCase())
        },
        { where: { id: id } }

    ).then(category => {

        if (category[0] !== 1) {
            return res.status(404).json({ message: 'Category not found!!' })
        }
        return res.status(200).json({ message: 'Category updated successfully!!' })
    });
}