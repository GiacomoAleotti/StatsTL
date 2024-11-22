import os
import datetime
import subprocess

def aggiorna_repository(output_directory, branch="main"):
    try:
        # Cambia la directory di lavoro
        os.chdir(output_directory)

        # Esegui `git add .`
        result = subprocess.run(["git", "add", "."], check=True, text=True, capture_output=True)
        print(result.stdout)

        # Esegui `git commit`
        date = datetime.datetime.now()
        commit_message = f"Auto-commit {date.strftime('%Y-%m-%d %H:%M:%S')}"
        result = subprocess.run(["git", "commit", "-m", commit_message], check=True, text=True, capture_output=True)
        print(result.stdout)

        # Esegui `git push`
        result = subprocess.run(["git", "push", "origin", branch], check=True, text=True, capture_output=True)
        print(result.stdout)

        print("Repository aggiornato con successo!")

    except subprocess.CalledProcessError as e:
        print(f"Errore durante l'esecuzione del comando: {e.cmd}")
        print(e.stderr)

    except Exception as e:
        print(f"Errore generico: {e}")

# Esempio di utilizzo
info_object = {
    'output-directory': 'C:/Users/giaco/Desktop/SitoTL',  # Sostituisci con la directory del tuo progetto
}

aggiorna_repository(info_object['output-directory'])
