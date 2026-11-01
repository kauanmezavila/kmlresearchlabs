import os
import random
import logging
import requests
from pathlib import Path

import discord
from dotenv import load_dotenv
from discord import app_commands
from discord.ext import commands

from server import webStart
from triggers import *
from gifs import *
from data import *


load_dotenv()

TOKEN = os.getenv("TOKEN")

BASE_DIR = Path(__file__).resolve().parent
CEMPILA_VIDEO_PATH = BASE_DIR / "media" / "100Reais????.mp4"
SOFRER_MUSIC = BASE_DIR / "media" / "ate-que-durou.mp3"
JE_MUSIC = BASE_DIR / "media" / "je.wav"
DEVAGAR_VIDEO = BASE_DIR / "media" / "CalmaPaizin.mp4"

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)

logger = logging.getLogger("resenhudo")



class Bot(commands.Bot):
    async def setup_hook(self):
        await self.tree.sync()
        logger.info("Slash commands sincronizados")


intents = discord.Intents.default()
intents.message_content = True

bot = Bot(
    command_prefix="!",
    intents=intents,
)


@bot.event
async def on_ready():
    activity = discord.Activity(
        type=discord.ActivityType.watching,
        name="Sou OpenSource! https://kmlresearchlabs.vercel.app/resenhudo",
    )

    await bot.change_presence(
        status=discord.Status.online,
        activity=activity,
    )

    logger.info("%s ACORDOU", bot.user)


@bot.event
async def on_message(message: discord.Message):
    if message.author.bot:
        return

    texto = message.content.lower()

    try:
        if any(
            trigger.lower() in texto
            for trigger in SIX_SEVEN_TRIGGERS
        ):
            if random.random() < 0.85 and GIFS_67:
                await message.reply(random.choice(GIFS_67))

        elif any(
            trigger.lower() in texto
            for trigger in RESENHA_TRIGGERS
        ):
            if random.random() < 0.85 and GIFS_RESENHA:
                await message.reply(random.choice(GIFS_RESENHA))

        elif any(
            trigger.lower() in texto
            for trigger in CEMPILA_TRIGGERS
        ):
            if random.random() < 0.85:
                if CEMPILA_VIDEO_PATH.is_file():
                    await message.reply(
                        file=discord.File(
                            str(CEMPILA_VIDEO_PATH)
                        )
                    )
                else:
                    logger.error(
                        "Vídeo não encontrado: %s",
                        CEMPILA_VIDEO_PATH,
                    )

        elif any(
            trigger.lower() in texto
            for trigger in JE_TRIGGERS
        ):
            if random.random() < 0.85:
                if JE_MUSIC.is_file():
                    await message.reply(
                        file=discord.File(
                            str(JE_MUSIC)
                        )
                    )
                else:
                    logger.error(
                        "Áudio não encontrado: %s",
                        JE_MUSIC,
                    )

        
        elif any(
            trigger.lower() in texto
            for trigger in DEVAGAR_TRIGGERS
        ):
            if random.random() < 0.85:
                if DEVAGAR_VIDEO.is_file():
                    await message.reply(
                        file=discord.File(
                            str(DEVAGAR_VIDEO)
                        )
                    )
                else:
                    logger.error(
                        "Vídeo não encontrado: %s",
                        DEVAGAR_VIDEO,
                    )
            

    except discord.HTTPException:
        logger.exception(
            "Calma rapaziada, deu red aqui."
        )

    finally:
        await bot.process_commands(message)

@bot.tree.command(
    name="ping",
    description="Verifica a latência do bot",
)
async def ping(interaction: discord.Interaction):
    ms = round(bot.latency * 1000)

    await interaction.response.send_message(
        f"🏓 Pong! Latência: {ms} ms",
        ephemeral=True,
    )

