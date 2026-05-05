const express = require('express');
const cors = require('cors'); // <--- A nossa nova chave de segurança
const app = express();

// 1. Liberamos a porta para qualquer site (como o seu na Hostinger) poder enviar dados
app.use(cors());

// 2. Permitimos que o servidor entenda JSON
app.use(express.json());

// 3. A nossa Rota de Webhook
app.post('/api/jade-webhook', (req, res) => {
    const dadosRecebidos = req.body;
    console.log("🚨 [SISTEMA JADE] ALERTA DE WEBHOOK RECEBIDO! 🚨");
    console.log("Hora:", new Date().toLocaleTimeString('pt-BR'));
    console.log("Conteúdo:", dadosRecebidos);

    res.status(200).send("Webhook processado pela Jade com sucesso.");
});

// 4. Rota de teste simples
app.get('/', (req, res) => {
    res.send("🟢 Motor Jade.IA Backend está ONLINE, com segurança CORS ativada e à escuta!");
});

// 5. Ligar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor a rodar na porta ${PORT}`);
});
