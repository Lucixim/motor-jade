// 1. Importamos as ferramentas necessárias (Express é o padrão da indústria para servidores web)
const express = require('express');
const app = express();

// 2. Dizemos ao servidor para entender mensagens no formato JSON (que é como a API do Google fala)
app.use(express.json());

// 3. Criamos a nossa "Porta de Escuta" (O Endpoint do Webhook)
// Quando o Google enviar um POST para o endereço '/api/jade-webhook', este código é ativado.
app.post('/api/jade-webhook', (req, res) => {
    
    // Capturamos a mensagem que a IA mandou
    const dadosRecebidos = req.body;

    console.log("🚨 [SISTEMA JADE] ALERTA DE WEBHOOK RECEBIDO! 🚨");
    console.log("Hora do recebimento:", new Date().toLocaleTimeString('pt-BR'));
    console.log("Conteúdo da Mensagem:", dadosRecebidos);

    // No futuro, é AQUI que vamos colocar o código para atualizar o HTML da Hostinger.
    // Por enquanto, apenas confirmamos que recebemos a mensagem.

    // 4. Respondemos ao Google dizendo: "Recebido com sucesso, pode parar de tentar enviar!"
    res.status(200).send("Webhook processado pela Jade com sucesso.");
});

// 5. Rota de teste simples no navegador só para ver se o servidor está online
app.get('/', (req, res) => {
    res.send("🟢 Motor Jade.IA Backend está ONLINE e a escuta!");
});

// 6. Ligamos o motor na porta 3000 (ou na porta que o servidor nuvem escolher)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor Backend InfoDireta a rodar na porta ${PORT}`);
});
