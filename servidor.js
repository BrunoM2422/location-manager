const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

const tokenBling = process.env.BLING_API_KEY;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/atualizar-localizacao", async (req, res) => {
  const { sku, localizacao } = req.body;

  const xml = `
    <?xml version="1.0" encoding="UTF-8"?>
    <produto>
      <codigo>${sku}</codigo>
      <localizacao>${localizacao}</localizacao>
    </produto>
  `;

  try {
    const resposta = await axios.post(
      `https://bling.com.br/Api/v2/produto/${sku}/json/`,
      null,
      {
        params: {
          apikey: tokenBling,
          xml: xml,
        },
      }
    );

    res.json({ mensagem: "Localização atualizada com sucesso!" });
  } catch (err) {
    console.error(err?.response?.data || err.message);
    res.status(500).json({ mensagem: "Erro ao atualizar." });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
