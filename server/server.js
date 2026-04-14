require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// CONEXIÓN A ATLAS
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch(err => console.error("❌ Error Atlas:", err.message));

// MODELO
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true }
});
const User = mongoose.model('User', UserSchema, 'User');

// RUTAS API
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const existe = await User.findOne({ email: email.toLowerCase().trim() });
    if (existe) return res.status(400).json({ message: "El correo ya existe" });
    const nuevoUsuario = new User({ email: email.toLowerCase().trim(), password: password.trim() });
    await nuevoUsuario.save();
    res.status(201).json({ message: "OK" });
  } catch (error) {
    res.status(500).json({ message: "Error en servidor" });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email.toLowerCase().trim(), password: password.trim() });
    if (user) {
      res.status(200).json({ message: "OK", user: { email: user.email, id: user._id } });
    } else {
      res.status(401).json({ message: "Credenciales incorrectas" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error de conexión" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor en puerto ${PORT}`));