const express = require('express');
const cors = require('cors'); 
const app = express();

app.use(cors());
app.use(express.json());

// A nossa Rota de Webhook (A porta que o Google vai chutar)
app.post('/api/jade-webhook', async (req, res) => {
    const dadosRecebidos = req.body;
    
    console.log("🚨 [SISTEMA JADE] WEBHOOK RECEBIDO!");
    console.log("Conteúdo:", dadosRecebidos);

    // O NOSSO ALVO NA HOSTINGER (Onde a notícia vai ser guardada)
    const urlHostinger = 'https://infodiretab3.com.br/api/receber_noticia.php';

    try {
        // A Jade pega na notícia e dispara para a sua Hostinger
        console.log("A enviar dados para a Hostinger...");
        const respostaHostinger = await fetch(urlHostinger, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosRecebidos)
        });

        const resultado = await respostaHostinger.text();
        console.log("✅ Hostinger confirmou o recebimento:", resultado);

        // Responde ao Google que o trabalho foi feito
        res.status(200).send("A Jade processou o Webhook e já injetou a notícia na Hostinger!");
    } catch (erro) {
        console.error("❌ Erro ao enviar para a Hostinger:", erro);
        res.status(500).send("Erro de comunicação com a base.");
    }
});

// Rota de teste simples
app.get('/', (req, res) => {
    res.send("🟢 Motor Jade.IA Backend está ONLINE e conectado diretamente ao InfoDireta!");
});

// Ligar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Motor da Jade a rodar na porta ${PORT}`);
});
