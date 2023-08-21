import subprocess

# Prompt the user for a commit message
commit_message = 'design FAQ section'

# Run git commands
try:
    subprocess.run(["git", "add", "."], check=True)
    subprocess.run(["git", "commit", "-m", commit_message], check=True)
    subprocess.run(["git", "push", "origin", "main"], check=True)
    print("Git commands executed successfully.")
except subprocess.CalledProcessError as e:
    print(f"Error executing Git command: {e}")
