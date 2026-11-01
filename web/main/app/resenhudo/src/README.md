<div align="center">
  <h1>Resenhudo</h1>
  <p>O bot mais resenha do Brasil no seu discord!</p>
  <p><b>v0.0.2: Apreciador da resenha</b></p>
  <img src="media/THEPCISTA.jpg">
</div>

## O que é?

Resenhudo, é o bot mestre da resenha; não importa a situação, ele estará lá pronto para fazer os membros rirem!

## Instalação

Instale no seu servidor clicando [aqui](https://discord.com/oauth2/authorize?client_id=1564434767179686079&permissions=125952&integration_type=0&scope=bot)

## Resenhas disponíveis

| Tipo    | Nome        | Ação                                                             |
| ------- | ----------- | ---------------------------------------------------------------- |
| Trigger | 67          | Responde mensagens relacionadas a 67 com um gif                  |
| Trigger | Resenha     | Responde mensagens relacionadas a 'resenha' com um gif           |
| Trigger | Cem reais   | Responde mensagens relacionadas a '100 reais' com um vídeo       |
| Trigger | JE          | Responde mensagens relacionadas a Jeffrey Epstein com uma música |
| Trigger | Devagar Pai | Responde mensagens relacionadas a 'devagar' com um vídeo         |
| Comando | /sofrer     | Toca uma do periclão, pode marcar alguém                         |
| Comando | /filme      | Aleatoriza um filme                                              |
| Comando | /series     | Aleatoriza uma série                                             |
| Comando | /luck       | Aleatoriza uma frase                                             |

## Arquitetura

O bot utiliza o framework discord.py, além disso, o código utiliza de uma infraestrutura modular, aonde ações do bot estão em [bot.py](https://github.com/kauanmezavila/resenhudo/blob/main/bot.py), os triggers para ações em [triggers.py](https://github.com/kauanmezavila/resenhudo/blob/main/triggers.py), e os gifs em [gifs.py](https://github.com/kauanmezavila/resenhudo/blob/main/gifs.py)

### **Como o bot fica on 24/7 no Render gratuito?**

Um guiazinho pra você amigo indie hacker sem dinheiro (igual eu):

1. Crie uma rota no seu bot /health
2. Va no [Uptimerobot](uptimerobot.com)
3. Coloque a rota /health lá pra cada 10-5 min
4. Pronto! O bot nunca dorme.
