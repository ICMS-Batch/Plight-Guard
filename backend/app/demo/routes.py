from flask import jsonify, request
from app.demo import bp
from app.models import Demo
from app import db
from app.demo.services import get_hospitals_with_phone_numbers

@bp.route("/test")
def test_route():
    get_hospitals_with_phone_numbers()
    return "Hello tests"

@bp.route('/post', methods=["POST"])
def post_demo_data():
    payload = request.json
    new_demo = Demo(name=payload['name'] , address=payload['address'])
    get_hospitals_with_phone_numbers()

    db.session.add(new_demo)
    db.session.commit()
    return jsonify(payload)
