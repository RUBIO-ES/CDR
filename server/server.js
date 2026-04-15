require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middlewares
app.use(express.json());
app.use(cors()); // Importante para que React se conecte

// Conexión a MongoDB Atlas
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
  .then(() => console.log("✅ Conexión exitosa a MongoDB Atlas (BD: FinZed)"))
  .catch(err => {
    console.error("❌ Error de conexión:");
    console.error(err.message);
  });

// Esquema de Usuario (Asegúrate que coincida con tu Login)
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true }
}, { collection: 'User' }); // Esto fuerza a que use la colección 'User'

const User = mongoose.model('User', UserSchema);

// --- RUTAS API ---

// Registro
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const emailLimpio = email.toLowerCase().trim();
    const existe = await User.findOne({ email: emailLimpio });
    
    if (existe) return res.status(400).json({ message: "El correo ya existe" });

    const nuevoUsuario = new User({ email: emailLimpio, password: password.trim() });
    await nuevoUsuario.save();
    
    res.status(201).json({ message: "OK" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor al registrar" });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const emailLimpio = email.toLowerCase().trim();
    const user = await User.findOne({ email: emailLimpio, password: password.trim() });

    if (user) {
      res.status(200).json({ 
        message: "OK", 
        user: { email: user.email, id: user._id } 
      });
    } else {
      res.status(401).json({ message: "Credenciales incorrectas" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error de conexión en el login" });
  }
});

// Puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor listo en puerto ${PORT}`));