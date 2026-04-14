from datetime import datetime, timedelta

def generate_sleep_suggestions(sleep_time_str, goal="normal", date_str=None):
    """
    sleep_time_str: "HH:MM" (24hr from frontend)
    goal: normal / early / late
    date_str: "YYYY-MM-DD" (optional)
    """

    # Parse time
    sleep_time = datetime.strptime(sleep_time_str, "%H:%M")

    # If date is given → combine date + time
    if date_str:
        date_obj = datetime.strptime(date_str, "%Y-%m-%d")
        sleep_time = sleep_time.replace(
            year=date_obj.year,
            month=date_obj.month,
            day=date_obj.day
        )

    cycle_minutes = 90

    # AI goal-based cycle selection
    if goal == "early":
        cycle_range = range(4, 6)   # 6–7.5 hrs
    elif goal == "late":
        cycle_range = range(5, 7)   # 7.5–9 hrs
    else:
        cycle_range = range(4, 7)   # normal

    results = []

    for cycles in cycle_range:
        wake_time = sleep_time + timedelta(minutes=cycle_minutes * cycles)

        hour = wake_time.hour

        # 🌅 Time category (AI feel)
        if hour < 6:
            tag = "🌙 Early Morning"
        elif hour < 12:
            tag = "☀️ Morning"
        elif hour < 18:
            tag = "🌤 Afternoon"
        else:
            tag = "🌆 Evening"

        # ⭐ Score logic
        score = 70
        quality = "Good"

        if cycles == 5:
            score = 90
            quality = "Best"
        elif cycles == 6:
            score = 80
            quality = "Extra Rest"

        results.append({
            "cycles": cycles,
            "time": wake_time.strftime("%I:%M %p"),   # AM/PM OUTPUT
            "date": wake_time.strftime("%Y-%m-%d"),
            "day": wake_time.strftime("%A"),          # Monday, Tuesday...
            "tag": tag,
            "score": score,
            "quality": quality
        })

    # Sort by score (best first)
    results = sorted(results, key=lambda x: x["score"], reverse=True)

    return results