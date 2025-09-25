export default function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  // Simulación temporal sin base de datos
  const { email, password } = req.body;
  
  // Usuario de prueba
  if (email === 'test@test.com' && password === '123456') {
    return res.status(200).json({
      token: 'fake-jwt-token-for-testing',
      user: {
        id: '1',
        name: 'Usuario Test',
        email: 'test@test.com',
        role: 'user'
      }
    });
  }
  
  res.status(400).json({ message: 'Credenciales inválidas. Usa test@test.com / 123456' });
}