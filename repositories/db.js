import Sequelize from 'sequelize'

const sequelize = new Sequelize(
  '',
  {
    dialect: 'postgres',
    define: { timestamps: false }
  }
)

export default sequelize
