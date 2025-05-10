# Sistema de Registro de Ponto - PWA

Este projeto implementa um aplicativo web progressivo (PWA) para registro de ponto de servidores públicos. O aplicativo é otimizado para dispositivos móveis e funciona em navegadores modernos em sistemas Android e iOS.

## Características

- **Design limpo e responsivo:** Interface simples e elegante, otimizada para telas de smartphones
- **Progressive Web App (PWA):** Pode ser instalado na tela inicial dos dispositivos móveis
- **Funcionamento offline:** Carrega mesmo sem conexão à internet
- **Geolocalização:** Captura a localização do servidor no momento do registro
- **Device Fingerprint:** Identifica o dispositivo utilizado para maior segurança
- **Visual alinhado:** Design seguindo o modelo das imagens de referência
- **Compatibilidade:** Funciona em Android e iOS via navegador

## Estrutura de Arquivos

```
sistema-registro-ponto/
├── index.html         # Página principal do aplicativo
├── manifest.json      # Configurações do PWA
├── service-worker.js  # Service Worker para funcionamento offline
├── offline.html       # Página exibida quando não há conexão
├── logo.svg           # Logo da prefeitura
├── favicon.ico        # Ícone do site
└── icons/             # Ícones em diversos tamanhos para o PWA
    ├── icon-72x72.png
    ├── icon-96x96.png
    ├── icon-128x128.png
    ├── icon-144x144.png
    ├── icon-152x152.png
    ├── icon-192x192.png
    ├── icon-384x384.png
    └── icon-512x512.png
```

## Requisitos para Deploy

- Servidor web com HTTPS (obrigatório para PWAs)
- Certificado SSL válido
- Servidor Apache, Nginx ou similar

## Instruções de Deploy

1. **Preparar o Backend API:**
   - Implemente os endpoints necessários:
     - `/carregar-dados` - Recebe fingerprint e geolocalização, retorna nome e matrícula
     - `/registrar-ponto` - Registra entrada ou saída do servidor

2. **Ajustar as URLs da API:**
   - Atualize as URLs no arquivo `index.html` para apontar para os endpoints reais
   - Exemplo:
     ```javascript
     const response = await fetch('https://sua-api.com/carregar-dados', {...});
     ```

3. **Gerar os ícones:**
   - Crie ícones em diferentes resoluções conforme listado na estrutura de arquivos
   - Use ferramentas como [PWA Asset Generator](https://github.com/onderceylan/pwa-asset-generator)

4. **Configurar HTTPS:**
   - Configure seu servidor para usar HTTPS
   - Um certificado Let's Encrypt gratuito é suficiente

5. **Upload dos arquivos:**
   - Faça o upload de todos os arquivos para o servidor
   - Verifique as permissões de arquivo

6. **Testar a instalação:**
   - Acesse o site através de um dispositivo móvel
   - Verifique se a opção "Adicionar à tela inicial" aparece no navegador

## Testando Localmente

1. Instale o [http-server](https://www.npmjs.com/package/http-server) com o comando:
   ```
   npm install -g http-server
   ```

2. Execute o servidor na pasta do projeto:
   ```
   http-server -p 8080
   ```

3. Acesse `http://localhost:8080` no navegador

## Aspectos de Segurança

- **Geolocalização:** Certifique-se de obter consentimento dos usuários para coletar esta informação
- **Armazenamento de dados:** Não armazene informações sensíveis no cache local
- **API de backend:** Implemente autenticação nas APIs para prevenir acessos não autorizados

## Personalização

Para personalizar o aplicativo conforme as necessidades da sua prefeitura:

- Substitua o `logo.svg` pelo brasão oficial
- Ajuste as cores no CSS (variáveis principais estão no topo do arquivo)
- Adapte os campos e fluxos conforme necessário

## Suporte e Contato

Para dúvidas ou suporte relacionados a este aplicativo, entre em contato com o departamento de TI da prefeitura.

---

© 2025 - Sistema de Registro de Ponto - Todos os direitos reservados