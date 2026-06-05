import { createHash, isValidPassword } from '../utils/hashedPassword.utils.js';
import { userRepository } from '../repositories/index.repositories.js';
import { CustomNotFound } from '../utils/custom-exceptions.utils.js';
import { generateTokens, verifyToken } from '../utils/jwt.utils.js';
import { validation } from '../validation/session/session.val.js';

const postSession = async (body) => {
   body = validation.postSession(body);
   let result = null;

   if (body.type === 'register') {
      const exists = await userRepository.getUser({ email: body.email }, { _id: 1 });
      if (exists) throw new CustomNotFound('El email ya existe', 'info');
      body.password = await createHash(body.password);
      result = await userRepository.postUser(body);
   };

   if (body.type === 'login') {
      result = await userRepository.getUser({ email: body.email });
      if (!result) throw new CustomNotFound('El usuario no existe', 'info');
      const comparePassword = await isValidPassword(result, body.password);
      if (!comparePassword) throw new CustomNotFound('La contraseña es incorrecta', 'info');
      delete result.password;
   };

   if (!result) throw new CustomNotFound('Error de ejecucion', 'info');

   const { _id, active, role } = result;
   const { accessToken, refreshToken } = generateTokens({ _id, active, role });
   return { accessToken, refreshToken, result };
};

const postRefresh = async (refreshToken) => {
   if (!refreshToken) throw new CustomNotFound('Token vencido, vuelve a inciar sesión', 'info');
   const accessToken = verifyToken(refreshToken);
   if (!accessToken) throw new CustomNotFound('No se puede generar el accessToken', 'warn');
   return accessToken;
};

const getCurrent = async (user) => {
   const result = await userRepository.getUser({ _id: user._id }, { password: 0 });
   if (!result) throw new CustomNotFound('Error al traer los datos del usuarios', 'info');
   return { status: 'success', result };
};

export { postSession, postRefresh, getCurrent };