from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)        # Otomatik olarak artan id numarası
    fullname = db.Column(db.String(100), nullable=False) # Ad Soyad
    email = db.Column(db.String(100), unique=True, nullable=False) # E-posta (benzersiz)
    username = db.Column(db.String(50), unique=True, nullable=False) # Kullanıcı Adı (benzersiz)
    password = db.Column(db.String(200), nullable=False) # Şifre
