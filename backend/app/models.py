from app import db

class Hospital(db.Model):
    id = db.Column(db.Integer , primary_key=True)
    name = db.Column(db.String(200) , nullable=False)
    ambulances = db.relationship("Ambulances" , backref="hospital" , lazy="dynamic")
    latitude = db.Column(db.String(100) , nullable=False)
    longitude = db.Column(db.String(100) , nullable=False)
    created_on = db.Column(db.DateTime, server_default=db.func.now())
    updated_on = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())


class Ambulance(db.Model):
    id= db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200) , nullable=False)
    hospital_id = db.Column(db.Integer, db.ForeignKey("hospitals.id"))
    created_on = db.Column(db.DateTime, server_default=db.func.now())
    updated_on = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

