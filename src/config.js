import dotenv from 'dotenv'

const config = {
 port: process.env.PORT || 3001,
 MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/website',
 JWT_SECRET: process.env.JWT_SECRET || 'AfsdfgssfADehghy3665etGWSFadfq22gfdGBDG_trty77',
}


export { config };