# from flask import Flask, render_template, request, jsonify
# from utils.sleep_logic import generate_sleep_suggestions

# app = Flask(__name__)

# # 🏠 Home Page
# @app.route("/")
# def home():
#     return render_template("index.html")


# # 📊 Result Page
# @app.route("/result")
# def result():
#     return render_template("result.html")


# # 🤖 AI API
# @app.route("/predict", methods=["POST"])
# def predict():
#     data = request.json

#     sleep_time = data.get("sleep_time")
#     goal = data.get("goal", "normal")
#     date = data.get("date")   # NEW

#     if not sleep_time:
#         return jsonify({
#             "status": "error",
#             "message": "Sleep time is required"
#         })

#     try:
#         results = generate_sleep_suggestions(sleep_time, goal, date)

#         # Best suggestion
#         best = max(results, key=lambda x: x["score"])

#         return jsonify({
#             "status": "success",
#             "data": results,
#             "best": best
#         })

#     except Exception as e:
#         return jsonify({
#             "status": "error",
#             "message": str(e)
#         })


# # 🚀 Run App
# if __name__ == "__main__":
#     app.run(debug=True)



from flask import Flask, render_template, request, jsonify
from utils.sleep_logic import generate_sleep_suggestions

app = Flask(__name__)


# 🌟 Welcome Page
@app.route("/")
def welcome():
    return render_template("welcome.html")


# 🏠 Main App Page
@app.route("/home")
def home():
    return render_template("index.html")

# 📊 RESULT PAGE (3 suggestions)
@app.route("/result")
def result():
    return render_template("result.html")


# 🎯 FINAL PAGE (selected best)
@app.route("/final")
def final():
    return render_template("final.html")


# 🤖 AI PREDICTION API
@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()

        sleep_time = data.get("sleep_time")
        goal = data.get("goal", "normal")
        date = data.get("date")

        # ❌ validation
        if not sleep_time:
            return jsonify({
                "status": "error",
                "message": "Sleep time is required"
            }), 400

        # 🧠 generate suggestions
        results = generate_sleep_suggestions(
            sleep_time_str=sleep_time,
            goal=goal,
            date_str=date
        )

        # ⭐ best suggestion
        best = max(results, key=lambda x: x["score"])

        return jsonify({
            "status": "success",
            "data": results,
            "best": best
        })

    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500


# 🚀 RUN SERVER
if __name__ == "__main__":
    app.run(debug=True)