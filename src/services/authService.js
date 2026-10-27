const API_URL = "http://localhost:8080/api/v1/auth";

export const authService = {
  login: async (email, password) => {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Credenciais inválidas ou erro no servidor");
    }

    return await response.json();
  },

  register: async (dadosBasicos) => {
    const payload = {
      nome: dadosBasicos.nome,
      email: dadosBasicos.email,
      password: dadosBasicos.password,
      fcmToken: dadosBasicos.fcmToken || null
    };

    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Erro ao realizar o cadastro no servidor");
    }

    const text = await response.text();
    return text ? JSON.parse(text) : { success: true };
  }
};