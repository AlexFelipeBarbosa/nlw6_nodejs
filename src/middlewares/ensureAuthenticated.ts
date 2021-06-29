import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  // Receber o Token
  const authToken = request.headers.authorization;

  // Validar se o Token está preenchido
  if (!authToken) {
    return response.status(401).end();
  }

  // Verificar se o Token é valido
  // Na variavel authToken consta no inicio dela a palavra: Bearer, será necessario separar isso do Token
  const [, token] = authToken.split(" "); // O Split separa tudo que está com espaço, desta forma desmembrar a palavra Bearer no Array

  try {
    // Verificar se o Token é valido
    const { sub } = verify(
      token,
      "896661721ead5fac595c6cfb0cc79537"
    ) as IPayload;

    // Recuperar informações do usuário
    request.user_id = sub;

    return next();
  } catch (err) {
    return response.status(401).end();
  }
}
