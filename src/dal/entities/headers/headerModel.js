import mongoose from 'mongoose'
import headerSchema from './headerSchema'

const Header = mongoose.model('Header', headerSchema)
export default Header