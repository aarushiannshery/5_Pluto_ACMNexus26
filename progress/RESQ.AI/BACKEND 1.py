from flask import Flask, request, jsonify
import requests

app = Flask(__name__)
API_KEY = "9343ffc7a92e53fa40fcee705c478aa0"

# TO Get weather data
def get_weather(city):
    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"
    response = requests.get(url)
    return response.json()

# Risk prediction logic
def predict_risk(weather):
    temp = weather["main"]["temp"]
    humidity = weather["main"]["humidity"]
    rain = weather.get("rain", {}).get("1h", 0)

    risk = "Low"
    disaster = "None"

    if rain > 20:
        risk = "High"
        disaster = "Flood"
    elif temp > 40:
        risk = "High"
        disaster = "Heatwave"
    elif humidity > 85:
        risk = "Medium"
        disaster = "Storm"

    return risk, disaster