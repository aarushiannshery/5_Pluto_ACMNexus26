def analyze_risk(weather):

    temp = weather["main"]["temp"]
    humidity = weather["main"]["humidity"]

    if temp > 310:
        return "Heatwave Risk"

    if humidity > 90:
        return "Flood Risk"

    return "Low Risk"