@bot.tree.command(
    name="luck",
    description="Frase aleatória",
)
async def luck(interaction: discord.Interaction):
    def fortune():
        url = "https://dumbapis.com/fortune"

        try:
            response = requests.get(url, timeout=10)
            response.raise_for_status()

            data = response.json()
            return data["fortune"]

        except requests.RequestException as e:
            return f"Erro ao consultar a API: {e}"
        except (ValueError, KeyError):
            return "Erro: resposta inválida da API."

    texto = f"""**Uma frase, para VOCÊ**
> {fortune()}
"""
    
    await interaction.response.send_message(
        texto,
        ephemeral=True,
    )

@bot.tree.command(
    name="info",
    description="Infos do bot",
)
async def info(interaction: discord.Interaction):

    texto = """**Resenhudo**
O Bot mais RESENHA do Brasil

- Maintainer: ByKurebo
[https://github.com/kauanmezavila]

- Sou OPEN SOURCE!
[https://kmlresearchlabs.vercel.app/resenhudo]

Powered by KML Research Labs
    """

    await interaction.response.send_message(
        texto,
        ephemeral=True,
        suppress_embeds=True,
    )


@bot.tree.command(
    name="serie",
    description="Sorteia um episódio resenha",
)
async def serie(interaction: discord.Interaction):
    if not EPISODIOS_RESENHA:
        await interaction.response.send_message(
            "Não há episódios cadastrados.",
            ephemeral=True,
        )
        return

    serie_nome, temporada, episodio, titulo, nota = (
        random.choice(EPISODIOS_RESENHA)
    )

    resposta = (
        f"🎬 **{serie_nome}**\n"
        f"📺 Temporada {temporada}, episódio {episodio}\n"
        f"🎞️ **{titulo}**\n"
        f"⭐ Nota da curadoria: {nota}/10"
    )

    await interaction.response.send_message(resposta)


@bot.tree.command(
    name="sofrer",
    description="Sofra por amor escutando o Periclão",
)
@app_commands.describe(
    user="Quem tá na sofrência por amor",
)
async def sofrer(
    interaction: discord.Interaction,
    user: discord.Member | None = None,
):
    if not SOFRER_MUSIC.is_file():
        logger.error(
            "Música não encontrada: %s",
            SOFRER_MUSIC,
        )

        await interaction.response.send_message(
            "❌ A música não foi encontrada.",
            ephemeral=True,
        )
        return

    alvo = user or interaction.user

    resposta = (
        f"💔 {alvo.mention}, o bar te espera :fist::pensive::tumbler_glass:\n"
        "🎶 **Até Que Durou — Periclão**"
    )

    try:
        await interaction.response.send_message(
            content=resposta,
            file=discord.File(
                str(SOFRER_MUSIC),
                filename="ate-que-durou.mp3",
            ),
        )
    except discord.HTTPException:
        logger.exception(
            "Erro ao enviar a música no comando /sofrer."
        )

        if not interaction.response.is_done():
            await interaction.response.send_message(
                "❌ Não consegui enviar a música. "
                "Verifique o tamanho do arquivo e os limites do Discord.",
                ephemeral=True,
            )


@bot.tree.command(
    name="filme",
    description="Sorteia um filme ABSOLUTE CINEMA",
)
@app_commands.describe(
    categoria="Gênero do filme (opcional)",
)
async def filme(
    interaction: discord.Interaction,
    categoria: str | None = None,
):
    filmes = FILMES_RESENHA

    if categoria:
        categoria_normalizada = categoria.strip().casefold()

        filmes = [
            item
            for item in FILMES_RESENHA
            if item[2].casefold() == categoria_normalizada
        ]

    if not filmes:
        await interaction.response.send_message(
            "🎬 Não encontrei filmes nessa categoria.",
            ephemeral=True,
        )
        return

    titulo, ano, genero, nota = random.choice(filmes)

    resposta = (
        f"🎬 **{titulo} ({ano})**\n"
        f"🎭 Gênero: {genero}\n"
        f"⭐ Nota da curadoria: {nota}/10"
    )

    await interaction.response.send_message(resposta)



if __name__ == "__main__":
    if TOKEN:
        webStart()
        bot.run(TOKEN)
    else:
        logger.warning(
            "[DEV] Arquivo carregado, token ausente."
        )