from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib import colors
from reportlab.platypus import Table, TableStyle, Image
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.units import inch



import requests
import json
import pandas as pd
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split

# Fai una richiesta al tuo server Flask per ottenere i dati
response = requests.get('http://127.0.0.1:5000/get_dati')  # Sostituisci con l'URL del tuo server Flask

if response.status_code == 200:
    dati = response.json()
    
    # Estrai i dati ottenuti dalla risposta
    frequenzaAllenamentoString = dati["frequenzaAllenamentoString"]

    # Stampa i dati estratti dalla risposta
    print("Valore frequenzaAllenamentoString:", frequenzaAllenamentoString)




# Funzione per creare un PDF con una scheda di allenamento
def create_workout_pdf(workout_data, filename):
    c = canvas.Canvas(filename, pagesize=letter)
    
    # Imposta il font e le dimensioni del testo
    c.setFont("Helvetica", 12)

    # Aggiungi un rettangolo attorno al logo e alle scritte
    c.setLineWidth(0.5)  # Imposta uno spessore 
    c.rect(10, 660, 590, 128)  # c.rect(w left,h in down,w right,h up)
    c.setLineWidth(0.5) # Spessore linea verticale
    c.line(275, 790, 275, 660)  # (inclinazione destra,h up, inclinazione left,h down)
    y = 620
    day_line_v = 20  # Lunghezza delle linee verticali sezione day
    exercise_line_v = 140  # Lunghezza delle linee della sezione esercizio
    day_line_v_fixed = day_line_v
    exercise_line_v_fixed = exercise_line_v
    c.setLineWidth(0.5)  # Spessore linea orizzontale
    c.line(10, y, 600, y)  # (abbassa per aumentare L,up&down, alza per aumentare R,up&down)
    c.line(10, y, 10, y - day_line_v)  # Linea verticale a sinistra
    c.line(600, y, 600, y - day_line_v)  # Linea verticale a destra
    c.line(10, y - day_line_v, 600, y - day_line_v) # Linea orizzontale day

    for _ in range(4):
        c.line(10, y - day_line_v, 10 , y - exercise_line_v)  # Linea verticale a sinistra (orizzontale inferiore)
        c.line(600, y - day_line_v, 600 , y - exercise_line_v)  # Linea verticale a destra (orizzontale inferiore)
        c.line(10, y - exercise_line_v, 600, y - exercise_line_v) # Linea orizzontale esercizi
        c.line(305, y - day_line_v, 305, y - exercise_line_v)  # Linea verticale centrale
        day_line_v = day_line_v_fixed + day_line_v  # Lunghezza delle linee verticali sezione day
        exercise_line_v = exercise_line_v_fixed + exercise_line_v # Lunghezza delle linee della sezione esercizio

    # Blocco principale
    c.setFont("Helvetica-Bold", 20)
    c.drawString(300, 770, "PFit")
    logo = "img/logo.png"  
    c.drawImage(logo, 50, 690, width=200, height=100)
    c.setFont("Helvetica-Bold", 15)
    c.drawString(300, 750, "NOME COGNOME")  
    draw_bold_upper_text(c, 300, 720, "DURATA:", workout_data['durata'])
    draw_bold_upper_text(c, 300, 705, "SPLIT:", workout_data['split_allenamento'])
    draw_bold_upper_text(c, 300, 690, "SEDUTE:", str(workout_data['sedute']))
    draw_bold_upper_text(c, 300, 675, "OBIETTIVO:", workout_data['obiettivo'])


    # Inizializza la coordinata y per posizionare le sezioni degli esercizi
    section_y = 600
    # Aggiungi le sezioni per gli esercizi
    for exercise_section in workout_data['scheda']:
        # Aggiungi il nome della sezione
        section_name = exercise_section['section_name']
        draw_bold_upper_text(c, 10, section_y, "SEZIONE:", section_name)
        # Aggiungi gli esercizi con le informazioni
        y = section_y - 20  # Inizializza la coordinata y per posizionare gli esercizi
        for exercise in exercise_section['exercises']:
            # Aggiungi la foto dell'esercizio a sinistra
            exercise_image = 'img/prova.png'
            c.drawImage(exercise_image, 20, 500, width=100, height=100)

            # Aggiungi le specifiche a destra
            spec_text = f"{exercise['serie']}x{exercise['ripetizioni']} {exercise['gruppo_muscolare']} {exercise['nome']}"
            draw_bold_upper_text(c, 150, y, "", spec_text)
            y -= 20  # Sposta la coordinata y verso l'alto per il prossimo esercizio
        section_y = y - 20  # Sposta la coordinata y verso l'alto per la prossima sezione

    for _ in range(2): # Crea due pagine in più
        c.showPage()  # Passa alla pgina successiva
        day = "GIORNO"
        y = 760
        day_line_v = 20  # Lunghezza delle linee verticali sezione day
        exercise_line_v = 140  # Lunghezza delle linee della sezione esercizio
        day_line_v_fixed = day_line_v
        exercise_line_v_fixed = exercise_line_v
        c.setFont("Helvetica", 12)  # You can choose the font and size you prefer
        c.drawString(20, 745, day)  # Adjust the coordinates (x, y) as needed
        c.setLineWidth(0.5)  # Spessore linea orizzontale
        c.line(10, y, 600, y)  # (abbassa per aumentare L,up&down, alza per aumentare R,up&down)
        c.line(10, y, 10, y - day_line_v)  # Linea verticale a sinistra
        c.line(600, y, 600, y - day_line_v)  # Linea verticale a destra
        c.line(10, y - day_line_v, 600, y - day_line_v) # Linea orizzontale day
        for _ in range(5):
            c.line(10, y - day_line_v, 10 , y - exercise_line_v)  # Linea verticale a sinistra (orizzontale inferiore)
            c.line(600, y - day_line_v, 600 , y - exercise_line_v)  # Linea verticale a destra (orizzontale inferiore)
            c.line(10, y - exercise_line_v, 600, y - exercise_line_v) # Linea orizzontale esercizi
            c.line(305, y - day_line_v, 305, y - exercise_line_v)  # Linea verticale centrale
            day_line_v = day_line_v_fixed + day_line_v  # Lunghezza delle linee verticali sezione day
            exercise_line_v = exercise_line_v_fixed + exercise_line_v # Lunghezza delle linee della sezione esercizio

        y_image_exercise_difference = 137
        y_image_exercise = 765
        y_image_exercise_difference_fixed = y_image_exercise_difference
        for _ in range(5):
            name_exercise = "prova"
            exercise_image_path = f'img/{name_exercise}.png'
            c.drawImage(exercise_image, 20, y_image_exercise - y_image_exercise_difference, width=100, height=100) # lato sinistro

            c.drawImage(exercise_image, 320, y_image_exercise - y_image_exercise_difference, width=100, height=100) # lato destro

            y_image_exercise_difference = y_image_exercise_difference_fixed + y_image_exercise_difference

    c.save()

# Funzione per disegnare testo in grassetto e maiuscolo
def draw_bold_upper_text(canvas, x, y, label, text):
    canvas.setFont("Helvetica-Bold", 12)
    canvas.drawString(x, y, label)
    canvas.setFont("Helvetica", 12)
    canvas.drawString(x + 90, y, text.upper())

# Esempio di utilizzo
workout_data = {
    'durata': '       3 mesi',
    'split_allenamento': '       PUSH, PULL, LEG, UPPER, LEG',
    'sedute': '       5',
    'obiettivo': '       Aumento della forza',
    'scheda': [
        {
            'section_name': 'Sezione 1',
            'exercises': [
                {'nome': 'Push-up', 'gruppo_muscolare': 'Petto', 'serie': 3, 'ripetizioni': 15, 'image_path': 'img/prova.png'},
                {'nome': 'Squat', 'gruppo_muscolare': 'Gambe', 'serie': 4, 'ripetizioni': 12, 'image_path': 'img/prova.png'},
            ]
        },
        # Aggiungi altre sezioni e esercizi qui
    ]
}
create_workout_pdf(workout_data, 'scheda_allenamento.pdf')
