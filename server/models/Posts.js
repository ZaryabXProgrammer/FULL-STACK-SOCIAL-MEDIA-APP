module.exports = (sequelize, DataTypes) => {

    const Post = sequelize.define("Posts", {

        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },

    });

   Post.associate = (models) => {
       Post.hasMany(models.Comments, {
            onDelete: "cascade"
       })
       
       Post.hasMany(models.Likes, {
           onDelete: "cascade"
       })
    }





    return Post
}